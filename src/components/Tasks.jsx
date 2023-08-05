import { useState } from "react";
import { useSelector } from "react-redux";
import { CancelIcon, DeleteIcon, EditIcon, UpdateIcon } from "../icons/icons";

function Tasks() {
  const task = useSelector((state) => state.task.items);

  const [editedTask, setEditedTask] = useState(null);

  return (
    <div className=" p-5">
      <h1 className="text-center">Tasks</h1>
      <div className="flex flex-col gap-4 p-2">
        {task.map((item) => (
          <div className="w-full border p-2 lg:w-[30vw]" key={item.id}>
            {editedTask && editedTask.id === item.id ? (
              <div className="flex flex-row justify-between gap-8">
                <div className="flex flex-col gap-2">
                  <div>
                    <label className="mr-2">title:</label>
                    <input
                      className="border"
                      type="text"
                      value={editedTask.title}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex ">
                    <span className="mr-2">description:</span>
                    <span>
                      <textarea
                        className="border"
                        type="text"
                        value={editedTask.description}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            description: e.target.value,
                          })
                        }
                      />
                    </span>
                  </div>
                  <div>
                    <label className="mr-2">status:</label>
                    <select
                      className="border p-1"
                      value={editedTask.status}
                      onChange={(e) =>
                        setEditedTask({ ...editedTask, status: e.target.value })
                      }
                    >
                      <option value="To Do">To Do</option>
                      <option value="Working">Working</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="mr-2">deadline:</label>
                    <input
                      className="border p-1"
                      type="date"
                      value={editedTask.deadline}
                      onChange={(e) =>
                        setEditedTask({
                          ...editedTask,
                          deadline: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className=" flex flex-col gap-4">
                  <div className="flex justify-center">
                    <h1>Actions</h1>
                  </div>
                  <div className="flex flex-row gap-2">
                    <button className="rounded-full border border-sky-300 p-2 ">
                      <UpdateIcon />
                    </button>
                    <button
                      className="rounded-full border border-sky-300 p-2 "
                      onClick={() => setEditedTask(null)}
                    >
                      <CancelIcon />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-between gap-8">
                <div>
                  <h3>
                    <span>title:</span>
                    <span>{item.title}</span>
                  </h3>
                  <p>
                    <span>description:</span>
                    <span>{item.description}</span>
                  </p>
                  <p>
                    <span>Status:</span>
                    <span>{item.status}</span>
                  </p>
                  <p>
                    <span>Deadline:</span>
                    <span>{item.deadline}</span>
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    <h1>Actions</h1>
                  </div>
                  <div className="flex flex-row gap-2">
                    <button className="rounded-full border border-sky-300 p-2">
                      <DeleteIcon />
                    </button>
                    <button className="rounded-full border border-sky-300 p-2">
                      <EditIcon />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
