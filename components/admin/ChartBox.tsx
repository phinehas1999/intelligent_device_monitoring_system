export default function ChartBox({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 h-40 md:h-48 p-4">
      {children ?? null}
    </div>
  );
}
