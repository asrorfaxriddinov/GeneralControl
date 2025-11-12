import React, { createContext, useState, useContext } from "react";

type FocusContextType = {
  isInputFocused: boolean;
  setIsInputFocused: (value: boolean) => void;
};

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <FocusContext.Provider value={{ isInputFocused, setIsInputFocused }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);
  if (!context) {
    throw new Error("useFocus must be used within FocusProvider");
  }
  return context;
};
