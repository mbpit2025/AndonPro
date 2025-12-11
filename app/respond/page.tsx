import { Suspense } from "react";
import RespondPageClient from "./RespondPageClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RespondPageClient />
    </Suspense>
  );
}
