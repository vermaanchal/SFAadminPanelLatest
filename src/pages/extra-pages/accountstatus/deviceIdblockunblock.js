
import MainCard from 'components/MainCard';
import { Grid, Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import DeviceIdBlockUnblockHook from './deviceblockUnblockHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
const DeviceIdBlockUnblock = () => {
  const { filter, search, setSearch, handleBlock,
    handleUnblock, downloadCSV, handleReset, data, loading } = DeviceIdBlockUnblockHook()
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;
  const handlePageChange = page => {
    setCurrentPage(page);
  }; 
  const handlePerRowsChange = async (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
  }

  const column = [
    {
      name: "No.",
      cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
      width: "80px"
    }, {
      name: "Status",
      cell: row => <div className="custom-cell">{row.deviceStatus}</div>,
      width: '150px'
    }, {
      name: "Device Status",
      cell: row => <div className="custom-cell">{row.deviceStatus}</div>,
      width: '150px'
    },

    {
      name: "User Id",
      cell: row => <div className="custom-cell">{row.userId}</div>,
      width: '180px'
    },
    {
      name: "Name",
      cell: row => <div className="custom-cell">{row.name}</div>,
      width: '200px'
    }, {
      name: "Mobile Number",
      cell: row => <div className="custom-cell">{row.mobile}</div>,
      width: '200px'
    }, {
      name: "Email",
      cell: row => <div className="custom-cell">{row.email}</div>,
      width: '300px'
    }, {
      name: "Password",
      cell: row => <div className="custom-cell">{row.password}</div>,
      width: '170px'
    },
    {
      name: "Device Id",
      cell: row => <div className="custom-cell">{row.deviceId}</div>,
      width: '170px'
    },
    {
      name: 'Action',
      cell: (row) => {
        const deviceId = row.deviceId;
        const userId = row.userId;
        const isBlocked = row.deviceStatus === 'False';
        const isUnblocked = row.deviceStatus === 'True';
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={() => handleBlock({ deviceId, userId })}
              disabled={isBlocked}
              style={{ backgroundColor:isBlocked? '#8c8c8c':'#EF9848', border: '0px',fontSize:'14px' }}
            >
              Block
            </button>
            <button
              className='btn btn-primary'
              onClick={() => handleUnblock({ deviceId, userId })}
              disabled={isUnblocked}
              style={{ backgroundColor: isUnblocked ?'#8c8c8c':'#EF9848', border: '0px',fontSize:'14px' }}
            >
              Unblock
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
  const isFiltered = filter?.length !== data?.length;

  return (

    <MainCard title="App User Details">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        {isFiltered && isFiltered && (
          <div className='mx-3'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleReset} >Back</button></div>
        )}
        {loading ? (
          <div style={{ zIndex: 1050, height: "54%", width: "75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
          </div>
        ) : filter && filter.length > 0 ? (
          <div className='text-end'>
            <DataTable
              columns={column}
              // data={filter?.filter((row) => {
              //   if (search) {
              //     return row.userId.toLowerCase().includes(search.toLowerCase());
              //   }
              //   return row.deviceStatus === "False";
              // })}

              data={filter}
              fixedHeader
              customStyles={tableHeaderStyle}
              className="data-table"
              pagination
              subHeader

              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              subHeaderComponent={
                <>
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

                        <FileDownloadOutlinedIcon style={{ color: "#EF9848" }} />
                      </Button>
                    </div>
                  </div>
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
              className="data-table"
              pagination
              subHeader

              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              subHeaderComponent={
                <>
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
                      {/* <Button className="csvDiv" onClick={downloadCSV}>

                        <FileDownloadOutlinedIcon style={{ color: "#EF9848" }} />
                      </Button> */}
                    </div>
                  </div>
                </>
              }
            />
            {/* Data not found */}
          </div>
        )}

      </Grid>
    </MainCard>
  )
};

export default DeviceIdBlockUnblock;


