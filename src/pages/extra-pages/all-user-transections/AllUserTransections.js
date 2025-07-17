import MainCard from 'components/MainCard';
import {
    Box, Stack, Grid, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button
} from '@mui/material';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import AllUserTransectionsHook from './AllUserTransectionsHook';


const AllUserTransections = () => {
    const {
        filter, search, setSearch, openPreview, previewImageUrl, handleClosePreview,
        handleEdit, setUserId, setName, setDob, setMobile, setEmail, setPassword,
        userId, name, dob, mobile, email, password,
        downloadCSV, open, handleClose, handleSubmit,
        handleReset, data, loading, setFromDate, setToDate, fromDate, toDate, handleDateRangeFilter
    } = AllUserTransectionsHook();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const calcIndex = index => (currentPage - 1) * rowsPerPage + index + 1;
    const isFiltered = filter?.length !== data?.length;

    const columns = [
        { name: "No.", cell: (_, index) => <div>{calcIndex(index)}</div>, width: "80px" },
        { name: "User Id", selector: row => row.userId },
        { name: "Registration Date & Time", selector: row => row.createDate, width: '200px' },
        { name: "Name", selector: row => row.name, width: '180px' },
        { name: "Mobile No", selector: row => row.mobile, width: '180px' },
        { name: "Email", selector: row => row.email, width: "310px" },
        { name: "Password", selector: row => row.password, width: "180px" },
        { name: "DOB", selector: row => row.dob, width: "180px" },
        { name: "Country", selector: row => row.country },
        {
            name: "Action",
            cell: (row) => (
                <EditCalendarOutlinedIcon
                    onClick={() => handleEdit(row.userId, row.name, row.mobile, row.email, row.password, row.dob)}
                    sx={{ color: 'orange', cursor: 'pointer', fontSize: 18 }}
                />
            ),
        }
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "17px",
                backgroundColor: "rgba(241,244,249,255)",
            },
        },
        cells: {
            style: {
                fontSize: "0.875rem",
                fontFamily: "'Public Sans',sans-serif",
            },
        },
    };

    return (
        <MainCard title="All User Transections">
            <ToastContainer />

            {isFiltered && (
                <Box mx={2} mb={2}>
                    <Button
                        onClick={handleReset}
                        sx={{ backgroundColor: '#EF9848', color: '#fff', textTransform: 'none', '&:hover': { backgroundColor: '#d97a2c' } }}
                    >
                        Back
                    </Button>
                </Box>
            )}

            {loading ? (
                <Box
                    sx={{ height: "54%", width: "75%" }}
                    className="d-flex justify-content-center align-items-center position-absolute"
                >
                    <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
                </Box>
            ) : (
                <Box className="text-end">
                    <DataTable
                        columns={columns}
                        data={filter}
                        fixedHeader
                        customStyles={customStyles}
                        pagination
                        onChangePage={setCurrentPage}
                        onChangeRowsPerPage={(newPerPage, page) => {
                            setRowsPerPage(newPerPage);
                            setCurrentPage(page);
                        }}
                        subHeader
                        subHeaderComponent={
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                    px: 1,
                                }}
                            >
                                <Stack direction="row" spacing={2} flexWrap="wrap" alignItems="center">
                                    {/* Search */}
                                    <Box position="relative" width="250px">
                                        <input
                                            type="text"
                                            placeholder="Search User Id"
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '8px 36px 8px 12px',
                                                border: '1px solid #ccc',
                                                borderRadius: '6px',
                                                fontSize: '14px',
                                            }}
                                        />
                                        <Box sx={{
                                            position: 'absolute',
                                            right: '10px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#999'
                                        }}>
                                            <SearchOutlinedIcon fontSize="small" />
                                        </Box>
                                    </Box>

                                    {/* Date Filter */}
                                    <form onSubmit={handleDateRangeFilter} style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                        <Box display="flex" alignItems="center">
                                            <label style={{ fontSize: '14px', marginRight: '6px' }}>From:</label>
                                            <input
                                                type="date"
                                                value={fromDate}
                                                onChange={(e) => setFromDate(e.target.value)}
                                                style={{ minWidth: '140px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }}
                                            />
                                        </Box>
                                        <Box display="flex" alignItems="center">
                                            <label style={{ fontSize: '14px', marginRight: '6px' }}>To:</label>
                                            <input
                                                type="date"
                                                value={toDate}
                                                onChange={(e) => setToDate(e.target.value)}
                                                style={{ minWidth: '140px', padding: '6px 10px', borderRadius: '6px', border: '1px solid #ccc' }}
                                            />
                                        </Box>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                backgroundColor: '#EF9848',
                                                textTransform: 'none',
                                                '&:hover': { backgroundColor: '#d97a2c' },
                                                fontSize: '0.85rem',
                                            }}
                                        >
                                            Filter
                                        </Button>
                                    </form>
                                </Stack>

                                <Button
                                    variant="contained"
                                    onClick={downloadCSV}
                                    endIcon={<FileDownloadOutlinedIcon />}
                                    sx={{
                                        backgroundColor: '#EF9848',
                                        color: '#fff',
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        '&:hover': { backgroundColor: '#d97a2c' },
                                        px: 2,
                                        py: 1,
                                        fontSize: '0.9rem',
                                        borderRadius: '8px'
                                    }}
                                >
                                    Download CSV
                                </Button>
                            </Box>
                        }
                    />
                </Box>
            )}

            {/* Image Preview */}
            <Dialog open={openPreview} onClose={handleClosePreview}>
                <DialogContent>
                    <img src={previewImageUrl} alt="Preview" width="260px" />
                </DialogContent>
            </Dialog>

            {/* Edit Dialog */}
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle sx={{ backgroundColor: '#f5f5f5', fontWeight: 600, fontSize: '18px', color: '#333' }}>
                    Edit User Details
                </DialogTitle>

                <DialogContent dividers sx={{ p: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ display: 'none' }}>
                            <TextField fullWidth size="small" label="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth size="small" label="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth size="small" label="Mobile Number" value={mobile} onChange={(e) => setMobile(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth size="small" label="Date of Birth" type="date" InputLabelProps={{ shrink: true }} value={dob} onChange={(e) => setDob(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth size="small" label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth size="small" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={handleClose} sx={{ backgroundColor: '#EF9848', color: '#fff', '&:hover': { backgroundColor: '#d97a2c' } }}>Cancel</Button>
                    <Button onClick={handleSubmit} sx={{ backgroundColor: '#EF9848', color: '#fff', '&:hover': { backgroundColor: '#d97a2c' } }}>Submit</Button>
                </DialogActions>
            </Dialog>
        </MainCard>
    );
};

export default AllUserTransections;
