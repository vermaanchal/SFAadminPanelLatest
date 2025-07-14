import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const CoinResellingHook = () => {
  const [filter, setFilter] = useState('');
  const [userId, setUserId] = useState('');
  const [show, setShow] = useState(false);
  // const [data,setData] =useState([]);
  const [newSearchData,setnewSearchdata] = useState([])
  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  // const fetchData= async()=>{
  //   try{
  //     let req = await fetch(`${baseURLProd}Add_DeductBeansUserDetails`,{
  //       method:"GET",
  //       "Content-Type":'application/json',
  //     })
  //     const res =await req.json()
  //     setData(res.userList);
  //     setFilter(res.userList)
  //   }
  //   catch (error){
  //     console.log(error)
  //   }
  // }
  // useEffect(()=>{
  //   fetchData()
  // },[])

  const handleButtonClick = async () => {
    if (userId.length === 7) {
      try {
        const response = await fetch(`${baseURLProd}SearchResellerByUserId`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId })
        });
        const data = await response.json();
        setFilter(data);
        setnewSearchdata(data);
        setShow(true); 
      } catch (error) {
        console.error('Error:', error);
        setShow(true);
      }
    } else {
      setShow(false);
    }
  };
  
  useEffect(() => {
    if (userId) {
      handleButtonClick();
    } else {
      setShow(false);
    }
  }, [userId]);

  //----------------download CSV file-----------------//
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
    link.setAttribute("download", "CoinReselling.csv");
    document.body.appendChild(link);
    link.click();
  };
  //  //-------------select value--------------------

  const handleChange = (e, userId) => {
    const { value } = e.target;
    const validNumberPattern = /^[0-9]*$/;
    if (!validNumberPattern.test(value)) {
      window.alert("Coin Amount should be in number only");
    }
    else if(parseInt(value, 10) === 0){
      window.alert("Coin Amount should be greater than 0");
      return;
    }
    else if (!isNaN(value) && Number(value) <= 50000000) {
      const newData = { ...filter };
      if (newData.userId === userId) {
        newData.coinAmount = value;
      }
      // setnewSearchdata(newData);
      setFilter(newData)
    }
    else {
      window.alert("Coin Amount can't exceed 50 Million");

    }
  };

  // //---------------Add Reseller-------------//
  const handleSubmit = async () => {

    try {
        // if (!newSearchData.userId || !newSearchData.coinAmount) {
          if (!filter.userId || !filter.coinAmount) {
          alert('please enter the coin amount');
          return;
        }
      if (window.confirm("Are you sure to Add coins")) {
      await fetch(`${baseURLProd}AddResellerCoin`, {
        method: 'POST',
        body: JSON.stringify({ userId: filter.userId, coinAmount: filter.coinAmount }),
        // body: JSON.stringify({ userId: newSearchData.userId, coinAmount: newSearchData.coinAmount }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
        toast.success("Reseller coin Added Succesfully")
        handleButtonClick()
      }
    }
    catch (error) {
      console.error('error', error);
    }
  }
  return {
    downloadCSV, handleSubmit,
    filter, setFilter, handleUserIdChange, handleButtonClick,
     userId, handleChange, show,newSearchData
  }
}

export default CoinResellingHook
