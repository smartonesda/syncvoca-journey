import type { Route } from "next";
import { redirect } from "next/navigation";

export default function DudiPlacementPage() {
  redirect("/dashboard/dudi/placement" as Route);
}
