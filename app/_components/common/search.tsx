import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const Search = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="mb-4 pe-[1.3125rem] py-[.0625rem] flex items-center gap-2 bg-[#1612215E] rounded-[.625rem] border-[0.45px] border-[#695F5F]">
      <input
        className="ps-[1.0125rem] py-2.5 w-full bg-transparent text-white placeholder:text-white border-0 outline-none rounded-[.625rem]"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <IoSearchSharp className="font-bold text-[2.05rem] text-primary" />
    </div>
  );
};

export default Search;
