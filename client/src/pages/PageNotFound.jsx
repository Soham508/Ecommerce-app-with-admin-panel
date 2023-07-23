import React from "react";

const PageNotFound = () => {
  return (
    <div className="h-screen items-center bg-gradient-to-r from-slate-300 to-slate-400 flex-col justify-center flex w-full ">
      <div className="text-[100px] text-red-800">404</div>
      <div className="font-bold text-[30px] text-red-700">Page not found</div>
    </div>
  );
};

export default PageNotFound;
