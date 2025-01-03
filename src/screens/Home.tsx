import React, { useState } from "react";
import TaskList from "../components/Tasks/TaskList.tsx";
import TaskFilter from "../components/Tasks/TaskFilter.tsx";
import TaskBoard from "../components/Tasks/TaskBoard.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import ViewToggler from "../components/Tasks/TaskViewToggler.tsx";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Task 1", status: "todo", category: "Work", dueDate: "2025-01-05" },
    { id: "2", title: "Task 2", status: "in-progress", category: "Personal", dueDate: "2025-01-06" },
    { id: "3", title: "Task 3", status: "completed", category: "Work", dueDate: "2025-01-07" },
    { id: "4", title: "Task 4", status: "completed", category: "Work", dueDate: "2025-01-07" },
  ]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [activeTab, setActiveTab] = useState<"list" | "board">("list");

  const handleFilterChange = (filters: {
    search: string;
    category: string;
    startDate?: string;
    endDate?: string;
  }) => {
    let newTasks = tasks;

    if (filters.search) {
      newTasks = newTasks.filter((task) =>
        task.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      newTasks = newTasks.filter((task) => task.category === filters.category);
    }

    if (filters.startDate) {
      newTasks = newTasks.filter(
        (task) => new Date(task.dueDate) >= new Date(filters.startDate!)
      );
    }

    if (filters.endDate) {
      newTasks = newTasks.filter(
        (task) => new Date(task.dueDate) <= new Date(filters.endDate!)
      );
    }

    setFilteredTasks(newTasks);
  };

  return (
    <div className="p-4">
      <Navbar />
      <ViewToggler activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Task Filter */}
      <TaskFilter onFilterChange={handleFilterChange} />

      {/* Conditional Rendering Based on Active Tab */}
      {activeTab === "list" ? (
        <TaskList tasks={filteredTasks} onDragEnd={() => { }} />
      ) : (
        <TaskBoard tasks={filteredTasks} />
      )}
    </div>
  );
};

export default Home;
