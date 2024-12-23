export const getAbbrAddress = (address: string | null) => {
  if(!address) return 'null'
  return address.slice(0, 4) + "..." + address.slice(-4)
}

export function formatReadableDate(date: Date) {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  });
}

function hexToRgb(hex: string) {
  // Remove the hash at the start if it's there
  hex = hex.replace(/^#/, '');

  // Parse r, g, b values
  let bigint = parseInt(hex, 16);
  let r = (bigint >> 16) & 255;
  let g = (bigint >> 8) & 255;
  let b = bigint & 255;

  return [r, g, b];
}

// Function to calculate luminance (same as before)
function getLuminance([r, g, b]: number[]) {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Function to calculate contrast ratio (same as before)
export function getContrastRatio(hex1: string, hex2: string) {
  const minContrast = 3.5;
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = getLuminance([rgb1[0], rgb1[1], rgb1[2]]) + 0.05;
  const lum2 = getLuminance([rgb2[0], rgb2[1], rgb2[2]]) + 0.05;
  const result = lum1 > lum2 ? lum1 / lum2 : lum2 / lum1;
  return result > minContrast
}
