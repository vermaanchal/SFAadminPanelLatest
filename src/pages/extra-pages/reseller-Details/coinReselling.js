
import MainCard from 'components/MainCard';
import { Grid, IconButton } from '@mui/material';
import DataTable from 'react-data-table-component';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import CoinResellingHook from './coinResellingHook';
const CoinReselling = () => {
  const { handleSubmit, handleChange, handleUserIdChange, handleButtonClick,
    userId, filter, show
    //  ,newSearchData 
  } = CoinResellingHook();
  // const column = [
  //   {
  //     name: "User Id",
  //     cell: row => <div className="custom-cell">{row.userId}</div>,
  //   },
  //   {
  //     name: " Name",
  //     cell: row => <div className="custom-cell">{row.name}</div>,
  //   },
  //   {
  //     name: "Image",
  //     cell: row => (
  //       <>
  //         <IconButton
  //           className='imgPreviewDiv'>
  //           <img height={70} width={80} src={row.image} alt='no-img' />
  //         </IconButton>

  //       </>
  //     )
  //   },
  //   {
  //     name: "Available Coins",
  //     cell: row => <div className="custom-cell">{row.availableCoins}</div>,
  //     width: '220px'
  //   },

  // ]
  const searchcolumn = [
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
          <IconButton
            className='imgPreviewDiv'>
            <img height={70} width={80} src={row.image} alt='no-img' />
          </IconButton>

        </>
      )
    },
    {
      name: "Available Coins",
      cell: row => <div className="custom-cell">{row.availableCoins}</div>,
      width: '220px'
    },
    {
      name: "Coin Amount",
      cell: (row) => {
        const userId = row.userId
        const coinAmount = row.coinAmount
        return (
          <>
            <div className="custom-cell">
              <input type='number' className='form-control p-2' value={coinAmount} placeholder='Enter Coin Amount' onChange={e => handleChange(e, userId)}></input>
            </div>
          </>
        )
      },
      width: '230px'
    },
    {
      name: 'Action',
      cell: () => {
        return (
          <>
            <button
              className='btn btn-primary me-2'
              onClick={handleSubmit}
              style={{ backgroundColor: '#EF9848', border: '0px', marginLeft: "10px" }}
            >
              Add
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

    <MainCard title=" Reseller Coin">
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
        </div>
        <div className='text-end mt-3'>
          {show ? (
            filter?.userId ? (
              <DataTable
                columns={searchcolumn}
                data={[filter]}
                fixedHeader
                customStyles={tableHeaderStyle}
                className="data-table"
                pagination
              />
            ) : (
              <p className="text-center" style={{ fontSize: "20px" }}>Reseller not found</p>
            )
          ) : null}
          {/* <DataTable columns={userId.length === 7 && show === true? searchcolumn : column } data={userId.length === 7 && show === true ? [newSearchData]: [filter]} fixedHeader customStyles={tableHeaderStyle} className='data-table'
              pagination
            /> */}
        </div>
      </Grid>
    </MainCard>
  )
};

export default CoinReselling;




