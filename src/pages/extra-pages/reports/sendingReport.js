import MainCard from 'components/MainCard';
import { Grid, Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import SendingReportHook from './SendingReportHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const SendingReport = () => {
  const { filter, search, setSearch, downloadCSV, handleFilter,
    fromDate, toDate, setFromDate, setToDate, handleReset, data, loading,newSearchData } = SendingReportHook()

  const defaultcolumn = [
    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width: '200px'
    },
    {
      name: " Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      // width: '200px'
    },

    {
      name: "Sending",
      // selector: id,
      cell: row => <div className="custom-cell">{row.sending}</div>,
      // width: '200px'
    },
    {
      name: " Date ",
      // selector: id,
      cell: row => {
        const dateOnly = row.date.split(' ')[0];
        return <div className="custom-cell">{dateOnly}</div>;
      },
      // width:"240px"
    }

  ]
  const Searchcolumn = [
    {
      name: "Login Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.loginId}</div>,
      // width: '200px'
    },
    {
      name: " Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.loginname}</div>,
      // width: '200px'
    },

    {
      name: "Coin Amount",
      // selector: id,
      cell: row => <div className="custom-cell">{row.coinAmount}</div>,
      // width: '200px'
    },
    {
      name: "Date",
      // selector: id,
      cell: row => <div className="custom-cell">{row.created_date}</div>,
      // width: '200px'
    },

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

    <MainCard title="Total Sending Report">
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
        <DataTable columns={search ? Searchcolumn : defaultcolumn} data={search ? newSearchData : filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
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
                <div className=' my-4 d-flex justify-content-end'>
                  {/* <div className='col'> */}
                  <label htmlFor='fromDate' className='labelfordate'>From Date:</label>
                  <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className=' form-control searchDateInput' />
                  {/* </div> */}
                  {/* <div className='col'> */}
                  <label htmlFor='toDate' className='labelfordate'>To Date:</label>
                  <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className=' form-control searchDateInput' />
                  {/* </div> */}
                  {/* <div className='col'> */}
                  <button className='btn btn-primary'
                    style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleFilter}>Search</button>
                  {/* </div> */}
                </div>
              </>
            }
          />
        </div>}
      </Grid>
    </MainCard>
  )
};

export default SendingReport;








