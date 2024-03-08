import usePaginate from "../../hooks/usePaginate";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";

import style from "./Pagination.module.css";

export default function Pagination({ items }) {
  const { handleOnClick, currentPage, numberOfPages } = usePaginate(items);

  return (
    numberOfPages > 1 && (
      <div className={style.pagination}>
        <button name="previous" className={style.buttons} onClick={handleOnClick}>
          <BsArrowLeft className={style.icon} />
        </button>
        <div className={style.numberPages}>
          <span>
            {" "}
            {currentPage} / {numberOfPages}{" "}
          </span>
        </div>
        <button name="next" className={style.buttons} onClick={handleOnClick}>
          <BsArrowRight className={style.icon} />
        </button>
      </div>
    )
  );
}
