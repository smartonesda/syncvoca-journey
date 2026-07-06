import { RoutePlaceholderPage } from "@/components/layout/route-placeholder-page";
import { getPageSpec } from "@/lib/routes";

export default function AcceptInvitePage() {
  return <RoutePlaceholderPage page={getPageSpec("/accept-invite")} />;
}
