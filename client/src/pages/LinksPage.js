import React, { useState, useCallback, useContext, useEffect } from 'react';
import {useHttp} from './../hooks/http.hook';
import {AuthContext} from './../context/AuthContext';
import Loader from './../components/Loader';
import LinksList from './../components/LinksList';

const LinksPage = () => {

    const [links, setLinks] = useState();
    const {loading, request} = useHttp();
    const {getToken} = useContext(AuthContext);

    const getLinks = useCallback(async () => {
        try {
            const data = await request('/api/link', 'GET', null, {
                Authorization: `Bearer ${getToken()}`
            });
            setLinks(data);
        } catch(e) {

        }
    }, [request, getToken]);

    useEffect(() => {
        getLinks();
    }, [getLinks]);

    if(loading) return <Loader />;

    return (
        <>
            {!loading && links && <LinksList links={links} />}
        </>
    );

};

export default LinksPage;