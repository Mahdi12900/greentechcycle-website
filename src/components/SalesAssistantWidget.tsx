"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  Calendar,
  FileText,
  Sparkles,
  Send,
  Phone,
  Mail,
  UserRound,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Image from "next/image";

/* ------------------------------------------------------------------ */
/*  Premium Sales Assistant Widget, "Sophie Martin"                  */
/* ------------------------------------------------------------------ */

export default function SalesAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleDismissed, setBubbleDismissed] = useState(false);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<
    { from: "sophie" | "user"; text: string }[]
  >([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const pathname = usePathname();
  const tx = (fr: string, en: string) => (locale === "en" ? en : fr);

  // Hide widget on /reserver page (form already present)
  if (pathname?.includes("/reserver")) {
    return null;
  }

  /* ---- Auto-bubble after 4s ---- */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!open && !bubbleDismissed) setShowBubble(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [open, bubbleDismissed]);

  /* ---- Hide bubble when panel opens ---- */
  useEffect(() => {
    if (open) {
      setShowBubble(false);
      setBubbleDismissed(true);
    }
  }, [open]);

  /* ---- Typing indicator on first open ---- */
  useEffect(() => {
    if (open && messages.length === 0) {
      setIsTyping(true);
      const t = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            from: "sophie",
            text: tx(
              "Bonjour ! 👋 Je suis Sophie, votre conseillère GreenTechCycle. Comment puis-je vous aider aujourd'hui ?",
              "Hello! 👋 I'm Sophie, your GreenTechCycle advisor. How can I help you today?"
            ),
          },
        ]);
      }, 1500);
      return () => clearTimeout(t);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* ---- Scroll messages to bottom ---- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* ---- Send user message ---- */
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
            "Merci pour votre message ! Un conseiller vous recontactera très rapidement. En attendant, n'hésitez pas à explorer nos actions rapides ci-dessous. 😊",
            "Thanks for your message! An advisor will get back to you shortly. Meanwhile, feel free to explore our quick actions below. 😊"
          ),
        },
      ]);
    }, 2000);
  };

  /* ---- Quick actions ---- */
  const quickActions = [
    {
      icon: Calendar,
      label: tx("Demander une démo", "Request a demo"),
      href: "/demo",
    },
    {
      icon: FileText,
      label: tx("Obtenir un devis", "Get a quote"),
      href: "/contact",
    },
    {
      icon: Sparkles,
      label: tx("En savoir plus sur nos services", "Discover our services"),
      href: "/services",
    },
    {
      icon: UserRound,
      label: tx("Parler à un expert", "Talk to an expert"),
      href: "/contact",
    },
  ];

  return (
    <>
      {/* ============================================================ */}
      {/*  Chat Panel                                                  */}
      {/* ============================================================ */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 32, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[60] bottom-24 right-4 lg:bottom-28 lg:right-6 w-[calc(100vw-2rem)] max-w-[380px] overflow-hidden rounded-2xl bg-white shadow-2xl shadow-black/15 ring-1 ring-black/[0.06]"
            role="dialog"
            aria-label={tx(
              "Assistant commercial GreenTechCycle",
              "GreenTechCycle sales assistant"
            )}
          >
            {/* ---- Header ---- */}
            <div className="relative bg-gradient-to-br from-[#047857] via-[#0B4633] to-[#1E40AF] px-5 pt-5 pb-5 text-white">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 rounded-full p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
                aria-label={tx("Fermer", "Close")}
              >
                <X className="h-5 w-5" />
              </button>
              <div className="flex items-center gap-3.5">
                <div className="relative flex-shrink-0">
                  <div className="h-12 w-12 rounded-full overflow-hidden ring-[2.5px] ring-white/40 shadow-lg">
                    <Image
                      src="/images/sophie-martin.jpg"
                      alt="Sophie Martin"
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  {/* Online badge */}
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-[#047857] ring-2 ring-[#047857]" />
                </div>
                <div>
                  <p className="font-semibold text-[15px] leading-tight">
                    Sophie Martin
                  </p>
                  <p className="text-[12px] text-white/70 mt-0.5">
                    {tx(
                      "Conseillère GreenTechCycle",
                      "GreenTechCycle Advisor"
                    )}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="h-2 w-2 rounded-full bg-[#047857] animate-pulse" />
                    <span className="text-[11px] text-emerald-300 font-medium">
                      {tx("En ligne", "Online")}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* ---- Messages area ---- */}
            <div className="px-4 pt-4 pb-2 max-h-[240px] overflow-y-auto custom-scrollbar space-y-3">
              {messages.map((msg, i) =>
                msg.from === "sophie" ? (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-start gap-2.5"
                  >
                    <div className="h-7 w-7 rounded-full overflow-hidden flex-shrink-0 mt-0.5 ring-1 ring-slate-100">
                      <Image
                        src="/images/sophie-martin.jpg"
                        alt="Sophie"
                        width={28}
                        height={28}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-md px-3.5 py-2.5 text-[13px] text-slate-700 leading-relaxed max-w-[85%]">
                      {msg.text}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-end"
                  >
                    <div className="bg-gradient-to-br from-[#047857] to-[#047857] text-white rounded-2xl rounded-tr-md px-3.5 py-2.5 text-[13px] leading-relaxed max-w-[85%]">
                      {msg.text}
                    </div>
                  </motion.div>
                )
              )}

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex items-start gap-2.5"
                  >
                    <div className="h-7 w-7 rounded-full overflow-hidden flex-shrink-0 mt-0.5 ring-1 ring-slate-100">
                      <Image
                        src="/images/sophie-martin.jpg"
                        alt="Sophie"
                        width={28}
                        height={28}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl rounded-tl-md px-4 py-3 flex items-center gap-1">
                      <span className="typing-dot" />
                      <span className="typing-dot animation-delay-200" />
                      <span className="typing-dot animation-delay-400" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* ---- Quick actions ---- */}
            <div className="px-4 py-3 space-y-1.5">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-slate-400 mb-1.5">
                {tx("Actions rapides", "Quick actions")}
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {quickActions.map((a) => {
                  const Icon = a.icon;
                  return (
                    <Link
                      key={a.label}
                      href={a.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-100 text-[12px] font-medium text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-[#047857] transition-all duration-200 group"
                    >
                      <span className="h-7 w-7 flex-shrink-0 rounded-lg bg-emerald-50 flex items-center justify-center text-[#047857] group-hover:bg-emerald-100 transition-colors">
                        <Icon className="h-3.5 w-3.5" />
                      </span>
                      <span className="leading-tight">{a.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* ---- Input area ---- */}
            <div className="px-4 pb-4 pt-2">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:border-emerald-400 transition-all">
                <input
                  type="text"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={tx(
                    "Écrivez votre message…",
                    "Type your message…"
                  )}
                  className="flex-1 bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 outline-none"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!userMessage.trim()}
                  className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#047857] to-[#047857] text-white flex items-center justify-center hover:shadow-md hover:shadow-emerald-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                  <Send className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* ---- Footer contacts ---- */}
            <div className="px-4 py-2.5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between text-[11px]">
              <a
                href="tel:+33186652210"
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#047857] font-medium transition-colors"
              >
                <Phone className="h-3 w-3" />
                +33 1 86 65 22 10
              </a>
              <a
                href="mailto:contact@greentechcycle.fr"
                className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#047857] font-medium transition-colors"
              >
                <Mail className="h-3 w-3" />
                Email
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/*  Auto-bubble "Besoin d'aide ?"                               */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showBubble && !open && (
          <motion.div
            key="autobubble"
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-[59] bottom-[5.5rem] right-4 lg:bottom-[6.5rem] lg:right-6"
          >
            <button
              type="button"
              onClick={() => {
                setShowBubble(false);
                setBubbleDismissed(true);
                setOpen(true);
              }}
              className="relative bg-white shadow-xl shadow-black/10 ring-1 ring-black/[0.06] rounded-2xl rounded-br-md px-4 py-3 text-[13px] text-slate-700 font-medium hover:shadow-2xl transition-shadow cursor-pointer max-w-[220px]"
            >
              <span>
                {tx(
                  "Besoin d'aide ? Échangeons ! 💬",
                  "Need help? Let's chat! 💬"
                )}
              </span>
              {/* Close mini button */}
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowBubble(false);
                  setBubbleDismissed(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.stopPropagation();
                    setShowBubble(false);
                    setBubbleDismissed(true);
                  }
                }}
                className="absolute -top-2 -left-2 h-5 w-5 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center transition-colors"
                aria-label={tx("Fermer", "Close")}
              >
                <X className="h-3 w-3 text-slate-600" />
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ============================================================ */}
      {/*  Floating Avatar Button                                      */}
      {/* ============================================================ */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={tx(
          "Ouvrir l'assistant commercial",
          "Open sales assistant"
        )}
        aria-expanded={open}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 18,
        }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        className="fixed z-[60] bottom-4 right-4 lg:bottom-6 lg:right-6 h-[60px] w-[60px] rounded-full shadow-xl shadow-emerald-900/25 ring-[3px] ring-white flex items-center justify-center overflow-hidden group"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1rem)" }}
      >
        {/* Photo avatar */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <Image
            src="/images/sophie-martin.jpg"
            alt="Sophie Martin"
            width={60}
            height={60}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Dark overlay when open */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#047857]/80 flex items-center justify-center"
              >
                <X className="h-6 w-6 text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Online badge */}
        {!open && (
          <span className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-[#047857] ring-[2.5px] ring-white z-10">
            <span className="absolute inset-0 rounded-full bg-[#047857] animate-ping opacity-60" />
          </span>
        )}
      </motion.button>
    </>
  );
}
