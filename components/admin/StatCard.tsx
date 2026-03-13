import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  value?: string | number;
};

export default function StatCard({ icon, title, value }: Props) {
  return (
    <div className="bg-white text-gray-900 rounded-xl shadow-sm border border-gray-100 p-5 relative overflow-hidden min-h-32">
      <div className="flex items-center gap-3">
        <div className="text-2xl flex items-center justify-center bg-gray-50 rounded-lg p-2">
          {icon}
        </div>
        <div className="text-sm font-medium text-gray-500">{title}</div>
      </div>

      <div className="absolute right-5 bottom-5 text-2xl font-bold text-gray-900">
        {value ?? "--"}
      </div>
    </div>
  );
}
