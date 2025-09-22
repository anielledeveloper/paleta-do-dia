import './newtab.css';
import { PALETTES } from '../data/palettes';
import { ColorPalette, PaletteState, CopyFeedback } from '../types/interfaces';
import {
  getDayOfYear,
  getDailyIndex,
  getRandomIndex,
  getTextColorForBackground,
  copyToClipboard,
  formatHexColor
} from '../utils/colorUtils';

/**
 * Main application class for Paleta do Dia
 */
class PaletaDoDia {
  private paletteContainer: HTMLElement;
  private paletteName: HTMLElement;
  private shuffleButton: HTMLButtonElement;
  private loadingElement: HTMLElement;
  private copyFeedback: HTMLElement;
  private currentState: PaletteState;
  private copyFeedbackState: CopyFeedback;

  constructor() {
    this.paletteContainer = document.getElementById('palette-container')!;
    this.paletteName = document.getElementById('palette-name')!;
    this.shuffleButton = document.getElementById('shuffle-button') as HTMLButtonElement;
    this.loadingElement = document.getElementById('loading')!;
    this.copyFeedback = document.getElementById('copy-feedback')!;
    
    const firstPalette = PALETTES[0];
    if (!firstPalette) {
      throw new Error('No palettes available');
    }
    
    this.currentState = {
      currentPalette: firstPalette,
      isShuffled: false
    };
    
    this.copyFeedbackState = {
      colorIndex: -1,
      isShowing: false
    };
    
    this.init();
  }

  /**
   * Initialize the application
   */
  private async init(): Promise<void> {
    try {
      this.showLoading();
      
      // Load saved state if available
      await this.loadSavedState();
      
      // Display the current palette
      this.displayPalette(this.currentState.currentPalette);
      
      // Set up event listeners
      this.setupEventListeners();
      
      this.hideLoading();
    } catch (error) {
      console.error('Error initializing Paleta do Dia:', error);
      this.hideLoading();
      this.displayError();
    }
  }

