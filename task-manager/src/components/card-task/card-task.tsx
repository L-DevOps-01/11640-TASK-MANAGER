import React from "react";
import "./card-task.scss";
import { useDraggable } from "@dnd-kit/core";
export interface Task {
  id: number;
  title: string;
  storyPoints: number;
  state: string;
}
export const CardTask: React.FC<Task> = ({ id, title, storyPoints, state }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="task"
    >
      <div className="task__title">ID: {id}</div>
      <div className="task__title">Título: {title}</div>
      <div className="task__story_points">Story points: {storyPoints}</div>
      <div className="task__story_points">Estado: {state}</div>
    </div>
  );
};
export default CardTask;
