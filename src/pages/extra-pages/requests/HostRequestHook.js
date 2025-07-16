import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const HostRequestHook = () => {
  const [search, setSearch] = useState('')
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([])

  const [openPreview, setOpenPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [phone, setPhone] = useState('');
  const [agencyCode, setAgencyCode] = useState('');
  const [hostCode, setHostCode] = useState('');
  const [status, setStatus] = useState('');
  const [showApproveButton, setShowApproveButton] = useState(true);
  const [showRejectButton, setShowRejectButton] = useState(true);
  const [loading, setLoading] = useState(true);

  const [audioprice, setAudioPrice] = useState("")
  const [videoprice, setVideoPrice] = useState("")
  const [adminCommision, setAdmincommision] = useState("")

  const navigate = useNavigate();

  //---------------------fetch data---------------//

  const fetchData = async () => {
    setLoading(true)
    try {
      let req = await fetch(`${baseURLProd}HostRequest`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      if (res.status) {
        setData(res.hostRequestList);
        setFilter(res.hostRequestList)
      }
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
  //------------------------serach by userid-----------//

  useEffect(() => {
    const result = data.filter((item) => {
      const i_search = search.toLocaleLowerCase();
      return item.userId.toLowerCase().match(i_search) || item.name.toLowerCase().includes(i_search) || item.phone.toLowerCase().includes(i_search);
    })
    setFilter(result)
  }, [search])


  //---------------approve-------------------//

  const handleApprove = async (row) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Approve Host Request?",
        text: `Are you sure you want to approve the request for "${row?.name}" (User ID: ${row?.userId})?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, approve it!",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#28a745",
        cancelButtonColor: "#95a5a6",
      });

      if (!isConfirmed) return;

      const res = await fetch(`${baseURLProd}HostRequestApprove`, {
        method: 'POST',
        body: JSON.stringify({ agencyCode: row?.agencyCode, userId: row?.userId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res) {
        const rowIndex = data.findIndex(item => item.agencyCode === row?.agencyCode);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status1 = 'Approve';
          toast.success("Host request approved successfully!");

          setSearch('');
          setData(updatedData);
          setFilter(updatedData);
          fetchData();
        }

        localStorage.setItem("approveData", JSON.stringify({ selectedRow: row }));
        navigate("/ApproveHostRequest", {
          state: { selectedRow: row }
        });
      } else {
        throw new Error("Approval failed");
      }
    } catch (error) {
      console.error('Error approving request:', error);
      Swal.fire("Failed!", "An error occurred while approving the request.", "error");
    }
  };

  //--------------------reject ------------------------//
  const handleReject = async (agencyCode, userId) => {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Reject Host Request?",
        text: `Are you sure you want to reject the request for User ID: ${userId}? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, reject it!",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#95a5a6",
      });

      if (!isConfirmed) return;

      const res = await fetch(`${baseURLProd}HostRequestReject`, {
        method: 'POST',
        body: JSON.stringify({ agencyCode, userId }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.ok) {
        const rowIndex = data.findIndex(item => item.agencyCode === agencyCode && item.userId === userId);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status1 = 'Reject';
          toast.success("Host request rejected successfully!");

          setSearch("");
          setData(updatedData);
          setFilter(updatedData);
          fetchData();
        }
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      Swal.fire("Failed!", "An error occurred while rejecting the request.", "error");
    }
  };

  //----------------------image download-------------------//

  const handleDownload = (imageUrl, imageName) => {
    fetch(imageUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const link = document.createElement('a');
        const objectURL = URL.createObjectURL(blob);
        link.href = objectURL;
        link.download = imageName;
        link.click();
        URL.revokeObjectURL(objectURL);
      })
      .catch(error => console.error('Error downloading image:', error));
  };

  //--------------------image preview------------------//
  const handleImageClick = (imageUrl) => {
    setPreviewImageUrl(imageUrl);
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };
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
    link.setAttribute("download", "host_request.csv");
    document.body.appendChild(link);
    link.click();
  };
  //----------------get user detail---------------//
  const handleEdit = async (userId, name, phone, type, agencyCode, hostCode) => {
    setOpen(true);
    setUserId(userId)
    setName(name)
    setPhone(phone)
    setType(type)
    setAgencyCode(agencyCode)
    setHostCode(hostCode)

  }
  //-----------------------edit user detail ------------------//
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (window.confirm("Are you sure to change the host details ?")) {
        const response = await fetch(`${baseURLProd}EditHostrequest`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: userId,
            name: name,
            type: type,
            phone: phone,
            agencyCode: agencyCode,
            hostCode: hostCode,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to edit user details');
        }

        await response.json();

        fetchData()
        setOpen(false);
        setUserId("")
        setName("")
        setPhone("")
        setType("")
        setAgencyCode("")
        setHostCode("")
        toast.success("Host details changed ")
      }
    } catch (error) {
      console.log(error.message);
    }

  };
  const handleClose = () => {
    setOpen(false)
  }
  const handleStatusChange = (status) => {
    setStatus(status);
    console.log("status", status)
    setShowApproveButton(true); // Reset to default
    setShowRejectButton(true); // Reset to default
  };

  const handlefilterSubmit = () => {

    if (status && data) {

      const filtered = data.filter(item => item.status1 === status);

      setFilter(filtered);

      if (status === 'Approve') {
        setShowRejectButton(false);
      } else if (status === 'Reject') {
        setShowApproveButton(false);
      }
    } else {
      setFilter(data);
      setShowApproveButton(true);
      setShowRejectButton(true);
    }
  };
  const handleReset = () => {
    setSearch('');
    setStatus("")
    setFilter(data);
  };

  return {
    filter, search, setSearch, openPreview, setOpenPreview, previewImageUrl, setPreviewImageUrl,
    handleClosePreview, handleDownload, handleImageClick, handleApprove,
    handleReject, downloadCSV, handleEdit, handleSubmit, handleClose,
    open, userId, name, type, agencyCode, hostCode, phone, setOpen, setUserId, setName, setType,
    setAgencyCode, setHostCode, setPhone, data, handleReset, handleStatusChange, handlefilterSubmit, status,
    showApproveButton, showRejectButton, loading,
    audioprice, videoprice, adminCommision,
    setAudioPrice, setVideoPrice, setAdmincommision
  }
}

export default HostRequestHook

