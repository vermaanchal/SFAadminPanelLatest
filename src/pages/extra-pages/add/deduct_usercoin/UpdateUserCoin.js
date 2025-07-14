
import MainCard from 'components/MainCard';
import React from 'react';
import { Grid, IconButton } from '@mui/material';
import DataTable from 'react-data-table-component';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import demoImage from '../../../../assets/images/users/sfaLogo.png'
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
import UpdateUsercoinHook from './updateUsercoinHOok';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: 'None',
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};


const UpdateUserCoin = () => {
  const { filter, search, setSearch, handleChange, handleSubmit, handleDeductCoin,
    newSearchData, data, handleReset, amounts, loading, fetchSearchResults, open, setOpen, handleOpen, handleClose, handleaddcoin, action, handleDeduct } = UpdateUsercoinHook()
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;
  const handlePageChange = page => {
    setCurrentPage(page);
  }
  const handlePerRowsChange = (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
  }
  console.log(newSearchData,filter,'nennwwnwnwn')

  const defaultColumns = [
    {
      name: "No.sss",
      cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
      width: "80px"
    },
    {
      name: "User Id",
      cell: row => <div className="custom-cell">{row.userId}</div>,
    },
    {
      name: " Name",
      cell: row => <div className="custom-cell">{row.name}</div>,
    },
    {
      name: "Image",
      cell: row => (
        <>
          {row.image ?
            <IconButton
              className='imgPreviewDiv'>
              <img height={70} width={80} src={row.image} alt='no-img' />
            </IconButton>
            :
            <IconButton className='imgPreviewDiv'>
              <img height={70} width={80} src={demoImage} alt='no-img' />
            </IconButton>
          }
        </>
      ),
      width: '180px'
    },
    {
      name: "Transaction Type",
      cell: row => <div className="custom-cell">{row.transactionType}</div>,
    }, {
      name: "Amount",
      cell: row => <div className="custom-cell">{row.availableAmount}</div>,
    }, {
      name: "Date Time",
      cell: row => <div className="custom-cell">{row.dateTime}</div>,
    }

  ]
  const searchColumns = [
    {
      name: "User Id",
      cell: row => <div className="custom-cell">{row.userId}</div>,
    },
    {
      name: " Name",
      cell: row => <div className="custom-cell">{row.name}</div>,
    },
    {
      name: "Image",
      cell: (row) => (
        <>
          <IconButton
            className='imgPreviewDiv'>
            <img height={70} width={80} src={row.image} alt='no-img' />
          </IconButton>

        </>
      ),
    },
    {
      name: "Available Coins",
      cell: row => <div className="custom-cell">{row.availableCoins}</div>,
    }
    ,
    {
      name: "Amount",
      cell: (row) => {
        const userId = row.userId
        // const amount =row.amount
        return (
          <>
            <div className="custom-cell">
              <input type='text' className='form-control p-2' value={amounts} placeholder='Enter Coin Amount' onChange={e => handleChange(e, userId)}></input>
            </div>
          </>
        )
      },
      width: '230px'
    }
    ,
    {
      name: 'Action',
      cell: () => {
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={handleSubmit}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Add
            </button>
            <button
              className='btn btn-primary me-2'
              onClick={handleDeductCoin}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Deduct
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

    <MainCard title="Create Reseller">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        {isFiltered && (
          <div className='mx-3'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleReset} >Back</button></div>
        )}

        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <input type='text' className=' form-control searchInput' placeholder='Search User Id' value={search}
              onChange={(e) => setSearch(e.target.value)}></input>
            <div className='searchIcon' ><SearchOutlinedIcon onClick={fetchSearchResults}
              style={{ cursor: "pointer" }} /></div>
          </div>
          {/* <div>
            <Button className='csvDiv' onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
          </div> */}
        </div>
        {loading ? (
          <div style={{ zIndex: 1050, height: "54%", width: "75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
          </div>
        ) :
          <div className='text-end mt-3'>
            <DataTable columns={search ? searchColumns : defaultColumns} data={search ? newSearchData : filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
              pagination
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
            />
          </div>}
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h2">
            Are You Sure to {action} amount
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", alignItem: "flex-end", marginTop: "20px", }}>
            {action === "Add" ? (<Button type="button" onClick={handleaddcoin} variant="contained">Ok</Button>) : ""}
            {action === "Deduct" ? (<Button type="button" onClick={handleDeduct} variant="contained">Ok</Button>) : ""}

            <Button type="button" onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
        {/* <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box> */}
      </Modal>
    </MainCard>
  )
};

export default UpdateUserCoin;




