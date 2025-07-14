
import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'

const AudioStreamingHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [message, setmessage] = useState("")
  const [searchType, setSearchType] = useState("default");
  const [dateFilterData, setDateFilterData] = useState([]);
  const [toDate, setToDate] = useState('');
  const [fromDate, setFromDate] = useState('');

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const req = await fetch(`${baseURLProd}AudioStreamingDetails`, {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
        },
      });

      const text = await req.text(); // Read raw text
      if (!text) {
        setmessage("No data available (empty response)");
        return;
      }

      const res = JSON.parse(text);
      console.log("assad", res)
      if (res.status === true) {
        setLoading(false);
        setData(res?.audioStreamingList || []);
        setFilter(res?.audioStreamingList || []);
      } else {
        setmessage("No data is available");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setmessage("Error fetching data");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData()
  }, [])
  //------------------------serach by userid-----------//

  useEffect(() => {
    const result = data?.filter((item) => {
      return item.userId.toLowerCase().match(search.toLocaleLowerCase())
    })
    setFilter(result)
  }, [search])

  // ----------------CSV file download---------------------//

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
    link.setAttribute("download", "audioStreaming.csv");
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
      const response = await fetch(`${baseURLProd}Fetch_AudioUsageReport`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const result = await response?.json();
        setDateFilterData(result?.audioUsageReports);
        setSearchType("dateFilter");

      } else {
        console.error("API Error:", response.status);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const handleViewMore = (userId) => {
    window.location.href = `/ViewMoreAudioReportResponse/${userId}`;

  }
  const handleViewToday = async (userId) => {
    // window.location.href = `/useraudiostreaming/${userId}`;
    window.location.href = `/UserTodayAudioStreamingDetails/${userId}`;
  };

  const handleViewMonthly = async (userId) => {
    // window.location.href = `/audiomonthlyreport/${userId}`;
    window.location.href = `/UserMonthlyAudioStreamingDetails/${userId}`;
  };

  const handleReset = () => {
    setSearch('');
    setFilter(data);
    setFromDate("")
    setToDate("")
  }
  return {
    filter, search, setSearch, downloadCSV, handleViewToday, handleViewMonthly, message, handleViewMore,
    searchType, handleFilter, dateFilterData, setFromDate, fromDate, setToDate, toDate, loading, handleReset
  }
}

export default AudioStreamingHook
