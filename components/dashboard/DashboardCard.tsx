import Link from "next/link";
import React from "react";

const DashboardCard = ({
  card,
  Icon,
  value,
}: {
  card: any;
  Icon: any;
  value: any;
}) => {
  return (
    <Link
      className="w-full bg-white rounded-xl py-4 hover:scale-[1.03] cursor-pointer"
      href={card?.route}
    >
      <div className="px-4 flex flex-row items-center justify-between">
        <p className="text-sm text-black opacity-60 font-bold">{card?.title}</p>
        <div className={`${card?.iconBg} p-2 rounded`}>
          <Icon size={25} className={card?.textColor} />
        </div>
      </div>
      <div className={`border-l-4 mt-2 w-full px-3 ${card?.borderColor}`}>
        <p className={`text-3xl font-bold ${card?.textColor}`}>{value}</p>
      </div>
      <p className={`px-4 mt-2 text-xs ${card?.textColor}`}>
        Since{" "}
        <span className="text-black opacity-40">
          {new Date().toDateString()}
        </span>
      </p>
    </Link>
  );
};

export default DashboardCard;
