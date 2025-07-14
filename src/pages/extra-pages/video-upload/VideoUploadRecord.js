
import MainCard from 'components/MainCard';
import { Grid, Dialog, DialogContent, IconButton, Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { ToastContainer } from 'react-toastify';
import VideoUploadHook from './videoUploadHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';

const VideoUploadRecord = () => {
  const { openPreview, previewImageUrl, openVideoPreview, videoUrl, setSearch, handleImageClick,
    handleClosePreview, handleVideoPreview, handleCloseVideoPreview, handleDelete,
    downloadCSV, filter, search, handleReset, data ,loading} = VideoUploadHook()
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
      selector: row => row.userid
    },
    {
      name: "User Name",
      selector: row => row.name
    },
    {
      name: "Image",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.usersImagePath)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.usersImagePath} alt='no-img' />
          </IconButton>
          {/* <FileDownloadOutlinedIcon onClick={() => handleDownload(row.usersImagePath, 'image.jpg')} style={{ color: '#EF9848', cursor: "pointer" }} /> */}
        </>
      ),
    },
    {
      name: "Video",
      cell: row => (
        <>
          <IconButton onClick={() => handleVideoPreview(row.video)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.thumbnail} alt='no-img' />
          </IconButton>
        </>
      ),
    },
    {
      name: "Video Id",
      selector: row => row.videoid
    },
    {
      name: "Uploaded Date",
      selector: row => row.videoposteddate
    },
    {
      name: 'Action',
      cell: (row) => {
        const userId = row.userid;
        const videoId = row.videoid
        return (
          <>
            <button className='btn btn-danger' style={{ backgroundColor: '#EF9848', border: '0px',fontSize:'14px' }} onClick={() => handleDelete(userId, videoId)}>Delete</button>
          </>
        )
      }
    }
  ]
  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "17px",
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

    <MainCard title="App User Details">
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
          <DataTable columns={column} data={filter} fixedHeader customStyles={tableHeaderStyle}
            highlightOnHover pagination
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
                  <div>
                    {/* <Button
                      className='csvDiv' onClick={downloadCSV}
                    >

                      <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                    </Button> */}
                  </div>
                </div>
              </>
            }
          />
        </div>}
      </Grid>
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogContent>
          <img src={previewImageUrl} alt="Preview" width='260px' />
        </DialogContent>
      </Dialog>
      <Dialog open={openVideoPreview} onClose={handleCloseVideoPreview}>
        <DialogContent>
          <video controls src={videoUrl} style={{ width: '500px', height: "340px" }}>
            <track kind="captions" src="#" />
          </video>
        </DialogContent>
      </Dialog>
    </MainCard>
  )
};

export default VideoUploadRecord;
