"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  SetStateAction,
} from "react";

interface ContextType {
  theme: string;
  handleThemeLight: () => void;
  handleThemeDark: () => void;
  SurahFullView: boolean;
  setSurahFullView: React.Dispatch<SetStateAction<boolean>>;
  changeHadithBookChapterState: boolean;
  setChangeHadithBookChapterState: React.Dispatch<SetStateAction<boolean>>;
  currentHadithDetailsState: boolean;
  setCurrentHadithDetailsState: React.Dispatch<SetStateAction<boolean>>;
  scroll_to_first_hadith: boolean;
  set_scroll_to_first_hadith: React.Dispatch<SetStateAction<boolean>>;
  scroll_to_last_hadith: boolean;
  set_scroll_to_last_hadith: React.Dispatch<SetStateAction<boolean>>;
}

const GContext = createContext<ContextType | undefined>(undefined);

export const GContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const savedTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;

  const [theme, setTheme] = useState<string>(savedTheme || "light");
  const [SurahFullView, setSurahFullView] = useState<boolean>(false);
  const [changeHadithBookChapterState, setChangeHadithBookChapterState] =
    useState(false);
  const [currentHadithDetailsState, setCurrentHadithDetailsState] =
    useState(true);
  const [scroll_to_first_hadith, set_scroll_to_first_hadith] = useState(false);
  const [scroll_to_last_hadith, set_scroll_to_last_hadith] = useState(false);

  const handleThemeLight = () => {
    setTheme("light");
    localStorage.setItem("theme", "light");
  };

  const handleThemeDark = () => {
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  };

  return (
    <GContext.Provider
      value={{
        theme,
        handleThemeLight,
        handleThemeDark,
        SurahFullView,
        setSurahFullView,
        changeHadithBookChapterState,
        setChangeHadithBookChapterState,
        currentHadithDetailsState,
        setCurrentHadithDetailsState,
        scroll_to_first_hadith,
        set_scroll_to_first_hadith,
        scroll_to_last_hadith,
        set_scroll_to_last_hadith,
      }}
    >
      {children}
    </GContext.Provider>
  );
};

export const useGContext = () => {
  const context = useContext(GContext);
  if (!context) {
    throw new globalThis.Error(
      "useGContext must be used within a GContextProvider"
    );
  }
  return context;
};
