
import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";


const ReceivingReportHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [newSearchData, setNewSearchData] = useState([])  
  const [searchType, setSearchType] = useState("default");
  const [dateFilterData, setDateFilterData] = useState([]); 
  const fetchData = async () => {
    setLoading(true)
    try {
      let req = await fetch(`${baseURLProd}HostReceivingRecord`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setData(res.hostReceivingList);
      setFilter(res.hostReceivingList)
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
              const req = await fetch(`${baseURLProd}Search_HostReceivingReport`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: row.userId }),
              });
  
              const result = await req.json();
              results.push(...result.reportList);
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
      const response = await fetch(`${baseURLProd}Search_HostMonthlyReport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response.json();
        setDateFilterData(result.monthlyReports);
        setSearchType("dateFilter");
        
      } else {
        console.error("API Error:", response.status);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };
  const handleAdminRecieving = async () => {
    window.location.href = `/AdminReport`;
  };

  const handleAgencyRecieving = async () => {
    window.location.href = `/AgencyReport`;
  };
  const handleAllRecieving = async () => {
    window.location.href = `/AllReceiving`;
  };
  const handleReset = () => {
    if (fromDate && toDate) {
      setFromDate("")
      setToDate("")
    }
    else {
      setSearch('');
      setFilter(data);
    }
  }

  return {
    filter, search, setSearch, downloadCSV, handleFilter, fromDate, toDate, setFromDate, setToDate,
    handleAdminRecieving, handleAgencyRecieving, handleReset, data, loading,
    handleAllRecieving,newSearchData,searchType,dateFilterData
  }
}

export default ReceivingReportHook
