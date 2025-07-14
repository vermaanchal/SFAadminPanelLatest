import MainCard from 'components/MainCard';
import { Grid, Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import CsvDownloader from 'react-csv-downloader';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import AudioStreamingHook from './AudioStreamingHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
const AudioStreaming = () => {
  const { filter, search, setSearch, downloadCSV, message, handleViewToday, handleViewMonthly, data, handleViewMore,
    searchType, handleFilter, dateFilterData, setFromDate, fromDate, setToDate, toDate, loading, handleReset
  } = AudioStreamingHook()

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const defaultcolumn = [
    {
      name: "No.",
      cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
      width: "50px"
    },

    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },
    {
      name: "User Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userName}</div>,
      width: '180px'
    },
    {
      name: "Date",
      // selector: id,
      cell: row => <div className="custom-cell">{row.date}</div>,
      // width: '120px'
    }, {
      name: "Live Time",
      // selector: id,
      cell: row => <div className="custom-cell">{row.liveTime}</div>,
      width: '200px'
    }, {
      name: "Today Live Count",
      // selector: id,
      cell: row => <div className="custom-cell">{row.todayLiveCount}</div>,
      // width: '180px'
    }, {
      name: "Gift Count",
      // selector: id,
      cell: row => <div className="custom-cell">{row.giftCount}</div>,
      // width: '150px'
    },
    {
      name: 'Action',
      cell: (row) => {
        const userId = row.userId;
        return (
          <>
            <button
              className='btn btn-primary me-2'
              style={{ backgroundColor: '#EF9848', border: '0px',fontSize:'14px' }}
              onClick={() => handleViewMore(userId)}
            // disabled={isApproved}
            >
              View More...
            </button>
            {/* <button
              className='btn btn-primary me-2'
              style={{ backgroundColor: '#EF9848', border: '0px' }}
              onClick={() => handleViewToday(userId)}
            // disabled={isApproved}
            >
              View More...
            </button> */}
            {/* <button
              className='btn btn-primary'
              onClick={() => { console.log("this is the user id", userId); handleViewMonthly(userId) }}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            // disabled={isRejected}
            >
              Monthly
            </button> */}
          </>
        );
      },
      width: '210px'

    }
  ]
  const dateFilterColumn = [

    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },
    {
      name: "User Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userName}</div>,
      width: '200px'
    },
    {
      name: "Date",
      // selector: id,
      cell: row => <div className="custom-cell">{row.date}</div>,
      // width: '120px'
    }, {
      name: "Live Time",
      // selector: id,
      cell: row => <div className="custom-cell">{row.liveTime}</div>,
      width: '200px'
    }, {
      name: "Today Live Count",
      // selector: id,
      cell: row => <div className="custom-cell">{row.todayLiveCount}</div>,
      // width: '180px'
    }, {
      name: "Gift Count",
      // selector: id,
      cell: row => <div className="custom-cell">{row.giftCount}</div>,
      // width: '150px'
    },
    // {
    //   name: 'Action',
    //   cell: (row) => {
    //     const userId = row.userId;
    //     return (
    //       <>
    //         <button
    //           className='btn btn-primary me-2'
    //           style={{ backgroundColor: '#EF9848', border: '0px' }}
    //           onClick={() => handleViewToday(userId)}
    //         // disabled={isApproved}
    //         >
    //           Today
    //         </button>
    //         <button
    //           className='btn btn-primary'
    //           onClick={() => handleViewMonthly(userId)}
    //           // disabled={isRejected}
    //           style={{ backgroundColor: '#EF9848', border: '0px' }}
    //         >
    //           Monthly
    //         </button>
    //       </>
    //     );
    //   },
    //   width: '210px'

    // }
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
  const columns = searchType === "dateFilter" ? dateFilterColumn : defaultcolumn;

  const tabledata = searchType === "dateFilter" ? dateFilterData : filter;
  const isFiltered = filter?.length !== data?.length;
  return (
    <MainCard title="App User Details">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        {loading ? (
          <div style={{ zIndex: 1050, height: "54%", width: "75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
          </div>
        ) :
          <div className='text-end'>
            <div className="d-flex justify-content-between align-items-center">
              <div ><button className='btn btn-primary mb-4' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleReset} >Back</button></div>
              <Button className='csvDiv' onClick={downloadCSV} ><FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
            </div>
            {filter && filter ?
              <DataTable columns={columns} data={tabledata} fixedHeader customStyles={tableHeaderStyle} className='data-table'
                pagination
                subHeader
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                subHeaderComponent={
                  <>

                    <div className='my-4 d-flex justify-content-between'>
                      <div className='d-flex justify-content-between'>
                        <div className='d-flex'>
                          <input type='text' className=' form-control searchInput' placeholder='Search user Id' value={search}
                            onChange={(e) => setSearch(e.target.value)}></input>
                          <div className='searchIcon'><SearchOutlinedIcon /></div>
                        </div>

                      </div>

                      <label htmlFor='fromDate' className='labelfordate'>From Date:</label>
                      <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className=' form-control searchDateInput' />
                      <label htmlFor='toDate' className='labelfordate'>To Date:</label>
                      <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className=' form-control searchDateInput' />
                      <button className='btn btn-primary'
                        style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleFilter}>Search</button>
                    </div>
                  </>
                }
              />
              :
              { message }
            }
          </div>}
      </Grid>
    </MainCard>
  )
};

export default AudioStreaming;


