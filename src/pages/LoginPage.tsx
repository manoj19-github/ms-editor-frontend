import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";
const LoginPage = () => {
  const focusInputRef: any = useRef(null);
  const [roomId, setRoomId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    focusInputRef.current.focus();
  }, []);
  const createRandomRoomId = (): void => {
    const _roomId = uuidV4();
    setRoomId(_roomId);
    toast.success("New room Successfully created");
  };
  return (
    <div className="h-[100vh] overflow-hidden w-full bg-slate-900 text-white flex flex-col justify-center items-center box-border">
      <h3 className="md:text-4xl text-2xl font-['lobster'] my-2 tracking-widest uppercase">
        {" "}
        ms editor
      </h3>
      <div className="md:h-2/3 md:w-1/3 h-[80%] w-[90%] bg-[#131413] rounded-md flex flex-col items-center gap-y-3 shadow-xl  ">
        <div>
          <img src="/site-logo.png" className="md:w-[7rem] w-[5rem] my-2" />
        </div>
        <form className="my-2 flex flex-col space-y-4 w-[90%] md:w-2/3 text-slate-400 ">
          <div className="flex flex-col space-y-2 justify-start items-start">
            <label>Paste Your invitation Room ID</label>
            <input
              type="text"
              placeholder="Room ID"
              value={roomId}
              onChange={(e: any) => setRoomId(e.target.vallue)}
              ref={focusInputRef}
              className="w-full p-1 text-slate-200 bg-slate-900 outline-none border-0 h-8 rounded-md"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              value={userName}
              onChange={(e: any) => setUserName(e.target.value)}
              placeholder="User Name"
              className="w-full p-1 text-slate-200 bg-slate-900 outline-none border-0 h-8 rounded-md"
            />
          </div>
          <div className="flex justify-end items-center mt-5 md:mt-0">
            <button
              type="submit"
              className="w-full md:w-[7rem] bg-slate-900 p-2 rounded-md hover:shadow-2xl hover:bg-slate-500 duration-300 ease-in "
            >
              Join
            </button>
          </div>
        </form>
        <div className="flex justify-end items-center mt-12 md:my-1">
          <p className="text-sm md:text-xs text-slate-400 ">
            If you don't have an invite then create a{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={createRandomRoomId}
            >
              New Room
            </span>
          </p>
        </div>
      </div>
      <div className="w-full mt-5 flex items-center justify-center">
        <p className="text-slate-400 ">Developed By Santra Developer's</p>
      </div>
    </div>
  );
};

export default LoginPage;
