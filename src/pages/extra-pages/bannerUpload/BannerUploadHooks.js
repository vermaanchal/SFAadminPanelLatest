import { useEffect, useState } from "react";
import { baseURLProd } from '../../../api/api'
import axios from "../../../../node_modules/axios/index";
import { toast } from 'react-toastify'

const BannerUploadHooks = () => {
	const [bannerData, setBannerData] = useState([]);
	const [img, setImg] = useState(null);

	const [openPreview, setOpenPreview] = useState(false);
	const [previewImageUrl, setPreviewImageUrl] = useState('');


	const handleImageClick = (imageUrl) => {
		setPreviewImageUrl(imageUrl);
		setOpenPreview(true);
	};

	const handleClosePreview = () => setOpenPreview(false);

	const handleImageshow = () => { }

	const fetchData = async () => {
		try {
			const res = await fetch(`${baseURLProd}GetBannerImagesDetails`);
			const data = await res.json();
			if (res.status) {
				const sortedData = data?.banners?.sort((a, b) => {
					if (a.isActive === "True" && b.isActive === "False") return -1;
					if (a.isActive === "False" && b.isActive === "True") return 1;

					const dateA = new Date(a.created_date.split(" ").reverse().join("T"));
					const dateB = new Date(b.created_date.split(" ").reverse().join("T"));
					return dateB - dateA;
				});

				setBannerData(sortedData);
			}
		} catch (error) {
			console.log("error", error);
		}
	}

	const handleUploadimg = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("ImageFile", img);
		try {
			const res = await axios.post(`${baseURLProd}UploadBannerImage`, formData, {
				headers: {
					'Content-Type': "multipart/form-data",
				},
			})

			if (res.status) {
				toast.success("Banner uploaded successfully.")
			}
		} catch (error) {
			console.log("error", error.message);
		}
	}


	const handleRemove = async (idd) => {
		console.log("unique idd", idd);
		try {
			const res = await axios.post(`${baseURLProd}DeleteAppBanner`, ({ uniqueId: idd }))
			if (res.status) {
				toast.success("Banner deleted successfully.")
				fetchData();
			}
		} catch (error) {
			console.log("error", error.message);
		}
	}

	const handleEnable = async (idd, bool) => {
		console.log("unique idd", idd, bool);
		try {
			const res = await axios.post(`${baseURLProd}UpdateBannerIsActive`, ({ uniqueId: idd, isActive: bool }))

			if (res.status) {
				toast.success(bool ? "User enabled successfully. " : "User disabled successfully.")
				fetchData();
			}
		} catch (error) {
			console.log("error message", error);
		}
	}

	useEffect(() => {
		fetchData();
	}, [])

	return {
		bannerData, setBannerData, handleImageshow, handleUploadimg, setImg, handleRemove, handleEnable, openPreview, previewImageUrl, handleClosePreview, handleImageClick, img
	}
}

export default BannerUploadHooks;