import React from "react";
import DashboardCard from "./DashboardCard";
import dashboardCardData from "@/constants/dashboardCardData";

const Stats = ({ stats }: { stats: any }) => {
  const role = "admin";
  const dashboardDatad = dashboardCardData[role] || [];
  return (
    <div className="mt-4 w-full">
      <div className="w-full flex flex-col md:grid md:grid-cols-4 gap-2">
        {dashboardDatad?.map((item: any, index: number) => (
          <DashboardCard
            key={index?.toString()}
            card={item}
            Icon={item?.icon}
            value={stats[item["variable"]]}
          />
        ))}
      </div>
    </div>
  );
};

export default Stats;
