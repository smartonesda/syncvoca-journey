import type { Route } from "next";
import { redirect } from "next/navigation";

export default function GuruPage() {
  redirect("/dashboard/guru" as Route);
}
