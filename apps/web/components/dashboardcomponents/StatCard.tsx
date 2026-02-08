import { Card, CardContent } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";

interface StatCardProps {
  label: string;
  value: number;
  variant: "today" | "pending" | "completed" | "backlog" | "cancelled";
}

const variantStyles: Record<StatCardProps["variant"], string> = {
  today: "text-blue-600",
  pending: "text-yellow-600",
  completed: "text-green-600",
  backlog: "text-gray-700",
  cancelled: "text-red-600",
};

export default function StatCard({ label, value, variant }: StatCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow rounded-lg border border-gray-100">
      <CardContent className="flex flex-col gap-2 p-6">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span
          className={cn(
            "text-4xl font-bold tracking-tight",
            variantStyles[variant]
          )}
        >
          {value}
        </span>
      </CardContent>
    </Card>
  );
}
