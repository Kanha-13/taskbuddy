import React from "react";

const ActivityLog: React.FC<{ logs: string[] }> = ({ logs }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
    <h2 className="text-lg font-semibold mb-2">Activity Log</h2>
    <ul className="space-y-2">
      {logs.map((log, idx) => (
        <li key={idx} className="text-sm text-gray-600">
          {log}
        </li>
      ))}
    </ul>
  </div>
);

export default ActivityLog;
