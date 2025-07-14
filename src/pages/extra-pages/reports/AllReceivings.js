import MainCard from 'components/MainCard';
import { Grid, Button } from '@mui/material';
import DataTable from 'react-data-table-component';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react';
const AllReceivingReport = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [newSearchData, setNewSearchData] = useState([])  
    const [searchType, setSearchType] = useState("default");
    const [filter, setFilter] = useState([])
    const [message, setmessage] = useState("");
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [dateFilterData, setDateFilterData] = useState([]); 
    //---------------fetch data---------------//
    const fetchData = async () => {
        try {
            let req = await fetch(`${baseURLProd}AllReport`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const res = await req.json();
            if (res.status == true) {
                setData(res.allReportList);
                setFilter(res.allReportList);
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
    const fetchSearchResults = async () => {
      if (search) {
        const uniqueResults = data
          .filter(
            (item, index, self) =>
              index === self.findIndex((t) => t.userId.toLowerCase() === item.userId.toLowerCase())
          )
          .filter((item) => item.userId.toLowerCase().includes(search.toLowerCase()));
  
        setFilter(uniqueResults);
  
        try {
          const results = [];
          for (const row of uniqueResults) {
            if (row.userId) {
              const req = await fetch(`${baseURLProd}Search_AllReport`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: row.userId }),
              });
  
              const result = await req.json();
              results.push(...result.allReportList);
            }
          }
          setNewSearchData(results);
          setSearchType("search");
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setFilter(data);
        setNewSearchData([]);
      }
    };
  
    const debounceFetch = setTimeout(fetchSearchResults, 300); 
  
    return () => clearTimeout(debounceFetch);
  }, [search, data]);
  
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
    const handleFilter = async () => {
        const payload = {
          fromDate: fromDate || null,
          toDate: toDate || null,
        };
    
        try {
          const response = await fetch(`${baseURLProd}Search_AllMonthlyReport`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
    
          if (response.ok) {
            const result = await response.json();
            setDateFilterData(result.allMonthlyReports);
            setSearchType("dateFilter");
            
          } else {
            console.error("API Error:", response.status);
          }
        } catch (error) {
          console.error("Fetch Error:", error);
        }
      };

    const defaultColumn = [
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
            name: "Receiving",
            // selector: id,
            cell: row => <div className="custom-cell">{row.receiving}</div>,
            // width: '160px'
        },
    ]
    const searchColumns = [
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
            name: "Receiving",
            // selector: id,
            cell: row => <div className="custom-cell">{row.receiving}</div>,
            // width: '160px'
        },
    ]
    const dateFilterColumn = [
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
        //   width: '200px'
        },
    
        {
          name: "Receiving",
          // selector: id,
          cell: row => <div className="custom-cell">{row.receiving}</div>,
          // width: '160px'
        },
      ]

      const columns =
      searchType === "search"
        ? searchColumns
        : searchType === "dateFilter"
        ? dateFilterColumn
        : defaultColumn;
    
    const tabledata =
      searchType === "search"
        ? newSearchData
        : searchType === "dateFilter"
        ? dateFilterData
        : filter;
    
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
                        <DataTable columns={columns} data={tabledata} fixedHeader customStyles={tableHeaderStyle} className='data-table'
                        // <DataTable columns={search ? searchColumns : defaultColumn} data={search ? newSearchData : filter} fixedHeader customStyles={tableHeaderStyle} className='data-table'
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

export default AllReceivingReport;








