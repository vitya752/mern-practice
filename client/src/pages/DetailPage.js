import React, { useCallback, useContext, useState, useEffect } from 'react';
import {useHttp} from './../hooks/http.hook';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from './../components/Loader';
import LinkCard from './../components/LinkCard';

const DetailPage = () => {

    const [link, setLink] = useState();
    const {request, loading} = useHttp();
    const linkId = useParams().id;
    const {getToken} = useContext(AuthContext);
    
    const getLink = useCallback(async () => {
        try {
            const data = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${getToken()}`
            });
            setLink(data);
        } catch(e) {

        }
    }, [getToken, linkId, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if(loading) return <Loader />;

    return(
        <>
            {!loading && link && <LinkCard link={link} />}
        </>
    )
};

export default DetailPage;