// Theme management utilities
import React from 'react';

export type Theme = 'light' | 'dark' | 'blue' | 'green' | 'purple' | 'orange' | 'high-contrast';

export interface ThemeConfig {
  name: Theme;
  displayName: string;
  description: string;
  primary: string;
  accent: string;
}

export const themes: ThemeConfig[] = [
  {
    name: 'light',
    displayName: 'Light',
    description: 'Clean and bright theme',
    primary: '#2563eb',
    accent: '#f59e0b'
  },
  {
    name: 'dark',
    displayName: 'Dark',
    description: 'Easy on the eyes',
    primary: '#3b82f6',
    accent: '#fbbf24'
  },
  {
    name: 'blue',
    displayName: 'Ocean Blue',
    description: 'Cool and professional',
    primary: '#0ea5e9',
    accent: '#06b6d4'
  },
  {
    name: 'green',
    displayName: 'Nature Green',
    description: 'Fresh and vibrant',
    primary: '#10b981',
    accent: '#34d399'
  },
  {
    name: 'purple',
    displayName: 'Royal Purple',
    description: 'Creative and bold',
    primary: '#8b5cf6',
    accent: '#a78bfa'
  },
  {
    name: 'orange',
    displayName: 'Sunset Orange',
    description: 'Warm and energetic',
    primary: '#f97316',
    accent: '#fb923c'
  },
  {
    name: 'high-contrast',
    displayName: 'High Contrast',
    description: 'Maximum accessibility',
    primary: '#0000ff',
    accent: '#ff0000'
  }
];

/**
 * Theme manager class
 */
export class ThemeManager {
  private static instance: ThemeManager;
  private currentTheme: Theme = 'light';
  private listeners: ((theme: Theme) => void)[] = [];
  private readonly STORAGE_KEY = 'portfolio-theme';

  private constructor() {
    this.loadTheme();
    this.setupSystemThemeListener();
  }

  static getInstance(): ThemeManager {
    if (!ThemeManager.instance) {
      ThemeManager.instance = new ThemeManager();
    }
    return ThemeManager.instance;
  }

  /**
   * Get current theme
   */
  getCurrentTheme(): Theme {
    return this.currentTheme;
  }

  /**
   * Set theme
   */
  setTheme(theme: Theme): void {
    this.currentTheme = theme;
    this.applyTheme(theme);
    this.saveTheme(theme);
    this.notifyListeners(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Get next theme in cycle
   */
  getNextTheme(): Theme {
    const currentIndex = themes.findIndex(t => t.name === this.currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    return themes[nextIndex].name;
  }

  /**
   * Cycle to next theme
   */
  cycleTheme(): void {
    this.setTheme(this.getNextTheme());
  }

  /**
   * Subscribe to theme changes
   */
  subscribe(listener: (theme: Theme) => void): () => void {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Get theme configuration
   */
  getThemeConfig(theme?: Theme): ThemeConfig | undefined {
    return themes.find(t => t.name === (theme || this.currentTheme));
  }

  /**
   * Check if system prefers dark mode
   */
  getSystemPreference(): 'light' | 'dark' {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  }

  /**
   * Use system theme preference
   */
  useSystemTheme(): void {
    const systemTheme = this.getSystemPreference();
    this.setTheme(systemTheme);
  }

  /**
   * Check if current theme is dark
   */
  isDarkTheme(): boolean {
    return this.currentTheme === 'dark' || 
           (this.currentTheme === 'light' && this.getSystemPreference() === 'dark');
  }

  private applyTheme(theme: Theme): void {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      
      // Update meta theme-color for mobile browsers
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      const themeConfig = this.getThemeConfig(theme);
      
      if (metaThemeColor && themeConfig) {
        metaThemeColor.setAttribute('content', themeConfig.primary);
      }
    }
  }

  private saveTheme(theme: Theme): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, theme);
    }
  }

  private loadTheme(): void {
    if (typeof localStorage !== 'undefined') {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY) as Theme;
      if (savedTheme && themes.some(t => t.name === savedTheme)) {
        this.currentTheme = savedTheme;
      } else {
        // Use system preference if no saved theme
        this.currentTheme = this.getSystemPreference();
      }
      this.applyTheme(this.currentTheme);
    }
  }

  private setupSystemThemeListener(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      
      const handleChange = (e: MediaQueryListEvent) => {
        // Only auto-switch if user hasn't manually set a theme
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        if (!savedTheme) {
          const newTheme = e.matches ? 'dark' : 'light';
          this.setTheme(newTheme);
        }
      };

      mediaQuery.addEventListener('change', handleChange);
    }
  }

  private notifyListeners(theme: Theme): void {
    this.listeners.forEach(listener => listener(theme));
  }
}

/**
 * React hook for theme management
 */
export const useTheme = () => {
  const themeManager = ThemeManager.getInstance();
  const [currentTheme, setCurrentTheme] = React.useState<Theme>(themeManager.getCurrentTheme());

  React.useEffect(() => {
    const unsubscribe = themeManager.subscribe(setCurrentTheme);
    return unsubscribe;
  }, [themeManager]);

  return {
    theme: currentTheme,
    setTheme: (theme: Theme) => themeManager.setTheme(theme),
    toggleTheme: () => themeManager.toggleTheme(),
    cycleTheme: () => themeManager.cycleTheme(),
    useSystemTheme: () => themeManager.useSystemTheme(),
    isDarkTheme: () => themeManager.isDarkTheme(),
    getThemeConfig: (theme?: Theme) => themeManager.getThemeConfig(theme),
    themes
  };
};

/**
 * Get theme manager instance
 */
export const getThemeManager = (): ThemeManager => {
  return ThemeManager.getInstance();
};

