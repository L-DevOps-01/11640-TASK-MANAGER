import React, { useRef, useState } from "react";
import "./column-cards.scss";
import { Task, CardTask } from "../card-task/card-task";
import { useDroppable } from "@dnd-kit/core";
interface ColumnCardsProps {
  id: number;

  title: string;
  tasks: Task[];
  onAddTask: (title: string, storyPoints: number) => void;
}
const ColumnCards: React.FC<ColumnCardsProps> = ({
  id,
  title,
  tasks = [],
  onAddTask,
}) => {
  const [displayModal, SetDisplayModal] = useState(false);
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputStoryPointsRef = useRef<HTMLInputElement>(null);

  const { setNodeRef, isOver } = useDroppable({
    id,
  });
  const style = {
    backgroundColor: isOver ? "#e0e0e0" : undefined,
  };
  const addTask = () => {
    const title = inputTitleRef?.current?.value || "";
    const storyPoints = inputStoryPointsRef?.current?.value;

    onAddTask(title, Number(storyPoints));
    SetDisplayModal(!displayModal);
  };

  return (
    <>
      <section ref={setNodeRef} style={style} className="column">
        <button onClick={() => SetDisplayModal(!displayModal)}>
          Añadir task
        </button>

        <p className="column__title">{title}</p>
        <div className="tasks">
          {tasks.map((task) => (
            <CardTask key={task.id} {...task} />
          ))}
        </div>
      </section>

      {displayModal ? (
        <div className="modal-overlay">
          <div className="modal">
            <button
              onClick={() => SetDisplayModal(!displayModal)}
              className="x"
            >
              X
            </button>
            <form
              className="fields"
              onSubmit={(e) => {
                e.preventDefault();
                addTask();
              }}
            >
              <div className="field">
                <label htmlFor="title">Titulo</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  ref={inputTitleRef}
                />
              </div>
              <div className="field">
                <label htmlFor="storyPoints">Story Points</label>
                <input
                  required
                  type="number"
                  name="storyPoints"
                  id="storyPoints"
                  ref={inputStoryPointsRef}
                />
              </div>

              <button type="submit">Crear task</button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default ColumnCards;
