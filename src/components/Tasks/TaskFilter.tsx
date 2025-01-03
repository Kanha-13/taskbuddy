import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search_icon.svg"
interface TaskFilterProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  onAddTask: () => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange, onAddTask }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: "",
    endDate: "",
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({ search: value, category, ...dateRange });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCategory(value);
    onFilterChange({ search, category: value, ...dateRange });
  };

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
    onFilterChange({ search, category, startDate, endDate });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const id = e.target.id; // startDate or endDate
    const updatedDateRange = { ...dateRange, [id]: value };
    setDateRange(updatedDateRange);
    onFilterChange({ search, category, ...updatedDateRange });
  };

  return (
    <div className="flex flex-wrap items-center justify-between mb-4 mt-4 gap-4 font-mulish">
      {/* Left Section: Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="font-semibold opacity-60">Filter by: </label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="border border-gray-300 rounded-lg p-2"
          >
            <option value="">All Categories</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            id="startDate"
            type="date"
            value={dateRange.startDate}
            onChange={handleDateChange}
            className="border border-gray-300 rounded-lg p-2"
          />
          <span>-</span>
          <input
            id="endDate"
            type="date"
            value={dateRange.endDate}
            onChange={handleDateChange}
            className="border border-gray-300 rounded-lg p-2"
          />
        </div>
      </div>

      {/* Right Section: Search and Add Task */}
      <div className="flex items-center gap-4 ">
        <div className="rounded-full p-2 flex justify-start items-center border-black border-opacity-[42%] border-2">
          <SearchIcon className="mr-2" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            className="font-semibold flex-1"
          />
        </div>
        <button
          onClick={onAddTask}
          className="bg-secondaryColor text-white rounded-full font-bold px-6 py-2 transition"
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskFilter;
