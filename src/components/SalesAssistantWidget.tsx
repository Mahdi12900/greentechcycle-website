"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  X,
  Calendar,
  FileText,
  LayoutGrid,
  Send,
  Phone,
  Mail,
  UserRound,
  MessageCircle,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useSiteUi } from "@/components/SiteUiContext";

/* ------------------------------------------------------------------ */
/*  Assistant commercial « Sophie Martin » — DESIGN.md §6.10           */
/*  - Desktop (lg+) : bouton rond compact fixe + panneau 380 px.        */
/*  - Mobile        : le bouton vit dans MobileActionBar ; le panneau   */
/*                    s'ouvre en feuille plein écran modale.            */
/*  - Bulle « Besoin d'aide ? » : desktop, 1×/session, 2 boutons frères */
/*    (jamais un bouton dans un bouton — axe nested-interactive).       */
/* ------------------------------------------------------------------ */

export const CHAT_PANEL_ID = "gtc-chat-panel";
const BUBBLE_SESSION_KEY = "gtc-chat-bubble-seen";
const BUBBLE_DELAY_MS = 20_000;
const BUBBLE_DURATION_MS = 12_000;

export default function SalesAssistantWidget() {
  const { chatOpen: open, setChatOpen: setOpen } = useSiteUi();
  const [showBubble, setShowBubble] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<{ from: "sophie" | "user"; text: string }[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const locale = useLocale();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const tx = (fr: string, en: string) => (locale === "en" ? en : fr);

  // Pas de widget sur /reserver (le formulaire est déjà la conversion).
  const hidden = Boolean(pathname?.includes("/reserver"));

  /* ---- Bulle d'invitation : desktop uniquement, une fois par session ---- */
  useEffect(() => {
    if (hidden || open) return;
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    try {
      if (sessionStorage.getItem(BUBBLE_SESSION_KEY)) return;
    } catch {
      /* stockage indisponible : on affiche quand même une fois */
    }
    const show = setTimeout(() => {
      setShowBubble(true);
      try {
        sessionStorage.setItem(BUBBLE_SESSION_KEY, "1");
      } catch {
        /* noop */
      }
    }, BUBBLE_DELAY_MS);
    return () => clearTimeout(show);
  }, [hidden, open]);

  useEffect(() => {
    if (!showBubble) return;
    const hide = setTimeout(() => setShowBubble(false), BUBBLE_DURATION_MS);
    return () => clearTimeout(hide);
  }, [showBubble]);

  /* ---- Ouverture : masque la bulle, focus sur Fermer, Échap ferme ---- */
  useEffect(() => {
    if (!open) return;
    setShowBubble(false);
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    // Feuille modale plein écran sur mobile : on bloque le défilement de la page.
    const isMobile = !window.matchMedia("(min-width: 1024px)").matches;
    const prevOverflow = document.body.style.overflow;
    if (isMobile) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, setOpen]);

  /* ---- Indicateur de saisie au premier affichage ---- */
  useEffect(() => {
    if (open && messages.length === 0) {
      setIsTyping(true);
      const t = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            from: "sophie",
            text: tx(
              "Bonjour ! Je suis Sophie, votre conseillère GreenTechCycle. Comment puis-je vous aider aujourd'hui ?",
              "Hello! I'm Sophie, your GreenTechCycle advisor. How can I help you today?"
            ),
          },
        ]);
      }, reduceMotion ? 0 : 1200);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  }, [messages, isTyping, reduceMotion]);

  if (hidden) return null;

  const handleSend = () => {
    const trimmed = userMessage.trim();
    if (!trimmed) return;
    setMessages((m) => [...m, { from: "user", text: trimmed }]);
    setUserMessage("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((m) => [
        ...m,
        {
          from: "sophie",
          text: tx(
            "Merci pour votre message ! Un conseiller vous recontactera très rapidement. En attendant, n'hésitez pas à explorer nos actions rapides ci-dessous.",
            "Thanks for your message! An advisor will get back to you shortly. Meanwhile, feel free to explore our quick actions below."
          ),
        },
      ]);
    }, 1500);
  };

  const quickActions = [
    { icon: Calendar, label: tx("Réserver ma démo (30 min)", "Book my demo (30 min)"), href: "/demo" },
    { icon: FileText, label: tx("Demander l'audit gratuit", "Request free audit"), href: "/contact" },
    { icon: LayoutGrid, label: tx("Découvrir nos services", "Discover our services"), href: "/services" },
    { icon: UserRound, label: tx("Parler à un expert", "Talk to an expert"), href: "/contact" },
  ];

  const panelMotion = reduceMotion
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 16 },
        transition: { duration: 0.2, ease: "easeOut" as const },
      };

  return (
    <>
      {/* ============================ Panneau ============================ */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            id={CHAT_PANEL_ID}
            {...panelMotion}
            role="dialog"
            aria-modal="true"
            aria-label={tx("Assistant commercial GreenTechCycle", "GreenTechCycle sales assistant")}
            className="fixed z-[70] inset-0 h-[100dvh] flex flex-col bg-paper lg:inset-auto lg:bottom-24 lg:right-6 lg:h-auto lg:w-[380px] lg:max-h-[70vh] lg:rounded-2xl lg:border lg:border-line lg:shadow-pop overflow-hidden"
          >
            {/* En-tête */}
            <div
              className="flex items-center gap-3 bg-forest px-4 py-3 text-ondark"
              style={{ paddingTop: "max(0.75rem, env(safe-area-inset-top))" }}
            >
              <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border border-ondark-line">
                <Image
                  src="/images/sophie-martin.jpg"
                  alt=""
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-body-sm font-semibold leading-tight">Sophie Martin</p>
                <p className="text-caption text-ondark-muted">
                  {tx("Conseillère GreenTechCycle · En ligne", "GreenTechCycle advisor · Online")}
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-lg text-ondark hover:bg-white/10 focus-visible:outline-leaf-300"
                aria-label={tx("Fermer l'assistant", "Close assistant")}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 pt-4 pb-2 custom-scrollbar lg:max-h-[240px] lg:flex-none" aria-live="polite">
              {messages.map((msg, i) =>
                msg.from === "sophie" ? (
                  <div key={i} className="flex">
                    <div className="max-w-[85%] rounded-xl rounded-tl-sm border border-line bg-cream px-3 py-2 text-body-sm text-ink-700">
                      {msg.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-end">
                    <div className="max-w-[85%] rounded-xl rounded-tr-sm bg-leaf px-3 py-2 text-body-sm text-white">
                      {msg.text}
                    </div>
                  </div>
                )
              )}
              {isTyping && (
                <div className="flex" aria-label={tx("Sophie écrit…", "Sophie is typing…")}>
                  <div className="flex items-center gap-1 rounded-xl rounded-tl-sm border border-line bg-cream px-4 py-3">
                    <span className="typing-dot" />
                    <span className="typing-dot animation-delay-200" />
                    <span className="typing-dot animation-delay-400" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Actions rapides */}
            <div className="px-4 py-3">
              <p className="mb-2 text-eyebrow uppercase text-muted">{tx("Actions rapides", "Quick actions")}</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((a) => {
                  const Icon = a.icon;
                  return (
                    <Link
                      key={a.label}
                      href={a.href}
                      onClick={() => setOpen(false)}
                      className="group flex min-h-[44px] items-center gap-2 rounded-lg border border-line px-3 py-2 text-caption font-medium text-ink-700 transition-colors hover:border-ink/20 hover:text-leaf"
                    >
                      <Icon className="h-4 w-4 flex-shrink-0 text-forest" strokeWidth={1.75} aria-hidden="true" />
                      <span className="leading-tight">{a.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Saisie */}
            <div className="px-4 pb-4 pt-1">
              <div className="flex items-center gap-2 rounded-lg border border-line bg-paper px-3 py-1 focus-within:border-leaf focus-within:ring-2 focus-within:ring-leaf/20">
                <label htmlFor="gtc-chat-input" className="sr-only">
                  {tx("Votre message", "Your message")}
                </label>
                <input
                  id="gtc-chat-input"
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={tx("Écrivez votre message…", "Type your message…")}
                  className="h-10 flex-1 bg-transparent text-body-sm text-ink placeholder:text-muted focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!userMessage.trim()}
                  aria-label={tx("Envoyer", "Send")}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-leaf text-white transition-colors hover:bg-leaf-700 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Contacts */}
            <div
              className="flex items-center justify-between border-t border-line bg-cream px-4 py-3 text-caption"
              style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
            >
              <a href="tel:+33186652210" className="inline-flex min-h-[44px] items-center gap-2 font-medium text-ink-700 hover:text-leaf">
                <Phone className="h-4 w-4" aria-hidden="true" />
                +33 1 86 65 22 10
              </a>
              <a href="mailto:contact@greentechcycle.fr" className="inline-flex min-h-[44px] items-center gap-2 font-medium text-ink-700 hover:text-leaf">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================== Bulle (desktop) ====================== */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            key="bubble"
            initial={reduceMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-[59] hidden lg:block"
          >
            <div className="relative">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="max-w-[240px] rounded-xl rounded-br-sm border border-line bg-paper py-3 pl-4 pr-10 text-left text-body-sm font-medium text-ink shadow-pop transition-colors hover:border-ink/20"
              >
                {tx("Besoin d'aide ? Échangeons !", "Need help? Let's chat!")}
              </button>
              <button
                type="button"
                onClick={() => setShowBubble(false)}
                className="absolute right-1 top-1 flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:bg-cream hover:text-ink"
                aria-label={tx("Fermer l'invitation", "Dismiss")}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============== Bouton compact (desktop ; mobile → MobileActionBar) ============== */}
      {!open && (
        <ChatLauncher className="fixed bottom-6 right-6 z-[60] hidden lg:flex" />
      )}
    </>
  );
}

/**
 * Bouton rond d'ouverture du chat (§6.10). Réutilisé par MobileActionBar.
 */
export function ChatLauncher({ className = "", size = "lg" }: { className?: string; size?: "md" | "lg" }) {
  const { chatOpen, toggleChat } = useSiteUi();
  const locale = useLocale();
  const dims = size === "lg" ? "h-12 w-12" : "h-11 w-11";
  return (
    <button
      type="button"
      onClick={toggleChat}
      aria-label={locale === "en" ? "Open the sales assistant" : "Ouvrir l'assistant commercial"}
      aria-expanded={chatOpen}
      aria-controls={CHAT_PANEL_ID}
      className={`${dims} flex-shrink-0 items-center justify-center rounded-full bg-leaf text-white shadow-pop transition-colors hover:bg-leaf-700 ${className}`}
    >
      <MessageCircle className="h-[22px] w-[22px]" strokeWidth={1.75} aria-hidden="true" />
    </button>
  );
}
