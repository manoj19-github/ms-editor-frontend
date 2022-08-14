import React from "react";
import ReactLoading from "react-loading";

const BtnLoader = () => {
  return (
    <div className="w-7 h-full flex justify-center items-center mt-[2rem]">
      <ReactLoading type={"spinningBubbles"} color="#fff" />
    </div>
  );
};

export default BtnLoader;
