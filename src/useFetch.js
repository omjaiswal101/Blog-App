import { useState, useEffect } from "react";

const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isCurrent = true;
        setTimeout(() => {
            fetch(url)
                .then(res => {
                    if(!res.ok === true) {
                        throw Error("the requested resource could not be found");
                    }
                    return res.json();
                })
                .then(data => {
                    if(isCurrent) {
                        setError(null);
                        setIsLoading(false);
                        setData(data);
                    }
                })
                .catch(err => {
                    setIsLoading(false);
                    setError(err.message); 
                });
        }, 1000);
        return () => isCurrent = false;
    }, [url]);

    return ( { data, isLoading, error } );
}
 
export default useFetch;