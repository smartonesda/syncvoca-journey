import type { Route } from "next";
import { redirect } from "next/navigation";

export default function DudiPage() {
  redirect("/dashboard/dudi" as Route);
}
