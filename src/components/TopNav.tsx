import React from "react";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { BellRing, Search } from "lucide-react";
import { TbDrone } from "react-icons/tb";
import { PiChatsBold } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";

const TopNav: React.FC = () => {
  return (
    <header className="flex flex-wrap items-center justify-between px-4 md:px-10 py-3 bg-white shadow-sm ">
      {/* Search Field */}
      <div className="relative flex items-center w-full md:max-w-lg">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
          <Search className="w-5 h-5" />
        </span>

        <input
          type="search"
          placeholder="Search your page..."
          className="w-full pl-10 pr-20 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />

        <button
          type="submit"
          className="absolute inset-y-0 right-2 flex items-center m-1 px-2 py-1 text-sm text-white bg-secondary rounded-md hover:bg-accent transition"
        >
            <TbDrone />
          K
        </button>
      </div>

      {/* Notification and Profile */}
      <div className="flex items-center space-x-4 mt-3 md:mt-0">
        
        <button className="relative bg-light p-2 rounded-md">
          < PiChatsBold size={20} />
          <span className="absolute  top-1  h-2 inline-flex items-center justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-green-500 rounded-full">
            
          </span>
        </button>

        <button className="relative bg-light p-2 rounded-md">
        <BellRing size={20} />
        <span className="absolute top-1 inline-flex items-center h-2 justify-center px-1 py-0.5 text-xs font-bold leading-none text-red-100 bg-yellow-500 rounded-full">
            
          </span>
        </button>
        <button className="bg-light p-2 rounded-md">        <IoMdSettings  size={20} /> </button>

        <button className="h-10 w-10 bg-yellow-400 rounded-full ">
        A
        </button>

      </div>
    </header>
  );
};

export default TopNav;
