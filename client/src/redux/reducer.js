import {
  GET_COMPLEXES,
  GET_PUBLICATIONS,
  GET_USERS,
  GET_COMPLEX_DETAIL,
  GET_PUBLICATION_DETAIL,
  CLEAN_DETAIL,
  GET_PUBLICATIONS_BY_TITLE,
  GET_COMPLEXES_BY_NAME,
  GET_USERS_BY_NAME,
  FILTERED_PUBLICATIONS,
  SET_CURRENT_PAGE
} from "./actions";

const initialState = {
  complexes: [],
  publications: [],
  publicationsCopy: [],
  filteredPublications: [],
  users: [],
  complexDetail: {},
  publicationDetail: {},
  currentPage: 1,
};

const rootReducer = (state = initialState, action) => {
  let publicationsWithoutFilters = [...state.publicationsCopy];
  let publicationsByFilters = [...state.filteredPublications];
  switch (action.type) {
    case GET_COMPLEXES:
      return {
        ...state,
        complexes: action.payload,
      };
    case GET_PUBLICATIONS:
      return {
        ...state,
        publications: action.payload,
        publicationsCopy: action.payload,
        filteredPublications: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_COMPLEX_DETAIL:
      return {
        ...state,
        complexDetail: action.payload,
      };
    case GET_PUBLICATION_DETAIL:
      return {
        ...state,
        publicationDetail: action.payload,
      };
    case CLEAN_DETAIL:
      return {
        ...state,
        complexDetail: {},
        publicationDetail: {},
      };
    case GET_PUBLICATIONS_BY_TITLE:
      return {
        ...state,
        publications: action.payload,
      };
    case GET_COMPLEXES_BY_NAME:
      return {
        ...state,
        complexes: action.payload,
      };
    case GET_USERS_BY_NAME:
      return {
        ...state,
        users: action.payload,
      };
    case FILTERED_PUBLICATIONS:
      let days = new Date();
      switch (action.payload.date) {
        case "ULTIMOS 3 DIAS":
          days.setDate(days.getDate() - 3);
          break;
        case "ULTIMA SEMANA":
          days.setDate(days.getDate() - 7);
          break;
        case "ULTIMO MES":
          days.setDate(days.getDate() - 31);
          break;
      }
      if (action.payload.date !== "TODAS") {
        publicationsByFilters = publicationsWithoutFilters.filter((publication) => new Date(publication.date) > days);
      } else {
        publicationsByFilters = publicationsWithoutFilters;
      }
      if (action.payload.type !== "TODAS LAS CATEGORIAS") {
        publicationsByFilters = publicationsByFilters.filter((publication) => publication.type === action.payload.type);
      }
      if (action.payload.search !== "") {
        publicationsByFilters = publicationsByFilters.filter((publication) => publication.title.toLowerCase().includes(action.payload.search.toLowerCase()));
      }
      if (action.payload.isEvent) {
        publicationsByFilters = publicationsByFilters.filter((publication) => publication.isEvent);
      }
      return {
        ...state,
        filteredPublications: publicationsByFilters,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;