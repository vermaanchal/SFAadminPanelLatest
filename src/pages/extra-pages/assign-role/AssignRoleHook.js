import { baseURLProd } from "api/api"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const AssignRoleHook = () => {
    const [data, setData] = useState([])
    const [search, setSearch] = useState('');
    const [searchnoData, setSearchnoData] = useState('');
    const [searchFilter, setSearchFilter] = useState([]);
    const [filter, setFilter] = useState([]);
    const [roleId, setRoleId] = useState([]);
    const [userValue, setUserValue] = useState("");
    const [loading, setLoading] = useState(true);

    console.log("roleId", roleId)

    const fetchData = async () => {
        setLoading(true)
        try {
            let req = await fetch(`${baseURLProd}GetAssignedRoleDetails`, {
                method: "GET",
                'Content-Type': 'application/json',
            })
            const res = await req.json()
            setLoading(false)
            setData(res.getAssignedRoleList)
            setFilter(res.getAssignedRoleList)
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // const fetchApiData = async (idd) => {
    //     // console.log('hiiiiiiiiiiiii')
    //     try {
    //         const res = await fetch(`${baseURLProd}GetUserById`, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ userId: idd }),
    //         })
    //         const data = await res.json();
    //         setSearchFilter([data]);
    //         if (data.status === true) {
    //             // console.log("user Data", data);
    //             // setSearchFilter([data.name, data.status, data.userId]);

    //         }
    //     } catch (error) {
    //         console.log("error Message", error);
    //         setSearchFilter([]);
    //     }
    // }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const result = data.filter((item) => {
            return item.userId.toLowerCase().match(search.toLocaleLowerCase())
        })
        setFilter(result)
    }, [search])


    // useEffect(() => {
    //     if (searchnoData.length >= 7) {
    //         fetchApiData(searchnoData);
    //     }
    // }, [searchnoData]);


    //-------------select value--------------------
    const handleSelectChange = (e) => {
        const {
            target: { value },
        } = e;
        setRoleId(typeof value === 'string' ? value.split(',') : value);
    };

    //---------------Assign Role-------------//
    const handleAssignRole = async () => {
        try {
            const req = await fetch(`${baseURLProd}AssignRoles`, {
                method: 'POST',
                body: JSON.stringify({
                    roleId: roleId,
                    userId: userValue
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const res = await req.json()
            if (res.status == false) {
                toast.error(res.message)
            }
            else {
                toast.success("Role assigned Successfully")
                setUserValue("")
                setRoleId([])
                fetchData()
            }
        }
        catch (error) {
            console.error('error', error);
        }
    }
    const handleRemove = async (userId) => {
        if (window.confirm("Are you sure to Remove the Data?")) {
            await fetch(`${baseURLProd}RemoveUserRoles`, {
                method: "POST",
                body: JSON.stringify({ userId: userId }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const newData = data.filter(row => !(row.userid === userId));
            setFilter(newData);
            fetchData();
            setSearch("")
            toast.success("Role Removed successfully")
        }
    }
    const handleReset = () => {
        setSearch('');
        setFilter(data);
    };
    return {
        roleId, handleSelectChange, search, setSearch, filter, searchFilter, setUserValue, userValue
        , handleAssignRole, handleRemove, handleReset, data, searchnoData, setSearchnoData
    }
}

export default AssignRoleHook
