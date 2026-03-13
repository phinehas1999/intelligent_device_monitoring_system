import StatCard from "@/components/admin/StatCard";
import ChartBox from "@/components/admin/ChartBox";
import { ArrowUpRight, TrendingUp, Users, DollarSign } from "lucide-react";

export default function SubscriptionsPage() {
  const plans = [
    {
      name: "Standard",
      tenants: 12,
      price: "$299/mo",
      features: "Up to 500 devices",
    },
    {
      name: "Professional",
      tenants: 18,
      price: "$899/mo",
      features: "Up to 2,000 devices, API Access",
    },
    {
      name: "Enterprise",
      tenants: 12,
      price: "Custom",
      features: "Unlimited devices, SLA, Dedicated IP",
    },
  ];

  return (
    <div className="w-full max-w-full">
      <h1 className="text-2xl font-bold mb-4">Subscription Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={<DollarSign size={20} className="text-green-600" />}
          title="Monthly Recurring Revenue"
          value="$45,200"
        />
        <StatCard
          icon={<ArrowUpRight size={20} className="text-blue-600" />}
          title="Net Revenue Retention"
          value="104.2%"
        />
        <StatCard
          icon={<TrendingUp size={20} className="text-purple-600" />}
          title="Avg Revenue Per Tenant"
          value="$1,076"
        />
      </div>

      <h2 className="text-lg font-semibold mb-4 text-primary">Active Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative overflow-hidden group hover:border-[#f3ebdb] transition-colors"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-primary">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.features}</p>
              </div>
              <div className="text-right">
                <div className="font-semibold text-lg">{plan.price}</div>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center gap-2">
              <Users size={16} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                {plan.tenants} Active Tenants
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-primary">
            Subscription Growth
          </h2>
          <ChartBox>
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              [MRR Trend Chart Placeholder]
            </div>
          </ChartBox>
        </div>
      </div>
    </div>
  );
}
