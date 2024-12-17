// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff", 
    10: "#f6f6f6", 
    50: "#f0f0f0", 
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000", 
  },
  primary: {
    // blue
    100: "#c1cfcd",
    200: "#98b0c5",
    300: "#7091ae",
    400: "#50718d",
    500: "#344a5d",
    600: "#22303d", 
    700: "#192734",
    800: "#15202b",
    900: "#070812",
  },
  secondary: {
    // red
    30: "#d5c7c7",
    50: "#f0f0f0",
    100: "#ebe4e4",
    200: "#e2c4c6",
    300: "#d9a4a8",
    400: "#e4606d",
    500: "#dd3446",
    600: "#bd212f",
    700: "#921924",
    800: "#661219",
    900: "#3b0a0f",
  },
};

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[700],
              light: tokensDark.primary[700],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.grey[0],
              alt: tokensDark.primary[100],
              light: tokensDark.primary[200],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[800],
              alt: tokensDark.primary[600],
            },
            button: {
              background: tokensDark.secondary[100],
              inactiveText: tokensDark.primary[800],
              activeText: tokensDark.primary[50],
            },
            icons: {
              inactive: tokensDark.primary[200],
              active: tokensDark.primary[700],
            },
            tables: {
              background: tokensDark.primary[500],
              lines: tokensDark.primary[100],
              anotherLine: tokensDark.primary[300],
            },
          }
          : {
            //palette values for light mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.secondary[700],
              light: tokensDark.secondary[700],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[800],
              alt: tokensDark.secondary[700],
              light: tokensDark.secondary[600],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.secondary[50],
              alt: tokensDark.secondary[100],
            },
            button: {
              background: tokensDark.secondary[600],
              inactiveText: tokensDark.secondary[50],
              activeText: tokensDark.secondary[700],
            },
            icons: {
              inactive: tokensDark.secondary[600],
              active: tokensDark.secondary[100],
            },
            tables: {
              background: tokensDark.secondary[30],
              lines: tokensDark.secondary[400],
              anotherLine: tokensDark.secondary[700],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
