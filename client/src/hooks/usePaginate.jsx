import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../redux/actions";

export default function usePaginate(items) {
  const dispatch = useDispatch();
  const filteredItems = useSelector((state) => state.filteredPublications);
  const currentPage = useSelector((state) => state.currentPage);

  const itemsPerPage = 9;
  const maxIndex = currentPage * itemsPerPage;
  const minIndex = maxIndex - itemsPerPage;

  const itemsToPaginate = items || filteredItems;

  const filterPublicationsCheck = itemsToPaginate?.filter((publication) => publication.check);
  const currentView = filterPublicationsCheck.slice(minIndex, maxIndex);
  const numberOfPages = Math.ceil(filterPublicationsCheck?.length / itemsPerPage) || 1;

  function handleOnClick(e) {
    const button = e.target.closest("button");
    if (button) {
      if (button.name === "previous" && currentPage > 1) {
        dispatch(setCurrentPage(currentPage - 1));
      }
      if (button.name === "next" && currentPage < numberOfPages) {
        dispatch(setCurrentPage(currentPage + 1));
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  return {
    currentView,
    handleOnClick,
    numberOfPages,
    currentPage,
  };
}
