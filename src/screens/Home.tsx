import React, { useEffect, useState } from 'react';
import { Task } from '../features/tasks/taskSlice';
import TaskList from '../components/Tasks/TaskList.tsx';
import TaskFilter from '../components/Tasks/TaskFilter.tsx';
import TaskBoard from '../components/Tasks/TaskBoard.tsx';
import Navbar from '../components/Navbar/Navbar.tsx';
import ViewToggler from '../components/Tasks/TaskViewToggler.tsx';
import TaskForm from '../components/Tasks/TaskForm.tsx';
import MultiRowsCheckModal from '../components/Tasks/MultiRowsCheckModal.tsx';
import useTasks from '../features/tasks/useTask.ts';
import { useAuth } from '../features/auth/useAuth.ts';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const {
    tasks,
    filteredTasks,
    loading,
    error,
    fetchTasks,
    addNewTask,
    updateExistingTask,
    deleteExistingTask,
    filterTasksByParams,
  } = useTasks();
  const { user, status, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'list' | 'board'>('list');
  const [isForm, setIsForm] = useState(false);
  const [checkRows, setCheckRows] = useState<string[]>([]);
  const [isRowsChecked, setIsRowsChecked] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | undefined | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false)

  const handleFilterChange = (filters: { search: string | ""; category: string; startDate?: Date | null; endDate?: Date | null }) => {
    filterTasksByParams(filters);
    if (filters.search || filters.category || filters.endDate || filters.startDate)
      setIsSearching(true);
    else setIsSearching(false)
  };

  const handleAddClick = () => {
    setIsForm(!isForm);
    setActiveTask(null);
  };

  const handleTaskCreate = (newTask: Task) => {
    addNewTask(newTask, user);
    setIsForm(false);
    setActiveTask(null);
  };

  const handleTaskUpdate = (update: Task) => {
    updateExistingTask(update, user);
    setIsForm(false);
    setActiveTask(null);
  };

  const handleOpenTask = (id: string) => {
    setIsForm(true);
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setActiveTask(taskToEdit);
    }
  };

  const handleRowCheck = (id: string) => {
    setCheckRows((prevRows) =>
      prevRows.includes(id) ? prevRows.filter((i) => i !== id) : [...prevRows, id]
    );
    setIsRowsChecked(true);
  };

  const handleMultiChangeStatus = (newStatus: Task['status']) => {
    checkRows.forEach((taskId) => {
      let taskToUpdate = tasks.find((task) => task.id === taskId);
      if (taskToUpdate) {
        updateExistingTask({ ...taskToUpdate, status: newStatus }, user);
      }
    });
    setCheckRows([]);
    setIsRowsChecked(false);
  };

  const handleMultiDeleteRows = () => {
    checkRows.forEach((taskId) => {
      deleteExistingTask(taskId);
    });
    setCheckRows([]);
    setIsRowsChecked(false);
  };

  const handleDeleteRow = (taskId: string) => {
    deleteExistingTask(taskId);
  };

  const handleChangeStatus = (taskId: string, newStatus: 'todo' | 'in-progress' | 'completed' | '') => {
    let taskToUpdate = tasks.find((task) => task.id === taskId);

    if (taskToUpdate) {
      updateExistingTask({ ...taskToUpdate, status: newStatus }, user);
    }
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus: 'todo' | 'in-progress' | 'completed' = destination.droppableId as 'todo' | 'in-progress' | 'completed';

    let taskToUpdate = tasks.find((task) => task.id === draggableId);
    if (taskToUpdate) {
      updateExistingTask({ ...taskToUpdate, status: newStatus }, user);
    }
  };

  const handleLogOut = () => {
    logout();
    navigate("/");
  }

  useEffect(() => {
    filterTasksByParams({ search: '', category: '', startDate: undefined, endDate: undefined });
  }, [tasks]);

  useEffect(() => {
    if (checkRows.length < 1)
      setIsRowsChecked(false);
  }, [checkRows])

  useEffect(() => {
    if (user?.uid)
      fetchTasks(user?.uid);
  }, [fetchTasks, user])

  useEffect(() => {
    if (!user) navigate("/");
  }, [user])

  return (
    <div className="md:p-4 md:px-7">
      <Navbar user={user} onLogout={handleLogOut} />
      <ViewToggler onLogout={handleLogOut} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TaskFilter onAddTask={handleAddClick} onFilterChange={handleFilterChange} />

      {activeTab === 'list' ? (
        <TaskList
          tasks={filteredTasks}
          isSearching={isSearching}
          onCreateNewTask={handleTaskCreate}
          onChangeStatus={handleChangeStatus}
          onClickTask={handleOpenTask}
          onRowCheck={handleRowCheck}
          checkRows={checkRows}
          onDelete={handleDeleteRow}
          onDragEnd={handleOnDragEnd}
        />
      ) : (
        <TaskBoard isSearching={isSearching} onDragEnd={handleOnDragEnd} tasks={filteredTasks} onClickTask={handleOpenTask} onDelete={handleDeleteRow} />
      )}
      {isForm && <TaskForm mode={activeTask ? 'update' : 'create'} taskData={activeTask} onClose={() => setIsForm(false)} onSubmit={handleTaskCreate} onUpdate={handleTaskUpdate} />}
      {isRowsChecked && (
        <MultiRowsCheckModal
          count={checkRows.length}
          onCancel={() => setCheckRows([])}
          onChangeStatus={handleMultiChangeStatus}
          onDelete={handleMultiDeleteRows}
        />
      )}
    </div>
  );
};

export default Home;
