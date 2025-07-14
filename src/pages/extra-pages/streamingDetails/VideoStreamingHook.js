
import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'

const VideoStreamingHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [message,setmessage]=useState("")
  const [searchType, setSearchType] = useState("default");
  const [dateFilterData, setDateFilterData] = useState([]); 
  const [toDate, setToDate] = useState('');
  const [fromDate, setFromDate] = useState('');

    const fetchData= async()=>{
        const req= await fetch(`${baseURLProd}VideoStreamingDetails`,{
            method:"GET",
            'Content-type':"application/json"
        })
        const res =await req.json()
        if(res.status == true){
        setData(res?.audioStreamingList)
        setFilter(res?.audioStreamingList)
        }
        else{
          setmessage("No data is available")
      }
    }
    useEffect(()=>{
        fetchData()
    },[])
 //------------------------serach by userid-----------//

 useEffect(() => {
  const result = data.filter((item) => {
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
  link.setAttribute("download", "videoStreaming.csv");
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
    const response = await fetch(`${baseURLProd}Fetch_VideoUsageReport`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const result = await response.json();
      setDateFilterData(result.videoUsageReports);
      setSearchType("dateFilter");
      
    } else {
      console.error("API Error:", response.status);
    }
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

const handleViewToday = async (userId) => {
  window.location.href = `/uservideostreaming/${userId}`;
};

const handleViewMonthly = async (userId) => {
  window.location.href = `/videomonthlyreport/${userId}`;
};

  return {
    filter, search, setSearch,downloadCSV,handleViewToday,handleViewMonthly,message,
    searchType,handleFilter,dateFilterData,setFromDate,fromDate,setToDate,toDate
  }
}

export default VideoStreamingHook
