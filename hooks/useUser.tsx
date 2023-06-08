import {  UserDetails } from "@/types";

import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: UserDetails | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const UserContext = createContext<UserContextType >(
  {
    user: null,
    isLoading: false,
    isLoggedIn: false,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()
  }
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {




  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);



  const value = {
    user: null,
    isLoading: false,
    isLoggedIn: false,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()
  };

  return <UserContext.Provider value={value} {...props}/>
};

export const useUser = () => {
    const context = useContext(UserContext);
    if(context === undefined) {
        throw new Error('useUser must be used within a MyUserContextProvider')
    }
    return context;
}

