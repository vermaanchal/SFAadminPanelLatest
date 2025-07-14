
import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";


const SendingReportHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [newSearchData, setNewSearchData] = useState([])

  const fetchData = async () => {
    setLoading(true)
    try {
      let req = await fetch(`${baseURLProd}HostSendingRecord`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setData(res.hostSendingList);
      setFilter(res.hostSendingList)
      setLoading(false)
    }
    catch (error) {
      console.log(error)
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
          .filter((item) => item.userId.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase()));
          
        setFilter(uniqueResults);
  
        try {
          const results = [];
          for (const row of uniqueResults) {
            if (row.userId) {
              const req = await fetch(`${baseURLProd}Search_SendingReport`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: row.userId }),
              });
  
              const result = await req.json();
              results.push(...result.sendingReport);
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
    link.setAttribute("download", "sendingreport.csv");
    document.body.appendChild(link);
    link.click();
  };
  //-----------------date picker---------------//
  const handleFilter = () => {
    const filtered = data.filter(item => {
      const parts = item.date.split('-');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);

      const date = new Date(year, month, day);

      let from = fromDate ? new Date(fromDate) : null;
      let to = toDate ? new Date(toDate) : null;

      if (from) {
        from.setHours(0, 0, 0, 0);
      }
      if (to) {
        to.setHours(23, 59, 59, 999);
      }
      return (!from || date >= from) && (!to || date <= to);
    });

    setFilter(filtered);
  };
  const handleReset = () => {
    if (fromDate && toDate) {
      setFromDate("")
      setToDate("")
      fetchData()
    }
    else if (search) {
      setSearch('');
      setFilter(data);
    }
  };
  return {
    filter, search, setSearch, downloadCSV, handleFilter, fromDate,
    toDate, setFromDate, setToDate, handleReset, data,loading,newSearchData
  }
}
export default SendingReportHook
