import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {getPublicationDetail, cleanDetail} from "../redux/actions";

const usePublication = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const publication = useSelector((state) => state.publicationDetail);

    useEffect(() => {
        dispatch(getPublicationDetail(id));
        return () => {
            dispatch(cleanDetail());
        };
    }, [dispatch, id]);

    return publication && publication.images ? publication : null;
};

export default usePublication;