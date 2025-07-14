
import MainCard from 'components/MainCard';
import { Grid } from '@mui/material';
import DataTable from 'react-data-table-component';
import EndUserStreamHook from './ENdUserStreamHook';
import { ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
import { useState } from 'react';
const EndUserStream = () => {
  const { data, handleAdd, message, loading } = EndUserStreamHook()

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
  const column = [
    {
      name: "No.",
      cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
      width: "70px"
    },
    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },
    {
      name: "Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.name}</div>,
      // width: '100px'
    },
    {
      name: "Live Status",
      // selector: id,
      cell: row => <div className="custom-cell">{row.liveStatus}</div>,
      // width: '160px'
    }, {
      name: 'Action',
      cell: (row) => {
        const userId = row.userId
        return (
          <>
            <button className='btn btn-danger' style={{ backgroundColor: '#EF9848', border: '0px' }}
              onClick={() => handleAdd(userId)}
            >Live End</button>
          </>
        )
      }
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

  return (

    <MainCard title="Create Reseller">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
        </Grid>

        <div className='text-end position-relative'>
          {loading ? (
            <div
              style={{ zIndex: 1050, height: "54%", width: "75%" }}
              className="d-flex justify-content-center align-items-center position-absolute"
            >
              <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
            </div>
          ) : data && data.length > 0 ? (
            <DataTable
              columns={column}
              data={data}
              fixedHeader
              customStyles={tableHeaderStyle}
              className='data-table'
              pagination
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
            />
          ) : (
            <div className="text-center text-muted mt-4">{message || "No data available"}</div>
          )}
        </div>

        <ToastContainer />
      </Grid>
    </MainCard>
  )
};

export default EndUserStream;






