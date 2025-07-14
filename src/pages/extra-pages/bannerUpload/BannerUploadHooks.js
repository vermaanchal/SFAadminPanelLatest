import { useEffect, useState } from "react";
import { baseURLProd } from '../../../api/api'
import axios from "../../../../node_modules/axios/index";

const BannerUploadHooks = () => {
	const [bannerData, setBannerData] = useState([]);
	const [img,setImg] = useState(null);

	const fetchData = async () => {
		try {
			const res = await fetch(`${baseURLProd}GetBannerImagesDetails`);
			const data = await res.json();
			// console.log("data", data.banners);
			setBannerData(data.banners);
		} catch (error) {
			console.log("error", error);
		}
	}

	const handleImageshow = () => {
		
	}

	const handleUploadimg =  async (e)=>{
		e.preventDefault();
		const formData = new FormData();
		formData.append("ImageFile",img);
		try{
			const res = await axios.post(`${baseURLProd}UploadBannerImage`,formData,{
				headers:{
					'Content-Type':"multipart/form-data",
				},
		})
			console.log("responce data",res.data);

		}catch(error){
			console.log("error",error.message);
		}
	}


	const handleRemove= async (idd)=>{
		console.log("unique idd",idd);
		try{
			const res = await axios.post(`${baseURLProd}DeleteAppBanner`,({uniqueId:idd}))
			// console.log("responce data",res.data)
			fetchData();
		}catch(error){
			console.log("error",error.message);
		}
	}

	const handleEnable= async(idd,bool)=>{
		console.log("unique idd",idd,bool);
		try{
			const res = await axios.post(`${baseURLProd}UpdateBannerIsActive`,({uniqueId:idd,isActive:bool}))
			// console.log("responce data",res.data);
			fetchData();
		}catch(error){
			console.log("error message",error);
		}
	}

	useEffect(() => {
		fetchData();
	}, [])
	return {
		bannerData, setBannerData, handleImageshow,handleUploadimg,setImg,handleRemove,handleEnable
	}
}

export default BannerUploadHooks;