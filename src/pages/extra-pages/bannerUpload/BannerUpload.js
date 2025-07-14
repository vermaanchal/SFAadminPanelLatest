import MainCard from 'components/MainCard';
import React from 'react';
import DataTable from 'react-data-table-component';
import { Grid, IconButton,Box } from '@mui/material';
import BannerUploadHooks from './BannerUploadHooks';
import Button from '@mui/material/Button';
import { Margin, Opacity } from '../../../../node_modules/@mui/icons-material/index';
import { styled } from '@mui/material/styles';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const BannerUpload = () => {

	const { bannerData, setBannerData, handleImageshow,handleUploadimg,setImg,handleRemove,handleEnable } = BannerUploadHooks();

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

	const handleFile = () => {
		document.getElementById("inputfile").OnClick();
	}

	const column = [
		// {
		// 	name: 'Id',
		// 	cell: (row) => <>{row.uniqueId}</>,
		// 	width: "100px",
		// },
		{
			name: 'Banner Name',
			cell: (row) => <>{row.bannerName.split('.png')}</>,
			width:'200px'
		},
		{
			name: 'Uploaded date',
			cell: (row) => <>{row.created_date?.slice(0,10)}</>,
		}, {
			name: 'Image Preview',
			cell: (row) => <>
				<div style={{ borderRadius: "8px", overflow: "hidden", width: "50px", height: "50px" }}>
					<img width={50} height={50} src={row.imagePreview.split('.img')} alt="Img" style={{ objectFit: "cover" }} />
				</div>
			</>,
			width:"200px"
		},
		// {
		// 	name: 'isActive',
		// 	cell: (row) => <>{row.isActive}</>,
		// },
		{
			name: 'Enable',
			cell: (row) => <>
			{row.isActive === "True" ? 
			<Button color="secondary" variant="contained" size="small" sx={{opacity:'0.5'}}  >Enable</Button>
			:
			<Button color="warning" variant="contained" size="small" onClick={()=>handleEnable(row.uniqueId,true)}>Enable</Button>
		}
			 </>,
		},
		{
			name: 'Disable',
			cell: (row) => <> {row.isActive === "False" ?
				 <Button color="secondary" variant="contained" size="small" sx={{opacity:'0.5'}} >Disable</Button> 
				:
				 <Button color="warning" variant="contained" size="small" onClick={()=>handleEnable(row.uniqueId,false)}>Disable</Button> 
				 
			}</>,
		},
		{
			name: 'Remove',
			cell: (row) => <> <Button color="secondary" variant="contained" size="small" onClick={()=>handleRemove(row.uniqueId)}>Remove</Button> </>,
		},
	]

	return (

		<MainCard title="Banner Upload">
			<Grid items sx={12} md={12} lg={12}>
				<Grid>
					<form onSubmit={handleUploadimg}>
					<Button
						component="label"
						role={undefined}
						color="secondary"
						variant="contained"
						tabIndex={-1}
						// startIcon={<CloudUploadIcon />}
						>
						Upload files
						<VisuallyHiddenInput
							type="file"
							onChange={(e) => setImg(e.target.files[0])}
						/>
						</Button>
						<Button  type="submit" className='mx-3' variant="contained">Submit</Button>
						</form>
					{/* <Button color="primary" variant="contained" sx={{ margin: "10px" }} onClick={handleFile}>Upload Image</Button>
					<input id="inputfile" type="file" name="" value="" hidden /> */}
					{/* <Button
						component="label"
						role={undefined}
						tabIndex={-1}
						variant="outlined"
						color="neutral"
						startDecorator={
							<SvgIcon>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
									/>
								</svg>
							</SvgIcon>
						}
					>
						Upload a file
						<VisuallyHiddenInput type="file" />
					</Button> */}
				</Grid>
			<Box className='mt-4'>
					<DataTable
					data={bannerData}
					columns={column}
					pagenation
					fixedHeader
					customStyles={tableHeaderStyle} className='data-table'
					pagination
				/>
			</Box>
			</Grid>

		</MainCard>
	)
}

export default BannerUpload
