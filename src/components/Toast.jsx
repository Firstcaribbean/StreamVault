import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

export default function Toast({ message, detail }) {
  return (
    <AnimatePresence>
      {message ? (
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.96 }}
          className="fixed bottom-5 left-1/2 z-[100] flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center gap-3 rounded-lg border border-emerald-300/30 bg-obsidian-soft/95 p-4 text-white shadow-cinema backdrop-blur-2xl sm:left-auto sm:right-5 sm:translate-x-0"
          role="status"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-200">
            <Check className="h-5 w-5" />
          </span>
          <span>
            <span className="block text-sm font-black">{message}</span>
            {detail ? <span className="block text-xs text-white/55">{detail}</span> : null}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
