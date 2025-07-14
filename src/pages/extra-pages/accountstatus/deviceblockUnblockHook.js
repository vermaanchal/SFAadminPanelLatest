import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Papa from 'papaparse';
import { set } from 'lodash';

const DeviceIdBlockUnblockHook = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true);
  //---------------------fetch data---------------//

  const fetchData = async () => {
    setLoading(true)
    try {
      let req = await fetch(`${baseURLProd}GetDeviceBlockUserDetails`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      // console.log("jk",res.deviceBlockUserList)
      setLoading(false)
      setData(res.deviceBlockUserList);
      setFilter(res.deviceBlockUserList)
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
  //   //------------------------serach by userid-----------//
  useEffect(() => {
    const result = data.filter((item) => {
      return item.userId.toLowerCase().match(search.toLocaleLowerCase()) || item.name.toLowerCase().includes(search.toLocaleLowerCase()) || item.mobile.toLowerCase().includes(search.toLowerCase());
    })
    setFilter(result)
  }, [search])

  //---------------Block-------------------//
  const handleBlock = async ({ deviceId, userId }) => {
    try {
      if (window.confirm("Are you sure to Block this Id?")) {
        const req = await fetch(`${baseURLProd}UserDeviceIdBlock`, {
          method: 'POST',
          body: JSON.stringify({ deviceId: deviceId, userId: userId }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const res = await req.json()
        if (res.status == true) {
          const rowIndex = data.findIndex(item => item.deviceId === deviceId && item.userId === userId);
          if (rowIndex !== -1) {
            const updatedData = [...data];
            console.log(updatedData, 'updateee')

            updatedData[rowIndex].status = 'False';
            toast.success("Id blocked Successfully")
            setData(updatedData);
            setFilter(updatedData);
            setSearch('')
          }
          fetchData()
        }
        else {
          toast.error("device Id not found")
        }
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  //--------------------reject ------------------------//
  const handleUnblock = async ({ deviceId, userId }) => {
    try {
      if (window.confirm("Are you sure to Unblock this Id?")) {
        await fetch(`${baseURLProd}UserDeviceIdUnBlock`, {
          method: 'POST',
          body: JSON.stringify({ deviceId: deviceId, userId: userId }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const rowIndex = data.findIndex(item => item.deviceId === deviceId);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status = 'True';
          toast.success("ID Unblocked successfully")
          setData(updatedData);
          setFilter(updatedData)
          setSearch('')
        }
        fetchData()
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  // ----------------CSV file download---------------------//

  const downloadCSV = () => {
    const csv = Papa.unparse(filter);

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'deviceblockUnblock.csv');

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
    filter, handleBlock,
    handleUnblock, downloadCSV, handleReset, data, search, setSearch, loading, 
  }
}

export default DeviceIdBlockUnblockHook

