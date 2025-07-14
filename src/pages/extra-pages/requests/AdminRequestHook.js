import { baseURLProd } from 'api/api';
import { set } from 'lodash';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const AdminRequestHook = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [status, setStatus] = useState('');
  const [showApproveButton, setShowApproveButton] = useState(true);
  const [showRejectButton, setShowRejectButton] = useState(true);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true)
    try {
      let req = await fetch(`${baseURLProd}AdminRequest`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setLoading(false)
      setData(res.adminRequestList);
      setFilter(res.adminRequestList)

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
      const i_search = search.toLowerCase().trim();
      return item.userId.toLowerCase().match(i_search) || item.adminName.toLowerCase().includes(i_search) || item.contacts.toLowerCase().includes(i_search) || item.whatsapp.toLowerCase().includes(i_search);
    })
    setFilter(result)
  }, [search])

  const handleApprove = async (adminId) => {
    try {
      if (window.confirm("Are you sure to approve the request?")) {
        await fetch(`${baseURLProd}AdminRequestApprove`, {
          method: 'POST',
          body: JSON.stringify({ adminId: adminId }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const rowIndex = data.findIndex(item => item.adminid === adminId);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status = 'Approved';
          toast.success("Request Approved successfully");
          setSearch('')
          setData(updatedData);
          setFilter(updatedData);
          fetchData();
        }
      }
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleReject = async (adminId) => {
    try {
      if (window.confirm("Are you sure to Reject the Request ?")) {
        await fetch(`${baseURLProd}AdminRequestReject`, {
          method: 'POST',
          body: JSON.stringify({ adminId: adminId }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const rowIndex = data.findIndex(item => item.adminid === adminId);
        if (rowIndex !== -1) {
          const updatedData = [...data];
          updatedData[rowIndex].status = 'Reject';
          toast.success("Request Rejected successfully");
          setSearch('')
          setData(updatedData);
          setFilter(updatedData);
          fetchData();
        }
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  //----------------------image download-------------------//
  const handleDownload = (imageUrl, imageName) => {
    console.log(imageUrl, 'urlll')
    fetch(imageUrl, {
      mode: 'cors',
    })
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

  // function downloadImageFromUrl(imageUrl) {
  //   // Call the API with the image URL
  //   fetch('https://your-api-endpoint/DownloadPersonImage', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ ImageUrl: imageUrl })
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.Status === 'success') {
  //         var link = document.createElement('a');
  //         link.href = imageUrl;
  //         link.download = 'DownloadedImage';
  //         document.body.appendChild(link)
  //           ;
  //         link.click();
  //         document.body.removeChild(link)
  //           ;
  //       } else {
  //         alert("Failed to download image.");
  //       }
  //     })
  //     .catch(error => console.error('Error:', error));
  // }

  const handleStatusChange = (status) => {
    setStatus(status);
    setShowApproveButton(true); // Reset to default
    setShowRejectButton(true); // Reset to default
  };

  const handleSubmit = () => {
    if (status) {
      const filtered = data.filter(item => item.status === status);
      setFilter(filtered);

      if (status === 'Approved') {
        setShowRejectButton(false);
      } else if (status === 'Rejected') {
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
  //-------------------image preview---------------//
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
    link.setAttribute("download", "Admin_request.csv");
    document.body.appendChild(link);
    link.click();
  };

  return {
    filter, search, setSearch, openPreview, setOpenPreview, previewImageUrl, setPreviewImageUrl,
    handleClosePreview, handleDownload, handleImageClick, handleApprove,
    handleReject, downloadCSV, data, handleReset, handleStatusChange, handleSubmit, status,
    showApproveButton, showRejectButton, loading
  }
}

export default AdminRequestHook

