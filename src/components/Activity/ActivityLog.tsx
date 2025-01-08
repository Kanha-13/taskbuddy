import React from "react";
import { Activity } from "../../features/tasks/taskSlice";
import { format } from "date-fns";

interface ActivityLogProps {
  logs: Activity[] | undefined;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  const getTimeStamp = (timeStamp: Activity['timeStamp']) => {
    return `${format(timeStamp, "MMM dd")} at ${format(timeStamp, "HH:mm a")}`
  }
  return (
    <div className="w-full h-auto overflow-auto md:bg-boxGray ">
      <h2 className="hidden md:block text-lg p-3 font-semibold pb-4 text-black text-opacity-60 font-mulish bg-white">Activity</h2>
      <div className="space-y-2 p-3 md:border-t-2 border-black border-opacity-10 w-full">
        {logs && logs.map((log: Activity, idx: number) => (
          <div key={"row-" + idx + "-in-activity-logs"} className="flex justify-between mb-4">
            <div key={"row-data" + idx + "-in-activity-logs"} className="text-xs w-2/3 pr-12 text-[#1E212A] text-opacity-80">
              {log.act}
            </div>
            <div key={"row-timestamp" + idx + "-in-activity-logs"} className="text-xs w-1/3 text-[#1E212A] text-opacity-50">
              {getTimeStamp(log.timeStamp)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityLog;
