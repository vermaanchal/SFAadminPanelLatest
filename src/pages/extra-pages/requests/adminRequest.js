
import MainCard from 'components/MainCard';
import { Grid, Dialog, DialogContent, IconButton, Button, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import CsvDownloader from 'react-csv-downloader';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import AdminRequestHook from './AdminRequestHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
const AdminRequest = () => { 
  const { filter, search, setSearch, openPreview, previewImageUrl, handleClosePreview, handleImageClick, status
    , handleApprove, handleReject, downloadCSV, handleDownload, data,
    handleReset, handleStatusChange, handleSubmit, showApproveButton, showRejectButton, loading } = AdminRequestHook()

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;
  const column = [
    {
      name: "No.",
      cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
      width: "80px"
    },
    {
      name: "User Id",
      cell: row => <div className="custom-cell">{row.userId}</div>,
      width: '100px'
    },
    {
      name: "Admin Name",
      cell: row => <div className="custom-cell">{row.adminName}</div>,
      width: '150px'
    },
    {
      name: "Contacts",
      cell: row => <div className="custom-cell">{row.contacts}</div>,
      width: '180px'
    },
    {
      name: "Whatsapp",
      cell: row => <div className="custom-cell">{row.whatsapp}</div>,
      width: '180px'
    },
    {
      name: "Agency You Have",
      cell: row => <div className="custom-cell">{row.agencyYouHave}</div>,
      width: '160px'
    },
    {
      name: "Front Admin Photo",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.adminPhotoFrontImage)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.adminPhotoFrontImage} alt='no-img' />
          </IconButton>
          <FileDownloadOutlinedIcon onClick={() => handleDownload(row.adminPhotoFrontImage, 'image.png')} style={{ color: '#EF9848' }} />
        </>
      ),
      width: '180px'
    },
    {
      name: "Back Admin Photo",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.adminPhotoBackImage)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.adminPhotoBackImage} alt='no-img' />
          </IconButton>
          <FileDownloadOutlinedIcon onClick={() => handleDownload(row.adminPhotoBackImage, 'image.png')} style={{ color: '#EF9848', cursor: "pointer" }} />
        </>
      ),
      width: '180px'
    },
    {
      name: "Admin Id",
      cell: row => <div className="custom-cell">{row.adminid}</div>,
    },
    {
      name: "Status Update Date",
      cell: row => <div className="custom-cell">{row.statusUpdateDate}</div>,
      width: "180px"
    },
    {
      name: "Status",
      cell: row => <div className="custom-cell">{row.status}</div>,

    },
    {
      name: 'Action',
      cell: (row) => {
        // const adminId = row.adminid;
        // const isApproved = row.status === 'Approved';
        // const isRejected = row.status === 'Reject';
        return (
          <>
            {status === '' && (
              <>
                <button
                  className='btn btn-primary me-2'
                  onClick={() => handleApprove(row.adminid)}
                  disabled={row.status === 'Approved'}
                  style={{ backgroundColor: row.status === 'Approved'?'#8c8c8c' : '#EF9848', border: '0px',fontSize:'14px' }}
                >
                  Approve
                </button>
                <button
                  className='btn btn-primary me-2'
                  onClick={() => handleReject(row.adminid)}
                  disabled={row.status === 'Reject'}
                  style={{ backgroundColor:row.status === 'Reject'? '#8c8c8c':'#EF9848', border: '0px',fontSize:'14px' }}
                >
                  Reject
                </button>
              </>
            )}
            {status === 'Approved' && showApproveButton && (
              <button
                className='btn btn-primary me-2'
                onClick={() => handleApprove(row.id)}
                disabled={row.status === 'Approved'}
                style={{ backgroundColor: '#EF9848', border: '0px' }}
              >
                Approved
              </button>
            )}
            {status === 'Reject' && showRejectButton && (
              <button
                className='btn btn-primary'
                onClick={() => handleReject(row.id)}
                disabled={row.status === 'Reject'}
                style={{ backgroundColor: '#EF9848', border: '0px' }}
              >
                Reject
              </button>
            )}
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
  const isFiltered = filter.length !== data.length;
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
  };

  return (

    <MainCard title="App User Details">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        {isFiltered && (
          <div className='mx-3'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleReset} >Back</button></div>
        )}
        {loading ? (
          <div style={{ zIndex: 1050, height: "54%", width: "75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
          </div>
        ) : (filter && filter.length > 0 ? (<div className='text-end'>
          <DataTable
            columns={column}
            data={filter}
            fixedHeader
            customStyles={tableHeaderStyle}
            className='data-table'
            pagination
            subHeader
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
            subHeaderComponent={
              <>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                    <input
                      type='text'
                      className='form-control searchInput'
                      placeholder='Search User Id'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className='searchIcon'>
                      <SearchOutlinedIcon />
                    </div>
                  </div>
                  <div className=''>
                    <div className='d-flex'>

                      <FormControl style={{ width: '175px' }}>
                        <InputLabel id="select-label">Select Status</InputLabel>

                        <Select
                          labelId="select-label"
                          label='Select Role'
                          id="select"
                          style={{ textAlign: "center" }}
                        // value={roleId}
                        // onChange={handleSelectChange}
                        // className='selectDiv'
                        >
                          <MenuItem value="nostatus" >--No Select--</MenuItem>
                          <MenuItem value="1" onClick={() => handleStatusChange('Approved')}>Approved</MenuItem>
                          <MenuItem value="2" onClick={() => handleStatusChange('Reject')}>Rejected</MenuItem>
                        </Select>
                      </FormControl>
                      <div className='mx-3 d-flex'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleSubmit}>Submit</button></div>
                    </div>
                  </div>
                  <div>
                    <Button className='csvDiv' onClick={downloadCSV}>

                      <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                    </Button>
                  </div>
                </div>
                {/* <div className="container-fluid">
                  <div className="row justify-content-between align-items-center">
                    <div className="col-md-6 col-12 d-flex mb-3 mb-md-0">
                      <input
                        type="text"
                        className="form-control searchInput me-2"
                        placeholder="Search User Id"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <div className="searchIcon">
                        <SearchOutlinedIcon />
                      </div>
                    </div>
                    <div className="col-md-4 col-12 d-flex mb-3 mb-md-0">
                      <FormControl style={{ width: "100%" }}>
                        <InputLabel id="select-label">Select Status</InputLabel>
                        <Select
                          labelId="select-label"
                          label="Select Role"
                          id="select"
                          style={{ textAlign: "center" }}
                        >
                          <MenuItem value="nostatus">--No Select--</MenuItem>
                          <MenuItem value="1" onClick={() => handleStatusChange("Approved")}>
                            Approved
                          </MenuItem>
                          <MenuItem value="2" onClick={() => handleStatusChange("Rejected")}>
                            Rejected
                          </MenuItem>
                        </Select>
                      </FormControl>
                      <button
                        className="btn btn-primary ms-3"
                        style={{ backgroundColor: "#EF9848", border: "0px" }}
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                    <div className="col-md-2 col-12 d-flex justify-content-md-end justify-content-start">
                      <Button className="csvDiv" onClick={downloadCSV}>
                        Download
                        <FileDownloadOutlinedIcon style={{ color: "#EF9848" }} />
                      </Button>
                    </div>
                  </div>
                </div> */}
              </>
            }
          />
        </div>) : (
          <div className='text-center my-4 fw-bold'>
                      <DataTable
            columns={column}
            data={filter}
            fixedHeader
            customStyles={tableHeaderStyle}
            className='data-table'
            pagination
            subHeader
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
            subHeaderComponent={
              <>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                    <input
                      type='text'
                      className='form-control searchInput'
                      placeholder='Search User Id'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className='searchIcon'>
                      <SearchOutlinedIcon />
                    </div>
                  </div>
                  <div className=''>
                    <div className='d-flex'>

                      <FormControl style={{ width: '175px' }}>
                        <InputLabel id="select-label">Select Status</InputLabel>

                        <Select
                          labelId="select-label"
                          label='Select Role'
                          id="select"
                          style={{ textAlign: "center" }}
                        >
                          <MenuItem value="nostatus" >--No Select--</MenuItem>
                          <MenuItem value="1" onClick={() => handleStatusChange('Approved')}>Approved</MenuItem>
                          <MenuItem value="2" onClick={() => handleStatusChange('Reject')}>Rejected</MenuItem>
                        </Select>
                      </FormControl>
                      <div className='mx-3 d-flex'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleSubmit}>Submit</button></div>
                    </div>
                  </div>
                  <div>
                    {/* <Button className='csvDiv' onClick={downloadCSV}>

                      <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                    </Button> */}
                  </div>
                </div>
              </>
            }
          />
          </div>
        ))}

      </Grid>
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogContent>
          <img src={previewImageUrl} alt="Preview" width='260px' />
        </DialogContent>
      </Dialog>
    </MainCard>
  )
};

export default AdminRequest;


