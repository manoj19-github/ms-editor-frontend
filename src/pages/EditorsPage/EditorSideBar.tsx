import React, { useEffect, useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDoubleArrow } from "react-icons/md";
import Client from "../../components/Client";
import { IClients } from "../../interfaces/socket.interface";

const EditorSideBar = ({
  showSlides,
  isMobileView,
  clientsData,
  uniqueUserName,
}: IEditorSidebar) => {
  console.log("client s data : ", clientsData);
  console.log("unique : ", uniqueUserName);
  return (
    <div
      className={`flex flex-col md:w-1/6 w-1/2 duration-500 ease-in-out  fixed h-screen z-[500] ${
        showSlides ? `w-1/2` : `w-0`
      } bg-slate-900 overflow-hidden  md:py-5 py-1 `}
    >
      <div className="h-full w-full relative ">
        <div className="md:w-1/2 w-[90%] h-[10rem] md:h-[7rem]  mx-auto my-2">
          <img
            src="/site-logo.png"
            className="w-full h-full object-cover"
            alt="client"
          />
        </div>
        <div className="w-full flex flex-col items-center justify-start   h-[60%]  overflow-auto">
          {!!clientsData &&
            clientsData
              .filter(({ isMe }) => isMe === true)
              .map(({ userName, isMe, socketId }) => (
                <Client username={userName} isMe={isMe} key={socketId} />
              ))}
          {!!clientsData &&
            clientsData
              .filter(({ isMe }) => isMe === false)
              .map(({ userName, isMe, socketId }) => (
                <Client username={userName} isMe={isMe} key={socketId} />
              ))}
        </div>

        <div className="w-full mt-[25%] md:mt-4 md:p-2 flex md:flex-col md:space-y-5 items-center justify-around md:justify-center ">
          <button className="bg-slate-400 w-10 md:w-[90%] flex justify-center p-1  hover:bg-slate-700 h-7 items-center md:h-8  rounded-md text-white font-bold duration-500 ease-in  ">
            {isMobileView ? <BiCopyAlt /> : "Copy Room ID"}
          </button>
          <button className="hover:bg-slate-400 w-10 md:w-[90%] bg-slate-700 flex justify-center items-center h-7 md:h-8 p-1  rounded-md text-white font-bold duration-500 ease-in  ">
            {isMobileView ? <MdPersonRemoveAlt1 /> : "Leave Room"}
          </button>
        </div>
      </div>
    </div>
  );
};
interface IEditorSidebar {
  showSlides: boolean;
  isMobileView: boolean;
  clientsData: IClients[];
  uniqueUserName: string;
}

export default EditorSideBar;
