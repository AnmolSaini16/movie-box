import { Dispatch, SetStateAction, createContext } from "react";

export interface AppContextType {
  showAuthModal: boolean;
  setShowAuthModal: Dispatch<SetStateAction<boolean>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType | null>(null);
