import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useContext, useState } from "react";

const themes = {
  light: {
    background: "#EEEEEE",
    primaryText: "#222831",
    secondaryText: "#393E46",
  },
  dark: {
    background: "#1a1a1a",
    primaryText: "#222831",
    secondaryText: "#00ADB5",
  },
};

type ThemeContextType = {
  theme: { background: string; primaryText: string; secondaryText: string };
  isDarkMode: boolean;
  toggleTheme: () => Promise<void>;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const loadTheme = async (): Promise<void> => {
    try {
      const savedTheme: string | null =
        await AsyncStorage.getItem("app__theme");
      if (savedTheme === "dark") setIsDarkMode(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("unknown error");
      }
    }
  };

  const toggleTheme = async (): Promise<void> => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem("app__theme", newTheme ? "dark" : "light");
    } catch (error) {
      console.error("error saving theme:", error);
    }
  };

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context: ThemeContextType | null = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
