import React from "react";
import MapComp from "@/components/MapComp";
const page = () => {
  return (
    <>
      <div className="mx-auto mt-5 w-[95vw] h-fit flex justify-between gap-10">
        <div className="flex flex-col gap-10 justify-center items-center">
          <h1>Other stuffs on this side</h1>
          <div className="flex flex-wrap justify-between items-center gap-5">
            <div className="w-[18vw] h-[30vh] bg-red-300 rounded-md"></div>
            <div className="w-[18vw] h-[30vh] bg-red-300 rounded-md"></div>
            <div className="w-[18vw] h-[30vh] bg-red-300 rounded-md"></div>
            <div className="w-[18vw] h-[30vh] bg-red-300 rounded-md"></div>
          </div>
        </div>

        <div className="w-[40vw] h-[60vh] flex flex-col items-center rounded-md gap-10">
          <h2>Map showing locations this side and fixed</h2>
          <div className="w-[30vw] h-[40vh] border-none rounded-2xl">
            <MapComp />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
