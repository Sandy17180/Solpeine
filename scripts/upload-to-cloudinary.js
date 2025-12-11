#!/usr/bin/env node
/*
  Migration helper (dry-run default).
  - Scans public/ for .jpg/.jpeg/.png files
  - Scans data/ and components/ for references to /...(.jpg|.jpeg|.png)
  - Produces cloudinary-mapping-dryrun.json mapping local path -> suggested Cloudinary URL
  Usage:
    node scripts/upload-to-cloudinary.js          # dry-run (default)
    node scripts/upload-to-cloudinary.js --upload # performs upload (requires cloudinary package and env vars)

  Environment variables required for upload mode:
    CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

*/
const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const publicDir = path.join(projectRoot, "public");
const dataDir = path.join(projectRoot, "data");
const componentsDir = path.join(projectRoot, "components");

const exts = [".jpg", ".jpeg", ".png"];

function walkDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fp = path.join(dir, file);
    const stat = fs.statSync(fp);
    if (stat && stat.isDirectory()) {
      results.push(...walkDir(fp));
    } else {
      results.push(fp);
    }
  });
  return results;
}

function findReferencedPathsInFiles(dir) {
  const results = new Set();
  if (!fs.existsSync(dir)) return results;
  const files = walkDir(dir).filter(
    (f) =>
      f.endsWith(".js") ||
      f.endsWith(".jsx") ||
      f.endsWith(".json") ||
      f.endsWith(".mjs")
  );
  const re = /["'`]\/(?:[\w\-\/. ]+?)\.(?:jpg|jpeg|png)["'`]/gi;
  files.forEach((file) => {
    try {
      const txt = fs.readFileSync(file, "utf8");
      let m;
      while ((m = re.exec(txt))) {
        const raw = m[0];
        const pathMatch = raw.slice(1, -1); // remove quotes
        // ensure it starts with '/'
        if (pathMatch.startsWith("/")) results.add(pathMatch);
      }
    } catch (err) {
      // ignore
    }
  });
  return results;
}

function collectPublicFiles() {
  const all = walkDir(publicDir);
  return all
    .filter((f) => exts.includes(path.extname(f).toLowerCase()))
    .map((f) => path.relative(publicDir, f).replace(/\\/g, "/"));
}

async function main() {
  const args = process.argv.slice(2);
  const doUpload = args.includes("--upload");

  console.log("Scanning for jpg/jpeg/png files...");

  const publicFiles = collectPublicFiles();
  const referencedInData = Array.from(findReferencedPathsInFiles(dataDir));
  const referencedInComponents = Array.from(
    findReferencedPathsInFiles(componentsDir)
  );

  const referenced = new Set([
    ...publicFiles.map((p) => `/${p}`),
    ...referencedInData,
    ...referencedInComponents,
  ]);

  const cloudName =
    process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "<your_cloud_name>";

  const mapping = {};

  for (const local of referenced) {
    const rel = local.replace(/^\//, "");
    const diskPath = path.join(publicDir, rel);
    if (!fs.existsSync(diskPath)) {
      console.warn(
        `warning: referenced file not found on disk: ${local} (expected ${diskPath})`
      );
      continue;
    }
    const suggestedUrl = `https://res.cloudinary.com/${cloudName}/image/upload/solpiene/${rel}`;
    mapping[local] = { disk: diskPath, suggested: suggestedUrl };
  }

  const outPath = path.join(projectRoot, "cloudinary-mapping-dryrun.json");
  fs.writeFileSync(outPath, JSON.stringify(mapping, null, 2));
  console.log(
    `Wrote dry-run mapping to ${outPath} (entries: ${
      Object.keys(mapping).length
    })`
  );

  if (!doUpload) {
    console.log(
      "Dry-run complete. To perform uploads, run with --upload and ensure CLOUDINARY env vars are set."
    );
    return;
  }

  // upload flow
  let cloudinary;
  try {
    cloudinary = require("cloudinary").v2;
  } catch (err) {
    console.error(
      "cloudinary package not installed. Run: npm install cloudinary"
    );
    process.exit(1);
  }

  const key = process.env.CLOUDINARY_API_KEY;
  const secret = process.env.CLOUDINARY_API_SECRET;
  const cname = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!key || !secret || !cname) {
    console.error(
      "Missing CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET or NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME env variables."
    );
    process.exit(1);
  }

  cloudinary.config({
    cloud_name: cname,
    api_key: key,
    api_secret: secret,
  });

  console.log("Uploading files to Cloudinary...");
  const uploaded = {};
  for (const [local, info] of Object.entries(mapping)) {
    const publicId = `solpiene/${local.replace(/^\//, "")}`.replace(/\\/g, "/");
    try {
      // eslint-disable-next-line no-await-in-loop
      const res = await cloudinary.uploader.upload(info.disk, {
        public_id: publicId,
        resource_type: "image",
        overwrite: true,
      });
      uploaded[local] = {
        secure_url: res.secure_url,
        public_id: res.public_id,
      };
      console.log(`Uploaded ${local} -> ${res.secure_url}`);
    } catch (err) {
      console.error(
        `Upload failed for ${local}:`,
        err && err.message ? err.message : err
      );
    }
  }

  const outUpload = path.join(projectRoot, "cloudinary-mapping.json");
  fs.writeFileSync(outUpload, JSON.stringify(uploaded, null, 2));
  console.log(`Wrote upload mapping to ${outUpload}`);
}

main().catch((err) => {
  console.error("Fatal error:", err && err.stack ? err.stack : err);
  process.exit(1);
});
