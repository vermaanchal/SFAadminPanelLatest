import { useEffect, useState } from "react";
import { baseURLProd } from '../../../api/api'
import axios from "../../../../node_modules/axios/index";
import { toast } from 'react-toastify'
import Swal from 'sweetalert2';

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

	// const fetchData = async () => {
	// 	try {
	// 		const res = await fetch(`${baseURLProd}GetBannerImagesDetails`);
	// 		const data = await res.json();
	// 		if (res.status) {
	// 			const sortedData = data?.banners?.sort((a, b) => {
	// 				if (a.isActive === "True" && b.isActive === "False") return -1;
	// 				if (a.isActive === "False" && b.isActive === "True") return 1;

	// 				const dateA = new Date(a.created_date.split(" ").reverse().join("T"));
	// 				const dateB = new Date(b.created_date.split(" ").reverse().join("T"));
	// 				return dateB - dateA;
	// 			});

	// 			setBannerData(sortedData);
	// 		}
	// 	} catch (error) {
	// 		console.log("error", error);
	// 	}
	// }

	const fetchData = async () => {
		try {
			const response = await fetch(`${baseURLProd}GetBannerImagesDetails`);

			if (!response.status) {
				throw new Error(`Failed to fetch banner data. Status: ${response.status}`);
			}

			const data = await response.json();

			const sortedData = data?.banners?.sort((a, b) => {
				if (a.isActive === "True" && b.isActive === "False") return -1;
				if (a.isActive === "False" && b.isActive === "True") return 1;

				const dateA = new Date(a.created_date.split(" ").reverse().join("T"));
				const dateB = new Date(b.created_date.split(" ").reverse().join("T"));
				return dateB - dateA;
			});

			setBannerData(sortedData || []);
		} catch (error) {
			console.error("Error fetching banner data:", error);
			toast.error("Unable to load banner data. Please try again later.");
		}
	};


	// const handleUploadimg = async (e) => {
	// 	e.preventDefault();
	// 	const formData = new FormData();
	// 	formData.append("ImageFile", img);
	// 	try {
	// 		const res = await axios.post(`${baseURLProd}UploadBannerImage`, formData, {
	// 			headers: {
	// 				'Content-Type': "multipart/form-data",
	// 			},
	// 		})

	// 		if (res.status) {
	// 			toast.success("Banner uploaded successfully.")
	// 		}
	// 	} catch (error) {
	// 		console.log("error", error.message);
	// 	}
	// }


	const handleUploadimg = async (e) => {
		e.preventDefault();

		if (!img) {
			toast.warning("Please select an image before uploading.");
			return;
		}

		const formData = new FormData();
		formData.append("ImageFile", img);

		try {
			const res = await axios.post(`${baseURLProd}UploadBannerImage`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (res.status) {
				toast.success("Banner uploaded successfully.");
				await fetchData();
			}
		} catch (error) {
			toast.error("Failed to upload banner. Please try again.");
		}
	};

	// const handleRemove = async (idd) => {
	// 	console.log("unique idd", idd);
	// 	try {
	// 		const res = await axios.post(`${baseURLProd}DeleteAppBanner`, ({ uniqueId: idd }))
	// 		if (res.status) {
	// 			toast.success("Banner deleted successfully.")
	// 			fetchData();
	// 		}
	// 	} catch (error) {
	// 		console.log("error", error.message);
	// 	}
	// }

	const handleRemove = async (idd) => {
		try {
			const { isConfirmed } = await Swal.fire({
				title: "Delete Banner?",
				text: "This action cannot be undone!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Yes, delete it!",
				cancelButtonText: "Cancel",
				confirmButtonColor: "#e74c3c",
				cancelButtonColor: "#95a5a6",
			});

			if (!isConfirmed) return;

			const res = await axios.post(`${baseURLProd}DeleteAppBanner`, { uniqueId: idd });

			if (res.status) {
				await fetchData();
				await Swal.fire("Deleted!", "The banner has been successfully deleted.", "success");
			}
		} catch (error) {
			console.error("Delete Error:", error.message);
			Swal.fire("Failed!", "An error occurred while deleting the banner.", "error");
		}
	};



	// const handleEnable = async (idd, bool) => {
	// 	console.log("unique idd", idd, bool);
	// 	try {
	// 		const res = await axios.post(`${baseURLProd}UpdateBannerIsActive`, ({ uniqueId: idd, isActive: bool }))

	// 		if (res.status) {
	// 			toast.success(bool ? "User enabled successfully. " : "User disabled successfully.")
	// 			fetchData();
	// 		}
	// 	} catch (error) {
	// 		console.log("error message", error);
	// 	}
	// }

	const handleEnable = async (idd, bool) => {
		const action = bool ? "enable" : "disable";
		const { isConfirmed } = await Swal.fire({
			title: `Are you sure you want to ${action} this banner?`,
			text: `You are about to ${action} the banner. Continue?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: `Yes, ${action} it!`,
			cancelButtonText: "Cancel",
			confirmButtonColor: "#27ae60",
			cancelButtonColor: "#95a5a6",
		});

		if (!isConfirmed) return;

		try {
			const res = await axios.post(`${baseURLProd}UpdateBannerIsActive`, {
				uniqueId: idd,
				isActive: bool,
			});

			if (res.status === 200) {
				await fetchData();
				Swal.fire("Success!", `Banner ${bool ? "enabled" : "disabled"} successfully.`, "success");
			}
		} catch (error) {
			console.error("Enable/Disable Error:", error);
			Swal.fire("Error!", `Failed to ${action} the banner.`, "error");
		}
	};


	useEffect(() => {
		fetchData();
	}, [])

	return {
		bannerData, setBannerData, handleImageshow, handleUploadimg, setImg, handleRemove, handleEnable, openPreview, previewImageUrl, handleClosePreview, handleImageClick, img
	}
}

export default BannerUploadHooks;