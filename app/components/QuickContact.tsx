"use client";

import { MessageCircle, Phone } from "lucide-react";

export default function QuickContact() {
  const phone = "2250712867483";
  const whatsappUrl = `https://wa.me/${phone}?text=Bonjour%20NovaFlow%20AI%2C%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20solutions%20d%27automatisation.`;

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col gap-3">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-xl hover:scale-105 transition-all duration-200 group"
        title="Discuter sur WhatsApp"
        aria-label="Discuter sur WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-sm font-semibold pr-1">
          WhatsApp direct
        </span>
      </a>

      <a
        href={`tel:+${phone}`}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-3.5 rounded-full shadow-xl hover:scale-105 transition-all duration-200 group"
        title="Nous appeler"
        aria-label="Nous appeler"
      >
        <Phone className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-sm font-semibold pr-1">
          +225 07 12 86 74 83
        </span>
      </a>
    </div>
  );
}
