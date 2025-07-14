
import MainCard from 'components/MainCard';
import { Grid } from '@mui/material';
import DataTable from 'react-data-table-component';
import WalletWithdrawHook from './walletHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
const WalletWithdraw = () => {
  const { data, loading } = WalletWithdrawHook()


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
      name: "User Name",
      // selector: id,
      cell: row => <div className="custom-cell">{row.userName}</div>,
      width: '200px'
    },
    {
      name: "Mobile Number",
      // selector: id,
      cell: row => <div className="custom-cell">{row.mobileNo}</div>,
      width: '180px'

    }, {
      name: "Wallet Type",
      // selector: id,
      cell: row => <div className="custom-cell">{row.walletType}</div>,
      width: '180px'

    }, {
      name: "Wallet Number",
      // selector: id,
      cell: row => <div className="custom-cell">{row.walletNo}</div>,
      width: '200px'
    }, {
      name: "Dollar Value",
      // selector: id,
      cell: row => <div className="custom-cell">{Number(row.dollarValue)?.toFixed(2)}</div>,
      // width: '160px'
    }, {
      name: "Create Date",
      // selector: id,
      cell: row => <div className="custom-cell">{row.createDate}</div>,
      width: '200px'
    }, {
      name: "Beans Amount",
      // selector: id,
      cell: row => <div className="custom-cell">{row.beansAmount}</div>,
      width: '250px'
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
        {loading ? (
          <div style={{ zIndex: 1050, height: "54%", width: "75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
            <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
          </div>
        ) :
          <div className='text-end'>
            <DataTable columns={column} data={data} fixedHeader customStyles={tableHeaderStyle} className='data-table'
              pagination
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
            />
          </div>}
      </Grid>
    </MainCard>
  )
};

export default WalletWithdraw;






