import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import Papa from 'papaparse';

const SFAludoHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [selectgame, setSelectGame] = useState("")
  const [newSearchData, setNewSearchData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      let req = await fetch(`${baseURLProd}SFALudo`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setLoading(false)
      setData(res.sfaLudoRecords);
      setFilter(res.sfaLudoRecords)

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
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.userId.toLowerCase() === item.userId.toLowerCase())
          )
          .filter((item) => item.userId.toLowerCase().includes(search.toLowerCase()));

        setFilter(uniqueResults);

        try {
          const results = [];
          for (const row of uniqueResults) {
            if (row.userId) {
              const req = await fetch(`${baseURLProd}SFALudoSearchByUserId`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: row.userId }),
              });

              const result = await req.json();
              results.push(...result.sfaLudoSearchRecords);
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
    const csv = Papa.unparse(filter);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'SFALudo.csv');

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  // //---------------game enable disable button -------------//
  const handleGameBtn = async () => {

    try {
      if (selectgame !== "") {
        await fetch(`${baseURLProd}UpdateGameStatusSFALudo`, {
          method: 'POST',
          body: JSON.stringify({ gameStatus: selectgame }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (selectgame == '1') {
          toast.success("Game Enabled Succesfully")
          setSelectGame("")
        }
        else if (selectgame == '2') {
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

export default SFAludoHook

