import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  value?: string | number;
};

export default function StatCard({ icon, title, value }: Props) {
  return (
    <div className="bg-accent text-primary rounded-2xl shadow-[0_8px_0_rgba(0,0,0,0.06)] p-5 relative overflow-hidden min-h-[140px]">
      <div className="flex items-center gap-2">
        <div className="text-2xl text-primary flex items-center transform scale-125">
          {icon}
        </div>
        <div className="text-lg font-medium">{title}</div>
      </div>

      <div className="absolute right-4 bottom-4 text-2xl font-semibold">
        {value ?? "--"}
      </div>
    </div>
  );
}
