

import MainCard from 'components/MainCard';
import { Grid } from '@mui/material';
import DataTable from 'react-data-table-component';
import { ToastContainer, toast } from 'react-toastify';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseURLProd } from 'api/api';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';

const AudioStreamingViewMore = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [isFiltered, setIsFiltered] = useState(false);
    const [loading, setLoading] = useState(true)

    // Initial fetch
    const fetchData = async () => {
        setLoading(true)
        try {
            const req = await fetch(`${baseURLProd}ViewMoreAudioReportResponse`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: params.userId }),
            });
            const res = await req.json();
            setLoading(false)
            setData(res?.viewMoreAudioReportLists || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    

    const handleFilter = async () => {
        setLoading(true)
        if (!params.userId || !fromDate || !toDate) {
            toast.error("Please provide User ID, From Date, and To Date");
            return;
        }

        try {
            const res = await fetch(`${baseURLProd}AudioReportDateRange1`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    accept: 'text/plain',
                },
                body: JSON.stringify({
                    userId: params.userId,
                    fromDate: fromDate,
                    toDate: toDate
                })
            });

            const result = await res.json();
            setLoading(false)
            const reportList = result?.getAudioReportByDateRange1Lists || [];

            if (Array.isArray(reportList)) {
                setData(reportList);
                setIsFiltered(true); 
            } else {
                toast.error("No data available for the selected date range.");
                setData([]);
                setIsFiltered(false); 
            }

        } catch (error) {
            console.error("Error filtering:", error);
            toast.error("Something went wrong during filter.");
            setIsFiltered(false);
        } finally {
            setLoading(false)
        }
    };


    const handleBack = () => {
        window.location.assign('/audiostreaming');
    };

    const column = [
        { name: "User Id", cell: row => <div className="custom-cell">{row.userid}</div> },
        { name: "User name", cell: row => <div className="custom-cell">{row.userName}</div> },
        { name: "Status", cell: row => <div className="custom-cell">{row.isLive}</div> },
        { name: "Date", cell: row => <div className="custom-cell">{row.date}</div> },
        { name: "Live Start Time", cell: row => <div className="custom-cell">{row.liveStartTime}</div> },
        { name: "Live End Time", cell: row => <div className="custom-cell">{row.liveEndTime}</div> },
        { name: "Live Duration", cell: row => <div className="custom-cell text-start">{row.liveDuration}</div> },
        { name: "Valid Day", cell: row => <div className="custom-cell">{row.isValidDay}</div> },
    ];

    const searchColumn = [
        { name: "User Id", cell: row => <div className="custom-cell">{row.userId}</div> },
        { name: "User name", cell: row => <div className="custom-cell">{row.userName}</div> },
        { name: "Live count", cell: row => <div className="custom-cell">{row.todayLiveCount}</div> },
        { name: "Date", cell: row => <div className="custom-cell">{row.date}</div> },
        { name: "Live  Time", cell: row => <div className="custom-cell">{row.liveTime}</div> },
        { name: "Gift count", cell: row => <div className="custom-cell">{row.giftCount}</div> },

    ];

    const tableHeaderStyle = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "0.875rem",
                backgroundColor: "rgba(241,244,249,255)",
            }
        },
        cells: {
            style: {
                fontSize: "0.875rem",
                fontFamily: "'Public Sans',sans-serif"
            }
        }
    };

    return (
        <MainCard title="User Today Report">
            <Grid item xs={12} md={12} lg={12}>
                <ToastContainer />
                {loading && (
                    <div style={{ zIndex: 1050, height: "54%", width: "75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
                        <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />

                    </div>
                )}
                <div className="d-flex justify-content-start gap-2 mb-3">
                    <button
                        className="btn btn-primary"
                        style={{ backgroundColor: '#EF9848', border: '0px' }}
                        onClick={handleBack}
                    >
                        Back
                    </button>

                    <button
                        className="btn btn-secondary"
                        style={{ backgroundColor: '#6c757d', border: '0px' }}
                        onClick={() => {
                            setSearch('');
                            setFromDate('');
                            setToDate('');
                            setIsFiltered(false);
                            fetchData();
                        }}
                    >
                        Reset
                    </button>
                </div>

                <div className="my-4 d-flex justify-content-end">
                    <div className="d-flex align-items-end flex-wrap gap-4 ms-auto">
                        <div className="d-flex flex-column">
                            <label className="labelfordate mb-1">From Date</label>
                            <input
                                type="date"
                                value={fromDate}
                                onChange={e => setFromDate(e.target.value)}
                                className="form-control"
                                style={{ minWidth: '180px' }}
                            />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="labelfordate mb-1">To Date</label>
                            <input
                                type="date"
                                value={toDate}
                                onChange={e => setToDate(e.target.value)}
                                className="form-control"
                                style={{ minWidth: '180px' }}
                            />
                        </div>

                        <div className="d-flex flex-column">
                            <label className="invisible mb-1">Search</label>
                            <button
                                className="btn btn-primary"
                                style={{
                                    backgroundColor: '#EF9848',
                                    border: '0px',
                                    height: '40px',
                                    minWidth: '100px'
                                }}
                                onClick={handleFilter}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <DataTable
                    columns={isFiltered ? searchColumn : column}
                    data={data}
                    fixedHeader
                    customStyles={tableHeaderStyle}
                    className='data-table'
                    pagination
                />

            </Grid>
        </MainCard>
    );
};

export default AudioStreamingViewMore;


