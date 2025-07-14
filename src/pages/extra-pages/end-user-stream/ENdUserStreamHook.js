
import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const EndUserStreamHook = () => {
    const [data, setData] = useState([]);
    const [message, setmessage] = useState("")
    const [loading, setLoading] = useState(true)
    const fetchData = async () => {

        try {

            const req = await fetch(`${baseURLProd}GetLiveStreamingDetails`, {
                method: "GET",
                'Content-type': "application/json"
            })
            const res = await req.json()
            if (res.status == true) {
                setLoading(false)
                setData(res.userLiveList)
            }
            else {
                setmessage("No data is available")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }

    }
    useEffect(() => {
        fetchData()
    }, [])
    const handleAdd = async (userId) => {
        await fetch(`${baseURLProd}UserLiveEnd`, {
            method: "POST",
            body: JSON.stringify({ userId: userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const newData = data.filter(row => (row.userid !== userId));
        setData(newData);
        fetchData();
        toast.success("Live Ended successfully")
    }
    return {
        data, handleAdd, message, loading
    }
}

export default EndUserStreamHook
