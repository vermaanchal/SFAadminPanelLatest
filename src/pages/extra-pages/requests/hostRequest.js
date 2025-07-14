
import MainCard from 'components/MainCard';
import {
  Grid, Dialog, DialogContent, IconButton, Button, TextField,
  DialogTitle, DialogActions, FormControl, MenuItem, InputLabel, Select
} from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import HostRequestHook from './HostRequestHook';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
import { useState } from 'react';
const HostRequest = () => {
  const { filter, search, openPreview, previewImageUrl, setSearch,
    handleClosePreview, handleDownload, handleImageClick, handleApprove,
    handleReject, downloadCSV, handleEdit, handleClose,
    open, userId, name, type, agencyCode, hostCode, phone, setUserId, setName, setType,
    setAgencyCode, setHostCode, setPhone, handleSubmit, data, handleReset, status
    , handleStatusChange, handlefilterSubmit, showApproveButton, showRejectButton, loading } = HostRequestHook()


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
      // width: '100px'
    },
    {
      name: "Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      width: '180px'
    },
    {
      name: "Phone",
      // selector: id,
      cell: row => <div className="custom-cell">{row.phone}</div>,
      width: '180px'
    },
    {
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
          <FileDownloadOutlinedIcon onClick={() => handleDownload(row.lifePhoto, 'image.jpg')} style={{ color: '#EF9848' }} />
        </>
      ),
      width: "200px"
    },
    {
      name: "Status Update Date",
      cell: row => <div className="custom-cell">{row.statusUpdated}</div>,
      width: "180px"
    },
    {
      name: "Status",
      // selector: price,
      cell: row => <div className="custom-cell">{row.status1 || "_"}</div>,
      width: '180px'
    },
    {
      name: "Host Code",
      // selector: category,
      cell: row => <div className="custom-cell">{row.hostCode}</div>,
      // width:'120px'
    },

    {
      name: 'Action',
      cell: (row) => {
        const agencyCode = row.agencyCode;
        const userId = row.userId;
        const name = row.name;
        const phone = row.phone;
        const type = row.type;
        const hostCode = row.hostCode;
        return (
          <>
            {row.status1 === '' && (
              <>
                <button
                  className='btn btn-primary me-2'
                  onClick={() => handleApprove(agencyCode, userId)}
                  style={{ backgroundColor: '#EF9848', border: '0px' }}
                >
                  Approve
                </button>
                <button
                  className='btn btn-primary me-2'
                  onClick={() => handleReject(agencyCode, userId)}
                  style={{ backgroundColor: '#EF9848', border: '0px' }}
                >
                  Reject
                </button>
                <span className='editrequestbtn'>
                  <EditCalendarOutlinedIcon onClick={() => {
                    handleEdit(userId, name, phone, type, agencyCode, hostCode);
                  }} style={{ color: 'white', cursor: "pointer" }} />
                </span>
              </>
            )}
            {row.status1 === 'Approve' && (
              <>
                <button
                  className='btn btn-primary me-2'
                  onClick={() => handleApprove(row.id)}
                  disabled={row.status1 === 'Approve'}
                  style={{ backgroundColor: '#EF9848', border: '0px' }}
                >
                  Approved
                </button>
                <button
                  className='btn btn-primary'
                  onClick={() => handleReject(row.id)}
                  style={{ backgroundColor: '#EF9848', border: '0px' }}
                >
                  Reject
                </button>
              </>
            )}
            {row.status1 === 'Reject' && (
              <>
                <button
                  className='btn btn-primary me-2'
                  onClick={() => handleApprove(row.id)}
                  style={{ backgroundColor: '#EF9848', border: '0px' }}
                >
                  Approve
                </button>
                <button
                  className='btn btn-primary'
                  onClick={() => handleReject(row.id)}
                  disabled={row.status1 === 'Reject'}
                  style={{ backgroundColor: '#EF9848', border: '0px' }}
                >
                  Rejectd
                </button>
              </>
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
  const isFiltered = filter.length !== data.length;

  return (

    <MainCard title="App User Details">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        {isFiltered && (
          <div className='mx-3'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleReset} >Back</button></div>
        )} {loading ? (
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
                      <div className='searchIcon'><SearchOutlinedIcon /></div>
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
                            <MenuItem value="1" onClick={() => handleStatusChange('Approve')}>Approved</MenuItem>
                            <MenuItem value="2" onClick={() => handleStatusChange('Reject')}>Rejected</MenuItem>
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
          <div className='text-center fw-bold my-4'>
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
                      <div className='searchIcon'><SearchOutlinedIcon /></div>
                    </div>
                    <div>
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
        <DialogTitle className='editTitle'>Edit Host Details</DialogTitle>
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
          />
          <TextField
            margin="dense"
            label="Name"
            type="text"
            name="name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Mobile Number"
            type="tel"
            name="phone"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='editInputField'
          />
          <TextField
            margin="dense"
            label="Type"
            type="text"
            name="type"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={type}
            onChange={(e) => setType(e.target.value)}
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
          <TextField
            margin="dense"
            label="Host Code"
            type="number"
            name="hostCode"
            fullWidth
            value={hostCode}
            onChange={(e) => setHostCode(e.target.value)}
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
    </MainCard>
  )
};

export default HostRequest;

