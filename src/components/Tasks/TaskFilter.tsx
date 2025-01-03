import React from "react";

interface TaskFilterProps {
  onFilterChange: (filters: { search: string; category: string }) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ search: e.target.value, category: "" });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ search: "", category: e.target.value });
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <input
        type="text"
        placeholder="Search tasks..."
        onChange={handleSearchChange}
        className="border border-gray-300 rounded-lg p-2 flex-1"
      />
      <select
        onChange={handleCategoryChange}
        className="border border-gray-300 rounded-lg p-2"
      >
        <option value="">All Categories</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
    </div>
  );
};

export default TaskFilter;
