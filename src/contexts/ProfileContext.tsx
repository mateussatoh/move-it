import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface ProfileContextData {
  avatarUrl: string;
  name: string;
}

export const ProfileContext = createContext({} as ProfileContextData);

export function ProfileProvider({ children, ...userData }) {
  const name = userData.name ?? "Usuário";
  const avatarUrl =
    userData.avatarUrl ??
    "https://cdn0.iconfinder.com/data/icons/online-shop-equitment-gliph/32/line-2_on_going_logo-02-512.png";

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
