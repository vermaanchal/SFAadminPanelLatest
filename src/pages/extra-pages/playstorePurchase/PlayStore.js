
import MainCard from 'components/MainCard';
import { Grid, Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import PlaystorePurchaseHook from './playStorePurchasehook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
 
const PlayStoreRecord = () => {
    const { setSearch, newSearchData,
        downloadCSV, filter, search, handleReset, data, loading } = PlaystorePurchaseHook()
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;
    const column = [
        {
            name: "No.",
            cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
            width: '80px'
        },
        {
            name: "User Id",
            selector: row => row.userId
        },
        {
            name: " Name",
            selector: row => row.name,
            width: '200px'
        },
        {
            name: "Previous Coin Amount",
            selector: row => row.previousCoinAmount,
            width: '180px'
        },
        {
            name: "Purchased Coins",
            selector: row => row.purchasedCoins,
            width: '180px'
        },
        {
            name: "Latest Coin Amount",
            selector: row => row.latestCoinAmount,
            width: '180px'
        },
        {
            name: "Status",
            selector: row => row.status,
            width: '180px'
        },
        {
            name: "Transaction Date",
            selector: row => row.transactionDate,
            width: '190px'
        },

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
    const isFiltered = filter?.length !== data?.length;

    const searchColumns = [
        {
            name: "No.",
            cell: (row, index) => <div className="custom-cell">{index + 1}</div>,
            width: '80px'
        },
        {
            name: " Name",
            selector: row => row.name,
            // width:'200px'
        },
        {
            name: "User Id",
            selector: row => row.userId
        },
        {
            name: "Previous Coin Amount",
            selector: row => row.previousCoinAmount,
            width: '180px'
        },
        {
            name: "Purchased Coins",
            selector: row => row.purchasedCoins,
            width: '180px'
        },
        {
            name: "Latest Coin Amount",
            selector: row => row.latestCoinAmount,
            width: '180px'
        },

        {
            name: "Status",
            selector: row => row.status,
            width: '180px'
        },
        {
            name: "Transaction Date",
            selector: row => row.transactionDate,
            width: '190px'
        },

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
                {isFiltered && isFiltered && (
                    <div className='mx-3'><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleReset} >Back</button></div>
                )}
                {loading ? (
                    <div style={{ zIndex: 1050, height: "54%", width: "75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
                        <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
                    </div>
                ) : filter && filter.length > 0 ? (
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
                                            <Button className='csvDiv' onClick={downloadCSV}>

                                                <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            }
                        />
                    </div>
                ) : (
                    <div className='text-center fw-bold'>
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
                                            <Button className='csvDiv' onClick={downloadCSV}>

                                                <FileDownloadOutlinedIcon style={{ color: '#EF9848' }} />
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            }
                        />
                         {/* Data not found */}
                         </div>
                )}

            </Grid>
        </MainCard>
    )
};

export default PlayStoreRecord;
