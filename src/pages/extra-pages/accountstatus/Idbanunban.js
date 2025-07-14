
import MainCard from 'components/MainCard';
import { Grid, Button, Dialog, DialogContent, FormControl, MenuItem, Select } from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import CsvDownloader from 'react-csv-downloader';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import StatusHook from './StatusHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';

const IdBanUnban = () => {
  const { filter, search, setSearch, handleIdUnban, downloadCSV, handleBanClick, handleInputChange,
    openPreview, handleClosePreview, handlePopup, idBanReason, validationMessage, data, handleReset,
    handleDurationChange, loading } = StatusHook()
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;
  const handlePageChange = page => {
    setCurrentPage(page);
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
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
      width: "150px"
    },
    {
      name: "Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      width: "200px"
    }, {
      name: "Phone",
      // selector: id,
      cell: row => <div className="custom-cell">{row.mobile}</div>,
      width: "180px"
    }, {
      name: "Email",
      // selector: id,
      cell: row => <div className="custom-cell">{row.email}</div>,
      width: "300px"
    },

    {
      name: "Block Time",
      // selector: id,
      cell: row => <div className="custom-cell">{row.blockTime}</div>,
      // width:"150px"
    },
    {
      name: "Block Date",
      // selector: category,
      cell: row => <div className="custom-cell">{row.blockDate}</div>,
      width: "150px"
    },
    {

      name: "ID Ban Reason",
      // selector: id,
      cell: row => <div className="custom-cell">{row.block_Reason}</div>,
      width: "300px"
    },
    {
      name: "Block Count",
      // selector: id,
      cell: row => <div className="custom-cell">{row.blockCount}</div>,
      width: "150px"
    },
    {
      name: "Block Duration",
      cell: (row) => (
        <>
          <FormControl className='designationForm mt-2'>
            {/* <InputLabel id={`select-label-${row.userId}`}>Select Duration</InputLabel> */}
            <Select
              labelId={`select-label-${row.userId}`}
              // label='Select Duration'
              id={`select-${row.userId}`}
              value={row.blockDuration || ''}
              onChange={(event) => handleDurationChange(event, row)}
              className='selectDiv2'
            >
              <MenuItem value="--select--">--select--</MenuItem>
              <MenuItem value="30 Minutes">30 Minutes</MenuItem>
              <MenuItem value="1 hr">1 hr</MenuItem>
              <MenuItem value="3 hrs">3 hrs</MenuItem>
              <MenuItem value="24 hrs">24 hrs</MenuItem>
              {/* <MenuItem value="1 week">1 week</MenuItem> */}
              <MenuItem value="15 days">15 days</MenuItem>
              <MenuItem value="1 month">1 month</MenuItem>
              <MenuItem value="Permanently">Permanently</MenuItem>
            </Select>
          </FormControl>
        </>
      ),
      width: "200px",
      style: {
        padding: '10px 0px'
      }
    },
    {
      name: 'Action',
      cell: (row) => {
        const userId = row.userId;
        const isBanned = row.status === 'Active';
        const isUnbanned = row.status === 'Inactive';
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={() => handlePopup(userId)}
              disabled={isBanned}
              style={{ backgroundColor:isBanned ? '#8c8c8c':'#EF9848', border: '0px',fontSize:'14px' }}
            >
              Id Ban
            </button>
            <button
              className='btn btn-primary'
              onClick={() => handleIdUnban(userId)}
              disabled={isUnbanned}
              style={{
                    backgroundColor: isUnbanned ? '#8c8c8c' : '#EF9848',
                    border: 0,fontSize:'14px'
                  }}
            >
              Id UnBan
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
  const isFiltered = filter.length !== data.length;

  return (

    <MainCard title="Id Ban/UnBan">
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
        ) : (filter && filter.length > 0 ? (
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
                        onChange={(e) => setSearch(e.target.value)} ></input>
                      <div className='searchIcon'><SearchOutlinedIcon /></div>
                    </div>
                    <div>
                      <Button className='csvDiv' onClick={downloadCSV} ><FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
                    </div>
                  </div>
                </>
              }
            />
            {/* Data not found */}
          </div>
        )

        )}

      </Grid>
      <Dialog open={openPreview} onClose={handleClosePreview} maxWidth="sm" fullWidth className='idBanModal'>
        <DialogContent>
          {/* <img src={previewImageUrl} alt="Preview" width='260px' /> */}
          <div>
            <h5 style={{ textDecoration: "underline", marginBottom: "15px" }}>User Id Ban Reason </h5>
          </div>
          <div className='p-2'><b>Ban Reason</b><span style={{ color: 'red' }}>*</span></div>
          <div>
            <textarea required style={{ width: "100%", height: "139px" }} placeholder='Enter here (Minimum 20,Maximum 200 characters)'
              value={idBanReason}
              onChange={handleInputChange} />
            {validationMessage && (
              <div style={{ color: 'red', marginTop: '4px' }}>
                {validationMessage}
              </div>
            )}
          </div>
          <div className='d-flex justify-content-end mt-3'>
            <button className='btn btn-primary me-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleClosePreview} >Cancel</button>
            <button className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleBanClick}>Save</button>
          </div>
        </DialogContent>
      </Dialog>
    </MainCard>
  )
};

export default IdBanUnban;


