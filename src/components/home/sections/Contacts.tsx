"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contacts = () => {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    if (!form.current) return;

    const SERVICE_ID = "service_jrsodpy"; 
    const TEMPLATE_ID = "template_36ccewh";
    const PUBLIC_KEY = "rr3kLnLNvF1y4kYUF";

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then(
        () => {
          setStatus("success");
          setIsSubmitting(false);
          form.current?.reset(); 
          
          setTimeout(() => setStatus("idle"), 5000);
        },
        (error) => {
          console.error("FAILED...", error.text);
          setStatus("error");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
      <h2 className="font-pixel mb-2 text-xl text-white">Modo Co-op</h2>
      <p className="font-terminal text-gray-400 mb-6 text-sm">Inicie uma conexão direta. [Mensagem = ON]</p>

      <div className="neon-border pixel-corners bg-[#150a21]/50 p-6 backdrop-blur-sm">
        <form ref={form} onSubmit={sendEmail} className="space-y-4">
          <input 
            type="text" 
            name="user_name" 
            required
            placeholder="Name" 
            className="w-full bg-transparent border border-purple-800 rounded px-4 py-3 font-terminal text-lg text-white outline-none focus:border-purple-400 transition-colors" 
          />
          <input 
            type="email" 
            name="user_email" 
            required
            placeholder="Email" 
            className="w-full bg-transparent border border-purple-800 rounded px-4 py-3 font-terminal text-lg text-white outline-none focus:border-purple-400 transition-colors" 
          />
          <textarea 
            name="message" 
            required
            placeholder="Message" 
            rows={4} 
            className="w-full bg-transparent border border-purple-800 rounded px-4 py-3 font-terminal text-lg text-white outline-none focus:border-purple-400 transition-colors resize-none"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isSubmitting}
            className={`w-full rounded py-3 font-pixel text-white text-sm shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all ${
              isSubmitting ? "bg-purple-800 cursor-not-allowed" : "bg-[#a855f7] hover:bg-purple-500"
            }`}
          >
            {isSubmitting ? "ENVIANDO..." : "SEND"}
          </motion.button>

          {/* Feedback Visual */}
          {status === "success" && (
            <p className="font-terminal text-green-400 text-lg text-center mt-2">Mensagem enviada com sucesso! Logo retornarei o contato.</p>
          )}
          {status === "error" && (
            <p className="font-terminal text-red-400 text-lg text-center mt-2">Erro ao enviar a conexão. Tente novamente mais tarde.</p>
          )}
        </form>
      </div>

      <div className="flex gap-6 mt-6 font-pixel text-[10px] text-purple-300">
        <a href="https://www.linkedin.com/in/victor-mendes-de-souza-728270234/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
          <span className="w-3 h-3 bg-purple-700 inline-block rounded-sm"></span> LinkedIn
        </a>
        <a href="https://github.com/VictorrMendes" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
          <span className="w-3 h-3 bg-purple-700 inline-block rounded-full"></span> GitHub
        </a>
        <a href="https://wa.me/5531998186472" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
          <span className="w-3 h-3 bg-purple-700 inline-block rotate-45"></span> WhatsApp
        </a>
      </div>
    </motion.div>
  );
};

export default Contacts;