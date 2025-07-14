



// SFAGuessRecordHook.js
import { baseURLProd } from "api/api";
import { set } from "lodash";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const SFAGuessRecordHook = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState([]);
    const [selectgame, setSelectGame] = useState('');
    const [newSearchData, setNewSearchData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            let req = await fetch(`${baseURLProd}Get_MigoBetRecord`);
            const res = await req.json();
            console.log("this is api response for record", res);
            setData(Array.isArray(res.migogameBetList) ? res.migogameBetList : []);
            setFilter(Array.isArray(res.migogameBetList) ? res.migogameBetList : []);
            setLoading(false);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (search) {
                const uniqueResults = data
                    .filter((item, index, self) =>
                        index === self.findIndex((t) => t.userId?.toLowerCase() === item.userId?.toLowerCase())
                    )
                    .filter((item) => item.userId?.toLowerCase().includes(search.toLowerCase()));

                setFilter(uniqueResults);

                try {
                    const results = [];
                    for (const row of uniqueResults) {
                        if (row.userId) {
                            const req = await fetch(`${baseURLProd}SearchUserByUserIDSFAGuess`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ userId: row.userId }),
                            });
                            const result = await req.json();
                            results.push(...result.searchUserByUserIDSFAGuessList);
                        }
                    }
                    setNewSearchData(results);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            } else {
                setFilter(data);
                setNewSearchData([]);
            }
        };

        const debounceFetch = setTimeout(fetchSearchResults, 300);
        return () => clearTimeout(debounceFetch);
    }, [search, data]);

    const downloadCSV = () => {
        if (!filter || filter.length === 0) {
            toast.error("No data available to download");
            return;
        }

        const csvContent =
            "data:text/csv;charset=utf-8," +
            [
                Object.keys(filter[0]).join(','),
                ...filter.map((row) => Object.values(row).join(',')),
            ].join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "SFAgame.csv");
        document.body.appendChild(link);
        link.click();
    };

    const handleGameBtn = async () => {
        try {
            if (selectgame !== "") {
                await fetch(`${baseURLProd}SFA_Guess_Visibility`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ gameStatus: selectgame }),
                });

                toast[selectgame === '1' ? 'success' : 'warning'](
                    selectgame === '1' ? 'Game Enabled Successfully' : 'Game Disabled Successfully'
                );

                setSelectGame("");
            } else {
                window.alert("Please select to proceed further");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleReset = () => {
        setSearch('');
        setFilter(data);
    };

    return {
        filter, search, setSearch, downloadCSV, selectgame,
        setSelectGame, handleGameBtn, handleReset, data, newSearchData,loading
    };
};

export default SFAGuessRecordHook;
