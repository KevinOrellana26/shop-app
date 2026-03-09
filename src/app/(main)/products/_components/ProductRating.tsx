import { Star } from "lucide-react";

type ProductRatingProps = {
  rating: number;
  showNumber?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function ProductRating({
  rating,
  showNumber = true,
  size = "md",
}: ProductRatingProps) {
  const sizeClasses = {
    sm: "size-3",
    md: "size-4",
    lg: "size-5",
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
      {showNumber && (
        <span className="pl-1 text-sm text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
