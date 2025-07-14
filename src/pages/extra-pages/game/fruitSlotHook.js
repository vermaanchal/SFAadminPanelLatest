
import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const FruitSlotHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [selectgame, setSelectGame] = useState("")
  const [newSearchData, setNewSearchData] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    setLoading(true)
    try {
      let req = await fetch(`${baseURLProd}Fruitslot_game_UserDetails`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setLoading(false)
      setData(res.fruitslotgameList);
      setFilter(res.fruitslotgameList)

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
              const req = await fetch(`${baseURLProd}SearchUserByUserIDFruitSlot`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: row.userId }),
              });

              const result = await req.json();
              results.push(...result.searchUserByUserIDFruitslotList);
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
    // Format the data for CSV
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(filter[0]).join(','), // Header row
        ...filter.map((row) => Object.values(row).join(',')), // Data rows
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fruitslot.csv");
    document.body.appendChild(link);
    link.click();
  };
  // //---------------game enable disable button -------------//
  const handleGameBtn = async () => {

    try {
      if (selectgame !== "") {
        await fetch(`${baseURLProd}Fruitslot_Visibility`, {
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
        else if (selectgame == '0') {
          toast.warning("Game disabled Succesfully")
          setSelectGame("")
        }
      }
      else {
        window.alert("please select to proceed further")
      }
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
    filter, search, setSearch, downloadCSV, selectgame, setSelectGame, handleGameBtn,
    handleReset, data, newSearchData,loading
  }
}

export default FruitSlotHook
