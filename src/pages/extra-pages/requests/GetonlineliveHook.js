import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const GetonlineagentHook = () => {
  const [data, setData] = useState([]);

  const [openPreview, setOpenPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [loading, setLoading] = useState(true)
  const [bool, setbool] = useState(true);
  const [userid, setUserid] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = (idd) => {
    setOpen(true);
    setUserid(idd);
  }
  const handleClose = () => {
    setOpen(false);
    setUserid('');
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const req = await fetch(`${baseURLProd}GetLiveUsers`, {
        method: "GET",
        'Content-type': "application/json"
      })
      const res = await req.json()
      setLoading(false)
      console.log("res data", res);
      setData(res.liveUsers)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [bool])


  const handleImageClick = (imageUrl) => {
    setPreviewImageUrl(imageUrl);
    setOpenPreview(true);
  };
  const handleClosePreview = () => {
    setOpenPreview(false);
  };
  const handleoffline = async (idd) => {
    // if (confirm("Press of ok to Go-offline.")) {
    //   console.log("hhhh")
    // } else {
    //   return;
    // }
    // console.log(idd);
    handleClose(false);
    try {
      const res = await fetch(`${baseURLProd}SetUserLiveStatusFalse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: idd }),
      })
      const data = await res.json();
      // console.log("data", data.message);
      toast.success("User live status successfully updated.");
      setbool(prev => !prev);

    } catch (error) {
      console.log("Error Message:", error);
      toast.error("Request Approved successfully")
    }
  }
  return {
    data, loading, openPreview, previewImageUrl, handleClosePreview, handleImageClick, handleoffline,
    userid, setUserid, open, setOpen, handleOpen, handleClose
  }
}

export default GetonlineagentHook

