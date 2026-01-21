import { MessageCircle } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/13102272654"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed md:bottom-7 md:left-7 bottom-5 left-5 z-50  border border-green-600 bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg md:rounded-2xl shadow-lg transition-all duration-300"
    >
      <FaWhatsapp className="w-6 h-6 text-green-100" />
    </a>
  );
}
