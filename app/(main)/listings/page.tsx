import { Suspense } from "react";
import ListingsClient from "./ListingsClient";


type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};


export default function Page({ searchParams }: PageProps) {
  return (
    <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
      <ListingsClient searchParams={searchParams} />
    </Suspense>
  );
}