  /**
   * Load saved state from Chrome storage
   */
  private async loadSavedState(): Promise<void> {
    try {
      const result = await chrome.storage.local.get(['paletteState']);
      
      if (result.paletteState) {
        const savedState = result.paletteState as PaletteState;
        
        // Check if the saved state is from today and not shuffled
        if (!savedState.isShuffled) {
          const today = new Date();
          const savedDate = new Date(savedState.lastShuffleTime || 0);
          
          // If saved state is from a different day, use daily palette
          if (savedDate.toDateString() !== today.toDateString()) {
            this.currentState = this.getDailyPalette();
          } else {
            this.currentState = savedState;
          }
        } else {
          this.currentState = savedState;
        }
      } else {
        // No saved state, use daily palette
        this.currentState = this.getDailyPalette();
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
      this.currentState = this.getDailyPalette();
    }
  }

  /**
   * Save current state to Chrome storage
   */
  private async saveState(): Promise<void> {
    try {
      await chrome.storage.local.set({
        paletteState: this.currentState
      });
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }

  /**
   * Get the daily palette based on current date
   */
  private getDailyPalette(): PaletteState {
    const dayInfo = getDayOfYear();
    const dailyIndex = getDailyIndex(dayInfo.dayOfYear, PALETTES.length);
    const palette = PALETTES[dailyIndex];
    
    if (!palette) {
      throw new Error('Failed to get daily palette');
    }
    
    return {
      currentPalette: palette,
      isShuffled: false,
      lastShuffleTime: Date.now()
    };
  }

  /**
   * Get a random palette for shuffle functionality
   */
  private getRandomPalette(): PaletteState {
    const randomIndex = getRandomIndex(PALETTES.length);
    const palette = PALETTES[randomIndex];
    
    if (!palette) {
      throw new Error('Failed to get random palette');
    }
    
    return {
      currentPalette: palette,
      isShuffled: true,
      lastShuffleTime: Date.now()
    };
  }

  /**
   * Display a color palette
   */
  private displayPalette(palette: ColorPalette): void {
    // Clear existing swatches
    this.paletteContainer.innerHTML = '';
    
    // Set palette name
    this.paletteName.textContent = palette.name;
    
    // Create color swatches
    palette.colors.forEach((color, index) => {
      const swatch = this.createColorSwatch(color, index);
      this.paletteContainer.appendChild(swatch);
    });
  }

  /**
   * Create a color swatch element
   */
  private createColorSwatch(color: string, index: number): HTMLElement {
    const swatch = document.createElement('div');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = color;
    
    // Get appropriate text color for contrast
    const contrast = getTextColorForBackground(color);
    const hexText = document.createElement('div');
    hexText.className = 'color-hex';
    hexText.textContent = formatHexColor(color);
    hexText.style.color = contrast.textColor;
    
    // Add click handler for copy functionality
    swatch.addEventListener('click', () => this.handleColorClick(color, index, hexText));
    
    swatch.appendChild(hexText);
    return swatch;
  }

  /**
   * Handle color swatch click
   */
  private async handleColorClick(color: string, index: number, hexElement: HTMLElement): Promise<void> {
    try {
      // Copy color to clipboard
      await copyToClipboard(color);
      
      // Show copy feedback
      this.showCopyFeedback(hexElement);
      
      // Add haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
    } catch (error) {
      console.error('Error copying color:', error);
      this.showCopyFeedback(hexElement, false);
    }
  }

  /**
   * Show copy feedback
   */
  private showCopyFeedback(hexElement: HTMLElement, success: boolean = true): void {
    if (this.copyFeedbackState.isShowing) {
      return;
    }
    
    this.copyFeedbackState.isShowing = true;
    
    if (success) {
      // Show "Copiado!" in the swatch
      const originalText = hexElement.textContent;
      hexElement.textContent = 'Copiado!';
      hexElement.classList.add('copied');
      
      // Show toast feedback
      this.copyFeedback.classList.add('show');
      
      // Reset after 2 seconds
      setTimeout(() => {
        hexElement.textContent = originalText;
        hexElement.classList.remove('copied');
        this.copyFeedback.classList.remove('show');
        this.copyFeedbackState.isShowing = false;
      }, 2000);
    } else {
      // Show error feedback
      const originalText = hexElement.textContent;
      hexElement.textContent = 'Erro!';
      hexElement.style.background = 'rgba(244, 67, 54, 0.9)';
      
      setTimeout(() => {
        hexElement.textContent = originalText;
        hexElement.style.background = '';
        this.copyFeedbackState.isShowing = false;
      }, 2000);
    }
  }

  /**
   * Handle shuffle button click
   */
  private handleShuffleClick(): void {
    // Get new random palette
    this.currentState = this.getRandomPalette();
    
    // Save state
    this.saveState();
    
    // Display new palette
    this.displayPalette(this.currentState.currentPalette);
    
    // Add animation effect
    this.paletteContainer.style.opacity = '0';
    setTimeout(() => {
      this.paletteContainer.style.opacity = '1';
    }, 150);
  }

  /**
   * Set up event listeners
   */
  private setupEventListeners(): void {
    // Shuffle button
    this.shuffleButton.addEventListener('click', () => this.handleShuffleClick());
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        this.handleShuffleClick();
      }
    });
    
    // Handle visibility change to refresh daily palette
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && !this.currentState.isShuffled) {
        const newDailyPalette = this.getDailyPalette();
        if (newDailyPalette.currentPalette.name !== this.currentState.currentPalette.name) {
          this.currentState = newDailyPalette;
          this.saveState();
          this.displayPalette(this.currentState.currentPalette);
        }
      }
    });
  }

  /**
   * Show loading indicator
   */
  private showLoading(): void {
    this.loadingElement.classList.remove('hidden');
  }

  /**
   * Hide loading indicator
   */
  private hideLoading(): void {
    this.loadingElement.classList.add('hidden');
  }

  /**
   * Display error state
   */
  private displayError(): void {
    this.paletteContainer.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-size: 1.2rem;
        text-align: center;
        padding: 20px;
      ">
        <div>
          <h2>Ops! Algo deu errado</h2>
          <p>Não foi possível carregar a paleta do dia.</p>
          <button onclick="location.reload()" style="
            margin-top: 20px;
            padding: 10px 20px;
            background: rgba(255, 255, 255, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 8px;
            color: white;
            cursor: pointer;
          ">
            Tentar Novamente
          </button>
        </div>
      </div>
    `;
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PaletaDoDia();
});

// Handle page unload
window.addEventListener('beforeunload', () => {
  // Clean up any pending operations
});
