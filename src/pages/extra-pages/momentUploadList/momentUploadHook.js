import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { baseURLProd } from 'api/api';

const MomentUploadHook = () => {

  const [openPreview, setOpenPreview] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([])
  const [newSearchData, setNewSearchData] = useState([])
  const [loading, setLoading] = useState(true);

  const handleImageClick = (imageUrl) => {
    setPreviewImageUrl(imageUrl);
    setOpenPreview(true);
  };
  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  //download image //
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

  const fetchData = async () => {
    setLoading(true);
    try {
      let req = await fetch(`${baseURLProd}UploadedMomentRecords`, {
        method: "GET",
        'Content-Type': 'application/json',

      })
      const res = await req.json();
      setLoading(false);
      setData(res?.uploadedMomentList);
      setFilter(res?.uploadedMomentList)
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

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (search) {
        const uniqueResults = data
          .filter((item, index, self) =>
            index === self.findIndex(t => t.userId.toLowerCase() === item.userId.toLowerCase())
          )
          .filter((item) =>{
            return item.userId.toLowerCase().includes(search.toLowerCase()) ||  item.name.toLowerCase().includes(search.toLowerCase()) 
          });

        setFilter(uniqueResults);

        try {
          const newSearchDataArray = [];

          for (const row of uniqueResults) {
            if (row.userId) {
              const req = await fetch(`${baseURLProd}SearchUploadedMomentRecords?userId=${encodeURIComponent(row.userId)}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                },
              });

              if (req.ok) {
                const result = await req.json();
                if (result.uploadedMomentList) {
                  newSearchDataArray.push(...result.uploadedMomentList);
                }
              } else {
                console.error(`Error fetching data for userId: ${row.userId}`, req.status);
              }
            }
          }

          setNewSearchData(newSearchDataArray);
        } catch (error) {
          console.error("Failed to fetch search results:", error);
        }
      } else {
        setFilter(data);
        setNewSearchData([]);
      }
    };

    fetchSearchResults();
  }, [search, data]);


  const handleDelete = async (momentId, userId) => {
    if (window.confirm("Are you sure to delete this Data")) {
      await fetch(`${baseURLProd}DeleteMomentRecord?momentId=${encodeURIComponent(momentId)}&userid=${encodeURIComponent(userId)}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ momentId: momentId, userId: userId, }),
      });
      const newData = data.filter(row => (row.momentId !== momentId));
      setFilter(newData);
      fetchData();
      setSearch("")
      toast.success("Moment Uploaded List deleted successfully")
    }
  }

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
    link.setAttribute("download", "MomentUploadList.csv");
    document.body.appendChild(link);
    link.click();
  };
  const handleReset = () => {
    setSearch('');
    setFilter(data);
  };
  return {
    openPreview, previewImageUrl, setSearch, handleImageClick,
    handleClosePreview, handleDownload, handleDelete,
    downloadCSV, filter, search, handleReset, data, newSearchData, loading
  }
}

export default MomentUploadHook
