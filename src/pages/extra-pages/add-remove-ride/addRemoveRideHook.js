import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const AddRemoveRideHook = () => {
  const [filter, setFilter] = useState('');
  const [userId, setUserId] = useState('');
  const [show, setShow] = useState(false);
  const [rideOption, setRIdeOption] = useState([])
  const [duration, setDuration] = useState('')
  const [rideId, setRideId] = useState('')

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };


  const handleButtonClick = async () => {
    if (userId.length === 7) {
      try {
        const response = await fetch(`${baseURLProd}SearchUserByUserIdForRide`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId })
        });
        const data = await response.json();
        // console.log("data", data);
        setFilter(data);
        setRIdeOption(data.rideList)
        setShow(true)
      } catch (error) {
        console.error('Error:', error);
        setShow(true)
      }
    }
    else {
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
    link.setAttribute("download", "add/removeRide.csv");
    document.body.appendChild(link);
    link.click();
  };
  //-------------select value--------------------
  const handleSelectChange = (e, userId) => {
    const { value } = e.target;
    const newData = { ...filter };
    if (newData.userId === userId) {
      newData.rideId = value;
      setRideId(value)
    }
    setFilter(newData);
  };

  // //---------------Add Frame-------------//
  const handleAddRide = async () => {

    try {
      if (!rideId) {
        window.confirm("please select rideId ")
      }
      if (rideId) {
        await fetch(`${baseURLProd}SendRideToUser`, {
          method: 'POST',
          body: JSON.stringify({
            userId: filter.userId, rideId: rideId,
            duration: duration, adminId: "123456"
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        toast.success("Ride Added Succesfully")
        setRideId("")
        setDuration('')
        handleButtonClick()
      }
    }
    catch (error) {
      console.error('error', error);
    }
  }

  // //---------------Remove Frame-------------//
  const handleRemoveRide = async () => {

    try {
      if (!rideId) {
        window.confirm("Nothing is selected ")
      }
      if (rideId) {
        await fetch(`${baseURLProd}RemoveRideToUser`, {
          method: 'POST',
          body: JSON.stringify({
            userId: filter.userId, rideId: rideId,
            adminId: "123456"
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        toast.success("Ride Removed Succesfully")
        setRideId("")
        setDuration('')
        handleButtonClick()
      }
    }
    catch (error) {
      console.error('error', error);
    }
  }
  return {
    downloadCSV, rideOption, setDuration, duration, handleAddRide, handleDurationChange, handleRemoveRide,
    filter, setFilter, handleButtonClick, userId, show, handleUserIdChange, handleSelectChange, rideId
  }
}

export default AddRemoveRideHook
