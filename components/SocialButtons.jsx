import Image from "next/image";
import Link from "next/link";
import instagramLogo from "@/social/instagramLogo.svg";
import threadLogo from "@/social/threadLogo.svg";
import facebookLogo from "@/social/facebookLogo.svg";
import youtubeLogo from "@/social/youtubeLogo.svg";
import pinterestLogo from "@/social/pinterestLogo.svg";
import linkedinLogo from "@/social/linkedinLogo.svg";
import twitterLogo from "@/social/twitterLogo.svg";


const socials = [
  {
    href: "https://www.instagram.com/sandeepsai_fotography/",
    src: instagramLogo,
    alt: "instagram",
  },
  {
    href: "https://www.threads.net/@sandeepsai_fotography",
    src: threadLogo,
    alt: "thread",
  },
  {
    href: "https://www.facebook.com/sandeepsaik18",
    src: facebookLogo,
    alt: "Facebook",
  },
  {
    href: "https://www.youtube.com/@SandeepSaiFotography",
    src: youtubeLogo,
    alt: "youtube",
  },
  { href: "https://pin.it/Mtz9RIVOB", src: pinterestLogo, alt: "pinterest" },
  {
    href: "https://www.linkedin.com/in/sandeep-sai-k-2155861b1/",
    src: linkedinLogo,
    alt: "LinkedIn",
  },
  { href: "https://x.com/SandeepSai198", src: twitterLogo, alt: "Twitter" },
];

export default function SocialButtons() {
  return (
    <div className="fixed top-[270px] right-2 -translate-y-1/2 flex flex-col gap-4 z-50">
      {socials.map((social) => (
        <Link key={social.href} href={social.href} target="_blank" rel="noopener noreferrer">
          <div className="shadow-2xl hover:scale-110 hover:brightness-130 transition hover:shadow-none">
            <Image src={social.src} alt={social.alt} width={32} height={32} />
          </div>
        </Link>
      ))}
    </div>
  );
}
