import axios from "axios";
const { VITE_BACKEND_URL } = import.meta.env;

export const GET_COMPLEXES = "GET_COMPLEXES";
export const GET_PUBLICATIONS = "GET_PUBLICATIONS";
export const GET_USERS = "GET_USERS";
export const GET_COMPLEX_DETAIL = "GET_COMPLEX_DETAIL";
export const GET_PUBLICATION_DETAIL = "GET_PUBLICATION_DETAIL";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const GET_PUBLICATIONS_BY_TITLE = "GET_PUBLICATIONS_BY_TITLTE";
export const GET_COMPLEXES_BY_NAME = "GET_COMPLEXES_BY_NAME";
export const GET_USERS_BY_NAME = "GET_USERS_BY_NAME";
export const FILTERED_PUBLICATIONS = "FILTERED_PUBLICATIONS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

export const getComplexes = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${VITE_BACKEND_URL}/complexes`);
            return dispatch({
                type: GET_COMPLEXES,
                payload: data,
            });
        } catch (error) {
            console.log(error.response.data);
        }

    };
};

export const getPublications = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${VITE_BACKEND_URL}/publications`);
            return dispatch({
                type: GET_PUBLICATIONS,
                payload: data,
            });
        } catch (error) {
            console.log(error.response.data);
        }

    };
};

export const getUsers = (token) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${VITE_BACKEND_URL}/users`, { headers: { Authorization: token } });
            return dispatch({
                type: GET_USERS,
                payload: data,
            });
        } catch (error) {
            console.log(error.response.data);
        }

    };
};

export const getComplexDetail = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${VITE_BACKEND_URL}/complexes/${id}`);
            return dispatch({
                type: GET_COMPLEX_DETAIL,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: GET_COMPLEX_DETAIL,
                payload: error.response.data,
            });
        }
    };
};

export const getPublicationDetail = (id) => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get(`${VITE_BACKEND_URL}/publications/${id}`);
            return dispatch({
                type: GET_PUBLICATION_DETAIL,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: GET_PUBLICATION_DETAIL,
                payload: error.response.data,
            });
        }
    };
};

export const cleanDetail = () => {
    return { type: CLEAN_DETAIL };
};

export const getPublicationsByTitle = (title) => {
    return async (dispatch) => {
        try {
            // dispatch(setLoader({show: true, message: "Loading"}));
            const { data } = await axios.get(
                `${VITE_BACKEND_URL}/publications/title?title=${title.trim()}`
            );
            return dispatch({
                type: GET_PUBLICATIONS_BY_TITLE,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: GET_PUBLICATIONS_BY_TITLE,
                payload: [],
            });
        }
        //finally {
        //     /* setTimeout(()=>dispatch( */dispatch(setLoader({show: false, message: ""}))/* ), 500) */;
        // }
    };
};

export const getComplexesByName = (name) => {
    return async (dispatch) => {
        try {
            // dispatch(setLoader({show: true, message: "Loading"}));
            const { data } = await axios.get(
                `${VITE_BACKEND_URL}/complexes/name?name=${name.trim()}`
            );
            return dispatch({
                type: GET_COMPLEXES_BY_NAME,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: GET_COMPLEXES_BY_NAME,
                payload: [],
            });
        }
        //finally {
        //     /* setTimeout(()=>dispatch( */dispatch(setLoader({show: false, message: ""}))/* ), 500) */;
        // }
    };
};

export const getUsersByName = (name, token) => {
    return async (dispatch) => {
        try {
            // dispatch(setLoader({show: true, message: "Loading"}));
            const { data } = await axios.get(
                `${VITE_BACKEND_URL}/users/name?name=${name.trim()}`, { headers: { Authorization: token } }
            );
            return dispatch({
                type: GET_USERS_BY_NAME,
                payload: data,
            });
        } catch (error) {
            return dispatch({
                type: GET_USERS_BY_NAME,
                payload: [],
            });
        }
        //finally {
        //     /* setTimeout(()=>dispatch( */dispatch(setLoader({show: false, message: ""}))/* ), 500) */;
        // }
    };
};

export const filteredPublications = (filters) => {
    return {
        type: FILTERED_PUBLICATIONS,
        payload: filters,
    };
};

export const setCurrentPage = (page) => {
    return { type: SET_CURRENT_PAGE, payload: page };
  };