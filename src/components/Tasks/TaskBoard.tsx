import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Task {
  id: string;
  title: string;
  category: string;
  dueDate: string;
}

interface TaskBoardProps {
  tasks: Task[];
  onDragEnd: (result: any) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onDragEnd }) => {
  const categories = ["Work", "Personal"];

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-2 gap-4">
        {categories.map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="bg-gray-100 p-4 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-semibold mb-2">{category}</h2>
                {tasks
                  .filter((task) => task.category === category)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white p-4 rounded-lg shadow-md mb-2"
                        >
                          <h3 className="text-md font-bold">{task.title}</h3>
                          <p className="text-sm text-gray-500">{task.dueDate}</p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
