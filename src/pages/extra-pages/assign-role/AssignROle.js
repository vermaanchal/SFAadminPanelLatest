import MainCard from 'components/MainCard';
import { Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import DataTable from 'react-data-table-component';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ToastContainer } from 'react-toastify';
import AssignRoleHook from './AssignRoleHook';
import AddDesignationHook from '../add-designation/AddDesignationHook';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

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
          style={{ backgroundColor: '#EF9848', border: '0px',fontSize:'14px' }}
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
  ]

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
            subHeaderComponent={
              <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                  {/* <input
                    type='text'
                    className='form-control searchInput'
                    placeholder='Search User Id'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <div className='searchIcon'><SearchOutlinedIcon /></div> */}
                </div>
                <div className='d-flex'>
                  <input
                    type='text'
                    className='form-control searchInput'
                    placeholder='Enter User Id'
                    value={userValue}
                    onChange={(e) => setUserValue(e.target.value)}
                  />
                  <FormControl className='designationForm'>
                    <InputLabel id="select-label">Select Role</InputLabel>
                    <Select
                      labelId="select-label"
                      value={roleId}
                      onChange={handleSelectChange}
                      className='selectDiv'
                      label="Select Role"
                    >
                      <MenuItem value="">Select Role</MenuItem>
                      {role.map((option) => (
                        <MenuItem key={option.roleId} value={option.roleName}>
                          {option.roleName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <button
                    className='btn btn-primary ms-4'
                    style={{ backgroundColor: '#EF9848', border: '0px', padding: '10px' }}
                    onClick={handleAssignRole}
                  >
                    Submit
                  </button>
                </div>
              </div>
            }
          />
        ) : (
          <DataTable
            columns={column1}
            data={searchFilter}
            fixedHeader
            className='data-table'
            subHeader
            customStyles={tableHeaderStyle}
            subHeaderComponent={
              <div className='d-flex justify-content-between'>
                <div className='d-flex'>
                  {/* <input
                    type='text'
                    className='form-control searchInput'
                    placeholder='Search User Id'
                    value={searchnoData}
                    onChange={(e) => setSearchnoData(e.target.value)}
                  />
                  <div className='searchIcon'><SearchOutlinedIcon /></div> */}
                </div>
                <div className='d-flex gap-2'>
                  <input
                    type='text'
                    className='form-control searchInput'
                    placeholder='Enter User Id'
                    value={userValue}
                    onChange={(e) => setUserValue(e.target.value)}
                  />
                  <FormControl className='designationForm'>
                    <InputLabel id="select-label">Select Role</InputLabel>
                    <Select
                      labelId="select-label"
                      value={roleId}
                      onChange={handleSelectChange}
                      className='selectDiv'
                      label="Select Role"
                    >
                      <MenuItem value="">Select Role</MenuItem>
                      {role.map((option) => (
                        <MenuItem key={option.roleId} value={option.roleId}>
                          {option.roleName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <button
                    className='btn btn-primary ms-4'
                    style={{ backgroundColor: '#EF9848', border: '0px', padding: '10px' }}
                    onClick={handleAssignRole}
                  >
                    Submit
                  </button>
                </div>
              </div>
            }
          />
        )}
      </Grid>
    </MainCard>
  );
};

export default AssignRole;
