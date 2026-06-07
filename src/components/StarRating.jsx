import { motion } from "framer-motion";

export default function StarRating({ rating, compact = false }) {
  const score = Math.max(0, Math.min(5, rating / 2));

  return (
    <div className="flex items-center gap-1" aria-label={`${rating.toFixed(1)} out of 10`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: star * 0.035 }}
          className={`${compact ? "text-[10px]" : "text-xs"} ${star <= Math.round(score) ? "text-molten" : "text-white/25"}`}
        >
          ★
        </motion.span>
      ))}
      <span className={`${compact ? "text-[10px]" : "text-xs"} font-bold text-white/85`}>{rating.toFixed(1)}</span>
    </div>
  );
}
