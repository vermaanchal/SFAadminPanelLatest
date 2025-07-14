
// import MainCard from 'components/MainCard';
// import {
//     Grid, Button
// } from '@mui/material';
// import DataTable from 'react-data-table-component';
// import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
// import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import { ToastContainer } from 'react-toastify';
// import GetAllResellerSummaryHook from './GetAllResellerSummaryHook';
// import { useState } from 'react';
// import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
// import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
// const GetAllResellerSummary = () => {
//     const { data, loading, isFiltered, refetch, searchByUserId, searchByDateRange } = GetAllResellerSummaryHook();

//     const [rowsPerPage, setRowsPerPage] = useState(10);
//     const [currentPage, setCurrentPage] = useState(1);
//     const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;
//     const handlePageChange = page => {
//         setCurrentPage(page);
//     }
//     const handlePerRowsChange = (newPerPage, page) => {
//         setRowsPerPage(newPerPage);
//         setCurrentPage(page);
//     }


//     const column = [
//         {
//             name: "No.",
//             cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
//             width: "80px"
//         },
//         {
//             name: "User Id",
//             selector: row => row.userId,
//             cell: row => <div className="custom-cell">{row.userId}</div>
//         },
//         {
//             name: "Name",
//             selector: row => row.userName,
//             cell: row => <div className="custom-cell" style={{ paddingLeft: "0px", textAlign: "left" }}>{row.userName}</div>
//             , width: "120px"
//         },
//         {
//             name: "Image",
//             cell: row => <img src={row.image} alt="user" width="40" height="40" style={{ borderRadius: '50%' }} />,
//             width: "130px"
//         },
//         {
//             name: "Balance",
//             selector: row => row.balance,
//             cell: row => <div className="custom-cell">{row.balance}</div>
//         },
//         {
//             name: "Total Transfer Coin",
//             selector: row => row.totalTransferCoin,
//             cell: row => <div className="custom-cell">{row.totalTransferCoin}</div>
//         },
//         {
//             name: "Today Transfer",
//             selector: row => row.transferToday,
//             cell: row => <div className="custom-cell">{row.transferToday}</div>
//         },
//         {
//             name: "Week Transfer",
//             selector: row => row.transferWeek,
//             cell: row => <div className="custom-cell">{row.transferWeek}</div>
//         },
//         {
//             name: "Month Transfer",
//             selector: row => row.transferMonth,
//             cell: row => <div className="custom-cell">{row.transferMonth}</div>
//         },
//         {
//             name: "Previous Month Transfer",
//             selector: row => row.transferPrvMonth,
//             cell: row => <div className="custom-cell">{row.transferPrvMonth}</div>
//         },
//         {
//             name: "Total Beans",
//             selector: row => row.totalBeans,
//             cell: row => <div className="custom-cell">{row.totalBeans}</div>
//         }
//     ]

//     const filteredColumns = [
//         {
//             name: "No.",
//             cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
//             width: "80px"
//         },
//         {
//             name: "Reseller Id",
//             selector: row => row.resellerId,
//             cell: row => <div className="custom-cell">{row.resellerId}</div>
//         },
//         {
//             name: "User Id",
//             selector: row => row.userId,
//             cell: row => <div className="custom-cell">{row.userId}</div>
//         },
//         {
//             name: "Name",
//             selector: row => row.name,
//             cell: row => <div className="custom-cell">{row.name}</div>
//         },
//         {
//             name: "Coin Amount",
//             selector: row => row.coinAmount,
//             cell: row => <div className="custom-cell">{row.coinAmount}</div>
//         },
//         {
//             name: "Date",
//             selector: row => row.createdDate,
//             cell: row => <div className="custom-cell">{row.createdDate}</div>
//         }
//     ];
//     const tableHeaderStyle = {
//         headCells: {
//             style: {
//                 fontWeight: "bold",
//                 fontSize: "0.875rem",
//                 backgroundColor: "rgba(241,244,249,255)",
//             },
//             head: {
//                 style: {
//                     borderTopLeftRadius: '10px',
//                     borderTopRightRadius: '10px',
//                 }
//             },
//             cells: {
//                 style: {
//                     fontSize: "0.875rem",
//                     fontFamily: "'Public Sans',sans-serif"
//                 }
//             }
//         }
//     }

//     const [searchInput, setSearchInput] = useState("");
//     const [fromDate, setFromDate] = useState("");
//     const [toDate, setToDate] = useState("");


//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') handleSearch();
//     };
//     const handleSearch = () => {
//         if (searchInput.trim()) {
//             searchByUserId(searchInput.trim());
//         }
//     };

//     const handleDateSearch = () => {
//         if (!searchInput.trim()) {
//             alert("Please enter a User ID");
//             return;
//         }
//         if (!fromDate || !toDate) {
//             alert("Please select both From and To dates");
//             return;
//         }

//         searchByDateRange({
//             userId: searchInput.trim(),
//             fromDate,
//             toDate
//         });
//     };



//     return (

