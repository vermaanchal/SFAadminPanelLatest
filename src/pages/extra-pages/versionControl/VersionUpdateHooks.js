import { baseURLProd } from "api/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const VersionUpdateHooks = () => {
    const [currVersion,setCurrVersion] = useState([{}]);

    useEffect(()=>{
        fetchVersionDetails();
    },[]);

    const fetchVersionDetails= async()=>{
        try{
            const res = await fetch(`${baseURLProd}GetAndroidAppVersions`);
            const data = await res.json();
            console.log("res?.versions",data?.versions)
            if(data?.versions){
              setCurrVersion(data?.versions[0]);
            //   toast.success(res?.data?.message || "Version updated successfully!");
            }
        }catch(error){
            console.log("error",error);
             setCurrVersion()
        }
    }
    const [formData, setFormData] = useState({
        appVersion: '',
        isUpdate: true,
        isLogOut: false,
        isAndroid: true
    });

    const updateVerion = async (formData) => {
        try {
            const res = await axios.post(`${baseURLProd}VersionUpdate`, formData);
            if (res?.status) {
                setFormData({
                    appVersion: '',
                    isUpdate: true,
                    isLogOut: false,
                    isAndroid: true
                });
                toast.success(res?.data?.message || "Version updated successfully!");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Error while updating version!");
            throw new Error("Error while updating version!");
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            appVersion: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateVerion(formData);
        } catch (err) {
            alert("Failed to update version.");
        }
    };

    return { updateVerion, formData, setFormData, handleChange, handleSubmit,currVersion };
};

export default VersionUpdateHooks;
