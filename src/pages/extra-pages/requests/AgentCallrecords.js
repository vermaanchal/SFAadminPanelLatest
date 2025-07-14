
import MainCard from 'components/MainCard';
import { Grid, IconButton, Dialog, DialogContent, } from '@mui/material';
import DataTable from 'react-data-table-component';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
import AgentcallRecordshook from './AgentcallRecordshook';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
const AgentCallrecords = () => {
  const { loading, data } = AgentcallRecordshook()
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
      name: "Agent Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agentId}</div>,
      // width: '100px'
    },
         {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },
   {
      name: "Agent Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.agentName}</div>,
      width: '140px'
    },
  
       {
      name: "User Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userName}</div>,
      width: '140px'
    },
       {
      name: "Total Gift Amount",
      // selector: id,
      cell: row => <div className="custom-cell">{row.totalGiftAmount}</div>,
      width: '200px'
    },
        {
      name: "Start Time",
      // selector: id,
      cell: row => <div className="custom-cell">{row.start_Time}</div>,
      // width: '100px'
    },
        {
      name: "End Time",
      // selector: id,
      cell: row => <div className="custom-cell">{row.end_Time}</div>,
      // width: '100px'
    },
    {
      name: "Duration",
     cell: row => <div className="custom-cell">{row.duration}</div>
      // width: '180px'
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

  return (

    <MainCard title="Create Reseller">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
        </Grid>
        <div className='text-end'>
          {loading ? (
            <div style={{ zIndex: 1050, height: "54%", width: "75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
              <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
            </div>
          ) :
            <DataTable columns={column} data={data} fixedHeader customStyles={tableHeaderStyle} className='data-table'
              pagination
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
            />}
        </div>
      </Grid>
    </MainCard>
  )
};

export default AgentCallrecords;








