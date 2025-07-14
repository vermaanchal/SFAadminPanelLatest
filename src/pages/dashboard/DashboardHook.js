import { useEffect, useState } from 'react';
import { baseURLProd } from 'api/api';

function useDashboardHook() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(`${baseURLProd}GetDasboardDetails`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((resData) => {
                // console.log('lalal', resData);
                setData(resData);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            }
            ).finally(() => {
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
}
export default useDashboardHook;
