import { useCallback } from 'react';

export function useCookies() {
  const setCookie = useCallback((
    cookieName,
    value,
    expiryInMinutes,
    path,
    domain
  ) => {
    let expires = "";
    if (expiryInMinutes) {
      const date = new Date();
      date.setTime(date.getTime() + expiryInMinutes * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    const pathStr = `; path=${path || '/'}`;
    // Optional: add a specific domain to the cookie, useful for when sub-domains exist
    const domainStr = domain ? `; domain=${domain}` : "";
    // Optional: Secure cookie (only sent over HTTPS)
    const secureStr = typeof window !== 'undefined' && window.location.protocol === "https:" ? "; secure" : "";

    // This is done to prevent errors during server-side rendering
    if (typeof document !== 'undefined') {
      document.cookie = `${cookieName}=${value}${expires}${pathStr}${domainStr}${secureStr}`;
    }
  }, []);

  const getCookie = useCallback((cookieName) => {
    if (typeof document === 'undefined') return undefined;

    const _cookieName = cookieName + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(_cookieName) === 0) {
        return c.substring(_cookieName.length, c.length);
      }
    }
    return undefined;
  }, []);

  const removeCookie = useCallback((cookieName, path, domain) => {
    setCookie(cookieName, "", -1, path, domain);
  }, [setCookie]);

  const cookieExists = useCallback((cookieName) => {
    return typeof getCookie(cookieName) !== "undefined";
  }, [getCookie]);

  return { setCookie, getCookie, removeCookie, cookieExists };
}