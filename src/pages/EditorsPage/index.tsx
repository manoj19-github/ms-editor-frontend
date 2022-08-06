import React, { useEffect, useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdDoubleArrow } from "react-icons/md";
import Client from "../../components/Client";
import MyEditor from "./MyEditor";

const EditorsPage = () => {
  const [showSlides, setShowSlides] = useState<boolean>(true);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  useEffect(() => {
    const showMobile = () => {
      setIsMobileView(window.innerWidth <= 765);
    };
    showMobile();
    window.addEventListener("resize", showMobile);
    return () => {
      window.removeEventListener("resize", showMobile);
    };
  }, [window.innerWidth]);
  return (
    <div className="w-full h-full  min-h-screen min-w-screen flex  relative  ">
      <div
        className={`flex flex-col md:w-1/6 w-1/2 duration-500 ease-in-out  fixed h-screen ${
          showSlides ? `w-1/2` : `w-0`
        } bg-slate-900 overflow-hidden  md:py-5 py-1 `}
      >
        <div className="h-full w-full relative">
          <div className="md:w-1/2 w-[90%] h-[10rem] md:h-[7rem]  mx-auto my-2">
            <img
              src="/site-logo.png"
              className="w-full h-full object-cover"
              alt="client"
            />
          </div>
          <div className="w-full grid grid-flow-row grid-cols-2 gap-y-10 h-[60%] p-1 overflow-auto">
            <Client username={"Manoj Santraffffffffffffffffffffffffffff"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
            <Client username={"Manoj Santra"} />
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
      <div className="min-w-screen min-h-screen relative h-[300rem] ">
        {isMobileView && (
          <div
            onClick={() => setShowSlides((prev) => !prev)}
            className={`duration-500 ease-in-out fixed top-2 ${
              showSlides
                ? "bg-white text-slate-900"
                : "bg-slate-900 text-white "
            } rounded-full  ${
              showSlides ? "left-[10rem]" : "-left-4"
            } top-3  p-2 cursor-pointer ${
              showSlides ? "rotate-180" : "rotate-0"
            }  `}
          >
            <MdDoubleArrow size={20} />
          </div>
        )}
        <MyEditor />
      </div>
    </div>
  );
};

export default EditorsPage;
