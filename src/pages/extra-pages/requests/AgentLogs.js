import { useState } from 'react';
import { Grid } from '@mui/material';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import MainCard from 'components/MainCard';
import AgentLogsHook from './AgentLogsHook';

const AgentLogs = () => {
    const { loading, data } = AgentLogsHook();
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;

    const handlePageChange = (page) => setCurrentPage(page);
    const handlePerRowsChange = (newPerPage, page) => {
        setRowsPerPage(newPerPage);
        setCurrentPage(page);
    };

    const columns = [
        {
            name: 'No.',
            cell: (_, index) => <div className="custom-cell">{calcIndex(index)}</div>,
            width: '70px',
        },
        {
            name: 'Agent Id',
            cell: (row) => <div className="custom-cell">{row.agentId}</div>,
        },
        {
            name: 'Agent Name',
            cell: (row) => <div className="custom-cell">{row.agentName}</div>,
        },
        {
            name: 'Start Time',
            cell: (row) => <div className="custom-cell">{row.start_Time}</div>,
        },
        {
            name: 'End Time',
            cell: (row) => <div className="custom-cell">{row.end_Time}</div>,
        },
        {
            name: 'Duration',
            cell: (row) => <div className="custom-cell">{row.duration}</div>,
        },
    ];

    const customStyles = {
        headCells: {
            style: {
                fontWeight: 'bold',
                fontSize: '0.875rem',
                backgroundColor: 'rgba(241,244,249,255)',
            },
        },
        cells: {
            style: {
                fontSize: '0.875rem',
                fontFamily: "'Public Sans', sans-serif",
            },
        },
    };

    return (
        <MainCard title="Create Reseller">
            <Grid item xs={12}>
                <div className="text-end position-relative">
                    {loading ? (
                        <div
                            className="d-flex justify-content-center align-items-center position-absolute w-75"
                            style={{ zIndex: 1050, height: '54%' }}
                        >
                            <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
                        </div>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={data}
                            fixedHeader
                            customStyles={customStyles}
                            pagination
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handlePerRowsChange}
                            className="data-table"
                        />
                    )}
                </div>
            </Grid>
        </MainCard>
    );
};

export default AgentLogs;
