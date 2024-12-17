import React, { InputHTMLAttributes } from "react";
import { IoSearchSharp } from "react-icons/io5";

const Search = ({
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="pe-[1rem] flex items-center gap-2 bg-black/10 rounded-xl border border-separator">
      <input
        className="ps-[1rem] py-2 w-full bg-transparent text-white border-none outline-none"
        placeholder="Search"
        {...props}
      />
      <IoSearchSharp className="font-bold text-[2rem] text-primary" />
    </div>
  );
};

export default Search;
