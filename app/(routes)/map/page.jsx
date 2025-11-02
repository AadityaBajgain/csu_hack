import MapPage from "@/components/MapPage";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <MapPage />
    </Suspense>
  );
};
export default Page;
