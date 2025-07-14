import { Button, Grid, TextField, Box } from '@mui/material';
import VersionUpdateHooks from './VersionUpdateHooks';
import { ToastContainer } from 'react-toastify';
import MainCard from 'components/MainCard';
import { Margin } from '../../../../node_modules/@mui/icons-material/index';

const VersionUpdate = () => {
    const { formData, handleChange, handleSubmit,currVersion } = VersionUpdateHooks();
    return (
        <MainCard title="Version Update" sx={{ width: '100%' }}>
            <Box sx={{ width: '100%' }}>
                <ToastContainer />
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1} alignItems="center">
                        <Grid item xs={12} sm={12} md={12}  sx={{display:'flex',gap:"100px",justifyContent:"between"}}>
                        <Grid item xs={12} sm={6} md={3}> 
                            <label className='font-bold'>Current Version</label>
                            <TextField
                                    // label="App Version"
                                    name=""
                                    size="small"
                                    fullWidth
                                    value={currVersion?.versions}
                                    disabled
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: 40,
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'rgba(0,0,0,0.23)',
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: 'inherit',
                                        },
                                        '& input': {
                                            padding: '10px 12px',
                                        }
                                    }}
                                />
                            </Grid>  
                            <Grid item xs={12} sm={6} md={3}> 
                                        <label className='font-bold'>Last Version Updated</label>
                                <TextField
                                    // label="App Version"
                                    name="appVersion"
                                    size="small"
                                    fullWidth
                                    value={currVersion?.crDate}
                                    disabled
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: 40,
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'rgba(0,0,0,0.23)',
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: 'inherit',
                                        },
                                        '& input': {
                                            padding: '10px 12px',
                                        }
                                    }}
                                />
                            </Grid>  
                            <Grid item xs={12} sm={12} md={3}>
                                <label>&nbsp;</label>
                                <TextField
                                    label="New App Version"
                                    name="appVersion"
                                    size="small"
                                    fullWidth
                                    value={formData.appVersion}
                                    onChange={handleChange}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            height: 40,
                                            '&.Mui-focused fieldset': {
                                                borderColor: 'rgba(0,0,0,0.23)',
                                            },
                                        },
                                        '& .MuiInputLabel-root.Mui-focused': {
                                            color: 'inherit',
                                        },
                                        '& input': {
                                            padding: '10px 12px',
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={2}>
                            
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        minWidth: '120px',
                                        height: '40px',
                                        marginTop:'20px',
                                        backgroundColor: 'orange',
                                        '&:hover': {
                                            backgroundColor: '#e69500',
                                        }
                                    }}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </MainCard>
    );
};

export default VersionUpdate;