//         <MainCard title="Create Reseller">
//             <Grid item xs={12} md={12} lg={12}>
//                 <Grid >
//                     <ToastContainer />
//                 </Grid>

//                 {isFiltered && (
//                     <div>

//                         <button
//                             className="btn btn-primary"
//                             style={{ backgroundColor: '#EF9848', border: '0px' }}
//                             onClick={() => {
//                                 setSearchInput("");
//                                 refetch();
//                                 setSearchInput('');
//                                 setFromDate('');
//                                 setToDate('');
//                                 refetch();
//                             }}
//                         >
//                             Back
//                         </button>
//                     </div>
//                 )}
//                 {loading ? (
//                     <div
//                         style={{ zIndex: 1050, height: "54%", width: "75%" }}
//                         className="d-flex justify-content-center align-items-center position-absolute"
//                     >
//                         <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
//                     </div>
//                 ) : data && data.length > 0 ? (
//                     <div className='text-end'>

//                         <DataTable
//                             columns={isFiltered ? filteredColumns : column}
//                             data={data}
//                             fixedHeader
//                             customStyles={tableHeaderStyle}
//                             className='data-table'
//                             pagination
//                             onChangePage={handlePageChange}
//                             onChangeRowsPerPage={handlePerRowsChange}
//                             subHeader
//                             subHeaderComponent={
//                                 <div className='d-flex justify-content-between'>

//                                     <div className='d-flex'>
//                                         <input
//                                             type='text'
//                                             className='form-control searchInput'
//                                             placeholder='Search User Id'
//                                             value={searchInput}
//                                             onChange={(e) => {
//                                                 const value = e.target.value;
//                                                 setSearchInput(value);
//                                                 if (value.trim()) {
//                                                     searchByUserId(value.trim());
//                                                 }
//                                             }}
//                                             onKeyPress={handleKeyPress}
//                                         />
//                                         <div
//                                             className='searchIcon'
//                                             onClick={handleSearch}
//                                             style={{ cursor: 'pointer' }}
//                                         >
//                                             <SearchOutlinedIcon />
//                                         </div>
//                                     </div>

//                                     {isFiltered && (
//                                         <>
//                                             <label htmlFor='fromDate' className='labelfordate'>From Date:</label>
//                                             <input
//                                                 type="date"
//                                                 value={fromDate}
//                                                 onChange={(e) => setFromDate(e.target.value)}
//                                                 className='form-control searchDateInput'
//                                             />

//                                             <label htmlFor='toDate' className='labelfordate'>To Date:</label>
//                                             <input
//                                                 type="date"
//                                                 value={toDate}
//                                                 onChange={(e) => setToDate(e.target.value)}
//                                                 className='form-control searchDateInput'
//                                             />

//                                             <button
//                                                 className='btn btn-primary'
//                                                 onClick={handleDateSearch}
//                                                 style={{ backgroundColor: '#EF9848', border: '0px' }}
//                                             >
//                                                 Search
//                                             </button>


//                                         </>
//                                     )}




//                                 </div>

//                             }


//                         />



//                     </div>
//                 ) : (
//                     <div className="text-center my-5" style={{ fontWeight: 'bold', fontSize: '18px' }}>
//                         Data Not Found
//                     </div>
//                 )}

//             </Grid>
//         </MainCard >
//     )
// };

// export default GetAllResellerSummary;




