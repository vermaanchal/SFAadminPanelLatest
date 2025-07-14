import MainCard from 'components/MainCard';
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Hook from './Hook';
import { ToastContainer } from 'react-toastify';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
const
  AppUserDetails = () => {
    const { filter, search, openPreview, previewImageUrl, setSearch,
      handleClosePreview,
      // handleDelete,
      handleEdit, setUserId, setName, setDob, setMobile, setEmail, setPassword
      , userId, name, dob, mobile, email, password, downloadCSV,

      open, handleClose, handleSubmit, handleReset, data, loading } = Hook()
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
        name: 'User Id',
        selector: row => row.userId,
      },
      {
        name: 'Registration Date & Time',
        selector: row => row.createDate,
        width: '200px'
      },
      {
        name: "Name",
        selector: row => row.name,
        width: '180px'
      },
      {
        name: 'Mobile No',
        selector: row => row.mobile,
        width: '180px'
      },
      {
        name: 'Email',
        selector: row => row.email,
        width: "310px"
      },
      {
        name: 'Password',
        selector: row => row.password,
        width: "180px"
      },
      {
        name: 'DOB',
        selector: row => row.dob,
        width: "180px"

      },
      {
        name: 'Country',
        selector: row => row.country,
      },
      {
        name: 'Action',
        cell: (row) => {
          const userId = row.userId;
          const name = row.name;
          const mobile = row.mobile;
          const email = row.email;
          const password = row.password;
          const dob = row.dob;
          return (
            <>
              <div className='py-4'>
                <span className='editIcon'>
                  <EditCalendarOutlinedIcon onClick={() => {
                    handleEdit(userId, name, mobile, email, password, dob);
                  }} style={{ color: 'orange', cursor: "pointer",fontSize:'14px' }} />
                </span>
                {/* <span className='deleteIcon' >
                <DeleteOutlinedIcon 
                // onClick={() => handleDelete(userId)}
                 style={{ color: 'red', cursor: "pointer" }} />
              </span> */}
              </div>
            </>
          )
        },
        // width: "200px"
      }
    ]
    const tableHeaderStyle = {
      headCells: {
        style: {
          fontWeight: "bold",
          fontSize: "17px",
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
            fontFamily: "'Public Sans',sans-serif",
          }
        }
      }
    }
    const isFiltered = filter?.length !== data?.length;

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
          {isFiltered && isFiltered && (
            <div className='mx-3'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleReset} >Back</button></div>
          )}


          {/* {loading && (
          <div style={{ zIndex: 1050, height: "54%", width: "75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
          </div>
        )}
        <div className='text-end'>
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
                    <div className='d-flex'>
                    </div>
                  </div>
                  <div>
                    <Button className='csvDiv' onClick={downloadCSV}>
                      <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                    </Button>
                  </div>
                </div>
              </>
            }
          />
        </div> */}

          {loading ? (
            <div
              style={{ zIndex: 1050, height: "54%", width: "75%" }}
              className="d-flex justify-content-center align-items-center position-absolute"
            >
              <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
            </div>
          ) :

            (<div className='text-end'>
              <DataTable
                columns={column}
                data={filter}
                fixedHeader
                customStyles={tableHeaderStyle}
                className='data-table'
                pagination
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                subHeader
                subHeaderComponent={
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
                    <div>
                      <Button className='csvDiv' onClick={downloadCSV}>
                        <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                      </Button>
                    </div>
                  </div>
                }
              />
            </div>)}
          {/* filter && filter.length > 0 ? */}
          {/* <>
            : (
            <div className="text-center my-4" style={{ color: "#EF9848", fontWeight: 'bold' }}>
              Data Not Found
            </div>
            )
          </> */}

        </Grid>
        <Dialog open={openPreview} onClose={handleClosePreview}>
          <DialogContent>
            <img src={previewImageUrl} alt="Preview" width='260px' />
          </DialogContent>
        </Dialog>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle className='editTitle'>Edit User Details</DialogTitle>
          <DialogContent>
            <TextField
              // autoFocus
              margin="dense"
              label="User ID"
              type="text"
              name="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              style={{ display: 'none' }} // Hidden field
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
              name="mobile"
              fullWidth
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className='editInputField'
            />
            <TextField
              margin="dense"
              label="Date of Birth"
              type="date"
              name="dob"
              InputLabelProps={{ shrink: true }}
              fullWidth
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className='editInputField'
            />
            <TextField
              margin="dense"
              label="Email Address"
              type="email"
              name="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='editInputField'
            />
            <TextField
              margin="dense"
              label="Password"
              type="text"
              name="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='editInputField'
            />
          </DialogContent>
          <DialogActions className='editButtonDiv'>
            <Button onClick={handleClose} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </MainCard>
    )
  };

export default AppUserDetails;
