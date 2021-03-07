import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface ProfileContextData {
  avatarUrl: string;
  name: string;
}

export const ProfileContext = createContext({} as ProfileContextData);

export function ProfileProvider({ children, ...userData }) {
  const name = userData.name;
  const avatarUrl = userData.avatarUrl;

  useEffect(() => {
    Cookies.set("cookieAvatarUrl", avatarUrl);
    Cookies.set("cookieName", name);
  }, []);

  return (
    <ProfileContext.Provider value={{ name, avatarUrl }}>
      {children}
    </ProfileContext.Provider>
  );
}
