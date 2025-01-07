import React from "react";

interface Log {
  detail: string;
  date: string;
}

interface ActivityLogProps {
  logs: Log[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => (
  <div className="w-full h-auto overflow-auto md:bg-boxGray ">
    <h2 className="hidden md:block text-lg p-3 font-semibold pb-4 text-black text-opacity-60 font-mulish bg-white">Activity</h2>
    <div className="space-y-2 p-3 md:border-t-2 border-black border-opacity-10 w-full">
      {logs.map((log: Log, idx: number) => (
        <div key={idx} className="flex justify-between mb-4">
          <div key={idx} className="text-xs w-2/3 pr-12 text-[#1E212A] text-opacity-80">
            {log.detail}
          </div>
          <div key={idx} className="text-xs w-1/3 text-[#1E212A] text-opacity-50">
            {log.date}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ActivityLog;
