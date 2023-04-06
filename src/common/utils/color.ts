/** @deprecated */
export const checkColorRange = (color: { r: number; g: number; b: number }) => {
  const redRange = color.r <= 255 && color.r >= 112;
  const greenRange = color.g <= 107 && color.g >= 28;
  const blueRange = color.b <= 95 && color.b >= 28;

  if (redRange && greenRange && blueRange) {
    return true;
  } else {
    return false;
  }
};
