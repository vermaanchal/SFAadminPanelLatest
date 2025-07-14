import MainCard from 'components/MainCard';
import {
    Grid, Button,
    InputLabel, FormControl, Select, MenuItem
} from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { baseURLProd } from 'api/api';
const AudioStreamingMonthlyReport = () => {

    const params = useParams()
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([])
    //---------------fetch data---------------//
    const fetchData = async () => {
        try {
            let req = await fetch(`${baseURLProd}UserMonthlyAudioStreamingDetails`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json' // Set Content-Type header here
                },
                body: JSON.stringify({ userId: params.userId }),
            });

            const res = await req.json();
            setData(res.monthlyUserAudioStreamingList);
            setFilter(res.monthlyUserStreamingList)

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);
    const [monthYearOptions, setMonthYearOptions] = useState([]);
    const fetchMonthData = async () => {
        const req = await fetch(`${baseURLProd}GetMonthYearOptions`, {
            method: "GET",
            'Content-type': "application/json"
        })
        const res = await req.json()
        setMonthYearOptions(res.monthly_Details)
    }
    useEffect(() => {
        fetchMonthData()
    }, [])

    const [selectedMonthYear, setSelectedMonthYear] = useState("");
    const filterDataByMonth = () => {
        if (!selectedMonthYear) {
            return data;
        } else {
            const [selectedMonthName, selectedYear] = selectedMonthYear.split(" ");

            const monthNames = [
                "January", "February", "March", "April", "May", "June", "July", "August",
                "September", "October", "November", "December"
            ];
            const selectedMonthIndex = monthNames.indexOf(selectedMonthName) + 1;

            const formattedSelectedMonth = selectedMonthIndex.toString().padStart(2, '0');

            return data.filter(item => {
                const [itemYear, itemMonth] = item.date.split('-'); // Extract year and month from item date
                return itemMonth === formattedSelectedMonth && itemYear === selectedYear;
            });
        }
    };
    const filteredData = filterDataByMonth();
    
    const handleMonthYearChange = (event) => {
        setSelectedMonthYear(event.target.value);
      };

    const handleBack = () => {
        window.location.assign('/audiostreaming')
    }
    //----------------download CSV file-----------------//
    const downloadCSV = () => {
        // Format the data for CSV
        const csvContent =
            "data:text/csv;charset=utf-8," +
            [
                Object.keys(filter[0]).join(','), // Header row
                ...filter.map((row) => Object.values(row).join(',')), // Data rows
            ].join('\n');

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "audiostreaming_monthlyreport.csv");
        document.body.appendChild(link);
        link.click();
    };
    const column = [
        {
            name: "User Id",
            cell: row => <div className="custom-cell">{row.userId}</div>,
        },
        {
            name: "Status",
            // selector: id,
            cell: row => <div className="custom-cell">{row.isLive}</div>,
        },
        {
            name: "Date",
            // selector: id,
            cell: row => <div className="custom-cell">{row.date}</div>,
        },
        {
            name: "Live Start Time",
            // selector: id,
            cell: row => <div className="custom-cell">{row.liveStartTime}</div>,
        },
        {
            name: "Live End Time",
            // selector: id,
            cell: row => <div className="custom-cell">{row.liveEndTime}</div>,
        }, {
            name: "Live Duration",
            // selector: id,
            cell: row => <div className="custom-cell">{row.liveDUration}</div>,
        }, {
            name: "Valid Day",
            // selector: id,
            cell: row => <div className="custom-cell">{row.isValidDay}</div>,
        },
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

        <MainCard title="User Today Report">
            <Grid item xs={12} md={12} lg={12}>
                <Grid >
                    <ToastContainer />
                </Grid>
                <div><button className='btn btn-primary mb-3' style={{ backgroundColor: '#EF9848', border: '0px' }} onClick={handleBack}>Back</button></div>
                <div className='text-end'>
                    <DataTable columns={column} data={filteredData} fixedHeader customStyles={tableHeaderStyle} className='data-table'
                        pagination
                        subHeader
                        subHeaderComponent={
                            <>
                                <div className='d-flex justify-content-between'>
                                    <div className='d-flex'>
                                        <FormControl className='designationForm'>
                                            <InputLabel id="select-label">Select Month</InputLabel>
                                            <Select
                                                labelId="select-label"
                                                label='Select Role'
                                                id="monthYearSelect" onChange={handleMonthYearChange}
                                                style={{ textAlign: "center" }}
                                            >
                                                <MenuItem>All Month</MenuItem>
                                                {monthYearOptions.map((option, index) => (
                                                    <MenuItem key={index} value={option.monthYear}>
                                                        {option.monthYear}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div>
                                        <Button className='csvDiv' onClick={downloadCSV} >Download<FileDownloadOutlinedIcon style={{ color: '#EF9848' }} /></Button>
                                    </div>
                                </div>
                            </>
                        }
                    />
                </div>
            </Grid>
        </MainCard>
    )
};

export default AudioStreamingMonthlyReport;





