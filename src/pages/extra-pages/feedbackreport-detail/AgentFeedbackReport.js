
import MainCard from 'components/MainCard';
import { Grid, IconButton, Dialog, DialogContent, } from '@mui/material';
import DataTable from 'react-data-table-component';
import FeedbackReportHook from './feedbackReportHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const AgentFeedbackReport = () => {
  const { loading, agentfeedbackdata, openPreview, previewImageUrl, handleClosePreview, handleImageClick } = FeedbackReportHook()


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
      width: "100px"
    },
    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      width: '130px'
    },
    {
        name: "Agent Id",
        // selector: id,
        cell: row => <div className="custom-cell">{row.agentId}</div>,
        // width: '100px'
      },
      {
        name: "Rating",
        cell: row => {
          const rating = parseInt(row.ratings) || 0;
          const totalStars = 5;
      
          return (
            <div>
              {[...Array(totalStars)].map((_, index) => (
                index < rating ? (
                  <StarIcon key={index} style={{ color: "#fbc02d" }} />
                ) : (
                  <StarBorderIcon key={index} style={{ color: "#ccc" }} />
                )
              ))}
            </div>
          );
        },
        width: '170px'
      },      
    {
      name: "Message",
      // selector: id,
      cell: row => <div style={{ textAlign: "justify" }} className="custom-cell">
        {row.feedback}
      </div>,
      width: '300px'
    },
    //  {
    //   name: "Type",
    //   // selector: id,
    //   cell: row => <div className="custom-cell">{row.type}</div>,
    //   // width: '160px'
    // }, 
    {
      name: "Date",
      // selector: id,
      cell: row => {
        const dateOnly = row.created_Date.split(' ')[0];
        return <div className="custom-cell">{dateOnly}</div>;
      },
      width:'120px'
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
        <div className='text-end'>
          {loading ? (
            <div style={{ zIndex: 1050, height: "54%", width: "75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
              <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
            </div>
          ) :
            <DataTable columns={column} data={agentfeedbackdata} fixedHeader customStyles={tableHeaderStyle} className='data-table'
              pagination
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
            />}
        </div>
      </Grid>
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogContent>
          <img src={previewImageUrl} alt="Preview" width='260px' />
        </DialogContent>
      </Dialog>
    </MainCard>
  )
};

export default AgentFeedbackReport;






