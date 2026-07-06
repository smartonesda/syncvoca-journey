import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function AdminUsersPage() {
  return <RoutePlaceholderPage page={getPageSpec("/admin/users")} />;
}
