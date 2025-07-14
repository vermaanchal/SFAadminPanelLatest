
import MainCard from 'components/MainCard';
import { Grid, Dialog, DialogContent, IconButton, Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { ToastContainer } from 'react-toastify';
import MomentUploadHook from './momentUploadHook';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
import { useState } from 'react';

const MomentUploadList = () => {
  const { openPreview, previewImageUrl, setSearch, handleImageClick,
    handleClosePreview, handleDelete, newSearchData,
    downloadCSV, filter, search, handleReset, data, loading } = MomentUploadHook()

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;
  const column = [
    {
      name: "No.",
      cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
      width: "80px"
    },
    {
      name: "User Id",
      selector: row => row.userId
    },
    {
      name: "User Name",
      selector: row => row.name
    },
    {
      name: "Moment Id",
      selector: row => row.momentId
    },
    {
      name: "Image",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.imagePreview)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.imagePreview} alt='no-img' />
          </IconButton>
          {/* <FileDownloadOutlinedIcon onClick={() => handleDownload(row.usersImagePath, 'image.jpg')} style={{ color: '#EF9848', cursor: "pointer" }} /> */}
        </>
      ),
    },
    {
      name: "Uploaded Date",
      selector: row => row.imageUploadDate
    },
    {
      name: 'Action',
      cell: (row) => {
        const momentId = row.momentId;
        const userId = row.userId;
        return (
          <>
            <button className='btn btn-danger' style={{ backgroundColor: '#8c8c8c', border: '0px',fontSize:'14px' }} onClick={() => handleDelete(momentId, userId)}>Delete</button>
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

  const searchColumns = [
    {
      name: "User Id",
      cell: (row) => <div className="custom-cell">{row.userId}</div>,

    },
    {
      name: "User Name",
      selector: row => row.name
    },
    {
      name: "Moment Id",
      selector: row => row.momentId
    },
    {
      name: "Image",
      cell: row => (
        <>
          <IconButton onClick={() => handleImageClick(row.imagePreview)} className='imgPreviewDiv'>
            <img height={70} width={80} src={row.imagePreview} alt='no-img' />
          </IconButton>
          {/* <FileDownloadOutlinedIcon onClick={() => handleDownload(row.usersImagePath, 'image.jpg')} style={{ color: '#EF9848', cursor: "pointer" }} /> */}
        </>
      ),
    },
    {
      name: "Uploaded Date",
      selector: row => row.imageUploadDate
    },
    {
      name: 'Action',
      cell: (row) => {
        const momentId = row.momentId;
        return (
          <>
            <button className='btn btn-danger' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={() => handleDelete(momentId)}>Delete</button>
          </>
        )
      }
    }

  ]


  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
  };
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
        ) : (search ? newSearchData?.length > 0 : filter?.length > 0) ? (
          <div className='text-end'>
            <DataTable columns={search ? searchColumns : column} data={search ? newSearchData : filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
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
                      <Button
                        className='csvDiv' onClick={downloadCSV}
                      >

                        <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                      </Button>
                    </div>
                  </div>
                </>
              }
            />
          </div>
        ) : (
          <div className="text-center my-4" style={{  fontWeight: 'bold' }}>
              <DataTable columns={search ? searchColumns : column} data={search ? newSearchData : filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
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
                      <Button
                        className='csvDiv' onClick={downloadCSV}
                      >

                        <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                      </Button>
                    </div>
                  </div>
                </>
              } />
            {/* Data Not Found */}
          </div>
        )



        }
        {/* <div className='text-end'>
          <DataTable columns={search ? searchColumns : column} data={search ? newSearchData : filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
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
                    <Button
                      className='csvDiv' onClick={downloadCSV}
                    >

                      <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                    </Button>
                  </div>
                </div>
              </>
            }
          />
        </div> */}
      </Grid>
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogContent>
          <img src={previewImageUrl} alt="Preview" width='260px' />
        </DialogContent>
      </Dialog>
    </MainCard>
  )
};

export default MomentUploadList;
