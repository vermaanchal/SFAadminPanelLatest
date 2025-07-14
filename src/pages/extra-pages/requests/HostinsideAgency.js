
import MainCard from 'components/MainCard';
import { Grid, Dialog, DialogContent, IconButton ,Button} from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import CsvDownloader from 'react-csv-downloader';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import RequestHook from './RequestHook';
import { baseURLProd } from 'api/api';
const HostInsideAgency = () => {

  const {openPreview,previewImageUrl,handleClosePreview, handleImageClick,handleDownload} =RequestHook()
    const params =useParams()
    const [data, setData] = useState([]);
    // const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])
    const [message,setmessage] =useState('')
    //---------------fetch data---------------//
    const fetchData = async () => {
      try {
        let req = await fetch(`${baseURLProd}HostInsideAgency`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ agencyCode: params.agencyCode }),
        });
    
        const res = await req.json();
        if(res.status == true){
          setData(res.hostRequestList);
          const approvedData = res.hostRequestList.filter(item => item.status === 'Approve');
          setFilter(approvedData);
          console.log(filter,data)
        }
        else{
          setmessage("no data available")
        }
      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {
      fetchData();
    }, []);

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
    link.setAttribute("download", "HostInsideAgency_request.csv");
    document.body.appendChild(link);
    link.click();
  };
  
  const column = [

    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },
    {
      name: "User Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      width: '180px'
    }, 
   {
      name: "Phone Number",
      // selector: id,
      cell: row => <div className="custom-cell">{row.phone}</div>,
      width: '180px'
    }, {
      name: "Type",
      // selector: id,
      cell: row => <div className="custom-cell">{row.type}</div>,
      width: '180px'
    },
    {
      name: "Agency Code",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyCode}</div>,
      width: '180px'
    },
    {
      name: "Life Photo",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.lifePhoto)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.lifePhoto} alt='no-img' />
          </IconButton>
          <FileDownloadOutlinedIcon onClick={() => handleDownload(row.lifePhoto, 'image.jpg')} style={{ color: '#EF9848' }} />
        </>
      ),
      width: '180px'
    },
    {
      name: "Home Page Photo",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.homepagePhoto)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.homepagePhoto} alt='no-img' />
          </IconButton>
          <FileDownloadOutlinedIcon onClick={() => handleDownload(row.homepagePhoto, 'image.jpg')} style={{ color: '#EF9848' }} />
        </>
      ),
      width: '180px'
    },
    {
      name: "Host Code",
      // selector: price,
      cell: row => <div className="custom-cell">{row.hostCode}</div>,
      width: '160px'
    },
    {
      name: "Status",
      // selector: category,
      cell: row => <div className="custom-cell">{row.status}</div>,

    },

  ]
  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "0.875rem",
        backgroundColor: "rgba(241,244,249,255)",
      },
      head: {
        style: {
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        }
      },
      cells: {
        style: {
          fontSize: "0.875rem",
          fontFamily: "'Public Sans',sans-serif"
        }
      }
    }
  }

  const handleBack=()=>{
    window.location.assign('/AdminAgencyHost')
  }
  return (

    <MainCard title="Admin/Agency/Host">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        <div><button className='btn btn-primary mb-3'   style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleBack}>Back</button></div>
        <div className='text-end'>
          {filter ?
          <DataTable columns={column} data={filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
            pagination
            subHeader
            subHeaderComponent={
              <>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                    {/* <input type='text' className=' form-control searchInput' placeholder='Search User Id' value={search}
                      onChange={(e) => setSearch(e.target.value)}></input>
                    <div className='searchIcon'><SearchOutlinedIcon/></div> */}
                  </div>
                  <div>
                    <Button className='csvDiv'onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
                  </div>
                </div>
              </>
            }
          />
          :
          {message}
          }
        </div>
      </Grid>
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogContent>
          <img src={previewImageUrl} alt="Preview" width='260px' />
        </DialogContent>
      </Dialog>
    </MainCard>
  )
};

export default HostInsideAgency;



