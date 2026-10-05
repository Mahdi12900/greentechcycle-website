"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

/**
 * État d'interface partagé entre les éléments « chrome » du site
 * (header, barre d'onglets, barre d'action mobile, chat, cookies, popup).
 *
 * Sert à appliquer la règle « un seul sticky » (DESIGN.md §6.2, §6.11) :
 *  - `headerHidden` : la barre d'onglets d'une page a pris le relais du header ;
 *  - `chatOpen`     : le panneau de chat est ouvert (bouton dans la barre mobile) ;
 *  - `overlayOpen`  : un CookieBanner / ExitPopup est affiché → la barre
 *                     d'action mobile s'efface pour ne rien empiler en bas.
 */
interface SiteUiState {
  headerHidden: boolean;
  setHeaderHidden: (v: boolean) => void;
  chatOpen: boolean;
  setChatOpen: (v: boolean) => void;
  toggleChat: () => void;
  overlayOpen: boolean;
  setOverlay: (key: string, open: boolean) => void;
}

const SiteUiContext = createContext<SiteUiState | null>(null);

export function SiteUiProvider({ children }: { children: React.ReactNode }) {
  const [headerHidden, setHeaderHidden] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [overlays, setOverlays] = useState<Record<string, boolean>>({});

  const toggleChat = useCallback(() => setChatOpen((v) => !v), []);
  const setOverlay = useCallback((key: string, open: boolean) => {
    setOverlays((prev) => (prev[key] === open ? prev : { ...prev, [key]: open }));
  }, []);

  const value = useMemo<SiteUiState>(
    () => ({
      headerHidden,
      setHeaderHidden,
      chatOpen,
      setChatOpen,
      toggleChat,
      overlayOpen: Object.values(overlays).some(Boolean),
      setOverlay,
    }),
    [headerHidden, chatOpen, toggleChat, overlays, setOverlay]
  );

  return <SiteUiContext.Provider value={value}>{children}</SiteUiContext.Provider>;
}

/** Accès à l'état partagé. Hors provider (tests, export isolé) : valeurs neutres. */
export function useSiteUi(): SiteUiState {
  const ctx = useContext(SiteUiContext);
  if (ctx) return ctx;
  return {
    headerHidden: false,
    setHeaderHidden: () => {},
    chatOpen: false,
    setChatOpen: () => {},
    toggleChat: () => {},
    overlayOpen: false,
    setOverlay: () => {},
  };
}
