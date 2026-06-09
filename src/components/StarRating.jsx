import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function StarRating({ rating, compact = false }) {
  const numericRating = Number(rating) || 0;
  const score = Math.max(0, Math.min(5, numericRating / 2));
  const iconSize = compact ? "h-3 w-3" : "h-3.5 w-3.5";

  return (
    <div className="flex items-center gap-1" aria-label={`${numericRating.toFixed(1)} out of 10`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.span
          key={star}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: star * 0.035 }}
          className={star <= Math.round(score) ? "text-molten" : "text-white/25"}
        >
          <Star className={`${iconSize} fill-current`} />
        </motion.span>
      ))}
      <span className={`${compact ? "text-[10px]" : "text-xs"} font-bold text-white/85`}>{numericRating.toFixed(1)}</span>
    </div>
  );
}
