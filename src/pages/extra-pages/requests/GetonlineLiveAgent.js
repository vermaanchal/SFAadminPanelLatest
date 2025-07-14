import React from 'react';
import MainCard from 'components/MainCard';
import { Grid, IconButton, Dialog, DialogContent, Button, Modal, Typography, Box } from '@mui/material';

import DataTable from 'react-data-table-component';
import { useState } from 'react';
import { FontAwesomeIcon } from '../../../../node_modules/@fortawesome/react-fontawesome/index';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '../../../../node_modules/@fortawesome/free-solid-svg-icons/index';
import GetonlineagentHook from './GetonlineliveHook';
import { ToastContainer } from 'react-toastify';
import { useEffect, useRef } from 'react';
import { Margin, Padding } from '../../../../node_modules/@mui/icons-material/index';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    bgcolor: 'background.paper',
    border: 'None',
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
};

const GetonlineLiveAgent = () => {
    const { loading, data, openPreview, previewImageUrl, handleClosePreview, handleImageClick, handleoffline, userid, setUserid, open, setOpen, handleOpen, handleClose } = GetonlineagentHook()
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;
    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const buttonRefs = useRef([]);

    useEffect(() => {
        if (buttonRefs.current[0]) {
            buttonRefs.current[0].focus();
        }
    }, [data]);

    const handlePerRowsChange = (newPerPage, page) => {
        setRowsPerPage(newPerPage);
        setCurrentPage(page);
    };
    const column = [
        {
            name: "No.",
            cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
            width: "100px"
        },
        {
            name: "User Id",
            // selector: id,
            cell: row => <div className="custom-cell">{row.userId}</div>,
            // width: '100px'
        },
        {
            name: "Name ",
            // selector: id,
            cell: row => <div className="custom-cell">{row.name}</div>,
            width: ''
        },
        // {
        //     name: "Language",
        //     // selector: id,
        //     cell: row => <div className="custom-cell">{row.language}</div>,
        //     width: '140px'
        // },
        // {
        //     name: "Talk About",
        //     // selector: id,
        //     cell: row => <div className="custom-cell">{row.talkAbout}</div>,
        //     width: '120px'
        // },
        {
            name: "User Image",
            cell: row => (
                <>
                    <IconButton
                        onClick={() => handleImageClick(row.userImage)}
                        className='imgPreviewDiv'>
                        <img height={70} width={80} src={row.userImage} alt='no-img' />
                    </IconButton>
                </>
            ),
            width: ""
        },
        {
            name: "Agency Name",
            cell: row => <div className="custom-cell">{row.agencyName}</div>,
        },
        {
            name: "Agency Code",
            cell: row => <div className="custom-cell">{row.agencyCode}</div>,
        },

        // {
        //     name: "Age",
        //     // selector: id,
        //     cell: row => <div className="custom-cell">{row.age}</div>,
        //     // width: '100px'
        // },
        // {
        //     name: "Live Status",
        //     // selector: id,
        //     cell: row => <div className="custom-cell">{row.liveStatus}</div>,
        //     width: '120px'
        // },
        {
            name: "Audio Price",
            // selector: id,
            cell: row => <div className="custom-cell">{row.audioPricePerMin} / Min</div>,
            width: ''
        },
        {
            name: "Video Price",
            cell: row => <div className="custom-cell">{row.videoPricePerMin} / Min</div>,
            width: ''
        },
        // {
        //     name: "Update Status",
        //     cell: row => <><Button color="warning" variant="contained" size="small"
        //         onkeyDown={(e) => {
        //             if (e.key === 'Enter') {
        //                 handleoffline(row.userId);
        //             }
        //         }}
        //         onClick={() => handleoffline(row.userId)}>Go Offline</Button></>,
        //     width: "",
        // },
        {
            name: "Update Status",
            cell: (row, index) => (
                <Button
                    key={index}
                    ref={el => buttonRefs.current[index] = el}
                    color="warning"
                    variant="contained"
                    size="small"
                    onClick={() => handleOpen(row.userId)}
                // onClick={() => handleoffline(row.userId)}
                // onKeyDown={(e) => {
                //     if (e.key === 'Enter') {
                //         handleoffline(row.userId);
                //     }
                // }}
                >
                    Go Offline
                </Button>
            ),
            width: "120px",
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
                    <ToastContainer />
                </Grid>
                <div className='text-end'>
                    {loading ? (
                        <div style={{ zIndex: 1050, height: "54%", width: "75%" }} className="d-flex justify-content-center  align-items-center position-absolute">
                            <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
                        </div>
                    ) :
                        <DataTable
                            columns={column}
                            data={data}
                            fixedHeader
                            customStyles={tableHeaderStyle} className='data-table'
                            pagination
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handlePerRowsChange}
                        />}
                </div>
                <Dialog open={openPreview} onClose={handleClosePreview}>
                    <DialogContent>
                        <img src={previewImageUrl} alt="Preview" width='260px' />
                    </DialogContent>
                </Dialog>

            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h3" component="h2">
                        Are You Sure to Update User live status
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItem: "flex-end", marginTop: "20px", }}>
                        <Button type="button" onClick={() => handleoffline(userid)} variant="contained">Ok</Button>
                        <Button type="button" onClick={handleClose}>Cancel</Button>
                    </Box>
                </Box>
            </Modal>
        </MainCard>
    )
};

export default GetonlineLiveAgent;









