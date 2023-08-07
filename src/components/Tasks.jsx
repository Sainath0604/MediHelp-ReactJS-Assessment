import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromTask, editTask } from "../toolkit/Reducer";
import { CancelIcon, DeleteIcon, EditIcon, UpdateIcon } from "../icons/Icons";

function Tasks() {
  const task = useSelector((state) => state.task.items);
  const dispatch = useDispatch();
  const [editedTask, setEditedTask] = useState(null);
  const taskLength = task.length;

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
    <div className="p-6 lg:p-5">
      {taskLength === 0 ? (
        <div className="flex flex-col gap-8 p-2">
          <h1 className="text-center text-red-700 font-bold text-3xl">Tasks</h1>
          <h1 className="font-semibold text-xl">No task added yet.</h1>
        </div>
      ) : (
        <div className="flex flex-col gap-4 p-2 justify-center">
          <h1 className="text-center text-red-700 font-bold text-3xl">Tasks</h1>
          {task.map((item) => (
            <div
              className="w-full border p-2 lg:w-[45vw] bg-[#f6f9fa] rounded-lg text-[#903d2f]"
              key={item.id}
            >
              {editedTask && editedTask.id === item.id ? (
                <div className="flex flex-col lg:flex-row justify-between gap-8 p-5">
                  <div className="flex flex-col gap-2 p-2">
                    <div className="flex gap-2 items-center ">
                      <label className="mr-2 w-20">Title:</label>
                      <input
                        className="border rounded-lg p-2 text-black"
                        type="text"
                        value={editedTask.title}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex gap-2">
                      <label className="mr-2 w-20">Description:</label>
                      <span>
                        <textarea
                          className="border rounded-lg p-2 w-52 lg:w-80 max-h-[40vh] min-h-[20vh] text-black"
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
                    <div className="flex gap-2 items-center">
                      <label className="mr-2 w-20">Status:</label>
                      <select
                        className="border rounded-lg p-2 text-black"
                        value={editedTask.status}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="To Do">To Do</option>
                        <option value="Working">Working</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>
                    <div className="flex gap-2 items-center">
                      <label className="mr-2 w-20">Deadline:</label>
                      <input
                        className="border rounded-lg p-2 text-black"
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
                  <div className=" flex flex-col lg:gap-4">
                    <div className="flex justify-center">
                      <h1 className="hidden lg:block">Actions</h1>
                    </div>
                    <div className="flex flex-row gap-6 lg:gap-2 justify-center">
                      <button
                        className="rounded-full border bg-[#ee7c68] text-[#fff]"
                        onClick={handleUpdate}
                      >
                        <div className="flex gap-1 items-center">
                          <span className="px-2 py-1">Save</span>
                          <span className="text-[#fff] px-2 py-1">
                            <UpdateIcon className="text-[#fff]" />
                          </span>
                        </div>
                      </button>
                      <button
                        className="rounded-full border bg-[#ee7c68] text-[#fff] p-2"
                        onClick={() => setEditedTask(null)}
                      >
                        <CancelIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-row justify-between lg:gap-8 p-2">
                  <div>
                    <div className="p-2 flex lg:gap-2">
                      <span>Title: </span>
                      <span className="text-[#000]">{item.title}</span>
                    </div>
                    <div className="p-2 flex lg:gap-2">
                      <span>Description: </span>
                      <p className="text-[#000] w-56 lg:w-96 break-words">
                        {item.description}
                      </p>
                    </div>
                    <div className="p-2 flex lg:gap-2">
                      <span>Status:</span>
                      <span className="text-[#000]">{item.status}</span>
                    </div>
                    <div className="p-2 flex lg:gap-2">
                      <span>Deadline: </span>
                      <span className="text-[#000]"> {item.deadline}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-center">
                      <h1>Actions</h1>
                    </div>
                    <div className="flex flex-row gap-2">
                      <button
                        className="rounded-full border bg-[#ee7c68] text-[#fff]  p-2"
                        onClick={() => handleDelete(item.id)}
                      >
                        <DeleteIcon />
                      </button>
                      <button
                        className="rounded-full border bg-[#ee7c68] text-[#fff] p-2"
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
      )}
    </div>
  );
}

export default Tasks;
