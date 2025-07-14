import { useEffect, useState } from 'react';
import { baseURLProd } from 'api/api';

const PlaystorePurchaseHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [newSearchData, setNewSearchData] = useState([])
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true);
    try {
      let req = await fetch(`${baseURLProd}PlayStoreRecord`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setLoading(false);
      setData(res?.apiAddedCoinDetails);
      setFilter(res?.apiAddedCoinDetails)
    }
    catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (search) {
        const uniqueResults = data
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.userId.toLowerCase() === item.userId.toLowerCase())
          )
          .filter((item) => item.userId.toLowerCase().includes(search.toLowerCase()));

              //  ||  item.name.toLowerCase().includes(search.toLowerCase()))
        setFilter(uniqueResults);
        try {
          const results = [];
          for (const row of uniqueResults) {
            if (row.userId) {
              const req = await fetch(`${baseURLProd}search_PlayStoreRecords`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: row.userId }),
              });

              const result = await req?.json();
              results.push(...result?.userCoinRecords);
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
        Object.keys(filter[0])?.join(','), // Header row
        ...filter?.map((row) => Object.values(row).join(',')), // Data rows
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "playStorePurchaseRecord.csv");
    document.body.appendChild(link);
    link.click();
  };
  const handleReset = () => {
    setSearch('');
    setFilter(data);
  };
  return {
    setSearch,
    downloadCSV, filter, search, handleReset, data, newSearchData,loading
  }
}

export default PlaystorePurchaseHook
