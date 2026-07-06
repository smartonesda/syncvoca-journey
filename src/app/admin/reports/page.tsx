import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function AdminReportsPage() {
  return <RoutePlaceholderPage page={getPageSpec("/admin/reports")} />;
}
