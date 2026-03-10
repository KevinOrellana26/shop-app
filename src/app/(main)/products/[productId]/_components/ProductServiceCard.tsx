import { Card, CardContent } from "@/src/components/ui/card";
import { LucideIcon } from "lucide-react";

type ProductServiceCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};
export default function ProductServiceCard({
  icon: Icon,
  title,
  description,
}: ProductServiceCardProps) {
  return (
    <Card className="w-full py-2">
      <CardContent className="flex items-center gap-3 p-4">
        <Icon className="size-6 text-muted-foreground shrink-0 hidden md:block" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground leading-tight">
            {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
