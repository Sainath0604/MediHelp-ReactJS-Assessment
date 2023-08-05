import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToTask } from "../toolkit/Reducer";
import { CreateIcon } from "../icons/icons";

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
    } catch (error) {
      console.log("error");
    }
  }

  return (
    <div className=" w-11/12 p-5">
      <div className="mb-2 flex min-h-full min-w-full flex-col gap-y-2 border p-2">
        <div className="flex justify-center border p-1">
          <h1>Create tasks</h1>
        </div>
        <div className="flex flex-col items-center gap-y-2 border p-2">
          <div>
            <div className="flex flex-row border p-2">
              <div className="mr-2 w-24">Title:</div>
              <input
                value={title}
                type="text"
                placeholder=" title"
                className="border"
                onChange={handleTitle}
              />
            </div>
            <div className="flex flex-row border p-2">
              <div className="mr-2 w-24">Description: </div>
              <div>
                <textarea
                  value={description}
                  cols={40}
                  className="max-h-[40vh] min-h-[20vh] border"
                  type="text"
                  placeholder=" Description"
                  onChange={handleDescription}
                />
              </div>
            </div>
            <div className="flex flex-row border p-2">
              <div className="mr-2 w-24">Status:</div>
              <select
                className="border p-1"
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
            <div className="flex flex-row border p-2">
              <div className="mr-2 w-24">Deadline:</div>
              <input
                value={deadline}
                type="date"
                placeholder=" date"
                className="border p-1"
                onChange={handleDeadline}
              />
            </div>
          </div>
        </div>
        <div className="mb-2 flex  justify-center border p-1">
          <button
            className="flex flex-row items-center gap-2 border p-2"
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
