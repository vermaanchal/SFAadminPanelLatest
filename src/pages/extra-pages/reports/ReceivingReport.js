import MainCard from 'components/MainCard';
import { Grid, Button, FormControl, InputLabel, Select, MenuItem  } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import ReceivingReportHook from './ReceivingReportHook';
const ReceivingReport = () => {
  const { filter, search, setSearch, downloadCSV, handleFilter, fromDate, toDate, setFromDate, setToDate,
    handleAdminRecieving,handleAgencyRecieving,handleReset,data,loading,handleAllRecieving,
    newSearchData,searchType,dateFilterData} = ReceivingReportHook()

  const defaultcolumn = [
    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },
    {
      name: " Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      width: '190px'
    },

    {
      name: "Agency Code ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyCode}</div>,
      // width: '160px'
    },
    {
      name: "Admin Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.adminId}</div>,
      // width: '160px'
    }
    , {
      name: "Available Beans ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.availableBeans}</div>,
      width: '200px'
    }
    , {
      name: "Receiving ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.receiving}</div>,
      // width: '160px'
    }, {
      name: " Month Date ",
      cell: row => <div className="custom-cell">{row.date}</div>,
      width:'200px'
    //   cell: row => {
    //     const dateOnly = row.date.split(' ')[0];
    //     return <div className="custom-cell">{dateOnly}</div>;
    // },
      // width: '200px'
    }
  ]
  const Searchcolumn = [
    {
      name: "Admin Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.adminid}</div>,
      // width: '100px'
    },
    {
      name: " Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      width: '170px'
    },

    {
      name: "Host Code ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.hostCode}</div>,
      // width: '160px'
    },
    {
      name: "Agency Code",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyCode}</div>,
      // width: '160px'
    }
    , {
      name: "Total Beans ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.totalBeans}</div>,
      // width: '200px'
    }
    , {
      name: "Coin Amount ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.coinAmount}</div>,
      // width: '160px'
    },  {
      name: "Created Date",
      // selector: id,
      cell: row => <div className="custom-cell">{row.created_date}</div>,
      // width: '160px'
    },
  ]
  const dateFilterColumn = [
    {
      name: "Admin Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.adminid}</div>,
      // width: '100px'
    },
    {
      name: " Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      width: '200px'
    },

    {
      name: "Host Code ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.hostCode}</div>,
      // width: '160px'
    },
    {
      name: "Agency Code",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyCode}</div>,
      // width: '160px'
    }
    , {
      name: "Receiving ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.receiving}</div>,
      // width: '200px'
    }
  ]

  const columns =
  searchType === "search"
    ? Searchcolumn
    : searchType === "dateFilter"
    ? dateFilterColumn
    : defaultcolumn;

const tabledata =
  searchType === "search"
    ? newSearchData
    : searchType === "dateFilter"
    ? dateFilterData
    : filter;

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

    <MainCard title="Total Receiving Report">
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
              ) :
        <div className='text-end'>
        <DataTable columns={columns} data={tabledata} fixedHeader customStyles={tableHeaderStyle} className='data-table'
            pagination
            subHeader
            subHeaderComponent={
              <>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                    <input type='text' className=' form-control searchInput' placeholder='Search User Id' value={search}
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
                <div>
                  <FormControl className='designationForm'>
                    <InputLabel id="select-label">Host</InputLabel>
                    <Select
                      labelId="select-label"
                      label='Select Role'
                      id="select"
                      // value={selectgame}
                      // onChange={(e) => setSelectGame(e.target.value)}
                      className='selectDiv'
                    >
                      {/* <MenuItem value="host" >Host</MenuItem> */}
                      <MenuItem value="admin" onClick={handleAdminRecieving}>Admin</MenuItem>
                      <MenuItem value="agency" onClick={handleAgencyRecieving}>Agency</MenuItem>
                      <MenuItem value="All" onClick={handleAllRecieving}>All</MenuItem>
                    </Select>
                  </FormControl>
                  </div>
              </>
            }
          />
        </div>}
      </Grid>
    </MainCard>
  )
};

export default ReceivingReport;







