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
            className="bg-accent text-primary rounded-full px-4 py-2"
          >
            ⋯
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-40 overflow-hidden">
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                Action 1
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-50">
                Action 2
              </button>
            </div>
          )}
        </div>

        <button className="bg-accent text-primary rounded-full px-4 py-2">
          &nbsp;
        </button>
        <button className="bg-accent text-primary rounded-full px-4 py-2">
          ⇥ CSV
        </button>
      </div>
    </div>
  );
}
