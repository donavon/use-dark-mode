declare module 'use-dark-mode' {
  export interface DarkModeConfig {
    classNameDark?: string;
    classNameLight?: string;
    element?: HTMLElement;
    onChange?: (val?: boolean) => void;
  }

  export interface DarkMode {
    readonly value: boolean;
    enable: () => void;
    disable: () => void;
    toggle: () => void;
  }

  export default function useDarkMode(
    initialState?: boolean,
    config?: DarkModeConfig
  ): DarkMode;
}
