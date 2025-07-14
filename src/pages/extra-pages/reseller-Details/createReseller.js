
import MainCard from 'components/MainCard';
import {
  Grid, Button
  // ,FormControl,InputLabel,Select,MenuItem
} from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import ResellerHook from './resellerHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
const CreateReseller = () => {
  const { filter, search, setSearch, downloadCSV, handleSubmit, handleSelectChange
    , data, handleReset, buttonStates, loading } = ResellerHook()
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

  const column = [
    {
      name: "No.",
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
      width: '200px'
    }, {
      name: "Mobile",
      cell: row => <div className="custom-cell">{row.mobile}</div>,
      width: '120px'
    }, {
      name: "Email",
      cell: row => <div className="custom-cell">{row.email}</div>,
      width: '270px'
    },
    {
      name: 'Reseller Type',
      cell: row => {
        const userId = row.userId
        const resellerTypeId = row.resellerTypeId
        return (
          <select value={resellerTypeId} onChange={e => handleSelectChange(e, userId)} className='frameSelect'>
            <option value="">Select Reseller</option>
            <option value="1">Wood</option>
            <option value="2">Copper</option>
            <option value="3">Silver</option>
            <option value="4">Gold</option>
            <option value="">Remove Reseller</option>
          </select>
        )
      },
      width: '200px'
    },

    {
      name: 'Action',
      cell: row => {
        const userId = row.userId
        // const resellerTypeId =row.resellerTypeId
        return (
          <>
            <button
              onClick={() => handleSubmit(userId)}
              //  disabled={!buttonStates[userId]}
              disabled={!buttonStates[userId]}
              className='btn btn-primary me-4'
              style={{ backgroundColor:!buttonStates[userId]? '#8c8c8c': '#EF9848', border: '0px', marginLeft: "30px" }}
            >
              Create
            </button>
          </>
        );
      },
      width: '200px'

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
                    <Button className='csvDiv' onClick={downloadCSV} ><FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
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

export default CreateReseller;



