import React, { useEffect, useRef, useState } from "react";
import ColumnCards from "../../components/column-cards/column-cards";
import { Task } from "../../components/card-task/card-task";
import { DndContext, DragEndEvent } from "@dnd-kit/core"; // Importamos DndContext y el tipo DragEndEvent
import "./home.scss";

interface propsColumnCard {
  id: number;
  title: string;
  tasks: Task[];
}
const Home: React.FC = () => {
  const [columns, setColumns] = useState<propsColumnCard[]>([]);
  const [displayModal, SetDisplayModal] = useState(false);
  const inputTitleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initialColumns = [
      {
        id: 1,
        title: "COLUMNA1",
        tasks: [{ id: 1, title: "tarea1", storyPoints: 2, state: "COLUMNA1" }],
      },
      {
        id: 2,
        title: "COLUMNA2",
        tasks: [{ id: 2, title: "tarea1", storyPoints: 2, state: "COLUMNA2" }],
      },
    ];
    setColumns(initialColumns);
  }, []);
  const handleAddTask = (
    columnId: number,
    title: string,
    storyPoints: number
  ) => {
    const state = columns.filter((col) => col.id === columnId)[0]["title"];
    console.log();
    const newTask: Task = {
      id: getNextId(), // Generamos un id único global
      title,
      storyPoints,
      state: state,
    };
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );
  };
  const addColumn = () => {
    const title = inputTitleRef?.current?.value || "";
    setColumns((prevColumns) => {
      console.log(prevColumns);
      const newColumn = {
        id: prevColumns.length + 1,
        title: title,
        tasks: [],
      };
      return [...prevColumns, newColumn];
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    //si no estamos encima de una Columna
    if (!over) return;

    //task que se ha cogido
    const activeTaskId = active.id as number;
    //columna donde se suelta
    const overColumnId = over.id as number;

    //columna de origen
    const sourceColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === activeTaskId)
    );
    //columna de destino
    const targetColumn = columns.find((col) => col.id === overColumnId);
    //si no hay columna de origen,destino o es la misma no se cambian las tasks de columna
    if (!sourceColumn || !targetColumn || sourceColumn === targetColumn) return;

    //tarea a mover
    const taskToMove = sourceColumn.tasks.find(
      (task) => task.id === activeTaskId
    );

    //si no hay tarea mover no se mueve
    if (!taskToMove) return;

    //seteamos estado de las columnas con los cambios
    setColumns((prevColumns) =>
      //recorremos las columnas para reordenarlas
      prevColumns.map((col) => {
        //si la columna es la columna de orgien
        if (col.id === sourceColumn.id) {
          //elimina de la columnna de origen la tarea que se ha cogido
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== activeTaskId),
          };
        }
        //si es la columna de destino
        if (col.id === targetColumn.id) {
          const state = columns.filter((col) => col.id === targetColumn.id)[0][
            "title"
          ];
          taskToMove.state = state;
          //se añade la tarea a mover
          return {
            ...col,
            tasks: [...col.tasks, taskToMove],
          };
        }
        return col;
      })
    );
  };
  const getNextId = (): number => {
    const allTasks = columns.flatMap((col) => col.tasks); // Todas las tareas en un solo arreglo
    return allTasks.length > 0
      ? Math.max(...allTasks.map((task) => task.id)) + 1
      : 1;
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="board">
        {columns.map((col) => (
          <ColumnCards
            key={col.id}
            id={col.id}
            title={col.title}
            tasks={col.tasks}
            onAddTask={(title, storyPoints) =>
              handleAddTask(col.id, title, storyPoints)
            }
          />
        ))}
      </div>
      <button onClick={() => SetDisplayModal(!displayModal)}>
        Añadir columna
      </button>
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
                addColumn();
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

              <button type="submit">Crear columna</button>
            </form>
          </div>
        </div>
      ) : null}{" "}
    </DndContext>
  );
};
export default Home;
