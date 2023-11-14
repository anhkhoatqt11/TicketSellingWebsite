import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  FcHome,
  FcCloseUpMode,
  FcMusic,
  FcFilm,
  FcNightLandscape,
  FcConferenceCall,
  FcKindle,
  FcLandscape,
  FcSportsMode,
} from "react-icons/fc";
const NavbarLinks = ({ data }) => {
  const getIconById = (id) => {
    switch (id) {
      case 1:
        return <FcLandscape size={20} className="mr-2 ms-3" />;
      case 2:
        return <FcMusic size={20} className="mr-2 ms-3" />;
      case 3:
        return <FcFilm size={20} className="mr-2 ms-3" />;
      case 4:
        return <FcNightLandscape size={20} className="mr-2 ms-3" />;
      case 5:
        return <FcConferenceCall size={20} className="mr-2 ms-3" />;
      case 6:
        return <FcKindle size={20} className="mr-2 ms-3" />;
      case 7:
        return <FcCloseUpMode size={20} className="mr-2 ms-3" />;
      case 8:
        return <FcSportsMode size={20} className="mr-2 ms-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 ">
      <ul className="space-y-2 font-medium">
        <div>
          <Link
            href="/"
            className="flex items-center p-2 text-gray-900 rounded-lg bg-white  box-shadow"
          >
            <FcHome size={20} className="mr-2 ms-3" />
            <span className="text-sm font-bold">Trang chủ</span>
          </Link>
        </div>
        {data?.map((item) => (
          <div key={item.id}>
            <li>
              <Link
                href={`/search/?category=${item.id}`} //url search
                className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-white "
              >
                {getIconById(item.id)}
                <span className="text-sm">{item.name}</span>
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default NavbarLinks;
