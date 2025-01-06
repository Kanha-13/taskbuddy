import React, { useEffect, useState } from "react";
import TaskList from "../components/Tasks/TaskList.tsx";
import TaskFilter from "../components/Tasks/TaskFilter.tsx";
import TaskBoard from "../components/Tasks/TaskBoard.tsx";
import Navbar from "../components/Navbar/Navbar.tsx";
import ViewToggler from "../components/Tasks/TaskViewToggler.tsx";
import TaskForm from "../components/Tasks/TaskForm.tsx";
import MultiRowsCheckModal from "../components/Tasks/MultiRowsCheckModal.tsx";

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
    { id: "5", title: "Task 5", status: "completed", category: "Work", dueDate: "2025-01-07" },
    { id: "6", title: "Task 6", status: "completed", category: "Work", dueDate: "2025-01-07" },
  ]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const [activeTab, setActiveTab] = useState<"list" | "board">("list");
  const [activeTask, setActiveTask] = useState<Task>();
  const [isForm, setIsForm] = useState<Boolean>(false);
  const [isRowsChecked, setIsRowsChecked] = useState<Boolean>(false);
  const [checkRows, setCheckRows] = useState<string[]>([]);

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

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;
    const items = Array.from(tasks);

    setTasks(items.filter((task, index) => {
      if (task.id == result.draggableId) {
        task.status = result.destination.droppableId;
      }
      return task;
    }));
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

  const handleRowCheck = (id: string) => {
    setCheckRows((prevRows) =>
      prevRows.includes(id)
        ? prevRows.filter((i) => i !== id)
        : [...prevRows, id]
    )
    setIsRowsChecked(true);
  }

  const handleMultiChangeStatus = (newStatus) => {
    const newTaskList = tasks.filter((task) => checkRows.includes(task.id) ? { ...task, status: newStatus } : task)
    setTasks(newTaskList);
  }

  const handleMultiDeleteRows = () => {
    const newTaskList = tasks.filter((task) => !checkRows.includes(task.id))
    setTasks(newTaskList);
  }

  const handleDeleteRow = (taskId: string) => {
    const newTaskList = tasks.filter((task) => !(taskId == task.id))
    setTasks(newTaskList);

  }
  const handleChangeStatus = (taskId: string, newStatus: "todo" | "in-progress" | "completed") => {
    const newTaskList = tasks.map((task) => taskId == task.id ? { ...task, status: newStatus } : task)
    setTasks(newTaskList);
  }

  useEffect(() => {
    setFilteredTasks(tasks)
  }, [tasks])

  useEffect(() => {
    if (checkRows.length < 1)
      setIsRowsChecked(false);
  }, [checkRows])

  return (
    <div className="p-4 px-7">
      <Navbar />
      <ViewToggler activeTab={activeTab} setActiveTab={setActiveTab} />

      <TaskFilter onAddTask={handleAddClick} onFilterChange={handleFilterChange} />

      {activeTab === "list" ? (
        <TaskList onChangeStatus={handleChangeStatus} checkRows={checkRows} onClickTask={handleOpenTask} onRowCheck={handleRowCheck} tasks={filteredTasks} onDragEnd={handleOnDragEnd} onDelete={handleDeleteRow} />
      ) : (
        <TaskBoard onDragEnd={handleOnDragEnd} tasks={filteredTasks} onClickTask={handleOpenTask} onDelete={handleDeleteRow} />
      )}
      {isForm ? <TaskForm mode={activeTask?.id ? "update" : "create"} taskData={activeTask} onClose={() => setIsForm(false)} onSubmit={() => { }} /> : <></>}
      {isRowsChecked ? <MultiRowsCheckModal count={checkRows.length} onCancel={() => setCheckRows([])} onChangeStatus={handleMultiChangeStatus} onDelete={handleMultiDeleteRows} /> : <></>}
    </div>
  );
};

export default Home;
