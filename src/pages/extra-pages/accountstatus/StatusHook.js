import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Papa from 'papaparse';
const StatusHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [openPreview, setOpenPreview] = useState(false);
  const [idBanUserid, setIdbanUserid] = useState("")
  const [blockDuration, setBlockDuration] = useState('');
  const [idBanReason, setIdBanReason] = useState("")
  const [validationMessage, setValidationMessage] = useState('');
const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    setLoading(true)
    try {
      let req = await fetch(`${baseURLProd}IDBanUnBanUserDetails`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setLoading(false)
      setData(res.appUserIDBanUnbanList);
      setFilter(res.appUserIDBanUnbanList)
    }
    catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  //---------------filter data on search-------------//
  useEffect(() => {
    const result = data.filter((item) => {
      return item.userId.toLowerCase().match(search.toLocaleLowerCase()) || item.name.toLowerCase().match(search.toLocaleLowerCase()) || item.mobile.toLowerCase().match(search.toLocaleLowerCase())
    })
    setFilter(result)
  }, [search])

  const handleInputChange = (e) => {
    setIdBanReason(e.target.value);
    if (e.target.value.trim() !== '') {
      setValidationMessage('');
    }
  };
  // useEffect(() => {
  //   if (row && row.blockDuration) {
  //     setBlockDuration(row.blockDuration);
  //   }
  // }, [row.blockDuration]);
  
  const handleDurationChange = (event, row) => {
    const selectedValue = event.target.value;
    const normalizedValue = selectedValue === "30 mins" ? "30 Minutes" : selectedValue;
  
    setBlockDuration(normalizedValue);
    row.blockDuration = normalizedValue;
  };
  //-----------request Approve ---------------//
  const handleIdBan = async () => {
    try {
      if (window.confirm("Are you sure to Ban this Id ?")) {
        await fetch(`${baseURLProd}IdBan`, {
          method: 'POST',
          body: JSON.stringify({ userID: idBanUserid, idBanReason: idBanReason, BlockDuration: blockDuration }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const rowIndex = data.findIndex(item => item.userId === idBanUserid);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status = 'False';
          toast.success("Id Banned successfully")
          setData(updatedData);
          setFilter(updatedData)
          fetchData();
          setSearch('')
          handleClosePreview()
        }
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };
  const handleBanClick = () => {
    if (idBanReason.trim() === '') {
      setValidationMessage('Please enter the IdBan reason !');
    } else {
      handleIdBan();
    }
  };
  // -----------------request Reject--------------//
  const handleIdUnban = async (userId) => {
    try {
      if (window.confirm("Are you sure to Unban this Id?")) {
        await fetch(`${baseURLProd}IdUnBan`, {
          method: 'POST',
          body: JSON.stringify({ userID: userId }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const rowIndex = data.findIndex(item => item.userId === userId);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status = 'True';
          toast.success("Id UnBanned successfully")
          setData(updatedData);
          setFilter(updatedData)
          setSearch('')
          fetchData();
        }
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };
  const handleClosePreview = () => {
    setIdBanReason("")
    setOpenPreview(false);
  };
  const handlePopup = (userId) => {
    setIdbanUserid(userId)
    setOpenPreview(true);
  };
  //----------download csv---------------------//
  const downloadCSV = () => {
    const csv = Papa.unparse(filter);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'Id_banUnban.csv');

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};

  const handleReset = () => {
    setSearch('');
    setFilter(data);
  };
  return {
    filter, search, setSearch, handleIdBan, handlePopup, handleBanClick, handleInputChange, validationMessage,
    handleIdUnban, downloadCSV, openPreview, handleClosePreview, idBanReason, setIdBanReason, handleReset, data,
    handleDurationChange,blockDuration,loading
  }
}

export default StatusHook

