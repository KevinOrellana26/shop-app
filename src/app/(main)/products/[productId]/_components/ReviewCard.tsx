import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import ProductRating from "../../_components/ProductRating";

type ReviewCardProps = {
  rating: number;
  comment: string;
  reviewerName: string;
  date: Date;
};

export function ReviewCard({
  rating,
  comment,
  reviewerName,
  date,
}: ReviewCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="transition-all duration-300 hover:scale-101 hover:shadow-lg py-4 gap-1 w-full max-h-full">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="font-semibold">{reviewerName}</h4>
            <p className="text-sm text-muted-foreground">{formattedDate}</p>
          </div>
          <ProductRating rating={rating} showNumber={false} size="sm" />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {comment}
        </p>
      </CardContent>
    </Card>
  );
}
