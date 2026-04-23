import { Suspense } from "react";
import ListingsClient from "./ListingsClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <ListingsClient />
    </Suspense>
  );
}
