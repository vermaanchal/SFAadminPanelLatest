import MainCard from 'components/MainCard';
import { Box, Stack, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment, Button } from '@mui/material';
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

const AppUserDetails = () => {
  const { filter, search, openPreview, previewImageUrl, setSearch,
    handleClosePreview,
    // handleDelete,
    handleEdit, setUserId, setName, setDob, setMobile, setEmail, setPassword, userId, name, dob, mobile, email, password, downloadCSV, open, handleClose, handleSubmit, handleReset, data, loading, setFromDate, setToDate, fromDate, toDate, handleDateRangeFilter } = Hook()

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
                }} style={{ color: 'orange', cursor: "pointer", fontSize: '14px' }} />
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                    px: 1,
                  }}
                >
                  <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">

                    {/* Search Field */}
                    <div style={{ position: 'relative', width: '250px' }}>
                      <input
                        type="text"
                        placeholder="Search User Id"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 36px 8px 12px',
                          border: '1px solid #ccc',
                          borderRadius: '6px',
                          fontSize: '14px',
                          outline: 'none',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#999',
                        pointerEvents: 'none'
                      }}>
                        <SearchOutlinedIcon fontSize="small" />
                      </div>
                    </div>


                    <form
                      onSubmit={handleDateRangeFilter}
                      style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}
                    >
                      {/* From Date */}
                      <Box display="flex" alignItems="center">
                        <label style={{ fontSize: '14px', marginRight: '6px' }}>From:</label>
                        <input
                          type="date"
                          className="form-control"
                          value={fromDate}
                          onChange={(e) => setFromDate(e.target.value)}
                          style={{
                            minWidth: '140px',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                          }}
                        />
                      </Box>

                      {/* To Date */}
                      <Box display="flex" alignItems="center">
                        <label style={{ fontSize: '14px', marginRight: '6px' }}>To:</label>
                        <input
                          type="date"
                          className="form-control"
                          value={toDate}
                          onChange={(e) => setToDate(e.target.value)}
                          style={{
                            minWidth: '140px',
                            padding: '6px 10px',
                            borderRadius: '6px',
                            border: '1px solid #ccc',
                          }}
                        />
                      </Box>

                      <Button
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: '#EF9848',
                          textTransform: 'none',
                          fontWeight: 500,
                          borderRadius: '6px',
                          px: 2,
                          py: 1,
                          fontSize: '0.85rem',
                          '&:hover': {
                            backgroundColor: '#d97a2c',
                          },
                        }}
                      >
                        Filter
                      </Button>
                    </form>
                  </Stack>

                  {/* Download Button */}
                  <Button
                    variant="contained"
                    onClick={downloadCSV}
                    endIcon={<FileDownloadOutlinedIcon />}
                    sx={{
                      backgroundColor: '#EF9848',
                      color: '#fff',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': { backgroundColor: '#d97a2c' },
                      boxShadow: 'none',
                      borderRadius: '8px',
                      px: 2,
                      py: 1,
                      fontSize: '0.9rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Download CSV
                  </Button>
                </Box>

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

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          className="editTitle"
          sx={{
            backgroundColor: '#f5f5f5',
            fontWeight: 600,
            color: '#333',
            borderBottom: '1px solid #ddd',
            fontSize: '18px',
          }}
        >
          Edit User Details
        </DialogTitle>

        <DialogContent dividers sx={{ padding: '20px' }}>
          <Grid container spacing={2} direction="column">
            {/* Hidden field */}
            <Grid item sx={{ display: 'none' }}>
              <TextField
                label="User ID"
                type="text"
                name="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                fullWidth
                size="small"
              />
            </Grid>

            {/* Name */}
            <Grid item>
              <TextField
                label="Name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                size="small"
                className="editInputField"
              />
            </Grid>

            {/* Mobile Number */}
            <Grid item>
              <TextField
                label="Mobile Number"
                type="tel"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                fullWidth
                size="small"
                className="editInputField"
              />
            </Grid>

            {/* DOB */}
            <Grid item>
              <TextField
                label="Date of Birth"
                type="date"
                name="dob"
                InputLabelProps={{ shrink: true }}
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                fullWidth
                size="small"
                className="editInputField"
              />
            </Grid>

            {/* Email */}
            <Grid item>
              <TextField
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                size="small"
                className="editInputField"
              />
            </Grid>

            {/* Password */}
            <Grid item>
              <TextField
                label="Password"
                type="text"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                size="small"
                className="editInputField"
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions
          className="editButtonDiv"
          sx={{
            padding: '12px 24px',
            justifyContent: 'flex-end',
            marginTop: "1rem"
          }}
        >
          <Button
            onClick={handleClose}
            className="btn btn-primary"
            style={{ backgroundColor: '#EF9848', border: '0px' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{ backgroundColor: '#EF9848', border: '0px' }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>


    </MainCard>
  )
};

export default AppUserDetails;
