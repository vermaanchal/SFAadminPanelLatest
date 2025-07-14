import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const DeductResellerHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [buttonStates, setButtonStates] = useState({});
  const [loading, setLoading] = useState(true);

  //---------------fetch data---------------//
  const fetchData = async () => {
    setLoading(true);
    try {
      let req = await fetch(`${baseURLProd}GetResellerDetails`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setLoading(false);
      setData(res.appResellerList);
      setFilter(res.appResellerList);

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

  //--------------------filter------------------//
  useEffect(() => {
    const result = data.filter((item) => {
      return item.userId.toLowerCase().match(search.toLocaleLowerCase()) || item.name.toLowerCase().match(search.toLocaleLowerCase())
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
    link.setAttribute("download", "deductReseller.csv");
    document.body.appendChild(link);
    link.click();
  };

  //-------------select value--------------------
  const handleChange = (e, userId) => {
    const { value } = e.target;
    const validNumberPattern = /^[0-9]*$/;

    // Check if the value contains a plus sign
    if (/[+]/.test(value)) {
      window.alert("Coin Amount should not contain a + sign");
      return;
    }
    if (!validNumberPattern.test(value)) {
      window.alert("Coin Amount should be in number only");
    }
    else if (parseInt(value, 10) === 0) {
      window.alert("Coin Amount should be greater than 0");
      return;
    }
    else if (!isNaN(value) && Number(value) <= 50000000) {
      const newData = filter.map(item => {
        if (item.userId === userId) {
          return { ...item, coinAmount: value };
        }
        return item;
      });
      setFilter(newData);
      setButtonStates(prevStates => ({ ...prevStates, [userId]: !!value }));

    } else {
      window.alert("Coin Amount can't exceed 50 Million");
    }
  };

  //---------------deduct Reseller-------------//
  const handleSubmit = async (userId) => {
    try {
      if (window.confirm("Are you sure to Deduct coins")) {
        for (const row of filter) {
          if (row.userId && row.coinAmount) {
            await fetch(`${baseURLProd}DeductResellerCoin`, {
              method: 'POST',
              body: JSON.stringify({ userId: row.userId, coinAmount: row.coinAmount }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
          }
        }
        toast.success("Reseller coins deducted successfully");
        fetchData();
        setSearch("");
        setButtonStates(prevStates => ({ ...prevStates, [userId]: false }));

      }
    } catch (error) {
      console.error('Error deducting reseller coins:', error);
    }
  }
  const handleReset = () => {
    setSearch('');
    setFilter(data);
  };

  return {
    filter, search, setSearch, downloadCSV, setFilter, handleSubmit, handleChange, fetchData,
    data, handleReset, buttonStates, loading
  }
}

export default DeductResellerHook
