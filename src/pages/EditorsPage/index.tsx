import React, { useEffect, useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";

const EditorsPage = () => {
  const [showSlides, setShowSlides] = useState<boolean>(true);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  useEffect(() => {
    const showMobile = () => {
      setIsMobileView(window.innerWidth <= 765);
    };
    window.onresize = showMobile;
  }, [window.innerWidth]);
  return (
    <div className="w-full h-full  min-h-screen min-w-screen flex   ">
      <div
        className={`flex flex-col md:w-1/6 w-1/2 duration-500 ease-in-out  fixed h-screen ${
          showSlides ? `w-1/2` : `w-0`
        } bg-slate-900 overflow-hidden relative md:py-5 py-1 `}
      >
        <div className="md:w-1/2 w-[80%] h-[5rem] md:h-[7rem]  mx-auto my-2">
          <img src="/site-logo.png" className="w-full h-full object-cover" />
        </div>
        <div className="w-full grid grid-flow-row md:grid-cols-2 sm:grid-cols-1 h-[65%] p-3 overflow-auto"></div>
        <div className="w-full w-full md:p-2 flex flex-col space-y-5 items-center justify-center">
          <button className="bg-slate-400 w-10 md:w-[90%] flex justify-center p-1 mx-auto hover:bg-slate-700 h-7 items-center md:h-8  rounded-md text-white font-bold duration-500 ease-in  ">
            {isMobileView ? <BiCopyAlt /> : "Copy Room ID"}
          </button>
          <button className="hover:bg-slate-400 w-10 md:w-[90%] bg-slate-700 flex justify-center items-center h-7 md:h-8 p-1  rounded-md text-white font-bold duration-500 ease-in  ">
            {isMobileView ? <MdPersonRemoveAlt1 /> : "Leave Room"}
          </button>
        </div>
        <span
          className="md:hidden absolute md:top-5 md:right-4 top-1 right-1 text-red-500 "
          onClick={() => setShowSlides(false)}
        >
          <AiOutlineClose size={22} />
        </span>
      </div>
      <div className="min-w-screen min-h-screen ">
        <span onClick={() => setShowSlides(true)}>
          <GiHamburgerMenu />
        </span>
      </div>
    </div>
  );
};

export default EditorsPage;
