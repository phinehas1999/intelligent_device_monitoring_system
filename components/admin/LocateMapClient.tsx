"use client";
import dynamic from "next/dynamic";

// Dynamically import LocateMap with SSR disabled
const LocateMap = dynamic(() => import("@/components/admin/LocateMap"), {
  ssr: false,
});

export default function LocateMapClient() {
  return <LocateMap />;
}
