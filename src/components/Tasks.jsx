import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromTask, editTask } from "../toolkit/Reducer";
import { CancelIcon, DeleteIcon, EditIcon, UpdateIcon } from "../icons/Icons";

function Tasks() {
  const task = useSelector((state) => state.task.items);
  const dispatch = useDispatch();

  const [editedTask, setEditedTask] = useState(null);

  function handleDelete(id) {
    try {
      dispatch(removeFromTask(id));
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.filter((task) => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      console.log("removed");
    } catch (error) {
      console.log("failed to remove");
    }
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  function handleEdit(id) {
    console.log("edit");
    const taskToEdit = task.find((item) => item.id === id);
    setEditedTask(taskToEdit);
  }

  function handleUpdate() {
    try {
      dispatch(editTask({ id: editedTask.id, updatedTask: editedTask }));

      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const updatedTasks = tasks.map((task) =>
        task.id === editedTask.id ? editedTask : task
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setEditedTask(null);
    } catch (error) {
      console.log("failed to update");
    }
  }

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
                    <button
                      className="rounded-full border border-sky-300 p-2"
                      onClick={handleUpdate}
                    >
                      <div className="flex gap-2 items-center">
                        <span>Save</span>
                        <span>
                          <UpdateIcon />
                        </span>
                      </div>
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
                    <button
                      className="rounded-full border border-sky-300 p-2"
                      onClick={() => handleDelete(item.id)}
                    >
                      <DeleteIcon />
                    </button>
                    <button
                      className="rounded-full border border-sky-300 p-2"
                      onClick={() => handleEdit(item.id)}
                    >
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
