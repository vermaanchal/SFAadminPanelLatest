import MainCard from 'components/MainCard';
import { Grid, Button, FormControl, InputLabel, Select, MenuItem  } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import MOnthlyReportHook from './monthlyreportHook';
const MonthlyReport = () => {
  const { filter, search, setSearch, downloadCSV, fromDate, toDate, setFromDate, setToDate,
    handleMonthlyReceiver,handleReset,data,handleFilter,searchType,
    dateFilterData,newSearchData,loading} = MOnthlyReportHook()

  const defaultcolumn = [
    {
      name: "Sender Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.senderId}</div>,
      // width: '100px'
    },
    {
      name: " Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      width: '190px'
    },
    {
      name: "Id Number",
      // selector: id,
      cell: row => <div className="custom-cell">{row.idNumber}</div>,
      width: '160px'
    },
    {
      name: "Agency Code ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agencyCode}</div>,
      width: '160px'
    },
    {
      name: "Admin Code",
      // selector: id,
      cell: row => <div className="custom-cell">{row.adminCode}</div>,
      width: '160px'
    }
    , {
      name: "Total Beans",
      // selector: id,
      cell: row => <div className="custom-cell">{row.totalBeans}</div>,
      width:'160px'
    }
    , {
      name: "User Coin Amount ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userCoinAmount}</div>,
      width: '160px'
    },
    {
      name: "Bean Amount ",
      // selector: id,
      cell: row => <div className="custom-cell">{row.beanAmount}</div>,
      width: '160px'
    },
  
  ]
  const Searchcolumn = [
    {
      name: "Sendor Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.senderId}</div>,
      // width: '100px'
    },

    {
      name: "Total Beans",
      // selector: id,
      cell: row => <div className="custom-cell">{row.totalBeans}</div>,
      // width: '160px'
    },
    {
      name: " Bean Amount",
      // selector: id,
      cell: row => <div className="custom-cell">{row.beanAmount}</div>,
      // width: '150px'
    },

  
  ]
  const dateFilterColumn =[
    {
      name: "Sendor Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.senderId}</div>,
      // width: '100px'
    },

    {
      name: "Total Beans",
      // selector: id,
      cell: row => <div className="custom-cell">{row.totalBeans}</div>,
      // width: '160px'
    },
    {
      name: " Bean Amount",
      // selector: id,
      cell: row => <div className="custom-cell">{row.beanAmount}</div>,
      // width: '150px'
    },

  
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
  const isFiltered = filter ? filter.length !== data.length :'';

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
                    <input type='text' className=' form-control searchInput' placeholder='Search Sender Id' value={search}
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
                    <InputLabel id="select-label">Sender</InputLabel>
                    <Select
                      labelId="select-label"
                      label='Select Role'
                      id="select"
                      // value={selectgame}
                      // onChange={(e) => setSelectGame(e.target.value)}
                      className='selectDiv'
                    >
                      <MenuItem value="receiver" onClick={handleMonthlyReceiver}>Receiver</MenuItem>
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

export default MonthlyReport;







