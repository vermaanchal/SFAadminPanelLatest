
import MainCard from 'components/MainCard';
import { Grid, Dialog, DialogContent, Button } from '@mui/material';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import CsvDownloader from 'react-csv-downloader';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import WalletFreezeUnfreezeHook from './WalletFreezeUnfreezeHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const WalletFreezeUnfreeze = () => {
  const { filter, search, setSearch, openPreview, previewImageUrl, handleClosePreview,
    status, downloadCSV, data, UnfrozenStatus,frozenStatus,
    handleReset, showApproveButton, showRejectButton,loading } = WalletFreezeUnfreezeHook()

  const column = [

    {
      name: "User Id",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userId}</div>,
      // width: '100px'
    },
    // {
    //   name: "Name",
    //   cell: row => <div className="custom-cell">{row.name}</div>,
    //   // width: '180px'
    // },
     {
      name: "Coin Amount",
      cell: row => <div className="custom-cell">{row.coinAmount}</div>,
      // width: '180px'
    }, {
      name: "Beans",
      cell: row => <div className="custom-cell">{row.beans}</div>,
      // width: '180px'
    }, {
      name: "Wallet Status",
      cell: row => <div className="custom-cell">{row.walletStatus === 1 ? 'Active' : 'Inactive'}</div>,
      // width: '180px'
    },

    {
      name: 'Action',
      cell: (row) => {
        return (
          <>
            {status === '' && (
              <>
                <button
                  className='btn btn-primary me-2'
                  onClick={() => frozenStatus(row.userId,row.walletStatus)}
                  disabled={row.walletStatus === 0}
                  style={{ backgroundColor: '#EF9848', border: '0px',fontSize:'14px' }}
                >
                  Freeze
                </button>
                <button
                  className='btn btn-primary me-2'
                  onClick={() => UnfrozenStatus(row.userId,row.walletStatus)}
                  disabled={row.walletStatus === 1}
                  style={{ backgroundColor: '#8c8c8c', border: '0px',fontSize:'14px' }}
                >
                  Unfreeze
                </button>
              </>
            )}
            {status === 0 && showApproveButton && (
              <button
                className='btn btn-primary me-2'
                onClick={() => frozenStatus(row.userId,row.walletStatus)}
                disabled={row.walletStatus === 0}
                style={{ backgroundColor: '#EF9848', border: '0px',fontSize:'14px' }}
              >
                Freezed
              </button>
            )}
            {status === 1 && showRejectButton && (
              <button
                className='btn btn-primary'
                onClick={() => UnfrozenStatus(row.userId,row.walletStatus)}
                disabled={row.walletStatus === 1}
                style={{ backgroundColor: '#8c8c8c', border: '0px',fontSize: '14px' }}
              >
                Unfreezed
              </button>
            )}
          </>
        );
      },
      width: '230px'

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
  // const filteredColumns = column.filter(col => col.name !== 'Action'); 
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
         {loading ?(
                <div style={{ zIndex: 1050,height:"54%",width:"75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
                  <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
                </div>
              ):filter && filter.length > 0 ?(
                <div className='text-end'>
          <DataTable
            columns={column}
            data={filter}
            fixedHeader
            customStyles={tableHeaderStyle}
            className='data-table'
            pagination
            subHeader
            subHeaderComponent={
              <>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                    <input
                      type='text'
                      className='form-control searchInput'
                      placeholder='Search User Id'
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className='searchIcon'>
                      <SearchOutlinedIcon />
                    </div>
                  </div>
                  {/* <div className=''>
                    <div className='d-flex'>

                      <FormControl style={{ width: '175px' }}>
                        <InputLabel id="select-label">Select Status</InputLabel>

                        <Select
                          labelId="select-label"
                          label='Select Role'
                          id="select"
                          style={{ textAlign: "center" }}
                        // value={roleId}
                        // onChange={handleSelectChange}
                        // className='selectDiv'
                        >
                          <MenuItem value="nostatus" >--No Select--</MenuItem>
                          <MenuItem value="1" onClick={() => handleStatusChange('Approved')}>Approved</MenuItem>
                          <MenuItem value="2" onClick={() => handleStatusChange('Reject')}>Rejected</MenuItem>
                        </Select>
                      </FormControl>
                      <div className='mx-3 d-flex'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleSubmit}>Submit</button></div>
                    </div>
                  </div> */}
                  <div>
                    <Button className='csvDiv' onClick={downloadCSV}>
                      Download
                      <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                    </Button>
                  </div>
                </div>
              </>
            }
          />
        </div>
              ):(
                <div className='text-center my-4 fw-bold'>
              <DataTable
                          columns={column}
                          data={filter}
                          fixedHeader
                          customStyles={tableHeaderStyle}
                          className='data-table'
                          pagination
                          subHeader
                          subHeaderComponent={
                            <>
                              <div className='d-flex justify-content-between'>
                                <div className='d-flex'>
                                  <input
                                    type='text'
                                    className='form-control searchInput'
                                    placeholder='Search User Id'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                  />
                                  <div className='searchIcon'>
                                    <SearchOutlinedIcon />
                                  </div>
                                </div>
                            
                                <div>
                                  <Button className='csvDiv' onClick={downloadCSV}>
                                    Download
                                    <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                                  </Button>
                                </div>
                              </div>
                            </>
                          }
                        />
                  {/* Data not found */}
                </div>
              )
              
              
              
              
              }
       
      </Grid>
      <Dialog open={openPreview} onClose={handleClosePreview}>
        <DialogContent>
          <img src={previewImageUrl} alt="Preview" width='260px' />
        </DialogContent>
      </Dialog>
    </MainCard>
  )
};

export default WalletFreezeUnfreeze;


