import MainCard from 'components/MainCard';
import { Grid, Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react';
const AdminReceivingReport = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])
    const [message, setmessage] = useState("");
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    //---------------fetch data---------------//
    const fetchData = async () => {
        try {
            let req = await fetch(`${baseURLProd}AdminReport`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json' // Set Content-Type header here
                },
            });

            const res = await req.json();
            if (res.status == true) {
                setData(res.adminpanelList);
                setFilter(res.adminpanelList);
            }
            else {
                setmessage("No data is available")
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    //--------------------filter------------------//
    useEffect(() => {
        const result = data.filter((item) => {
            return item.userId.toLowerCase().match(search.toLocaleLowerCase())
        })
        setFilter(result)
    }, [search])

    //----------------download CSV file-----------------//
    const downloadCSV = () => {
        // Format the data for CSV
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [
                Object.keys(filter[0]).join(','),
                ...filter.map((row) => Object.values(row).join(',')),
            ].join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "adminReceiving_report.csv");
        document.body.appendChild(link);
        link.click();
    };

    const handleBack = () => {
        if (fromDate && toDate) {
            setFromDate("")
            setToDate("")
            fetchData();
        }
       else if(search){
            setSearch("")
            fetchData()
        }
        else {
            window.location.assign('/HostReceivingReport')
        }
    }
    //-----------------date picker---------------//
    const handleFilter = () => {
        const filtered = data.filter(item => {
            const parts = item.created_date.split('-');
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1;
            const year = parseInt(parts[2], 10);

            const date = new Date(year, month, day);

            let from = fromDate ? new Date(fromDate) : null;
            let to = toDate ? new Date(toDate) : null;

            if (from) {
                from.setHours(0, 0, 0, 0);
            }
            if (to) {
                to.setHours(23, 59, 59, 999);
            }
            return (!from || date >= from) && (!to || date <= to);
        });

        setFilter(filtered);
    };

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
            name: " Admin Id",
            // selector: id,
            cell: row => <div className="custom-cell">{row.adminid}</div>,
            // width: '160px'
        },
        {
            name: " Coin Amount ",
            // selector: id,
            cell: row => <div className="custom-cell">{row.coinAmount}</div>,
        },
        {
            name: "Total Beans ",
            // selector: id,
            cell: row => <div className="custom-cell">{row.totalBeans}</div>,
        },
        {
            name: "Month Date",
            // selector: id,
            cell: row => {
                const dateOnly = row.created_date.split(' ')[0];
                return <div className="custom-cell">{dateOnly}</div>;
            },
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

        <MainCard title="Admin Receiving Report">
            <Grid item xs={12} md={12} lg={12}>
                <Grid >
                    <ToastContainer />
                </Grid>
                <div><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleBack}>Back</button></div>
                <div className='text-end'>
                    {filter ?
                        <DataTable columns={column} data={filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
                            pagination
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
                                            <Button className='csvDiv' onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
                                        </div>
                                    </div>
                                    <div className='my-4 d-flex justify-content-end'>
                                        <label htmlFor='fromDate' className='labelfordate'>From Date:</label>
                                        <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} className=' form-control searchDateInput' />
                                        <label htmlFor='toDate' className='labelfordate'>To Date:</label>
                                        <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} className=' form-control searchDateInput' />
                                        <button className='btn btn-primary'
                                            style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleFilter}>Search</button>
                                    </div>
                                </>
                            }
                        />
                        :
                        { message }
                    }
                </div>
            </Grid>
        </MainCard>
    )
};

export default AdminReceivingReport;








