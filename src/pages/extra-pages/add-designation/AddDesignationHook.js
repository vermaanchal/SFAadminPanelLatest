import { baseURLProd } from "api/api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const AddDesignationHook = () => {
    const [data, setData] = useState([])
    const [role, setRole] = useState([])
    const [features, setFeatures] = useState([])
    const [roleId, setRoleId] = useState([])
    const [featureId, setFeatureId] = useState([])

    const fetchData = async () => {
        try {
            let req = await fetch(`${baseURLProd}GetRole_FeatureDetails`, {
                method: "GET",
                'Content-Type': 'application/json',
            })
            const res = await req.json()
            setData(res)
            setRole(res.getRoleList)
            setFeatures(res.getFeatureList)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    //-------------select value--------------------
    const handleSelectChange = (e) => {
        setRoleId(e.target.value)
    };

    //-------------select value--------------------
    const handlefeatureSelectChange = (e) => {
        setFeatureId(e.target.value);
    };
    // //---------------Add Frame-------------//
    const handleCreateDesignation = async () => {

        try {
            const selectedRole = role.find(role => role.roleId === roleId);
            const roleName = selectedRole ? selectedRole.roleName : '';

            await fetch(`${baseURLProd}CreateDesignation`, {
                method: 'POST',
                body: JSON.stringify({
                    roleId: roleId, roleName: roleName,
                    featureId: featureId
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success(" Designation Added Succesfully")
            fetchData()
        }
        catch (error) {
            console.error('error', error);
        }
    }
    return {
        data, role, features, roleId, handleSelectChange,
        handlefeatureSelectChange, featureId, handleCreateDesignation
    }
}

export default AddDesignationHook
