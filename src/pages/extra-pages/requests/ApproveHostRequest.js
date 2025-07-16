import MainCard from 'components/MainCard';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Typography,
    Button,
    TextField
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { baseURLProd } from 'api/api';
import axios from 'axios';
import HostRequestHook from './HostRequestHook';
import Swal from 'sweetalert2';

const ApproveHostRequest = () => {
    const {
        audioprice,
        videoprice,
        adminCommision,
        setAudioPrice,
        setVideoPrice,
        setAdmincommision
    } = HostRequestHook();

    const location = useLocation();
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        const fromState = location.state?.selectedRow;
        const fromStorage = JSON.parse(localStorage.getItem("approveData"))?.selectedRow;
        setSelectedRow(fromState || fromStorage);
    }, [location.state]);

    useEffect(() => {
        if (selectedRow) {
            setAudioPrice(selectedRow.audioPricePerMin || "");
            setVideoPrice(selectedRow.videoPricePerMin || "");
            setAdmincommision(selectedRow.adminComission || "");
        }
    }, [selectedRow]);

    const audioCommission = (parseFloat(audioprice || 0) * parseFloat(adminCommision || 0)) / 100;
    const videoCommission = (parseFloat(videoprice || 0) * parseFloat(adminCommision || 0)) / 100;

    const handleApproveSubmit = async () => {
        const payload = {
            userId: selectedRow.userId,
            audioPricePerMin: audioprice,
            videoPricePerMin: videoprice,
            adminComission: adminCommision
        };

        try {
            const { isConfirmed } = await Swal.fire({
                title: "Approve Host Request?",
                text: "Are you sure you want to approve this host request? You can’t undo this action.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, approve it!",
                cancelButtonText: "Cancel",
                confirmButtonColor: "#28a745",
                cancelButtonColor: "#95a5a6",
            });

            if (!isConfirmed) return;

            const response = await axios.post(`${baseURLProd}UpdateAgentRates`, payload);

            if (!response) {
                throw new Error("Failed to approve host request.");
            }

            await Swal.fire("Approved!", "The host request has been approved successfully.", "success");

            setTimeout(() => {
                window.location.assign('/hostRequest');
            }, 2000);
        } catch (error) {
            console.error("Approval Error:", error.message);
            Swal.fire("Failed!", "An error occurred while approving the request.", "error");
        }
    };


    return (
        <div>
            <ToastContainer />
            <MainCard>
                <div>
                    <div className='row'>
                        <div className='col'>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="User ID"
                                type="text"
                                name="userId"
                                value={selectedRow?.userId || ''}
                                className='editInputField'
                                disabled
                            />
                        </div>
                        <div className='col'>
                            <TextField
                                margin="dense"
                                label="User Name"
                                type="text"
                                name="userName"
                                fullWidth
                                value={selectedRow?.name || ''}
                                className='editInputField'
                                disabled
                            />
                        </div>
                        <div className='col'>
                            <TextField
                                margin="dense"
                                label="Mobile Number"
                                type="text"
                                name="mobileNo"
                                fullWidth
                                value={selectedRow?.phone || ''}
                                className='editInputField'
                                disabled
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col'>
                            <TextField
                                margin="dense"
                                fullWidth
                                label="Audio Call price/minute"
                                type="number"
                                name="audioprice"
                                value={audioprice}
                                onChange={(e) => setAudioPrice(e.target.value)}
                                className='editInputField'
                            />
                        </div>
                        <div className='col'>
                            <TextField
                                margin="dense"
                                label="Video Call price/minute"
                                type="number"
                                fullWidth
                                name="videoprice"
                                value={videoprice}
                                onChange={(e) => setVideoPrice(e.target.value)}
                                className='editInputField'
                            />
                        </div>
                        <div className='col'>
                            <TextField
                                margin="dense"
                                label="Admin Commission (%)"
                                type="number"
                                fullWidth
                                name="adminCommision"
                                value={adminCommision}
                                onChange={(e) => setAdmincommision(e.target.value)}
                                className='editInputField'
                            />
                            {adminCommision && (audioprice || videoprice) && (
                                <Typography
                                    variant="body2"
                                    color="error"
                                    style={{ marginTop: '4px' }}
                                >
                                    Commission on Audio: ₹{audioCommission.toFixed(2)} &nbsp; | &nbsp;
                                    Commission on Video: ₹{videoCommission.toFixed(2)}
                                </Typography>
                            )}
                        </div>
                    </div>
                </div>

                <div className='editButtonDiv mt-4' style={{ textAlign: 'end' }}>
                    <Button
                        onClick={handleApproveSubmit}
                        className='btn btn-primary'
                        style={{ backgroundColor: '#EF9848', border: '0px' }}
                    >
                        Submit
                    </Button>
                </div>
            </MainCard>
        </div>
    );
};

export default ApproveHostRequest;
