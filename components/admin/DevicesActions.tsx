"use client";

import { useState, useRef, useEffect } from "react";

export default function DevicesActions() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setOpen((s) => !s)}
            className="bg-white border border-gray-200 shadow-sm text-gray-700 rounded-xl px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            ⋯
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 z-40 overflow-hidden">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
                Action 1
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm">
                Action 2
              </button>
            </div>
          )}
        </div>

        <button className="bg-white border border-gray-200 shadow-sm text-gray-700 rounded-xl px-4 py-2 hover:bg-gray-50 transition-colors">
          &nbsp;
        </button>
        <button className="bg-white border border-gray-200 shadow-sm text-gray-700 rounded-xl px-4 py-2 hover:bg-gray-50 transition-colors">
          ⇥ CSV
        </button>
      </div>
    </div>
  );
}
