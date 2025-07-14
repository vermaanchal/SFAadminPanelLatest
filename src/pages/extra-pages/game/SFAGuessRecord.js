

import MainCard from 'components/MainCard';
import { Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import SFAgameHook from './SFAgameHook';
import { useState } from 'react';
import { NavLink } from '../../../../node_modules/react-router-dom/dist/index';
import SFAGuessRecordHook from './SFAGuessRecordHook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
const SFAGuessRecord = () => {
    const { filter, search, setSearch, downloadCSV, selectgame, loading,
        setSelectGame, handleGameBtn, handleReset, data, newSearchData } = SFAGuessRecordHook();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // console.log("lala", data)

    // Calculate the starting index for continuous numbering
    const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;

    const defaultColumn = [
        {
            name: "No.",
            cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
            width: "80px"
        },
        {
            name: "Round",
            cell: (row, index) => <div className="custom-cell">{row.round}</div>,
            width: "150px"
        },
        {
            name: "Ferrari Bet",
            cell: row => <div className="custom-cell" style={{ paddingLeft: "0px", textAlign: "left" }}>{row.ferrari_bet}</div>,
            width: "110px"
        },
        {
            name: "Range Rover Bet",
            cell: row => <div className="custom-cell">{row.rangerover_bet}</div>, width: "150px"
        },
        {
            name: "Fortuner Bet",

            cell: row => <div className="custom-cell">{row.fortuner_bet}</div>,
            width: "120px"
        },
        {
            name: "Honda Bet",
            cell: row => <div className="custom-cell">{row.honda_bet}</div>, width: "110px"
        },
        {
            name: "Pizza Bet",
            cell: row => <div className="custom-cell">{row.pizza_bet}</div>, width: "100px"
        },
        {
            name: "Chicken Bet",
            cell: row => <div className="custom-cell">{row.chicken_bet}</div>, width: "120px"
        },
        {
            name: "Burger  Bet",
            cell: row => <div className="custom-cell">{row.burger_bet}</div>, width: "110px"
        },
        {
            name: "Noodle  Bet",
            cell: row => <div className="custom-cell">{row.noodle_bet}</div>, width: "110px"
        },
        {
            name: "Total  Bet",
            cell: row => <div className="custom-cell">{row.bet}</div>, width: "110px"
        },
        {
            name: "Win Amount",
            cell: row => <div className="custom-cell">{row.amount}</div>, width: "120px"
        },
        {
            name: "Win Item",
            cell: row => <div className="custom-cell">{row.winningType}</div>, width: "110px"
        },
        {
            name: "Profit/Loss",
            cell: row => (
                <div
                    className="custom-cell"
                    style={{
                        color: parseFloat(row.result) >= 0 ? '#06C529' : '#EF3826',
                        fontWeight: 'bold',
                    }}
                >
                    {row.result}
                </div>
            ),
        },

        {
            name: "Date ",
            cell: row => <div className="custom-cell"> <NavLink to={`/SFAGuessRecordTime?date=${encodeURIComponent(row.date)}`}>{row.date}</NavLink></div>,
            width: "200px"

        }
    ];

    const searchColumn = [
        {
            name: "No.",
            cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
            width: "80px"
        },
        {
            name: " Name",
            cell: row => <div className="custom-cell">{row.name}</div>,
        },
        {
            name: "Bet",
            cell: row => <div className="custom-cell">{row.bet}</div>,
        }, {
            name: "Win/Loss",
            cell: row => <div className="custom-cell">{row.results}</div>,
        }, {
            name: "Date ",
            cell: row => <div className="custom-cell">{row.date}</div>,
        }, {
            name: "Available Coins ",
            cell: row => <div className="custom-cell">{row.availableCoins}</div>,
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
                            columns={search ? searchColumn : defaultColumn}
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
                                            <input type='text' className=' form-control searchInput' placeholder='Search Date' value={search}
                                                onChange={(e) => setSearch(e.target.value)}></input>
                                            <div className='searchIcon'><SearchOutlinedIcon /></div>
                                        </div>


                                    </div>
                                </>
                            }
                        />
                    </div>
                }
            </Grid>
        </MainCard>
    )
};

export default SFAGuessRecord;