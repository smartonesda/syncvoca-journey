import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function AdminAuditPage() {
  return <RoutePlaceholderPage page={getPageSpec("/admin/audit")} />;
}
