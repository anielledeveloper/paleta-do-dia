import { ColorContrast, DayInfo } from '../types/interfaces';

/**
 * Utility functions for color operations and day calculations
 */

/**
 * Converts a hex color to RGB values
 * @param hex - Hex color string (e.g., "#FF0000" or "FF0000")
 * @returns RGB values as an object
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  const cleanHex = hex.replace('#', '');
  
  // Validate hex format
  if (!/^[0-9A-F]{6}$/i.test(cleanHex)) {
    return null;
  }
  
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);
  
  return { r, g, b };
}

/**
 * Calculates the relative luminance of a color
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Relative luminance value
 */
export function getRelativeLuminance(r: number, g: number, b: number): number {
  // Convert to sRGB
  const rs = r / 255;
  const gs = g / 255;
  const bs = b / 255;
  
  const rsLinear = rs <= 0.03928 ? rs / 12.92 : Math.pow((rs + 0.055) / 1.055, 2.4);
  const gsLinear = gs <= 0.03928 ? gs / 12.92 : Math.pow((gs + 0.055) / 1.055, 2.4);
  const bsLinear = bs <= 0.03928 ? bs / 12.92 : Math.pow((bs + 0.055) / 1.055, 2.4);
  
  // Calculate relative luminance
  return 0.2126 * rsLinear + 0.7152 * gsLinear + 0.0722 * bsLinear;
}

/**
 * Calculates the contrast ratio between two colors
 * @param color1 - First color (hex string)
 * @param color2 - Second color (hex string)
 * @returns Contrast ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) {
    return 1; // Default to minimum contrast
  }
  
  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Determines the best text color for a given background color
 * @param backgroundColor - Background color (hex string)
 * @returns Color contrast information
 */
export function getTextColorForBackground(backgroundColor: string): ColorContrast {
  const white = '#FFFFFF';
  const dark = '#1A1A1A';
  
  const whiteContrast = getContrastRatio(backgroundColor, white);
  const darkContrast = getContrastRatio(backgroundColor, dark);
  
  // Use the color with higher contrast
  if (whiteContrast > darkContrast) {
    return {
      isLight: false,
      textColor: white,
      contrastRatio: whiteContrast
    };
  } else {
    return {
      isLight: true,
      textColor: dark,
      contrastRatio: darkContrast
    };
  }
}

/**
 * Calculates the day of the year
 * @param date - Date object (defaults to current date)
 * @returns Day information
 */
export function getDayOfYear(date: Date = new Date()): DayInfo {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  return {
    dayOfYear,
    date,
    year: date.getFullYear()
  };
}

/**
 * Generates a deterministic index from day of year
 * @param dayOfYear - Day of the year (1-366)
 * @param arrayLength - Length of the array to index into
 * @returns Array index
 */
export function getDailyIndex(dayOfYear: number, arrayLength: number): number {
  return (dayOfYear - 1) % arrayLength;
}

/**
 * Generates a random index for shuffle functionality
 * @param arrayLength - Length of the array to index into
 * @returns Random array index
 */
export function getRandomIndex(arrayLength: number): number {
  return Math.floor(Math.random() * arrayLength);
}

/**
 * Copies text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
    } catch (fallbackErr) {
      console.error('Failed to copy text:', fallbackErr);
    }
    
    document.body.removeChild(textArea);
  }
}

/**
 * Formats a hex color for display
 * @param hex - Hex color string
 * @returns Formatted hex string
 */
export function formatHexColor(hex: string): string {
  return hex.toUpperCase();
}

/**
 * Validates if a string is a valid hex color
 * @param hex - String to validate
 * @returns True if valid hex color
 */
export function isValidHexColor(hex: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
}
