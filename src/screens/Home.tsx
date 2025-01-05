import React, { useState } from "react";
import TaskList from "../components/Tasks/TaskList.tsx";
import TaskFilter from "../components/Tasks/TaskFilter.tsx";
import TaskBoard from "../components/Tasks/TaskBoard.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import ViewToggler from "../components/Tasks/TaskViewToggler.tsx";
import TaskForm from "../components/Tasks/TaskForm.tsx";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed";
  category: string;
  dueDate: string;
  files?: string[];
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Task 1", status: "todo", category: "Work", dueDate: "2025-01-05" },
    { id: "2", title: "Task 2", status: "in-progress", category: "Personal", dueDate: "2025-01-06" },
    { id: "3", title: "Task 3", status: "completed", category: "Work", dueDate: "2025-01-07" },
    { id: "4", title: "Task 4", status: "completed", category: "Work", dueDate: "2025-01-07" },
  ]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [activeTab, setActiveTab] = useState<"list" | "board">("list");
  const [activeTask, setActiveTask] = useState<Task>()
  const [isForm, setIsForm] = useState<Boolean>(false)

  const handleFilterChange = (filters: {
    search: string;
    category: string;
    startDate?: Date | null;
    endDate?: Date | null;
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
        (task) => new Date(task.dueDate).setHours(0, 0, 0, 0) >= new Date(filters.startDate!).setHours(0, 0, 0, 0)
      );
    }

    if (filters.endDate) {
      newTasks = newTasks.filter(
        (task) => new Date(task.dueDate).setHours(0, 0, 0, 0) <= new Date(filters.endDate!).setHours(0, 0, 0, 0)
      );
    }

    setFilteredTasks(newTasks);
  };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTasks(items);
  }

  const handleAddClick = () => {
    setIsForm(!isForm)
    setActiveTask(() => undefined)
  }

  const handleOpenTask = (id: String) => {
    setIsForm(true)
    let currentTask = tasks.filter((task) => task.id == id);
    if (currentTask[0])
      setActiveTask(currentTask[0]);
  }


  return (
    <div className="p-4 pt-12 px-7">
      <Navbar />
      <ViewToggler activeTab={activeTab} setActiveTab={setActiveTab} />

      <TaskFilter onAddTask={handleAddClick} onFilterChange={handleFilterChange} />

      {activeTab === "list" ? (
        <TaskList onClickTask={handleOpenTask} tasks={filteredTasks} onDragEnd={() => { }} />
      ) : (
        <TaskBoard onDragEnd={handleOnDragEnd} tasks={filteredTasks} />
      )}
      {isForm ? <TaskForm mode={activeTask?.id ? "update" : "create"} taskData={activeTask} onClose={() => setIsForm(false)} onSubmit={() => { }} /> : <></>}
    </div>
  );
};

export default Home;
