import CreateTasks from "./CreateTasks";
import Tasks from "./Tasks";

function Home() {
  return (
    <div>
      <div className=" flex min-h-screen w-full flex-col lg:flex-row bg-[#efdbd4]">
        <div className="top-0 flex flex-grow justify-center p-5 lg:fixed  lg:left-0 lg:w-1/2">
          <CreateTasks />
        </div>
        <div className="right-0 top-0 flex flex-grow justify-center p-5 lg:absolute lg:w-1/2 ">
          <Tasks />
        </div>
      </div>
    </div>
  );
}

export default Home;
