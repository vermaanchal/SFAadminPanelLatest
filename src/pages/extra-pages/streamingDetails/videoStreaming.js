import MainCard from 'components/MainCard';
import { Grid, Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import VideoStreamingHook from './VideoStreamingHook';
const VideoStreaming = () => {
  const { filter, search, setSearch, downloadCSV, message,handleViewToday,
    searchType, handleFilter, dateFilterData, setFromDate, fromDate, setToDate, toDate
  } = VideoStreamingHook()

  const defaultcolumn = [
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
      // width: '100px'
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
      // width: '120px'
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
        // const agencyCode = row.agencyCode;
        const userId =row.userId;
        // const isApproved = row.status === 'Approved';
        // const isRejected = row.status === 'Reject';
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={()=>handleViewToday(userId)}
              // disabled={isApproved}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Today
            </button>
            {/* <button
              className='btn btn-primary'
              onClick={()=>handleViewMonthly(userId)}
              // disabled={isRejected}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
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
      // width: '100px'
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
      // width: '120px'
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
    //     // const agencyCode = row.agencyCode;
    //     const userId =row.userId;
    //     // const isApproved = row.status === 'Approved';
    //     // const isRejected = row.status === 'Reject';
    //     return (
    //       <>
    //         <button
    //           className='btn btn-primary me-2'
    //           onClick={()=>handleViewToday(userId)}
    //           // disabled={isApproved}
    //           style={{ backgroundColor: '#EF9848', border: '0px' }}
    //         >
    //           Today
    //         </button>
    //         <button
    //           className='btn btn-primary'
    //           onClick={()=>handleViewMonthly(userId)}
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
  const columns =
    searchType === "dateFilter"
      ? dateFilterColumn
      : defaultcolumn;

  const tabledata =
    searchType === "dateFilter"
      ? dateFilterData
      : filter;

  return (

    <MainCard title="App User Details">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        <div className='text-end'>
          {filter ?
            <DataTable columns={columns} data={tabledata} fixedHeader customStyles={tableHeaderStyle} className='data-table'
              pagination
              subHeader
              subHeaderComponent={
                <>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex'>
                      <input type='text' className=' form-control searchInput' placeholder='Search user Id' value={search}
                        onChange={(e) => setSearch(e.target.value)}></input>
                      <div className='searchIcon'><SearchOutlinedIcon /></div>
                    </div>
                    <div>
                      <Button className='csvDiv' onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
                    </div>
                  </div>
                  <div className='my-4 d-flex justify-content-end'>
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
        </div>
      </Grid>
    </MainCard>
  )
};

export default VideoStreaming;



