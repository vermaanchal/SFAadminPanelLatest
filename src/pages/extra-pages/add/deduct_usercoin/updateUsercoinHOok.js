
import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


const UpdateUsercoinHook = () => {
  const [data, setData] = useState([]);
  const [userid, setUserid] = useState('');
  const [action, setAction] = useState('')
  const [amount, setAmount] = useState('');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);
  const [newSearchData, setNewSearchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amounts, setamounts] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    setLoading(true)
    try {
      let req = await fetch(`${baseURLProd}Add_DeductCoinUserDetails`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setLoading(false)
      setData(res.addDeductCoinList);
      setFilter(res.addDeductCoinList)

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

  //--------------------filter------------------//

  const getLatestUniqueUsers = (data) => {
    const userMap = new Map();

    for (const item of data) {
      const existing = userMap.get(item.userId);

      const currentDate = new Date(item.dateTime.split(' ').reverse().join(' '));
      const existingDate = existing ? new Date(existing.dateTime.split(' ').reverse().join(' ')) : null;

      if (!existing || currentDate > existingDate) {
        userMap.set(item.userId, item);
      }
    }

    return Array.from(userMap.values());
  };


  useEffect(() => {
    if (search === '') {
      setFilter(data);
    } else {
      if (search) {
        const f_data = data.filter((item) => item.userId.toLowerCase().includes(search.toLowerCase()) || item.name.toLowerCase().includes(search.toLowerCase()))
        setNewSearchData(getLatestUniqueUsers(f_data));
        console.log("getLatestUniqueUsers(f_data)", getLatestUniqueUsers(f_data))
      }
      if (search.length >= 7) {
        fetchSearchResults();
      }
    }

  }, [search, data]);
  //----------filter on button Click ---------//

  const fetchSearchResults = async () => {
    if (search && search.length >= 7) {
      try {
        let aggregatedResults = [];
        setNewSearchData([]);
        const req = await fetch(`${baseURLProd}SearchByUserIdCoinAmount`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: search })
        });
        const result = await req.json();
        console.log("result", result)
        aggregatedResults.push(result.searchUserCoinAmountList[0]);
        setNewSearchData(aggregatedResults);
        setFilter(aggregatedResults);
      } catch (error) {
        console.log(error)
      }
    }
    else {
      setNewSearchData([])
    }
  };

  //-----------------download CSV-------------//
  const downloadCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(filter[0]).join(','),
        ...filter.map((row) => Object.values(row).join(',')),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Add/deductCoin.csv");
    document.body.appendChild(link);
    link.click();
  };

  const handleChange = (e, userId) => {
    const { value } = e.target;
    const validNumberPattern = /^[0-9]*$/;
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
    else if (!isNaN(value)) {
      const newData = newSearchData.map(item => {
        if (item.userId === userId) {
          item.amount = value;
          setamounts(value)
        }
        return item;
      });
      setFilter(newData);
      setNewSearchData(newData);
    }
  };

  //---------------add Coin-------------//
  // const handleSubmit = async () => {
  //   try {
  //     for (const row of newSearchData) {
  //       if (!row.userId || !row.amount) {
  //         alert('please enter the coin amount');
  //         return;
  //       }
  //       if (row.amount === 0) {
  //         alert('Amount cannot be zero.');
  //         return;
  //       }
  //       if (row.amount > 50000000) {
  //         alert('Amount cannot exceed 50 million.');
  //         return;
  //       }
  //     }
  //     if (window.confirm("Are you sure to add Coins")) {
  //       for (const row of newSearchData) {
  //         if (row.userId && row.amount) {
  //           await fetch(`${baseURLProd}AddCoinAmount`, {
  //             method: 'POST',
  //             body: JSON.stringify({ userId: row.userId, coinAmount: row.amount }),
  //             headers: {
  //               'Content-Type': 'application/json'
  //             }
  //           });
  //         }
  //       }

  //       toast.success("Coins Added successfully");
  //       setamounts("");
  //       setSearch('');
  //       fetchData();
  //     }
  //   } catch (error) {
  //     console.error('Error adding coins:', error);
  //   }
  // }


  const handleSubmit = async () => {
    try {
      for (const row of newSearchData) {
        if (!row.userId || !row.amount) {
          alert('Please enter the coin amount');
          return;
        }
        if (row.amount === 0) {
          alert('Amount cannot be zero.');
          return;
        }
        if (row.amount > 50000000) {
          alert('Amount cannot exceed 50 million.');
          return;
        }
        setUserid(row.userId);
        setAmount(row.amount);
      }
      setAction('Add')
      setOpen(true);
      //   if (window.confirm("Are you sure to add Coins")) {
      //     for (const row of newSearchData) {
      //       if (row.userId && row.amount) {
      //         const response = await fetch(`${baseURLProd}AddCoinAmount`, {
      //           method: 'POST',
      //           body: JSON.stringify({ userId: row.userId, coinAmount: row.amount }),
      //           headers: {
      //             'Content-Type': 'application/json'
      //           }
      //         });

      //         const result = await response.json();
      //         console.log(`Response for user ${row.userId}:`, result);
      //       }
      //     }

      //     toast.success("Coins Added successfully");
      //     setamounts("");
      //     setSearch('');
      //     fetchData();
      //   }
    } catch (error) {
      console.error('Error adding coins:', error);
    }
  };
  const handleaddcoin = async () => {
    console.log("row.userId && row.amount", userid, amount)
    try {
      if (userid && amount) {
        const response = await fetch(`${baseURLProd}AddCoinAmount`, {
          method: 'POST',
          body: JSON.stringify({ userId: userid, coinAmount: amount }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const result = await response.json();
        console.log(`Response for user ${userid}:`, result);
      }
      toast.success("Coins Added successfully");
      setOpen(false);
      setUserid("");
      setamounts("");
      setSearch('');
      fetchData();
    } catch (error) {
      console.log("error", error);
    }
  };

  //---------------deduct beans-------------//
  const handleDeductCoin = async () => {
    try {
      for (const row of newSearchData) {
        if (!row.userId || !row.amount) {
          alert('please enter the coin amount');
          return;
        }
        const amount = Number(row.amount);
        const availableCoins = Number(row.availableCoins);

        if (amount > availableCoins) {
          alert('Entered amount should not be more than available coins.');
          return;
        }
        setUserid(row.userId);
        setAmount(row.amount);
      }
      setAction('Deduct')
      setOpen(true);
      // if (window.confirm("Are you sure to deduct Coins")) {
      //   for (const row of newSearchData) {
      //     if (row.userId && row.amount) {
      //       await fetch(`${baseURLProd}DeductCoinAmount`, {
      //         method: 'POST',
      //         body: JSON.stringify({ userId: row.userId, coinAmount: row.amount }),
      //         headers: {
      //           'Content-Type': 'application/json'
      //         }
      //       });
      //     }
      //   }
      //   toast.success("Coins deducted successfully");
      //   setamounts("")
      //   setSearch('');
      //   fetchData();
      // }
    } catch (error) {
      console.error('Error adding beans coins:', error);
    }
  }

  const handleDeduct = async () => {
    console.log("row.userId && row.amount", userid, amount)
    try {
      if (userid && amount) {
        const response = await fetch(`${baseURLProd}DeductCoinAmount`, {
          method: 'POST',
          body: JSON.stringify({ userId: userid, coinAmount: amount }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        // const result = await response.json();
        // console.log(`Response for user ${userid}:`, result);
        toast.success("Coins deducted successfully");
        setOpen(false);
        setUserid("");
        setamounts("");
        setSearch('');
        fetchData();
      }
    } catch (error) {
      console.error('Error adding beans coins:', error);
    }
  };

  const handleReset = () => {
    setSearch('');
    setFilter(data);
  };

  return {
    filter, search, setSearch, downloadCSV, handleChange, handleSubmit, handleDeductCoin
    , newSearchData, data, setFilter, setNewSearchData, handleReset, amounts, loading, fetchSearchResults, open, setOpen, handleOpen,
    handleClose, action, handleaddcoin, handleDeduct
  }
}

export default UpdateUsercoinHook
