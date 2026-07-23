import { useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Calendar,
  Sparkles,
  Phone,
  ShieldCheck,
} from "lucide-react";
import logoImage from "../assets/logo.png";

const QUICK_ACTIONS = [
  { icon: Calendar, label: "Book Appointment" },
  { icon: Sparkles, label: "Our Services" },
  { icon: Phone, label: "Contact Us" },
];

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="chat-widget">
      {/* Chat panel */}
      <div
        className={`chat-widget__panel ${isOpen ? "chat-widget__panel--open" : ""}`}
        role="dialog"
        aria-label="Support chat"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="chat-widget__header">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={logoImage}
                alt=""
                className="h-10 w-10 rounded-xl object-contain bg-white p-1"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-brand-primary bg-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Insight Support</p>
              <p className="flex items-center gap-1.5 text-[11px] text-white/75">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Typically replies within an hour
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages area */}
        <div className="chat-widget__body">
          <p className="chat-widget__timestamp">Today</p>

          <div className="chat-widget__message chat-widget__message--bot">
            <div className="chat-widget__avatar">
              <img src={logoImage} alt="" className="h-full w-full object-contain p-0.5" />
            </div>
            <div className="chat-widget__bubble chat-widget__bubble--bot">
              <p className="text-sm leading-relaxed text-brand-charcoal">
                Hello! Welcome to{" "}
                <strong className="font-semibold">Insight Counseling</strong>.
                How can we help you today?
              </p>
              <span className="mt-1.5 flex items-center gap-1 text-[10px] text-brand-text">
                <ShieldCheck className="h-3 w-3 text-brand-primary" />
                Confidential & secure
              </span>
            </div>
          </div>

          <div className="chat-widget__message chat-widget__message--bot">
            <div className="chat-widget__avatar">
              <img src={logoImage} alt="" className="h-full w-full object-contain p-0.5" />
            </div>
            <div className="chat-widget__bubble chat-widget__bubble--bot">
              <p className="text-sm leading-relaxed text-brand-charcoal">
                You can ask about our services, book a consultation, or speak
                with our team. We're here to support your mental wellness
                journey.
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="chat-widget__actions">
            {QUICK_ACTIONS.map(({ icon: Icon, label }) => (
              <button
                key={label}
                type="button"
                className="chat-widget__action-btn"
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Input area (UI only) */}
        <div className="chat-widget__footer">
          <div className="chat-widget__input-wrap">
            <input
              type="text"
              placeholder="Type your message…"
              className="chat-widget__input"
              readOnly
              aria-label="Message input"
            />
            <button
              type="button"
              className="chat-widget__send-btn"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-brand-text/60">
            Powered by Insight Counseling
          </p>
        </div>
      </div>

      {/* Floating bubble button */}
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={`chat-widget__bubble-btn ${isOpen ? "chat-widget__bubble-btn--open" : ""}`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        aria-expanded={isOpen}
      >
        <span className="chat-widget__bubble-ring" aria-hidden="true" />
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <>
            <MessageCircle className="h-6 w-6 text-white" />
            <span className="chat-widget__bubble-badge" aria-hidden="true">
              1
            </span>
          </>
        )}
      </button>
    </div>
  );
}
