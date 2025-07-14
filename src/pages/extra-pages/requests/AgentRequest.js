import MainCard from 'components/MainCard';
import { Grid, Dialog, DialogContent, IconButton, Button, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import CsvDownloader from 'react-csv-downloader';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
import AgentRequestHook from './AgentRequestHook';
const AgentRequest = () => {
  const { filter, search, setSearch, openPreview, previewImageUrl, handleClosePreview, handleImageClick, status,
    handleApprove, handleReject, downloadCSV, handleDownload, data, filteredData, currentView, setCurrentView,
    handleReset, handleApproveChange, handleRejectChange, handleRemoveagent, loading } = AgentRequestHook()

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
      name: "User Name",
      cell: row => <div className="custom-cell">{row.userName}</div>,
      width: '150px'
    },
    {
      name: "Contacts",
      cell: row => <div className="custom-cell">{row.mobileNo}</div>,
      width: '160px'
    },
    {
      name: "Email",
      cell: row => <div className="custom-cell">{row.emailID}</div>,
      width: '270px'
    },
    {
      name: "Agency Name",
      cell: row => <div className="custom-cell">
        {row.agencyName}
      </div>,
      width: '170px '
    },
    {
      name: "Agency Code",
      cell: row => <div className="custom-cell">
        {row.agencyCode}
      </div>,
      width: '170px'
    },
    // {
    //   name: "Profile Photoddd",
    //   cell: row => (
    //     <>
    //       <IconButton onClick={() => handleImageClick(row.usersImagePath)} className='imgPreviewDiv'>
    //         <img height={70} width={80} src={row.usersImagePath} alt='no-img' />
    //       </IconButton>
    //       <FileDownloadOutlinedIcon onClick={() => handleDownload(row.usersImagePath, 'image.png')} style={{ color: '#EF9848' }} />
    //     </>
    //   ),
    //   width: '170px'
    // },
    {
      name: "DOB",
      cell: row => <div className="custom-cell">{row.dob}</div>,
      width: "150px"
    },
    {
      name: "Gender",
      cell: row => <div className="custom-cell">{row.gender}</div>,
    },
  ];

  // Conditionally add Action column based on currentView
  if (currentView === "default" || currentView === "approved") {
    column.push({
      name: 'Action',
      cell: (row) => {
        if (currentView === "default") {
          return (
            <>
              <button
                className='btn btn-primary me-2'
                onClick={() => handleApprove(row)}
                style={{ backgroundColor: '#EF9848', border: '0px' }}
              >
                Approve
              </button>
              <button
                className='btn btn-primary me-2'
                onClick={() => handleReject(row.userId)}
                style={{ backgroundColor: '#EF9848', border: '0px' }}
              >
                Reject
              </button>
            </>
          );
        } else if (currentView === "approved") {
          return (
            <>
              <button
                className='btn btn-success'
                onClick={() => handleApprove(row)}
                style={{ backgroundColor: '#EF9848', border: '0px' }}
              >
                Edit
              </button>
              <button
                className='btn btn-danger ms-3'
                onClick={() => handleRemoveagent(row.userId)}
                style={{ border: '0px' }}
              >
                Remove
              </button>
            </>
          );
        }
      },
      width: '210px'
    });
  }

  // const minimalColumns = column.filter(col => col.name !== 'Action');
  // const minimalColumns = currentView === 'approved'
  // ? column
  // : column.filter(col => col.name !== 'Action'); 
  const dataToRender = currentView === 'default' ? filter : filteredData;

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
        <div className="d-flex justify-content-center">
          <div className="d-flex">
            <FormControl style={{ width: '175px' }}>
              <InputLabel id="select-label">Select Status</InputLabel>
              <Select
                labelId="select-label"
                value={currentView}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === 'approved') handleApproveChange();
                  else if (value === 'rejected') handleRejectChange();
                  else setCurrentView('default');
                }}
              >
                <MenuItem value="default">--No Select--</MenuItem>
                <MenuItem value="approved">Approved</MenuItem>
                <MenuItem value="rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {loading ? (
          <div
            style={{ zIndex: 1050, height: '54%', width: '75%' }}
            className="d-flex justify-content-center align-items-center position-absolute"
          >
            <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
          </div>
        ) : (
          Array.isArray(dataToRender) && dataToRender.length > 0 ? (
            <div className="text-end">
              <DataTable
                columns={column}
                // columns={currentView === 'default' ? column : minimalColumns}
                data={dataToRender}
                fixedHeader
                pagination
                customStyles={{}} // your tableHeaderStyle here
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                subHeader
                subHeaderComponent={
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control searchInput"
                        placeholder="Search User Id"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <div className="searchIcon">
                        <SearchOutlinedIcon />
                      </div>
                    </div>

                    <div>
                      <Button className="csvDiv" onClick={downloadCSV}>
                        <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                      </Button>
                    </div>
                  </div>
                }
              />
            </div>
          ) : (
            <div className="text-center my-4 fw-bold">
                 <DataTable
                columns={column}
                data={dataToRender}
                fixedHeader
                pagination
                customStyles={{}} // your tableHeaderStyle here
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                subHeader
                subHeaderComponent={
                  <div className="d-flex justify-content-between">
                    <div className="d-flex">
                      <input
                        type="text"
                        className="form-control searchInput"
                        placeholder="Search User Id"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <div className="searchIcon">
                        <SearchOutlinedIcon />
                      </div>
                    </div>

                    {/* <div>
                      <Button className="csvDiv" onClick={downloadCSV}>
                        <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                      </Button>
                    </div> */}
                  </div>
                }
              />
              {/* Data not found */}
              </div>
          )
        )}


      </Grid>
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogContent>
          <img src={previewImageUrl} alt="Preview" width='260px' />
        </DialogContent>
      </Dialog>
    </MainCard>
  )
};

export default AgentRequest;



