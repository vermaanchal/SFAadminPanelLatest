

import MainCard from 'components/MainCard';
import { Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import TripleSevenHook from './777Hook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';

const TripleSeven = () => {
  const { filter, search, setSearch, downloadCSV, setSelectGame,
    selectgame, handleGameBtn, handleReset, data, newSearchData, loading } = TripleSevenHook();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Calculate the starting index for continuous numbering
  const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;

  const defaultColumn = [
    {
      name: "No.",
      cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
      width: '80px'
    },
    {
      name: " Name",
      cell: row => <div className="custom-cell">{row.name}</div>,
      width: '200px'
    },
    {
      name: "User Id",
      cell: row => <div className="custom-cell">{row.userId}</div>,
    },
    {
      name: "Available Coins ",
      cell: row => <div className="custom-cell">{row.availableCoins}</div>,
      width: "200px"
    },
    {
      name: "Bet ",
      cell: row => <div className="custom-cell">{row.bet}</div>,
    },
    {
      name: "Result",
      cell: row => <div className="custom-cell">{row.results}</div>,
    }, {
      name: "Date ",
      cell: row => <div className="custom-cell">{row.date}</div>,
      width: '200px'
    }
  ];

  const searchColumns = [
    {
      name: "No.",
      cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
      width: '80px'
    },
    {
      name: " Name",
      cell: row => <div className="custom-cell">{row.name}</div>,
    },
    {
      name: "Available Coins ",
      cell: row => <div className="custom-cell">{row.availableCoins}</div>,
    },
    {
      name: "Bet ",
      cell: row => <div className="custom-cell">{row.bet}</div>,
    },
    {
      name: "Result ",
      cell: row => <div className="custom-cell">{row.results}</div>,
    },
    {
      name: "Date ",
      cell: row => <div className="custom-cell">{row.date}</div>,
      width: '200px'
    }
  ];

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
  };

  const isFiltered = filter.length !== data.length;

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
  };

  return (
    <MainCard title="Create Reseller">
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
          <DataTable
            columns={search ? searchColumns : defaultColumn}
            data={search ? newSearchData : filter}
            fixedHeader
            customStyles={tableHeaderStyle}
            className='data-table'
            pagination
            paginationServer={false}
            paginationDefaultPage={1}
            paginationPerPage={rowsPerPage}
            paginationRowsPerPageOptions={[10, 20, 30]}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
            persistTableHead
            subHeader
            subHeaderComponent={
              <>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                    <input type='text' className=' form-control searchInput' placeholder='Search User Id' value={search}
                      onChange={(e) => setSearch(e.target.value)}></input>
                    <div className='searchIcon'><SearchOutlinedIcon /></div>
                  </div>
                  <div>
                    <FormControl className='designationForm'>
                      <InputLabel id="select-label">Select</InputLabel>
                      <Select
                        labelId="select-label"
                        label='Select Role'
                        id="select"
                        value={selectgame}
                        onChange={(e) => setSelectGame(e.target.value)}
                        className='selectDiv'
                      >
                        <MenuItem value="1">Enable</MenuItem>
                        <MenuItem value="0">Disable</MenuItem>
                      </Select>
                    </FormControl>
                    <button className='btn btn-primary ms-2 p-2'
                      style={{ backgroundColor: '#EF9848', border: '0px' }}
                      onClick={handleGameBtn}
                    >Submit</button>
                  </div>
                  <div>
                    <Button className='csvDiv' onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
                  </div>
                </div>
              </>
            }
          />
        </div>}
      </Grid>
    </MainCard>
  )
};

export default TripleSeven;


