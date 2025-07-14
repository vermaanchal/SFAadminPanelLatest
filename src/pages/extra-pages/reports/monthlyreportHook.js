
import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";


const MOnthlyReportHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [toDate, setToDate] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [loading, setLoading] = useState(true)
  const [newSearchData, setNewSearchData] = useState([])
  const [searchType, setSearchType] = useState("default");
  const [dateFilterData, setDateFilterData] = useState([]);
  const fetchData = async () => {
    setLoading(true)
    try {
      let req = await fetch(`${baseURLProd}MonthlySenderReport`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setLoading(false)
      setData(res.senderReportList);
      setFilter(res.senderReportList)
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


  useEffect(() => {
    const fetchSearchResults = async () => {
      if (search) {
        const uniqueResults = data
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.senderId.toLowerCase() === item.senderId.toLowerCase())
          )
          .filter((item) => item.senderId.toLowerCase().includes(search.toLowerCase()));

        setFilter(uniqueResults);

        try {
          const results = [];
          for (const row of uniqueResults) {
            if (row.senderId) {
              const req = await fetch(`${baseURLProd}SearchSenderMonthlyReport`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: row.senderId }),
              });

              const result = await req.json();
              results.push(...result.senderList);
            }
          }
          setNewSearchData(results);
          setSearchType("search");
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
    link.setAttribute("download", "Receivingreport.csv");
    document.body.appendChild(link);
    link.click();
  };
  //-----------------date picker---------------//
  const handleFilter = async () => {
    const payload = {
      fromDate: fromDate || null,
      toDate: toDate || null,
    };

    try {
      const response = await fetch(`${baseURLProd}SearchSenderMonthlyReport1`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        setDateFilterData(result.senderMonthlyReports);
        setSearchType("dateFilter");

      } else {
        console.error("API Error:", response.status);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
  const handleMonthlyReceiver = async () => {
    window.location.href = `/MonthlyReceiverReport`;
  };
  const handleReset = () => {
    if (fromDate && toDate) {
      setToDate("")
    }
    else {
      setSearch('');
      setFilter(data);
    }
  }

  return {
    filter, search, setSearch, downloadCSV, setToDate,
    handleMonthlyReceiver, handleReset, data, loading,
    newSearchData, searchType, handleFilter, dateFilterData, setFromDate, fromDate
  }
}

export default MOnthlyReportHook
