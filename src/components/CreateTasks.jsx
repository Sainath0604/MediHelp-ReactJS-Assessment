import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToTask, emptyTask } from "../toolkit/Reducer";
import { CreateIcon } from "../icons/Icons";

function CreateTasks() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");
  const [deadline, setDeadline] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handleDeadline = (e) => {
    setDeadline(e.target.value);
  };

  function handleAddTask() {
    try {
      dispatch(
        addToTask({
          id: Date.now(),
          title: title,
          description: description,
          status: status,
          deadline: deadline,
        })
      );

      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.push({
        id: Date.now(),
        title: title,
        description: description,
        status: status,
        deadline: deadline,
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));

      setTitle("");
      setDescription("");
      setStatus("To Do");
      setDeadline("");
    } catch (error) {
      console.log("error");
    }
  }
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (tasks.length > 0) {
      dispatch(emptyTask()); // Clear the Redux store first
      tasks.forEach((task) => dispatch(addToTask(task)));
    }
  }, []);
  return (
    <div className=" w-11/12 p-5">
      <div className="mb-2 flex  min-w-full flex-col gap-y-2  p-2 bg-[#f6f9fa] rounded-lg">
        <div className="flex justify-center  p-1">
          <h1 className="text-[#ee7c68] text-2xl">Create tasks</h1>
        </div>
        <div className="flex flex-col items-center text-[#b44e3c] gap-y-2  p-2">
          <div>
            <div className="flex flex-row  p-2">
              <div className="mr-2 w-24">Title:</div>
              <input
                value={title}
                type="text"
                placeholder=" title"
                className="border rounded-lg p-2"
                onChange={handleTitle}
              />
            </div>
            <div className="flex flex-row  p-2">
              <div className="mr-2 w-24">Description: </div>
              <div>
                <textarea
                  value={description}
                  cols={40}
                  className="max-h-[40vh] min-h-[20vh] border rounded-lg p-2"
                  type="text"
                  placeholder=" Description"
                  onChange={handleDescription}
                />
              </div>
            </div>
            <div className="flex flex-row  p-2">
              <div className="mr-2 w-24">Status:</div>
              <select
                className="border rounded-lg p-2"
                name="status"
                id="status"
                value={status}
                onChange={handleStatus}
              >
                <option value="To Do">To Do</option>
                <option value="Working">Working</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="flex flex-row  p-2">
              <div className="mr-2 w-24">Deadline:</div>
              <input
                value={deadline}
                type="date"
                placeholder=" date"
                className="border rounded-lg p-2"
                onChange={handleDeadline}
              />
            </div>
          </div>
        </div>
        <div className="mb-2 flex  justify-center  p-1">
          <button
            className="flex flex-row items-center gap-2 bg-[#ee7c68] text-[#fff] p-2 rounded-md"
            onClick={handleAddTask}
          >
            <span>Create task</span>
            <span className="text-2xl">
              <CreateIcon />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateTasks;