import MainCard from 'components/MainCard';
import {
    Grid, Button,IconButton
} from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import GetAllResellerSummaryHook from './GetAllResellerSummaryHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
const GetAllResellerSummary = () => { 
    const { data, loading, isFiltered, refetch, searchByUserId, searchByDateRange,fetchUserIdData,RemoveTransactiion } = GetAllResellerSummaryHook();

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
            selector: row => row.userId,
            cell: row => <div className="custom-cell">{row.userId}</div>
        },
        {
            name: "Name",
            selector: row => row.userName,
            cell: row => <div className="custom-cell" style={{ paddingLeft: "0px", textAlign: "left" }}>{row.userName}</div>
            , width: "120px"
        },
        {
            name: "Image",
            cell: row => <img src={row.image} alt="user" width="40" height="40" style={{ borderRadius: '50%' }} />,
            width: "130px"
        },
        {
            name: "Balance",
            selector: row => row.balance,
            cell: row => <div className="custom-cell">{row.balance}</div>
        },
        {
            name: "Total Transfer Coin",
            selector: row => row.totalTransferCoin,
            cell: row => <div className="custom-cell">{row.totalTransferCoin}</div>
        },
        {
            name: "Today Transfer",
            selector: row => row.transferToday,
            cell: row => <div className="custom-cell">{row.transferToday}</div>
        },
        {
            name: "Week Transfer",
            selector: row => row.transferWeek,
            cell: row => <div className="custom-cell">{row.transferWeek}</div>
        },
        {
            name: "Month Transfer",
            selector: row => row.transferMonth,
            cell: row => <div className="custom-cell">{row.transferMonth}</div>
        },
        {
            name: "Previous Month Transfer",
            selector: row => row.transferPrvMonth,
            cell: row => <div className="custom-cell">{row.transferPrvMonth}</div>
        },
        {
            name: "Total Beans",
            selector: row => row.totalBeans,
            cell: row => <div className="custom-cell">{row.totalBeans}</div>
        },
        {
            name: "Remove",
            selector: row => row.userId,
            cell: row => <div className="custom-cell">
                <Button variant="contained" color="secondary" size="small" onClick={()=>RemoveTransactiion(row.userId)}>Remove</Button>
                </div>
        }
    ]

    const filteredColumns = [
        {
            name: "No.",
            cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
            width: "80px"
        },
        {
            name: "Reseller Id",
            selector: row => row.resellerId,
            cell: row => <div className="custom-cell">{row.resellerId}</div>
        },
        {
            name: "User Id",
            selector: row => row.userId,
            cell: row => <div className="custom-cell">{row.userId}</div>
        },
        {
            name: "Name",
            selector: row => row.name,
            cell: row => <div className="custom-cell">{row.name}</div>
        },
        {
            name: "Coin Amount",
            selector: row => row.coinAmount,
            cell: row => <div className="custom-cell">{row.coinAmount}</div>
        },
        {
            name: "Date",
            selector: row => row.createdDate,
            cell: row => <div className="custom-cell">{row.createdDate}</div>
        },
    
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
    }

    const [searchInput, setSearchInput] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");


    // const handleKeyPress = (e) => {
    //     if (e.key === 'Enter') handleSearch();
    // };

    const handleSearch=()=>{
        if(searchInput.length >=7){
            fetchUserIdData(searchInput)
        }
    }
    // const handleSearch = () => {
    //        if(searchInput.length >= 7){
    //             console.log('hello')
    //         }
    //     if (searchInput.trim()) {
    //         searchByUserId(searchInput.trim());
         
    //     }
    // };

    const handleDateSearch = () => {
        if (!searchInput.trim()) {
            alert("Please enter a User ID");
            return;
        }
        if (!fromDate || !toDate) {
            alert("Please select both From and To dates");
            return;
        }

        searchByDateRange({
            userId: searchInput.trim(),
            fromDate,
            toDate
        });
    };



    return (

        <MainCard title="Create Reseller">
            <Grid item xs={12} md={12} lg={12}>
                <Grid >
                    <ToastContainer />
                </Grid>

                {isFiltered && (
                    <div>

                        <button
                            className="btn btn-primary"
                            style={{ backgroundColor: '#EF9848', border: '0px' }}
                            onClick={() => {
                                setSearchInput("");
                                refetch();
                                setSearchInput('');
                                setFromDate('');
                                setToDate('');
                                refetch();
                            }}
                        >
                            Back
                        </button>
                    </div>
                )}
                {loading ? (
                    <div
                        style={{ zIndex: 1050, height: "54%", width: "75%" }}
                        className="d-flex justify-content-center align-items-center position-absolute"
                    >
                        <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
                    </div>
                // ) : data && data.length > 0 ?
                ):(
                    <div className='text-end'>

                        <DataTable
                            columns={isFiltered ? filteredColumns : column}
                            data={data}
                            fixedHeader
                            customStyles={tableHeaderStyle}
                            className='data-table'
                            pagination
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handlePerRowsChange}
                            subHeader
                            subHeaderComponent={
                                <div className='d-flex justify-content-between'>

                                    <div className='d-flex'>
                                        <input
                                            type='text'
                                            className='form-control searchInput'
                                            placeholder='Search User Id'
                                            value={searchInput}
                                            onChange={(e) => {
                                                setSearchInput(e.target.value);
                                            }}
                                            // onChange={(e) => {
                                            //     const value = e.target.value;
                                            //     setSearchInput(value);
                                            //     if (value.trim()) {
                                            //         searchByUserId(value.trim());
                                            //     }
                                            // }}
                                            // onKeyPress={handleKeyPress}
                                        />
                                        <div
                                            className='searchIcon'
                                            onClick={handleSearch}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <SearchOutlinedIcon />
                                        </div>
                                    </div>
                                    {/* {isFiltered && (
                                        <>
                                            <label htmlFor='fromDate' className='labelfordate'>From Date:</label>
                                            <input
                                                type="date"
                                                value={fromDate}
                                                onChange={(e) => setFromDate(e.target.value)}
                                                className='form-control searchDateInput'
                                            />
                                            <label htmlFor='toDate' className='labelfordate'>To Date:</label>
                                            <input
                                                type="date"
                                                value={toDate}
                                                onChange={(e) => setToDate(e.target.value)}
                                                className='form-control searchDateInput'
                                            />
                                            <button
                                                className='btn btn-primary'
                                                onClick={handleDateSearch}
                                                style={{ backgroundColor: '#EF9848', border: '0px' }}
                                            >
                                                Search
                                            </button>
                                        </>
                                    )} */}
                                </div>
                            }
                        />
                    </div>
                )
                //  : (
                //     <div className="text-center my-5" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                //         Data Not Found
                //     </div>
                // )
                
                }

            </Grid>
        </MainCard >
    )
};

export default GetAllResellerSummary;



