export interface Theme {
  name: string;
  label: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    border: string;
    input: string;
    ring: string;
    // Additional custom colors
    sidebar: string;
    sidebarForeground: string;
    sidebarBorder: string;
  };
}

export const themes: Record<string, Theme> = {
  nord: {
    name: 'nord',
    label: 'Nord',
    colors: {
      // Polar Night (backgrounds)
      background: '220 16% 22%',        // #2E3440
      foreground: '218 27% 94%',        // #ECEFF4
      card: '220 17% 32%',              // #3B4252
      cardForeground: '218 27% 94%',    // #ECEFF4
      popover: '220 17% 32%',           // #3B4252
      popoverForeground: '218 27% 94%', // #ECEFF4

      // Frost (primary accents)
      primary: '193 43% 67%',           // #88C0D0
      primaryForeground: '220 16% 22%', // #2E3440

      // Snow Storm (secondary)
      secondary: '219 28% 88%',         // #D8DEE9
      secondaryForeground: '220 16% 22%', // #2E3440

      muted: '220 16% 36%',             // #434C5E
      mutedForeground: '218 27% 92%',   // #E5E9F0

      // Frost accent
      accent: '179 25% 65%',            // #8FBCBB
      accentForeground: '220 16% 22%',  // #2E3440

      // Aurora destructive
      destructive: '354 42% 56%',       // #BF616A
      destructiveForeground: '218 27% 94%', // #ECEFF4

      border: '220 16% 36%',            // #434C5E
      input: '220 16% 36%',             // #434C5E
      ring: '193 43% 67%',              // #88C0D0

      // Sidebar
      sidebar: '220 17% 26%',           // #363C4A
      sidebarForeground: '218 27% 92%', // #E5E9F0
      sidebarBorder: '220 16% 22%',     // #2E3440
    }
  },

  dracula: {
    name: 'dracula',
    label: 'Dracula',
    colors: {
      background: '231 15% 18%',        // #282A36
      foreground: '60 30% 96%',         // #F8F8F2
      card: '232 14% 31%',              // #44475A
      cardForeground: '60 30% 96%',     // #F8F8F2
      popover: '232 14% 31%',           // #44475A
      popoverForeground: '60 30% 96%',  // #F8F8F2

      primary: '265 89% 78%',           // #BD93F9
      primaryForeground: '231 15% 18%', // #282A36

      secondary: '191 97% 77%',         // #8BE9FD
      secondaryForeground: '231 15% 18%', // #282A36

      muted: '232 14% 31%',             // #44475A
      mutedForeground: '60 30% 96%',    // #F8F8F2

      accent: '326 100% 74%',           // #FF79C6
      accentForeground: '231 15% 18%',  // #282A36

      destructive: '0 100% 67%',        // #FF5555
      destructiveForeground: '60 30% 96%', // #F8F8F2

      border: '232 14% 31%',            // #44475A
      input: '232 14% 31%',             // #44475A
      ring: '265 89% 78%',              // #BD93F9

      sidebar: '231 15% 22%',           // #21222C
      sidebarForeground: '60 30% 96%',  // #F8F8F2
      sidebarBorder: '231 15% 18%',     // #282A36
    }
  },

  tokyoNight: {
    name: 'tokyoNight',
    label: 'Tokyo Night',
    colors: {
      background: '235 18% 12%',        // #1A1B26
      foreground: '224 17% 82%',        // #C0CAF5
      card: '235 21% 15%',              // #24283B
      cardForeground: '224 17% 82%',    // #C0CAF5
      popover: '235 21% 15%',           // #24283B
      popoverForeground: '224 17% 82%', // #C0CAF5

      primary: '217 92% 76%',           // #7AA2F7
      primaryForeground: '235 18% 12%', // #1A1B26

      secondary: '199 89% 48%',         // #0DB9D7
      secondaryForeground: '235 18% 12%', // #1A1B26

      muted: '240 17% 26%',             // #3B4261
      mutedForeground: '224 17% 82%',   // #C0CAF5

      accent: '267 84% 81%',            // #BB9AF7
      accentForeground: '235 18% 12%',  // #1A1B26

      destructive: '2 77% 62%',         // #F7768E
      destructiveForeground: '224 17% 82%', // #C0CAF5

      border: '240 17% 26%',            // #3B4261
      input: '240 17% 26%',             // #3B4261
      ring: '217 92% 76%',              // #7AA2F7

      sidebar: '235 18% 15%',           // #16161E
      sidebarForeground: '224 17% 82%', // #C0CAF5
      sidebarBorder: '235 18% 12%',     // #1A1B26
    }
  },

  catppuccin: {
    name: 'catppuccin',
    label: 'Catppuccin Mocha',
    colors: {
      background: '240 21% 15%',        // #1E1E2E
      foreground: '226 64% 88%',        // #CDD6F4
      card: '237 16% 23%',              // #313244
      cardForeground: '226 64% 88%',    // #CDD6F4
      popover: '237 16% 23%',           // #313244
      popoverForeground: '226 64% 88%', // #CDD6F4

      primary: '217 92% 76%',           // #89B4FA
      primaryForeground: '240 21% 15%', // #1E1E2E

      secondary: '189 71% 73%',         // #89DCEB
      secondaryForeground: '240 21% 15%', // #1E1E2E

      muted: '233 12% 39%',             // #585B70
      mutedForeground: '227 68% 88%',   // #BAC2DE

      accent: '267 84% 81%',            // #CBA6F7
      accentForeground: '240 21% 15%',  // #1E1E2E

      destructive: '343 81% 75%',       // #F38BA8
      destructiveForeground: '226 64% 88%', // #CDD6F4

      border: '233 12% 39%',            // #585B70
      input: '233 12% 39%',             // #585B70
      ring: '217 92% 76%',              // #89B4FA

      sidebar: '240 23% 12%',           // #181825
      sidebarForeground: '226 64% 88%', // #CDD6F4
      sidebarBorder: '240 21% 15%',     // #1E1E2E
    }
  },

  gruvbox: {
    name: 'gruvbox',
    label: 'Gruvbox Dark',
    colors: {
      background: '30 11% 20%',         // #282828
      foreground: '43 16% 87%',         // #EBDBB2
      card: '30 8% 26%',                // #3C3836
      cardForeground: '43 16% 87%',     // #EBDBB2
      popover: '30 8% 26%',             // #3C3836
      popoverForeground: '43 16% 87%',  // #EBDBB2

      primary: '180 25% 65%',           // #8EC07C
      primaryForeground: '30 11% 20%',  // #282828

      secondary: '38 55% 70%',          // #FABD2F
      secondaryForeground: '30 11% 20%', // #282828

      muted: '30 6% 38%',               // #504945
      mutedForeground: '42 15% 75%',    // #D5C4A1

      accent: '205 82% 66%',            // #83A598
      accentForeground: '30 11% 20%',   // #282828

      destructive: '4 69% 67%',         // #FB4934
      destructiveForeground: '43 16% 87%', // #EBDBB2

      border: '30 6% 38%',              // #504945
      input: '30 6% 38%',               // #504945
      ring: '180 25% 65%',              // #8EC07C

      sidebar: '30 14% 16%',            // #1D2021
      sidebarForeground: '43 16% 87%',  // #EBDBB2
      sidebarBorder: '30 11% 20%',      // #282828
    }
  },

  default: {
    name: 'default',
    label: 'Lokus Dark',
    colors: {
      background: '0 0% 3.9%',
      foreground: '0 0% 98%',
      card: '0 0% 3.9%',
      cardForeground: '0 0% 98%',
      popover: '0 0% 3.9%',
      popoverForeground: '0 0% 98%',
      primary: '0 0% 98%',
      primaryForeground: '0 0% 9%',
      secondary: '0 0% 14.9%',
      secondaryForeground: '0 0% 98%',
      muted: '0 0% 14.9%',
      mutedForeground: '0 0% 63.9%',
      accent: '0 0% 14.9%',
      accentForeground: '0 0% 98%',
      destructive: '0 62.8% 30.6%',
      destructiveForeground: '0 0% 98%',
      border: '0 0% 14.9%',
      input: '0 0% 14.9%',
      ring: '0 0% 83.1%',
      sidebar: '0 0% 10%',
      sidebarForeground: '0 0% 90%',
      sidebarBorder: '0 0% 14.9%',
    }
  }
};

export function applyTheme(theme: Theme) {
  const root = document.documentElement;

  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVarName = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(`--${cssVarName}`, value);
  });
}
