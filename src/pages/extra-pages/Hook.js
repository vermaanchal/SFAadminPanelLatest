import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Papa from 'papaparse';
const Hook = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([''])
    const [openPreview, setOpenPreview] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState('');
    const [open, setOpen] = useState(false)
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(true);
    //---------------------fetch data---------------//
    const fetchData = async () => {
        setLoading(true);
        try {
            let req = await fetch(`${baseURLProd}AppUserDetails`, {
                method: "GET",
                'Content-Type': 'application/json',
            })
            const res = await req.json();
            setLoading(false);
            setData(res?.appUserDetailsList);
            setFilter(res?.appUserDetailsList)
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    //------------------------serach by userid-----------//

    // const searchapidata = async () => {
    //     setLoading(true);
    //     try {
    //         let req = await fetch(`${baseURLProd}AppUserDetails`, {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             }
    //         })
    //         const res = await req.json();
    //         // setLoading(false);
    //         // setData(res?.appUserDetailsList);
    //         // setFilter(res?.appUserDetailsList)
    //     }
    //     catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoading(false);
    //     }
    // }
    useEffect(() => {
        const result = data.filter((item) => {
            return item.userId.toLowerCase().includes(search.toLocaleLowerCase()) || item.name.toLowerCase().includes(search.toLocaleLowerCase()) || item.mobile.toLowerCase().includes(search.toLocaleLowerCase())
           
            // 
        })
        setFilter(result)
        // if (search === "") {
        //     setFilter(result)
        // } else {
        //     if (search && search.length >= 7) {
        //         searchapidata();
        //     }
        // }
    }, [search])

    const handleReset = () => {
        setSearch('');
        setFilter(data);
    };
    //---------------------------delete user------------------//
    const handleDelete = async (userId) => {
        await fetch(`${baseURLProd}DeleteVideo`, {
            method: "POST",
            body: JSON.stringify({ userId: userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const newData = data.filter(row => (row.userid !== userId));
        setFilter(newData);
        fetchData();
        toast.success("User Detail deleted successfully")
    }
    //----------------get user detail---------------//
    const handleEdit = async (userId, name, mobile, email, password, dob) => {
        setOpen(true);
        setUserId(userId)
        setName(name)
        setMobile(mobile)
        setEmail(email)
        setPassword(password)
        setDob(dob)

    }
    //-----------------------edit user detail ------------------//
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (window.confirm('Are you sure you want to change the details?')) {
                const response = await fetch(`${baseURLProd}UserEditDetails`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: userId,
                        name: name,
                        email: email,
                        mobile: mobile,
                        dob: dob,
                        password: password,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to edit user details');
                }

                await response.json();
                fetchData()
                setOpen(false);
                setUserId("")
                setName("")
                setMobile("")
                setEmail("")
                setPassword("")
                setDob("")
                toast.success("user details changed ")
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    //----------------------image download-------------------//
    const handleDownload = (imageUrl, imageName) => {
        fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                const objectURL = URL.createObjectURL(blob);
                link.href = objectURL;
                link.download = imageName;
                link.click();
                URL.revokeObjectURL(objectURL);
            })
            .catch(error => console.error('Error downloading image:', error));
    };
    //------------image click --------------------//
    const handleImageClick = (imageUrl) => {
        setPreviewImageUrl(imageUrl);
        setOpenPreview(true);
    };

    const handleClosePreview = () => {
        setOpenPreview(false);
    };

    const handleClose = () => {
        setOpen(false)
    }
    // ----------------CSV file download---------------------//
    // const downloadCSV = () => {
    //     const csvContent =
    //         "data:text/csv;charset=utf-8," +
    //         [
    //             Object.keys(filter[0]).join(','),
    //             ...filter.map((row) => Object.values(row).join(',')), 
    //         ].join('\n');

    //     const encodedUri = encodeURI(csvContent);
    //     const link = document.createElement("a");
    //     link.setAttribute("href", encodedUri);
    //     link.setAttribute("download", "Appuser_details.csv");
    //     document.body.appendChild(link);
    //     link.click();
    // };
    const downloadCSV = () => {
        const csv = Papa.unparse(filter);

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'Appuser_details.csv');

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return {
        loading,
        filter, search, openPreview, previewImageUrl, setSearch, setOpenPreview, setPreviewImageUrl, handleReset,
        handleClosePreview, handleDelete, handleDownload, handleImageClick, handleEdit, handleSubmit, downloadCSV, data,
        open, handleClose, userId, name, dob, mobile, email, password, setUserId, setName, setDob, setMobile, setEmail, setPassword
    }
}

export default Hook
