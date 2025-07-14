import { baseURLProd } from 'api/api';
import { set } from 'lodash';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
 
const AgencyRequestHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [open, setOpen] = useState(false)
  const [alertopen, setAlertOpen] = useState(false)
  const [userId, setUserId] = useState('');
  const [agencyName, setAgencyName] = useState('');
  const [userName, setUserName] = useState('');
  const [agencyLocation, setAgencyLocation] = useState('');
  const [agencyContact, setAgencyContact] = useState('');
  const [agencyEmail, setAgencyEmail] = useState('');
  const [hostYouHave, setHostYouHave] = useState('');
  const [adminId, setAdminId] = useState('');
  const [agencyCode, setAgencyCode] = useState('');
  const [status, setStatus] = useState('');
  const [showApproveButton, setShowApproveButton] = useState(true);
  const [showRejectButton, setShowRejectButton] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true)
    try {
      let req = await fetch(`${baseURLProd}AgencyRequest`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setLoading(false)
      setData(res.agencyRequestList);
      setFilter(res.agencyRequestList)
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

  useEffect(() => {
    const result = data.filter((item) => {
      const i_search = search.toLocaleLowerCase()
      return item.userId.toLowerCase().match(i_search) || item.userName.toLowerCase().includes(i_search) || item.agencyContact.toLowerCase().includes(i_search)
    })
    setFilter(result)
  }, [search])

  const handleReset = () => {
    setSearch('');
    setStatus("")
    setFilter(data);
  };
  const handleApprove = async (userId, agencyCode) => {
    try {
      if (window.confirm("Are you sure to approve the request?")) {
        await fetch(`${baseURLProd}AgencyRequestApprove`, {
          method: 'POST',
          body: JSON.stringify({ AgencyCode: agencyCode, userId: userId }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const rowIndex = data.findIndex(item => item.userId === userId && item.agencyCode === agencyCode);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status = 'Approve';
          toast.success("Request Approved successfully")
          setData(updatedData);
          setFilter(updatedData);
          setSearch('');
        }
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (userId, agencyCode) => {
    try {
      if (window.confirm("Are you sure to Reject the request?")) {
        await fetch(`${baseURLProd}AgencyRequestReject`, {
          method: 'POST',
          body: JSON.stringify({ AgencyCode: agencyCode, userId: userId }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const rowIndex = data.findIndex(item => item.userId === userId);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status = 'Reject';
          toast.success("Request Rejected successfully")
          setSearch('');
          setData(updatedData);
          setFilter(updatedData);
        }
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

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
      .catch(error => {
        console.error('Error fetching image:', error);
      });
  }

  const handleImageClick = (imageUrl) => {
    setPreviewImageUrl(imageUrl);
    setOpenPreview(true);
  };

  const handleClosePreview = () => {
    setOpenPreview(false);
  };
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
    link.setAttribute("download", "adminAgencyHost_request.csv");
    document.body.appendChild(link);
    link.click();
  };

  //----------------get user detail---------------//
  const handleEdit = async (userId, agencyName, userName, agencyLocation, agencyContact, agencyEmail, hostYouHave, adminId, agencyCode) => {
    setOpen(true);
    setUserId(userId)
    setAgencyName(agencyName)
    setUserName(userName)
    setAgencyLocation(agencyLocation)
    setAgencyContact(agencyContact)
    setAgencyEmail(agencyEmail)
    setHostYouHave(hostYouHave)
    setAdminId(adminId)
    setAgencyCode(agencyCode)

  }

  //-----------------------edit user detail ------------------//

  const handleSubmit = async (e) => {
    // handleAlertOpen()
    e.preventDefault();

    try {
      if (window.confirm("Are you sure to Change the agency details?")) {
        const response = await fetch(`${baseURLProd}EditAgencyrequest`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: JSON.stringify({
            userId: userId,
            agencyName: agencyName,
            yourName: userName,
            agencyLocation: agencyLocation,
            agencyContacts: agencyContact,
            agencyEmail: agencyEmail,
            hostsYouhave: hostYouHave,
            agencyCode: agencyCode,
            adminId: adminId
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to edit user details');
        }

        await response.json();
        fetchData()
        setOpen(false);
        setUserId("")
        setAgencyName("")
        setUserName("")
        setAgencyLocation("")
        setAgencyContact("")
        setAgencyEmail("")
        setHostYouHave("")
        setAgencyCode("")
        setAdminId("")

        toast.success("Agency details changed ")
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleClose = () => {
    setOpen(false)
  }
  const handleAlertOpen = () => {
    setAlertOpen(true)
  }
  const handleAlertClose = () => {
    setAlertOpen(false)
  }
  const handleStatusChange = (status) => {
    console.log(status, 'statuss')
    setStatus(status);
    // setShowApproveButton(true);
    // setShowRejectButton(true);
  };

  const handlefilterSubmit = () => {
    let filtered = data;
    let approveVisible = true;
    let rejectVisible = true;

    if (status === 'Approve') {
      approveVisible = true;
      rejectVisible = false;
      filtered = data.filter(item => item.status === 'Approve');
    } else if (status === 'Reject') {
      approveVisible = false;
      rejectVisible = true;
      filtered = data.filter(item => item.status === 'Reject');
    } else {
      approveVisible = true;
      rejectVisible = true;
    }

    setFilter(filtered);
    setShowApproveButton(approveVisible);
    setShowRejectButton(rejectVisible);
  };

  return {
    filter, search, setSearch, openPreview, setOpenPreview, previewImageUrl, setPreviewImageUrl,
    handleClosePreview, handleDownload, handleImageClick, handleApprove,
    handleReject, downloadCSV, handleEdit, handleSubmit, userId, userName, agencyName, agencyLocation, agencyCode, agencyContact,
    agencyEmail, hostYouHave, open, adminId, setUserId, setUserName, setAgencyCode, setAgencyName, setAgencyContact, setAgencyEmail, setAgencyLocation,
    setHostYouHave, setAdminId, handleClose, alertopen, handleAlertClose, handleAlertOpen, data, handleReset,
    handleStatusChange, handlefilterSubmit, showApproveButton, showRejectButton, status, loading
  }
}

export default AgencyRequestHook

