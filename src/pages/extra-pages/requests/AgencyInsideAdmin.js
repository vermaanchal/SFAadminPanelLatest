
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
const AgencyInsideAdmin = () => {

  const {openPreview,previewImageUrl,handleClosePreview, handleImageClick,handleDownload} =RequestHook()
    const params =useParams()
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([])
    const [message,setmessage] =useState("")
    //---------------fetch data---------------//
    const fetchData = async () => {
      try {
        let req = await fetch(`${baseURLProd}AgencyInsideAdmin`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json' // Set Content-Type header here
          },
          body: JSON.stringify({ adminId: params.adminId }),
        });
    
        const res = await req.json();
        if(res.status == true){
          setData(res.agencyRequestList);
          // setFilter(res.agencyRequestList);
          const approvedData = res.agencyRequestList.filter(item => item.status === 'Approve');
          setFilter(approvedData);
          console.log(filter,data)
        }
        else{
          setmessage("No data is available")
      }

      } catch (error) {
        console.log(error);
      }
    };
    
    useEffect(() => {
      fetchData();
    }, []);
  //--------------------filter------------------//
  // useEffect(() => {
  //   const result = data.filter((item) => {
  //     return item.userId.toLowerCase().match(search.toLocaleLowerCase())
  //   })
  //   setFilter(result)
  // }, [search])

  //----------------download CSV file-----------------//
  const downloadCSV = () => {
    // Format the data for CSV
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        Object.keys(filter[0]).join(','),
        ...filter.map((row) => Object.values(row).join(',')),
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Agencyinside_admin.csv");
    document.body.appendChild(link);
    link.click();
  };
  const handleViewMore = async (agencyCode) => {
    window.location.href = `/AgencyInsideAdmin/${agencyCode}`;
};

const handleBack=()=>{
  window.location.assign('/AdminAgencyHost')
}
  const column = [

    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      width: '100px'
    },
    {
      name: "Admin Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyName}</div>,
      width: '180px'
    }, 
    {
      name: "User Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userName}</div>,
      width: '180px'
    }, 
    {
      name: "Agency Location",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyLocation}</div>,
      width: '200px'
    }, {
      name: "Agency Contact",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyContact}</div>,
      width: '180px'
    }, {
      name: "Agency Email",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyEmail}</div>,
      width: '220px'
    },
    {
      name: "Host You Have",
      // selector: id,
      cell: row => <div className="custom-cell">{row.hostYouHave}</div>,
      width: '160px'
    },
    {
      name: "Admin Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.adminId}</div>,
      // width: '170px'
    },
    {
      name: "Front Photo",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.frontPhoto)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.frontPhoto} alt='no-img' />
          </IconButton>
          <FileDownloadOutlinedIcon onClick={() => handleDownload(row.frontPhoto, 'image.jpg')} style={{ color: '#EF9848' }} />
        </>
      ),
      width: '180px'
    },
    {
      name: "Back Photo",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.backPhoto)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.backPhoto} alt='no-img' />
          </IconButton>
          <FileDownloadOutlinedIcon onClick={() => handleDownload(row.backPhoto, 'image.jpg')} style={{ color: '#EF9848' }} />
        </>
      ),
      width: '180px'
    },
    {
      name: "Agency Code",
      // selector: price,
      cell: row => <div className="custom-cell">{row.agencyCode}</div>,
      width: '160px'
    },
    {
      name: "Status",
      // selector: category,
      cell: row => <div className="custom-cell">{row.status}</div>,

    },

    {
      name: 'Action',
      cell: (row) => {
        const agencyCode = row.agencyCode;
        // console.log(agencyCode)
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={()=>handleViewMore(agencyCode)}
              style={{ backgroundColor: '#EF9848', border: '0px',fontSize:'14px' }}
            >
              View More
            </button>
          </>
        );
      },
      width: '210px'

    }
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
  // const filteredColumns = column.filter(col => col.name !== 'Action'); 


  return (

    <MainCard title="Admin/Agency/Host">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        <div><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleBack}>Back</button></div>
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

export default AgencyInsideAdmin;



