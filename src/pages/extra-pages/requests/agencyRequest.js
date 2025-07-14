
import MainCard from 'components/MainCard';
import {
  Grid, Dialog, DialogContent, IconButton, Button, TextField, DialogTitle, DialogActions,
  FormControl, InputLabel, MenuItem, Select
} from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import AgencyRequestHook from './AgencyRequestHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
const AgencyRequest = () => {
  const { filter, search, openPreview, previewImageUrl, setSearch, handleEdit,
    handleClosePreview, handleDownload, handleImageClick, handleApprove,
    handleReject, downloadCSV, handleSubmit, userId, userName, agencyName, agencyLocation, agencyCode, agencyContact,
    agencyEmail, hostYouHave, open, adminId, setUserId, setUserName, setAgencyCode, setAgencyName, setAgencyContact, setAgencyEmail, setAgencyLocation,
    setHostYouHave, setAdminId, handleClose, data, handleReset, handleStatusChange, handlefilterSubmit
    , showApproveButton, showRejectButton, status, loading
  } = AgencyRequestHook()
  const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handlePageChange = page => {
    setCurrentPage(page);
  };
  const handlePerRowsChange = rows => {
    setRowsPerPage(rows);
    setCurrentPage(1);
  };
  const column = [
    {
      name: "No.",
      cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
      width: "80px"
    },

    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width:"100px"
    },
    {
      name: "Agency Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyName}</div>,
      width: "180px"
    }, {
      name: "User Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userName}</div>,
      width: "180px"
    }, {
      name: "Agency Location",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyLocation}</div>,
      width: "250px"
    },
    {
      name: "Agency Contact",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyContact}</div>,
      width: "180px"
    },
    {
      name: "Agency Email",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyEmail}</div>,
      width: "260px"
    },
    {
      name: "Host You Have",
      // selector: id,
      cell: row => <div className="custom-cell">{row.hostYouHave}</div>,
      width: "180px"
    },
    {
      name: "Admin Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.adminId}</div>,
      width: "120px"
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
      width: "150px"
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
      width: "150px"
    },
    {
      name: "Agency Code",
      // selector: price,
      cell: row => <div className="custom-cell">{row.agencyCode}</div>,
      width: '150px'
    },
    {
      name: "Status Update Date",
      cell: row => <div className="custom-cell">{row.statusUpdateDate}</div>,
      width: "180px"
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
        const userId = row.userId;
        const adminId = row.adminId;
        const userName = row.userName;
        const agencyName = row.agencyName;
        const agencyLocation = row.agencyLocation;
        const agencyContact = row.agencyContact;
        const agencyEmail = row.agencyEmail;
        const hostYouHave = row.hostYouHave;
        return (
          <>
            {status === '' && (
              <>
                <button
                  className='btn btn-primary me-2'
                  onClick={() => handleApprove(row.userId, row.agencyCode)}
                  disabled={row.status === 'Approve'}
                  style={{ backgroundColor:row.status === 'Approve'?'#8c8c8c': '#EF9848', border: '0px',fontSize:'14px' }}
                >
                  Approve
                </button>
                <button
                  className='btn btn-primary me-2'
                  onClick={() => handleReject(row.userId, row.agencyCode)}
                  disabled={row.status === 'Reject'}
                  style={{ backgroundColor:row.status === 'Reject'?'#8c8c8c': '#EF9848', border: '0px',fontSize:'14px' }}
                >
                  Reject
                </button>
                <span className='editrequestbtn'>
                  <EditCalendarOutlinedIcon onClick={() => {
                    handleEdit(userId, agencyName, userName, agencyLocation, agencyContact, agencyEmail, hostYouHave, adminId, agencyCode);
                  }} style={{ color: 'white', cursor: "pointer",fontSize:'14px' }} />
                </span>
              </>
            )}
            {status === 'Approve' && showApproveButton && (
              <button
                className='btn btn-primary me-2'
                onClick={() => handleApprove(row.id)}
                disabled={row.status === 'Approve'}
                style={{ backgroundColor: '#EF9848', border: '0px' }}
              >
                Approve
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
      width: '270px'

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
        ) : filter && filter.length > 0 ? (
          <div className='text-end'>
            <DataTable columns={column} data={filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
              pagination
              subHeader
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              subHeaderComponent={
                <>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                      <input type='text' className=' form-control searchInput' placeholder='Search User Id' value={search}
                        onChange={(e) => setSearch(e.target.value)}></input>
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
                            <MenuItem value="1" onClick={() => handleStatusChange('Approve')}>Approve</MenuItem>
                            <MenuItem value="2" onClick={() => handleStatusChange('Reject')}>Reject</MenuItem>
                          </Select>
                        </FormControl>
                        <div className='mx-3 d-flex'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handlefilterSubmit}>Submit</button></div>
                      </div>
                    </div>
                    <div>
                      <Button className='csvDiv' onClick={downloadCSV} ><FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
                    </div>
                  </div>
                </>
              }
            />
          </div>
        ) : (
          <div className='text-center my-4 fw-bold'>
             <DataTable columns={column} data={filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
              pagination
              subHeader
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              subHeaderComponent={
                <>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                      <input type='text' className=' form-control searchInput' placeholder='Search User Id' value={search}
                        onChange={(e) => setSearch(e.target.value)}></input>
                      <div className='searchIcon'>
                        <SearchOutlinedIcon />
                      </div>
                    </div>
                    <div className=''>
                      <div className='d-flex'>
                        {/* <FormControl style={{ width: '175px' }}>
                          <InputLabel id="select-label">Select Status</InputLabel>
                          <Select
                            labelId="select-label"
                            label='Select Role'
                            id="select"
                            style={{ textAlign: "center" }}
                          >
                            <MenuItem value="nostatus" >--No Select--</MenuItem>
                            <MenuItem value="1" onClick={() => handleStatusChange('Approve')}>Approve</MenuItem>
                            <MenuItem value="2" onClick={() => handleStatusChange('Reject')}>Reject</MenuItem>
                          </Select>
                        </FormControl> */}
                        {/* <div className='mx-3 d-flex'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handlefilterSubmit}>Submit</button></div> */}
                      </div>
                    </div>
                    <div>
                      {/* <Button className='csvDiv' onClick={downloadCSV} ><FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button> */}
                    </div>
                  </div>
                </>
              }
            />
            {/* Data not found */}
          </div>
        )}

      </Grid>
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogContent>
          <img src={previewImageUrl} alt="Preview" width='260px' />
        </DialogContent>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className='editTitle'>Edit Agency Details</DialogTitle>
        <DialogContent>
          <TextField
            // autoFocus
            margin="dense"
            fullWidth
            label="User ID"
            type="text"
            name="userId"
            value={userId}
            className='editInputField'
            onChange={(e) => setUserId(e.target.value)}
          // style={{ display: 'none' }} // Hidden field
          />
          <TextField
            margin="dense"
            label="Agency Name"
            type="text"
            name="agencyName"
            fullWidth
            value={agencyName}
            onChange={(e) => setAgencyName(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="User Name"
            type="text"
            name="userName"
            fullWidth
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Agency Location"
            type="text"
            name="agencyLocation"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={agencyLocation}
            onChange={(e) => setAgencyLocation(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Agency Contact"
            type="tel"
            name="agencyContact"
            fullWidth
            value={agencyContact}
            onChange={(e) => setAgencyContact(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Agency Email"
            type="email"
            name="agencyEmail"
            fullWidth
            value={agencyEmail}
            onChange={(e) => setAgencyEmail(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Host you have"
            type="text"
            name="hostYouHave"
            fullWidth
            value={hostYouHave}
            onChange={(e) => setHostYouHave(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Admin Id"
            type="number"
            name="adminId"
            fullWidth
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Agency Code"
            type="number"
            name="agencyCode"
            fullWidth
            value={agencyCode}
            onChange={(e) => setAgencyCode(e.target.value)}
            className='editInputField'
          />
        </DialogContent>
        <DialogActions className='editButtonDiv'>
          <Button onClick={handleClose} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Dialog open={alertopen} onClose={handleAlertClose}>
        <DialogTitle className='editTitle'>Are You Sure to Update the Data?</DialogTitle>
        <DialogActions className='editButtonDiv'>
          <Button onClick={handleAlertClose} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
            Update
          </Button>
        </DialogActions>
      </Dialog> */}
    </MainCard>
  )
};

export default AgencyRequest;



