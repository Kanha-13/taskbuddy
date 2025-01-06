import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask, filterTasks, deleteTask, addTask, updateTask } from '../features/tasks/taskSlice';
import TaskList from '../components/Tasks/TaskList';
import TaskFilter from '../components/Tasks/TaskFilter';
import TaskBoard from '../components/Tasks/TaskBoard';
import Navbar from '../components/Navbar/Navbar';
import ViewToggler from '../components/Tasks/TaskViewToggler';
import TaskForm from '../components/Tasks/TaskForm';
import MultiRowsCheckModal from '../components/Tasks/MultiRowsCheckModal';
import { RootState } from '../store/store';

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "completed" | "";
  category: "Work" | "Personal" | "";
  dueDate: Date | string | null;
  files?: string[];
  description?: string;
}

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const filteredTasks = useSelector((state: RootState) => state.tasks.filteredTasks);

  const [activeTab, setActiveTab] = useState<'list' | 'board'>('list');
  const [isForm, setIsForm] = useState(false);
  const [checkRows, setCheckRows] = useState<string[]>([]);
  const [isRowsChecked, setIsRowsChecked] = useState(false);
  const [activeTask, setActiveTask] = useState<Task | undefined | null>(null);

  const handleFilterChange = (filters: { search: string; category: string; startDate?: Date | null; endDate?: Date | null }) => {
    dispatch(filterTasks(filters));
  };

  const handleAddClick = () => {
    setIsForm(!isForm);
    setActiveTask(null);
  };

  const handleTaskCreate = (newTask: Task) => {
    dispatch(addTask(newTask));
    setIsForm(false);
    setActiveTask(null);
  };

  const handleTaskUpdate = (update: Task) => {
    dispatch(updateTask(update));
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

  const handleMultiChangeStatus = (newStatus: 'todo' | 'in-progress' | 'completed') => {
    checkRows.forEach((taskId) => {
      dispatch(moveTask({ taskId, newStatus }));
    });
    setCheckRows([]);
    setIsRowsChecked(false);
  };

  const handleMultiDeleteRows = () => {
    checkRows.forEach((taskId) => {
      dispatch(deleteTask(taskId));
    });
    setCheckRows([]);
    setIsRowsChecked(false);
  };

  const handleDeleteRow = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const handleChangeStatus = (taskId: string, newStatus: 'todo' | 'in-progress' | 'completed' | '') => {
    dispatch(moveTask({ taskId, newStatus }));
  };

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const { draggableId, destination } = result;
    const newStatus: 'todo' | 'in-progress' | 'completed' = destination.droppableId as 'todo' | 'in-progress' | 'completed';

    dispatch(moveTask({ taskId: draggableId, newStatus }));
  };

  useEffect(() => {
    dispatch(filterTasks({ search: '', category: '', startDate: undefined, endDate: undefined }));
  }, [dispatch, tasks]);

  useEffect(() => {
    if (checkRows.length < 1)
      setIsRowsChecked(false);
  }, [checkRows])

  return (
    <div className="p-4 px-7">
      <Navbar />
      <ViewToggler activeTab={activeTab} setActiveTab={setActiveTab} />
      <TaskFilter onAddTask={handleAddClick} onFilterChange={handleFilterChange} />

      {activeTab === 'list' ? (
        <TaskList
          tasks={filteredTasks}
          onCreateNewTask={handleTaskCreate}
          onChangeStatus={handleChangeStatus}
          onClickTask={handleOpenTask}
          onRowCheck={handleRowCheck}
          checkRows={checkRows}
          onDelete={handleDeleteRow}
          onDragEnd={handleOnDragEnd}
        />
      ) : (
        <TaskBoard onDragEnd={handleOnDragEnd} tasks={filteredTasks} onClickTask={handleOpenTask} onDelete={handleDeleteRow} />
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
