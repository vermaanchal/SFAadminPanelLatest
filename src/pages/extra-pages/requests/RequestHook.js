import { baseURLProd } from 'api/api';
import { set } from 'lodash';
import{ useEffect, useState } from 'react'
const RequestHook = () => {
 
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [loading,setLoading] = useState(true);

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
          const approvedData = res.adminRequestList.filter(item => item.status === 'Approved');
          setFilter(approvedData);
          console.log(filter)

      }
      catch (error) {
          console.log(error)
      }finally {
        setLoading(false)
      }
  }

  useEffect(() => {
      fetchData();
  }, []);

  useEffect(() => {
    const result = data.filter((item) => {
        return item.userId.toLowerCase().includes(search.toLocaleLowerCase()) || item.adminName.toLowerCase().includes(search.toLocaleLowerCase()) ||  item.contacts.toLowerCase().includes(search.toLocaleLowerCase()) ||  item.whatsapp.toLowerCase().includes(search.toLocaleLowerCase())
    })
    setFilter(result)
}, [search])

const handleDownload = (imageUrl, imageName) => {
  fetch(imageUrl)
      .then(response => response.blob())
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
  link.setAttribute("download", "AdminAgencyHost_request.csv");
  document.body.appendChild(link);
  link.click();
};

  const handleViewMore = async (adminId) => {
      window.location.href = `/AdminAgencyHost/${adminId}`;
      
  };
  const handleReset = () => {
    setSearch('');
    setFilter(data);
  };
  return {
    filter, search,  setSearch,openPreview, setOpenPreview,previewImageUrl, setPreviewImageUrl,
    handleClosePreview, handleImageClick, handleDownload,downloadCSV,handleViewMore,data,handleReset,loading
}
}

export default RequestHook

