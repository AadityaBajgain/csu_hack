import Link from "next/link";
import React from "react";

const Page=()=> {
  return (
    <main>
      <h1>this is the main page....</h1>
      <p>
        <Link href="/map">Open map</Link>
      </p>
    </main>
  );
}
export default Page;