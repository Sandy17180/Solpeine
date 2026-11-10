export const ASPECT_RATIOS = {
  portrait: 4 / 5,  // width / height
  landscape: 5 / 4, // width / height
};

/**
 * Checks whether an image object has valid, positive numerical dimensions.
 * @param {object} img
 * @returns {boolean}
 */
export function hasValidDimensions(img) {
  return (
    Boolean(img) &&
    typeof img.width === "number" &&
    typeof img.height === "number" &&
    img.width > 0 &&
    img.height > 0 &&
    !Number.isNaN(img.width) &&
    !Number.isNaN(img.height)
  );
}

/**
 * Get CSS aspect-ratio string (e.g., "16 / 9" or "4 / 5")
 * @param {object} img
 * @param {"portrait"|"landscape"} [fallbackOrientation="portrait"]
 * @returns {string}
 */
export function getAspectRatioString(img, fallbackOrientation = "portrait") {
  if (hasValidDimensions(img)) {
    return `${img.width} / ${img.height}`;
  }
  const orientation = img?.orientation || fallbackOrientation;
  return orientation === "landscape" ? "5 / 4" : "4 / 5";
}

/**
 * Get numerical aspect ratio value (width / height)
 * @param {object} img
 * @param {"portrait"|"landscape"} [fallbackOrientation="portrait"]
 * @returns {number}
 */
export function getAspectRatioValue(img, fallbackOrientation = "portrait") {
  if (hasValidDimensions(img)) {
    return img.width / img.height;
  }
  const orientation = img?.orientation || fallbackOrientation;
  return orientation === "landscape" ? 5 / 4 : 4 / 5;
}

/**
 * Get width and height based on orientation and a base size (legacy helper preserved)
 * @param {"portrait"|"landscape"} orientation
 * @param {number} base - base height (portrait) or width (landscape)
 * @returns {{ width: number, height: number }}
 */
export function getSizeByAspectRatio(orientation, base) {
  const ratio = ASPECT_RATIOS[orientation] || 4 / 5;
  if (orientation === "portrait") {
    const height = base;
    const width = height * ratio;
    return { width, height };
  } else {
    const width = base;
    const height = width / ratio;
    return { width, height };
  }
}

/**
 * Dynamically calculate main portfolio image dimensions and aspect ratio
 * based on uploaded image dimensions with safe responsive fallbacks.
 *
 * @param {object} img - The image metadata object { width, height, orientation }
 * @param {boolean} [isMobile=false]
 * @returns {{ width: number, height: number, aspectRatio: string }}
 */
export function getMainImageDimensions(img, isMobile = false) {
  const orientation =
    img?.orientation ||
    (hasValidDimensions(img)
      ? img.width >= img.height
        ? "landscape"
        : "portrait"
      : "portrait");

  const aspectRatio = getAspectRatioString(img, orientation);
  const ratio = getAspectRatioValue(img, orientation);

  if (isMobile) {
    if (hasValidDimensions(img)) {
      if (ratio >= 1) {
        // Landscape
        const width = 400;
        const height = Math.min(Math.round(width / ratio), 320);
        return { width, height, aspectRatio };
      } else {
        // Portrait
        const height = 400;
        const width = Math.min(Math.round(height * ratio), 320);
        return { width, height, aspectRatio };
      }
    }
    return orientation === "portrait"
      ? { width: 200, height: 400, aspectRatio }
      : { width: 400, height: 200, aspectRatio };
  }

  // Desktop
  if (hasValidDimensions(img)) {
    if (ratio >= 1) {
      // Landscape
      const width = 610;
      const height = Math.min(Math.round(width / ratio), 550);
      return { width, height, aspectRatio };
    } else {
      // Portrait
      const height = 610;
      const width = Math.min(Math.round(height * ratio), 550);
      return { width, height, aspectRatio };
    }
  }

  return orientation === "portrait"
    ? { width: 488, height: 610, aspectRatio }
    : { width: 610, height: 488, aspectRatio };
}

/**
 * Dynamically calculate thumbnail dimensions and aspect ratio
 * based on uploaded image dimensions with safe fallbacks.
 *
 * @param {object} img - The image metadata object { width, height, orientation }
 * @param {boolean} [isMobile=false]
 * @param {{ width: number, height: number }|null} [baseSize=null]
 * @returns {{ width: number, height: number, aspectRatio: string }}
 */
export function getThumbnailDynamicSize(img, isMobile = false, baseSize = null) {
  const orientation =
    img?.orientation ||
    (hasValidDimensions(img)
      ? img.width >= img.height
        ? "landscape"
        : "portrait"
      : "portrait");

  const aspectRatio = getAspectRatioString(img, orientation);
  const ratio = getAspectRatioValue(img, orientation);

  const defaultBase = isMobile
    ? orientation === "portrait"
      ? { width: 100, height: 130 }
      : { width: 130, height: 100 }
    : orientation === "portrait"
      ? { width: 280, height: 350 }
      : { width: 350, height: 280 };

  const base =
    baseSize &&
    typeof baseSize.width === "number" &&
    typeof baseSize.height === "number"
      ? baseSize
      : defaultBase;

  if (hasValidDimensions(img)) {
    if (ratio >= 1) {
      // Landscape: fit to base width, derive height
      const width = base.width;
      const height = Math.max(1, Math.round(width / ratio));
      return { width, height, aspectRatio };
    } else {
      // Portrait: fit to base height, derive width
      const height = base.height;
      const width = Math.max(1, Math.round(height * ratio));
      return { width, height, aspectRatio };
    }
  }

  return { width: base.width, height: base.height, aspectRatio };
}
