import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "../../assets/icons/search_icon.svg";
import DateRangePicker from "../DateRangePicker.tsx";
import { format } from "date-fns";
import Dropdown from "../DropDown.tsx";
import DropIcon from "../DropIcon.tsx";

interface TaskFilterProps {
  onFilterChange: (filters: { search: string; category: string; startDate?: Date | null; endDate?: Date | null }) => void;
  onAddTask: () => void;
}

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onFilterChange, onAddTask }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onFilterChange({ search: value, category, startDate: dateRange.startDate, endDate: dateRange.endDate });
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    onFilterChange({ search, category: newCategory, startDate: dateRange.startDate, endDate: dateRange.endDate });
    setIsCategoryOpen(false)
  };

  const handleDateChange = (range: DateRange) => {
    setDateRange(range);
    onFilterChange({ search, category, startDate: range.startDate, endDate: range.endDate });
  };

  const getCatOptionBg = (cat) => {
    if (category == cat) return "bg-pink-200"
    return "bg-none"
  }

  const handleClearAll = () => {
    onFilterChange({ search: "", category: "", startDate: null, endDate: null });
    setCategory("")
    setDateRange({
      startDate: null,
      endDate: null,
    })
    setSearch("")

  }

  const renderAddBtn = () => <button
    onClick={onAddTask}
    className="bg-secondaryColor ml-auto md:ml-0 outline-none text-white text-sm rounded-full font-semibold px-5 md:px-8 py-3"
  >
    ADD TASK
  </button>
  return (
    <div className="flex flex-wrap items-center justify-between p-4 pb-0 px-4 gap-4 md:gap-0 md:p-0 mb-4 mt-2 md:mt-4 font-mulish">
      <div className="flex items-center gap-4 flex-wrap w-full md:w-1/2">
        <div className="md:hidden w-full flex">
          {renderAddBtn()}
        </div>
        <span className="font-semibold text-sm opacity-60 w-full md:w-max">Filter by: </span>
        <div className="cursor-pointer relative flex justify-center items-center">
          <div
            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
            className="flex justify-center items-center text-xs px-3 md:px-6 border border-black border-opacity-20 rounded-full py-2 bg-white text-gray-700 hover:shadow-md"
          >
            <span className="mr-2">{category || "Category"}</span>
            <DropIcon size="w-3 h-3" color="text-[#979797]" isOpen={isCategoryOpen} />
          </div>
          {
            isCategoryOpen &&
            <Dropdown height="h-auto" width="w-max">
              <div onClick={() => handleCategoryChange("")} className={`text-xs text-left px-2 pr-8 mb-1 font-semibold ${getCatOptionBg("")}  hover:bg-pink-100 rounded-sm`}>All</div>
              <div onClick={() => handleCategoryChange("Work")} className={`text-xs text-left px-2 pr-8 mb-1 font-semibold ${getCatOptionBg("Work")}  hover:bg-pink-100 rounded-sm`}>Work</div>
              <div onClick={() => handleCategoryChange("Personal")} className={`text-xs text-left px-2 pr-8 mb-1 font-semibold ${getCatOptionBg("Personal")}  hover:bg-pink-100 rounded-sm`}>Personal</div>
            </Dropdown>
          }
        </div>

        <div className="cursor-pointer relative">
          <div
            onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
            className="flex justify-center items-center text-xs px-4 border border-black border-opacity-20 rounded-full py-2 bg-white text-gray-700 hover:shadow-md"
          >
            <span className="mr-2">{dateRange.startDate && dateRange.endDate
              ? `${format(dateRange.startDate, "MMM dd")} - ${format(dateRange.endDate, "MMM dd")}`
              : "Due date"}</span>
            <DropIcon size="w-3 h-3" color="text-[#979797]" isOpen={isDatePickerOpen} />
          </div>
          {isDatePickerOpen && (
            <DateRangePicker mode="range" value={dateRange} onChange={handleDateChange} />
          )}
        </div>
        <div onClick={handleClearAll} className="text-xs cursor-pointer text-opacity-70 text-black">Clear All</div>
      </div>

      <div className="flex items-center gap-4 w-full sm:w-1/3">
        <div className="flex m-auto items-center rounded-full p-2 py-3 md:py-2 w-full md:w-1/2 md:mr-0 md:ml-auto border md:border-2 border-black border-opacity-[22%]">
          <SearchIcon className="mr-2" />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearchChange}
            className="border-none placeholder:text-black placeholder:opacity-80 text-opacity-[82%] outline-none text-sm font-semibold flex-1"
          />
        </div>
        <div className="hidden md:block">
          {renderAddBtn()}
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
