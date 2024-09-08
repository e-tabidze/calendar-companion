export const applyTransparency = (hexColor: string, transparency: number) => {
  const alpha = Math.round(transparency * 255)
    .toString(16)
    .padStart(2, '0')
  return `${hexColor}${alpha}`
}

function hexToRgb(hex: string) {
    let bigint = parseInt(hex.slice(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
  }
  
  function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
  }
  
  export function blendColors(foreground: string, alpha: number, background = [255, 255, 255]) {
    const [r1, g1, b1] = hexToRgb(foreground);
    const [r2, g2, b2] = background;
  
    const r = Math.round(r1 * alpha + r2 * (1 - alpha));
    const g = Math.round(g1 * alpha + g2 * (1 - alpha));
    const b = Math.round(b1 * alpha + b2 * (1 - alpha));
  
    return rgbToHex(r, g, b);
  }
