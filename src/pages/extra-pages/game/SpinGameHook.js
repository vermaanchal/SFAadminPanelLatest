import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Papa from 'papaparse';

const SpinGameHook = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])
    const [selectgame, setSelectGame] = useState("")
    const [newSearchData, setNewSearchData] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        setLoading(true)
        try {
            let req = await fetch(`${baseURLProd}AllSFAspinGameDetails`, {
                method: "GET",
                'Content-Type': 'application/json',

            })
            const res = await req.json();
            setLoading(false)
            setData(res.sfaSpinGameList);
            setFilter(res.sfaSpinGameList)

        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    //--------------------filter------------------//
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (search) {
                const uniqueResults = data
                    .filter((item, index, self) =>
                        index === self.findIndex(t => t.userid.toLowerCase() === item.userid.toLowerCase())
                    )
                    .filter((item) =>
                        item.userid.toLowerCase().includes(search.toLowerCase())
                    );

                setFilter(uniqueResults);

                try {
                    const newSearchResults = []; // Store combined search results

                    for (const row of uniqueResults) {
                        if (row.userid) {
                            // Fetch data for each unique userId using GET method
                            const req = await fetch(`${baseURLProd}SearchSFAspinGameByUserId?UserId=${row.userid}`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });

                            const result = await req.json();
                            if (result.sfaSpinGameList) {
                                newSearchResults.push(...result.sfaSpinGameList);
                            }
                        }
                    }

                    setNewSearchData(newSearchResults);
                } catch (error) {
                    console.log(error);
                }
            } else {
                setFilter(data);
                setNewSearchData([]);
            }
        };

        fetchSearchResults();
    }, [search, data]);

    const downloadCSV = () => {
        const csv = Papa.unparse(filter);

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'SFASpinGame.csv');

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


    // //---------------game enable disable button -------------//
    const handleGameBtn = async () => {
        try {
            let res;
            if (selectgame !== "") {
                // await fetch(`${baseURLProd}Game777_Visibility`, {
                res = await fetch(`${baseURLProd}GameSpin_Visibility`, {
                    method: 'POST',
                    body: JSON.stringify({ gameStatus: selectgame }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log("hello", res.message)
                if (selectgame == '1') {
                    toast.success("Game Enabled Succesfully")
                    setSelectGame("")
                }
                else if (selectgame == '0') {
                    toast.warning("Game disabled Succesfully")
                    setSelectGame("")
                }
            }
            else {
                window.alert("please select to proceed further")
            }
            // fetchData();
        }
        catch (error) {
            console.error('error', error);
        }
    }
    const handleReset = () => {
        setSearch('');
        setFilter(data);
    };

    return {
        filter, search, setSearch, downloadCSV, selectgame, loading,
        setSelectGame, handleGameBtn, handleReset, data, newSearchData
    }
}

export default SpinGameHook

