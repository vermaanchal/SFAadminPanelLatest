
import MainCard from 'components/MainCard';
import { Grid, IconButton, Dialog, DialogContent, } from '@mui/material';
import DataTable from 'react-data-table-component';
import FeedbackReportHook from './feedbackReportHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
const UserReportnFeedback = () => {
  const { loading, data, openPreview, previewImageUrl, handleClosePreview, handleImageClick } = FeedbackReportHook()


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
      name: "Feedback Image",
      cell: row => (
        <>
          <IconButton
            onClick={() => handleImageClick(row.feedbackImage)}
            className='imgPreviewDiv'>
            <img height={50} width={80} src={row.feedbackImage} alt='no-img' />
          </IconButton>

        </>
      ),
      // width: '180px'
    },
    {
      name: "Message",
      // selector: id,
      cell: row => <div style={{ textAlign: "justify" }} className="custom-cell">
        {row.message}
      </div>,
      // width: '160px'
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
        const dateOnly = row.date.split(' ')[0];
        return <div className="custom-cell">{dateOnly}</div>;
      },
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
            <DataTable columns={column} data={data} fixedHeader customStyles={tableHeaderStyle} className='data-table'
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

export default UserReportnFeedback;






