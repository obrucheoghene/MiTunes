import { appwriteWebClientAccount } from "@/libs/appwriteWeb";
import {  UserDetails } from "@/types";

import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: UserDetails | null;
  isLoading: boolean;
  setCurrentUser: () => void;
  signOut: () => void;
};

export const UserContext = createContext<UserContextType >(
  {
    user: null,
    isLoading: false,
    setCurrentUser: () => {},
    signOut: () => {}
  }
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {

  const [user, setUser] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentUser = async () => {
    try {
      const response = await appwriteWebClientAccount.get()
      setUser({
        id: response.$id,
        email: response.email,
        isVerified: response.emailVerification,
        fullname: response.name
      })

    } catch (error) {
     
    }
  }

  useEffect (() => {
    setIsLoading(true);
  
    if(!user && !isLoading) {
      getCurrentUser();
    }
    setIsLoading(false)
  }, [user, isLoading])
  
  const signInUser = async (email:string, password:string) => {
    try {
      await appwriteWebClientAccount.createEmailSession(email, password)
       getCurrentUser()
    } catch (error) {
      throw error;
    }
  }

  const signOutUser = async () => {
    try {
       await appwriteWebClientAccount.deleteSession('current');
       setUser(null)
    } catch (error) {
      console.log('SigOutUser failed', error);
    }
  }
  const value = {
    user,
    isLoading,
    setCurrentUser: getCurrentUser,
    signOut: signOutUser
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

