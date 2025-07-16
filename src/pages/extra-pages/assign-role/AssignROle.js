import MainCard from 'components/MainCard';
import DataTable from 'react-data-table-component';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import AssignRoleHook from './AssignRoleHook';
import AddDesignationHook from '../add-designation/AddDesignationHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  Checkbox,
  ListItemText,
  TextField
} from '@mui/material';

const AssignRole = () => {
  const {
    filter, search, setSearch, roleId, handleAssignRole,
    handleSelectChange, userValue, setUserValue, handleRemove,
    loading, searchFilter, searchnoData, setSearchnoData
  } = AssignRoleHook();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const { role } = AddDesignationHook();

  const calcIndex = (index) => (currentPage - 1) * rowsPerPage + index + 1;

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    setRowsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const column = [
    {
      name: "No.",
      cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
      width: "80px"
    },
    {
      name: "User Id",
      cell: row => <div className="custom-cell">{row.userId}</div>
    },
    {
      name: "Name",
      cell: row => <div className="custom-cell">{row.name}</div>,
      width: '270px'
    },
    {
      name: "Designation Name",
      cell: row => <div className="custom-cell">{row.desigName}</div>,
      width: '200px'
    },
    {
      name: "Created Date",
      cell: row => <div className="custom-cell">{row.created_date}</div>,
      width: "200px"
    },
    {
      name: 'Action',
      cell: (row) => (
        <button
          className='btn btn-danger'
          style={{ backgroundColor: '#EF9848', border: '0px', fontSize: '14px' }}
          onClick={() => handleRemove(row.userId)}
        >
          Remove
        </button>
      ),
      width: '200px'
    }
  ];

  const column1 = [
    {
      name: "No.",
      cell: (row, index) => <div className="custom-cell">{calcIndex(index)}</div>,
      width: ""
    },
    {
      name: "User Id",
      cell: (row) => <div className="custom-cell">{row.userId}</div>,
    },
    {
      name: " Name",
      cell: (row) => <div className="custom-cell">{row.name}</div>,
      width: ''
    },
    {
      name: 'Status',
      cell: (row) => (
        <div className="custom-cell">
          {row.status ? 'Active' : 'Inactive'}
        </div>
      ),
      width: ''
    }
  ];

  const tableHeaderStyle = {
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "0.875rem",
        backgroundColor: "rgba(241,244,249,255)"
      },
      cells: {
        style: {
          fontSize: "0.875rem",
          fontFamily: "'Public Sans',sans-serif"
        }
      }
    }
  };

  const SubHeaderComponent = (
    <div
      className="d-flex flex-wrap align-items-center w-100"
      style={{ justifyContent: 'flex-end', gap: '16px' }}
    >
      {/* User ID Custom Input */}
      <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
        <InputLabel htmlFor="user-id-input">User ID</InputLabel>
        <OutlinedInput
          id="user-id-input"
          value={userValue}
          onChange={(e) => setUserValue(e.target.value)}
          label="User ID"
        />
      </FormControl>

      {/* Role MultiSelect */}
      <FormControl size="small" sx={{ minWidth: 250, maxWidth: 250 }}>
        <InputLabel id="select-label">Select Role</InputLabel>
        <Select
          labelId="select-label"
          multiple
          value={roleId}
          onChange={handleSelectChange}
          input={<OutlinedInput label="Select Role" />}
          renderValue={(selected) => {
            const selectedNames = role
              .filter((r) => selected.includes(r.roleId))
              .map((r) => r.roleName)
              .join(', ');
            return (
              <div
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {selectedNames}
              </div>
            );
          }}
        >
          {role.map((option) => (
            <MenuItem
              key={option.roleId}
              value={option.roleId}
              sx={{ fontSize: '0.8rem' }}
            >
              <Checkbox
                checked={roleId.indexOf(option.roleId) > -1}
                size="small"
                sx={{ padding: '2px', marginRight: '6px' }}
              />
              <ListItemText
                primary={option.roleName}
                primaryTypographyProps={{ fontSize: '0.8rem' }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>


      {/* Submit Button */}
      <button
        className="btn btn-primary"
        style={{
          backgroundColor: '#EF9848',
          border: '0px',
          padding: '8px 20px',
          height: '40px',
          marginTop: '2px'
        }}
        onClick={handleAssignRole}
      >
        Submit
      </button>
    </div>
  );


  return (
    <MainCard title="Create Reseller">
      <Grid item xs={12}>
        <ToastContainer />

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
            <FontAwesomeIcon icon={faSpinner} spin size="3x" style={{ color: '#EF9848' }} />
          </div>
        ) : filter && filter.length > 0 ? (
          <DataTable
            columns={column}
            data={filter}
            fixedHeader
            pagination
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
            customStyles={tableHeaderStyle}
            className='data-table'
            subHeader
            subHeaderComponent={SubHeaderComponent}
          />
        ) : (
          <DataTable
            columns={column1}
            data={searchFilter}
            fixedHeader
            className='data-table'
            subHeader
            customStyles={tableHeaderStyle}
            subHeaderComponent={SubHeaderComponent}
          />
        )}
      </Grid>
    </MainCard>
  );
};

export default AssignRole;
