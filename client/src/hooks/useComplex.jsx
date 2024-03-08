import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { useEffect } from "react";
import {getComplexDetail, cleanDetail} from "../redux/actions";

const useComplex = () => {
    const dispatch = useDispatch();
    const {id} = useParams();

    const complex = useSelector((state) => state.complexDetail);

    useEffect(() => {
        dispatch(getComplexDetail(id));
        return () => {
            dispatch(cleanDetail());
        };
    }, [dispatch, id]);
    return complex && complex.images ? complex : null;
};

export default useComplex;