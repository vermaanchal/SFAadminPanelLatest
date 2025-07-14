import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const ResellerHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [buttonStates, setButtonStates] = useState({});
  const [loading, setLoading] = useState(true);
  // const [id,setId] =useState(null)
  //---------------fetch data---------------//
  const fetchData = async () => {
    setLoading(true);
    try {
      let req = await fetch(`${baseURLProd}GetUserDetails`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setLoading(false);
      setData(res.userList);
      setFilter(res.userList)
    }
    catch (error) {
      console.log(error)
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  //--------------------filter------------------//
  useEffect(() => {
    const result = data.filter((item) => {
      return item.userId.toLowerCase().match(search.toLocaleLowerCase()) || item.name.toLowerCase().match(search.toLocaleLowerCase()) || item.mobile.toLowerCase().match(search.toLocaleLowerCase())
    })
    setFilter(result)
  }, [search])

  //----------------download CSV file-----------------//

  const downloadCSV = () => {
    // Format the data for CSV
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(filter[0]).join(','),
        ...filter.map((row) => Object.values(row).join(',')),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reseller.csv");
    document.body.appendChild(link);
    link.click();
  };

  //-------------select value--------------------
  const handleSelectChange = (e, userId) => {
    const { value } = e.target;
    const newData = filter.map(item => {
      if (item.userId === userId) {
        return { ...item, resellerTypeId: value };
      }
      return item;
    });
    setFilter(newData);
    setButtonStates(prevStates => ({ ...prevStates, [userId]: !!value }));
  };

  // //---------------create Reseller-------------//
  const handleSubmit = async (userId) => {
    try {
      for (const row of filter) {
        if (row.resellerTypeId) {
          await fetch(`${baseURLProd}CreateReseller`, {
            method: 'POST',
            body: JSON.stringify({ resellerTypeId: row.resellerTypeId, userId: row.userId }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        }
      }
      toast.success("Reseller created Succesfully")
      setButtonStates(prevStates => ({ ...prevStates, [userId]: false }));
      setSearch("")
      fetchData();
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
    filter, search, setSearch, downloadCSV, setFilter, handleSubmit,
     handleSelectChange, data, handleReset,buttonStates,loading
  }
}

export default ResellerHook
