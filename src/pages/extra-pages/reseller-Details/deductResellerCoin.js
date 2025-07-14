import MainCard from 'components/MainCard';
import { Grid, IconButton } from '@mui/material';
import DataTable from 'react-data-table-component';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import DeductResellerHook from './deductResellerHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
const DeductResellerCoin = () => {
  const { filter, search, setSearch, handleSubmit, handleChange, data, handleReset, buttonStates ,loading} = DeductResellerHook()

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;
  const handlePageChange = page => {
    setCurrentPage(page);
  };
  const handlePerRowsChange = (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
  }
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
      // width: '100px'
    },
    {
      name: " Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      // width: '150px'
    },
    {
      name: "Image",
      cell: row => (
        <>
          <IconButton
            // onClick={() => handleImageClick(row.image)}
            className='imgPreviewDiv'>
            <img height={70} width={80} src={row.image} alt='no-img' />
          </IconButton>

        </>
      ),
      // width: '180px'
    },
    {
      name: "Available Coins",
      // selector: id,
      cell: row => <div className="custom-cell">{row.availableCoins}</div>,
      // width: '160px'
    }
    ,
    {
      name: "Coin Amount",
      // selector: id,
      cell: (row) => {
        const userId = row.userId
        const coinAmount = row.coinAmount
        return (
          <>
            <div className="custom-cell">
              <input type='text' className='form-control p-2' value={coinAmount} placeholder='Enter Coin Amount' onChange={e => handleChange(e, userId)}></input>
            </div>
          </>
        )
      },
      // width:"230px"
    }
    ,
    {
      name: 'Action',
      cell: row => {
        const userId = row.userId
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={handleSubmit}
              disabled={!buttonStates[userId]}
              style={{ backgroundColor:!buttonStates[userId]?'#8c8c8c': '#EF9848', border: '0px' }}
            >
              Deduct
            </button>
          </>
        );
      },
      // width: '210px'

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

    <MainCard title="Create Reseller">
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
                  {/* <div>
                    <Button className='csvDiv' onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
                  </div> */}
                </div>
              </>
            }
          />
        </div>}
      </Grid>
    </MainCard>
  )
};

export default DeductResellerCoin;




