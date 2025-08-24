export const ASPECT_RATIOS = {
  portrait: 4 / 5,  // width / height
  landscape: 5 / 4, // width / height
};

/**
 * Get width and height based on orientation and a base size
 * @param {"portrait"|"landscape"} orientation
 * @param {number} base - base height (portrait) or width (landscape)
 * @returns { width, height }
 */
export function getSizeByAspectRatio(orientation, base) {
  const ratio = ASPECT_RATIOS[orientation];
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
