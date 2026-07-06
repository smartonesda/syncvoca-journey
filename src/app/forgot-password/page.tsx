import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function ForgotPasswordPage() {
  return <RoutePlaceholderPage page={getPageSpec("/forgot-password")} />;
}
