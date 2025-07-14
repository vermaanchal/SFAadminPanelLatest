import React from 'react';
import WhatsappLogsHooks from './WhatsappLogsHooks';

import MainCard from 'components/MainCard';
import { Grid, Box } from '@mui/material';
import DataTable from 'react-data-table-component';

const WhatsappLogs = () => {
    const { whatsappLog } = WhatsappLogsHooks();
    const tabledata = whatsappLog?.otpLogs || [];

    const columns = [
        {
            name: "Sr. No",
            selector: (row, index) => index + 1,
            width: "100px",
            sortable: false,
        },
        // {
        //     name: "Name",
        //     selector: row => row.name || "-",
        //     sortable: true,
        // },
        {
            name: "Mobile Number",
            selector: row => row.mobile,
            sortable: true,
        },
        {
            name: "OTP",
            selector: row => row.otp,
            sortable: true,
        },
        {
            name: "Created Date",
            selector: row => row.created_Date,
            sortable: true,
        }
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
                fontFamily: "'Public Sans', sans-serif"
            }
        }
    };

    return (
        <MainCard title="OTP Logs" sx={{ width: '100%' }}>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <DataTable
                            columns={columns}
                            data={tabledata}
                            fixedHeader
                            customStyles={tableHeaderStyle}
                            pagination
                            responsive
                        />
                    </Grid>
                </Grid>
            </Box>
        </MainCard>
    );
};

export default WhatsappLogs;
