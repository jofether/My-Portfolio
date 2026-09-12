"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Sparkles, User } from "lucide-react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hi! I'm Jofether's AI assistant. Ask me about his projects, skills, or experience!" }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the newest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", content: data.reply || "Error fetching response." }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "ai", content: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.9 }}
            className="absolute bottom-[4.5rem] right-0 flex h-[30rem] w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/70 shadow-2xl shadow-black/10 backdrop-blur-2xl dark:border-white/10 dark:bg-[#0B0F17]/80 dark:shadow-black/40 sm:w-[23rem]"
          >
            {/* Ambient accent glow inside the header, purely decorative */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 left-1/2 h-32 w-56 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
            />

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-slate-200/70 px-5 py-4 dark:border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-accent-cyan text-white shadow-md shadow-accent/30">
                  <Sparkles className="h-4.5 w-4.5" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight text-foreground">
                    AI Assistant
                  </p>
                  <span className="flex items-center gap-1.5 text-[11px] font-medium text-foreground/50">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    </span>
                    Online
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.08, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="rounded-lg p-1.5 text-foreground/50 transition-colors hover:bg-slate-900/5 hover:text-foreground dark:hover:bg-white/10"
              >
                <X className="h-4.5 w-4.5" />
              </motion.button>
            </div>

            {/* Chat History */}
            <div className="relative flex-1 overflow-y-auto overflow-x-hidden px-4 py-4">
              <div className="flex min-w-0 flex-col gap-3">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex min-w-0 items-end gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full ${
                        msg.role === "user"
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                          : "bg-gradient-to-br from-accent to-accent-cyan text-white"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <User className="h-3.5 w-3.5" />
                      ) : (
                        <Sparkles className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div
                      className={`min-w-0 max-w-[78%] break-words px-4 py-2.5 text-[13.5px] leading-relaxed shadow-sm [overflow-wrap:anywhere] ${
                        msg.role === "user"
                          ? "rounded-2xl rounded-br-md bg-accent font-medium text-white"
                          : "rounded-2xl rounded-bl-md border border-slate-200/70 bg-white/80 text-foreground/90 dark:border-white/10 dark:bg-white/[0.06]"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-end gap-2"
                  >
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-cyan text-white">
                      <Sparkles className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-slate-200/70 bg-white/80 px-4 py-3 dark:border-white/10 dark:bg-white/[0.06]">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/40" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/40 [animation-delay:120ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-foreground/40 [animation-delay:240ms]" />
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSend}
              className="border-t border-slate-200/70 p-3 dark:border-white/10"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/70 px-1.5 py-1.5 shadow-sm transition-colors focus-within:border-accent/50 dark:border-white/10 dark:bg-white/[0.04]">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about my skills..."
                  className="flex-1 bg-transparent px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none"
                  disabled={isLoading}
                />
                <motion.button
                  whileHover={{ scale: input.trim() ? 1.06 : 1 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-sm shadow-accent/30 transition-colors hover:bg-accent-light disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  <Send className="h-3.5 w-3.5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-cyan text-white shadow-lg shadow-accent/40"
        aria-label="Toggle chat"
      >
        {/* Idle pulse ring when closed, to draw the eye without being loud */}
        {!isOpen && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/40" />
        )}
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "close" : "open"}
            initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
            transition={{ duration: 0.2 }}
            className="relative flex items-center justify-center"
          >
            {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}