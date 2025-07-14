import { baseURLProd } from "api/api";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const AddRemoveThemeHook = () => {

  const [filter, setFilter] = useState('');
  const [userId, setUserId] = useState('');
  const [show, setShow] = useState(false);
  const [frameOption, setFrameOption] = useState([])
  const [duration, setDuration] = useState('')
  const [frameId, setFrameId] = useState('')

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };


  const handleButtonClick = async () => {
    if (userId.length === 7) {
      try {
        const response = await fetch(`${baseURLProd}UserThemeList`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userId })
        });
        const data = await response.json();
        // console.log("data", data);
        setFilter(data.userThemeList[0]);
        setFrameOption(data.themeList)
        setShow(true);
      } catch (error) {
        console.error('Error:', error);
        setShow(true);
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
    link.setAttribute("download", "add/RemoveFrame.csv");
    document.body.appendChild(link);
    link.click();
  };
  //-------------select value--------------------
  const handleSelectChange = (e, userId) => {
    const { value } = e.target;
    const newData = { ...filter };
    if (newData.userId === userId) {
      newData.frameId = value;
      setFrameId(value)
    }
    setFilter(newData);
  };

  // //---------------Add Frame-------------//
  const handleAddFrame = async () => {

    try {
      if (!frameId) {
        window.confirm("please select frameId ")
      }
      if (frameId) {
        const req = await fetch(`${baseURLProd}SaveUserTheme`, {
          method: 'POST',
          body: JSON.stringify({
            userId: filter.userId, rideId: frameId,
            duration: duration, adminId: "123456"
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const res = await req.json()
        toast.success(res.message)
        setFrameId("")
        setDuration('')
        handleButtonClick()
      }
    }
    catch (error) {
      console.error('error', error);
    }
  }

  // //---------------Remove Frame-------------//
  const handleRemoveFrame = async () => {

    try {
      if (!frameId) {
        window.confirm("Nothing is selected ")
      }
      if (frameId) {
        const req = await fetch(`${baseURLProd}RemoveUserTheme`, {
          method: 'POST',
          body: JSON.stringify({
            userId: filter.userId, rideId: frameId,
            adminId: "123456"
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const res = await req.json()
        toast.success(res.message)
        setFrameId("")
        setDuration('')
        handleButtonClick()
      }
    }
    catch (error) {
      console.error('error', error);
    }
  }
  return {
    downloadCSV, frameOption, setDuration, duration, handleAddFrame, handleDurationChange, handleRemoveFrame,
    filter, setFilter, handleButtonClick, userId, show, handleUserIdChange, handleSelectChange, frameId
  }
}

export default AddRemoveThemeHook
