import MainCard from 'components/MainCard';
import { Grid } from '@mui/material';
import DataTable from 'react-data-table-component';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import AddRemoveThemeHook from './AddRemoveThemeHook';

const AddRemoveTheme = () => {
  const { duration, handleAddFrame, handleUserIdChange, handleDurationChange, handleButtonClick,
    frameId, userId, filter, show, frameOption, handleSelectChange, handleRemoveFrame } = AddRemoveThemeHook();
  const column = [
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
      name: 'Frame',
      cell: row => {
        const userId = row.userId
        return (
          <select value={frameId} onChange={e => handleSelectChange(e, userId)} className='frameSelect selectDiv' >
            <option>Select Theme</option>
            {frameOption.map((option) => {
              return (
                <option key={option.rideId} value={option.rideId}>
                  {option.themeName}
                </option>

              )
            }
            )}
          </select>
        )
      }
    },
    {
      name: 'Duration',
      cell: () => {
        return (
          <select value={duration} onChange={handleDurationChange} className='frameSelect'>
            <option value="">Select Duration</option>
            <option value="7 days">7 days</option>
            <option value="15 days">15 days</option>
            <option value="30 days">30 days</option>
          </select>
        )
      }
    },
    {
      name: 'Action',
      cell: () => {
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={handleAddFrame}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Add
            </button>
            <button
              className='btn btn-primary'
              onClick={handleRemoveFrame}
              style={{ backgroundColor: '#EF9848', border: '0px' }}
            >
              Remove
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

  return (

    <MainCard title="Add/Remove Frames">
      <Grid item xs={12} md={12} lg={12}>
        <Grid >
          <ToastContainer />
        </Grid>
        <div className='d-flex justify-content-between'>
          <div className='d-flex'>
            <input type='text' className=' form-control searchInput' placeholder='Search User Id' value={userId}
              onChange={handleUserIdChange}></input>
            <div className='searchIcon' ><SearchOutlinedIcon
              onClick={handleButtonClick}
              style={{ cursor: "pointer" }} /></div>
          </div>
          {/* <div>
          <Button className='csvDiv' onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
        </div> */}
        </div>
        <div className='text-end mt-3'>
          {/* {userId.length === 7 && show === true &&(
        <DataTable columns={column} data={[filter]} fixedHeader customStyles={tableHeaderStyle} className='data-table'
          pagination
        />
      )
    }  */}
          {show ? (
            filter?.userId ? (
              <DataTable
                columns={column}
                data={[filter]}
                fixedHeader
                customStyles={tableHeaderStyle}
                className="data-table"
                pagination
              />
            ) : (
              <p className="text-center" style={{ fontSize: "20px" }}>No data Available</p>
            )
          ) : null}
        </div>
      </Grid>
    </MainCard>
  )
};

export default AddRemoveTheme;




