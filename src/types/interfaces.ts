/**
 * Color palette interface
 */
export interface ColorPalette {
  /** Creative name for the palette */
  name: string;
  /** Array of 5 hex color code strings */
  colors: string[];
}

/**
 * Color contrast result interface
 */
export interface ColorContrast {
  /** Whether the background is light or dark */
  isLight: boolean;
  /** Recommended text color (white or dark) */
  textColor: string;
  /** Contrast ratio value */
  contrastRatio: number;
}

/**
 * Day calculation result interface
 */
export interface DayInfo {
  /** Day of the year (1-366) */
  dayOfYear: number;
  /** Current date */
  date: Date;
  /** Year */
  year: number;
}

/**
 * Palette display state interface
 */
export interface PaletteState {
  /** Currently displayed palette */
  currentPalette: ColorPalette;
  /** Whether this is a shuffled palette (not daily) */
  isShuffled: boolean;
  /** Last shuffle timestamp */
  lastShuffleTime?: number;
}

/**
 * Copy feedback state interface
 */
export interface CopyFeedback {
  /** Color index that was copied */
  colorIndex: number;
  /** Whether feedback is currently showing */
  isShowing: boolean;
  /** Timeout ID for hiding feedback */
  timeoutId?: number;
}
