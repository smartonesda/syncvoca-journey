import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function LoginPage() {
  return <RoutePlaceholderPage page={getPageSpec("/login")} />;
}
