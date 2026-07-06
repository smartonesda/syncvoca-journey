import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function AdminOverviewPage() {
  return <RoutePlaceholderPage page={getPageSpec("/admin/overview")} />;
}
