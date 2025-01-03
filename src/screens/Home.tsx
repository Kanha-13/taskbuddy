import React, { useState } from "react";
import TaskList from "../components/Tasks/TaskList";
import TaskFilter from "../components/Tasks/TaskFilter";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Task 1", category: "Work", dueDate: "2025-01-05" },
    { id: "2", title: "Task 2", category: "Personal", dueDate: "2025-01-06" },
    { id: "3", title: "Task 3", category: "Work", dueDate: "2025-01-07" },
  ]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  const handleFilterChange = (filters: { search: string; category: string }) => {
    let newTasks = tasks;

    if (filters.search) {
      newTasks = newTasks.filter((task) =>
        task.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      newTasks = newTasks.filter((task) => task.category === filters.category);
    }

    setFilteredTasks(newTasks);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
      <TaskFilter onFilterChange={handleFilterChange} />
      <TaskList tasks={filteredTasks} onDragEnd={() => {}} />
    </div>
  );
};

export default Home;
