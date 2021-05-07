import React,{useEffect, useState} from 'react';
/* import axios from 'axios'; */

export default function useFetch( initialUrl ){

    const [ data, setData]          = useState({});
    const [ loading, setLoading]    = useState(true);
    const [ url, setUrl ]           = useState(initialUrl);
    const [ reload, setReload ]     = useState(0);

    async function fetchUrl(){

        /* const response = await axios(url); */

        fetch(url)
        .then(response => response.json())
        .then(data => {
            setData(data);
            setLoading(false);
        });

    }

    useEffect( () => {
        fetchUrl();
    }, [reload, url])

    return [data, loading, setUrl, reload, setReload];

}