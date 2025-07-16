import MainCard from 'components/MainCard';
import React, { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { Typography, Button, FormControl, MenuItem, Select, InputLabel, TextField } from '@mui/material';
import AgentRequestHook from './AgentRequestHook';
import { ToastContainer, toast } from 'react-toastify';
import { baseURLProd } from 'api/api';
const ApproveAgentRequest = () => {
    const { audioprice, videoprice, adminCommision,
        setAudioPrice, setVideoPrice, setAdmincommision } = AgentRequestHook()
    const location = useLocation();
    const selectedRow = location.state?.selectedRow;

    useEffect(() => {
        if (selectedRow) {
            setAudioPrice(selectedRow.audioPricePerMin || "");
            setVideoPrice(selectedRow.videoPricePerMin || "");
            setAdmincommision(selectedRow.adminComission || "");
        }
    }, [selectedRow]);

    console.log("selectedRow++++++", selectedRow)

    const audioCommission =
        (parseFloat(audioprice || 0) * parseFloat(adminCommision || 0)) / 100;
    const videoCommission =
        (parseFloat(videoprice || 0) * parseFloat(adminCommision || 0)) / 100;

    const handleApproveSubmit = async () => {
        try {
            const response = await fetch(`${baseURLProd}UpdateAgentRates`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: selectedRow.userId,
                    audioPricePerMin: audioprice,
                    videoPricePerMin: videoprice,
                    adminComission: adminCommision
                })
            });

            if (!response.ok) {
                throw new Error("Failed to update agent rates");
            }

            const result = await response.json();
            toast.success(result.message);
            setTimeout(() => {
                window.location.assign('/AgentRequest')
            }, 3000)
        } catch (error) {
            console.error("Error updating agent rates:", error);
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
                                // autoFocus
                                margin="dense"
                                fullWidth
                                label="User ID"
                                type="text"
                                name="userId"
                                value={selectedRow.userId}
                                className='editInputField'
                            />
                        </div>
                        <div className='col'>
                            <TextField
                                margin="dense"
                                label="User Name"
                                type="text"
                                name="userName"
                                fullWidth
                                value={selectedRow.userName}
                                className='editInputField'
                            />
                        </div>
                        <div className='col'>
                            <TextField
                                margin="dense"
                                label="Mobile Number"
                                type="text"
                                name="mobileNo"
                                fullWidth
                                value={selectedRow.mobileNo}
                                className='editInputField'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <TextField
                                // autoFocus
                                margin="dense"
                                fullWidth
                                label="Email ID"
                                type="text"
                                name="emailID"
                                value={selectedRow.emailID}
                                className='editInputField'
                            />
                        </div>
                        <div className='col'>
                            <TextField
                                margin="dense"
                                label="DOB"
                                type="text"
                                name="dob"
                                fullWidth
                                value={selectedRow.dob}
                                className='editInputField'
                            />
                        </div>
                        <div className='col'>
                            <TextField
                                margin="dense"
                                label="Gender"
                                type="text"
                                name="gender"
                                fullWidth
                                value={selectedRow.gender}
                                className='editInputField'
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <TextField
                                // autoFocus
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
                                label="Admin Commission"
                                type="number"
                                fullWidth
                                name="adminCommision"
                                value={adminCommision}
                                onChange={(e) => setAdmincommision(e.target.value)}
                                className='editInputField'
                            />
                            {adminCommision && (audioprice || videoprice) && (
                                <Typography variant="body2" color="error" style={{ marginTop: '4px' }}>
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
                        className='btn btn-primary' style={{ backgroundColor: '#EF9848', border: '0px' }}>
                        Submit
                    </Button>
                </div>
            </MainCard>
        </div>
    )
}

export default ApproveAgentRequest
