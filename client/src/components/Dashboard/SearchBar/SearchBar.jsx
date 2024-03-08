import React from "react";

import { BiSearchAlt } from "react-icons/bi";
import style from "./SearchBar.module.css";

export default function SearchBar({ handleChange, placeholder }) {
  return (
    <div className={style.searchBar}>
      <input type="search" name="search" onChange={handleChange} placeholder={placeholder ? placeholder : "BUSCAR"} />
      <BiSearchAlt className={style.icon} />
    </div>
  );
}
