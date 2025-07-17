import { useEffect, useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';
import { toast } from 'react-toastify';
import { baseURLProd } from 'api/api';

const AllUserTransectionsHook = () => {
    // State variables
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState('');

    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');

    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    // Fetch all data
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${baseURLProd}AppUserDetails`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            const json = await res.json();
            setData(json?.appUserDetailsList || []);
            setFilter(json?.appUserDetailsList || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filter by search
    useEffect(() => {
        if (!search.trim()) {
            setFilter(data);
            return;
        }

        const query = search.toLowerCase();
        const filtered = data.filter((item) =>
            item.userId.toLowerCase().includes(query) ||
            item.name.toLowerCase().includes(query) ||
            item.mobile.toLowerCase().includes(query)
        );
        setFilter(filtered);
    }, [search, data]);

    // Filter by date range
    const handleDateRangeFilter = async (e) => {
        e.preventDefault();
        if (!fromDate || !toDate) return;

        setLoading(true);
        try {
            const payload = { fromDate, toDate };
            const res = await axios.post(`${baseURLProd}GetAppUserDetailsByDateRange`, payload);
            setFilter(res?.data?.userList || []);
            setFromDate('');
            setToDate('');
        } catch (error) {
            console.error('Error filtering by date:', error);
        } finally {
            setLoading(false);
        }
    };

    // Reset filters
    const handleReset = () => {
        setSearch('');
        setFilter(data);
    };

    // Image preview
    const handleImageClick = (imageUrl) => {
        setPreviewImageUrl(imageUrl);
        setOpenPreview(true);
    };

    const handleClosePreview = () => setOpenPreview(false);
    const handleClose = () => setOpen(false);

    // Edit user
    const handleEdit = (id, name, mobile, email, password, dob) => {
        setOpen(true);
        setUserId(id);
        setName(name);
        setMobile(mobile);
        setEmail(email);
        setPassword(password);
        setDob(dob);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!window.confirm('Are you sure you want to change the details?')) return;

        try {
            const payload = { userId, name, email, mobile, dob, password };
            const res = await fetch(`${baseURLProd}UserEditDetails`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error('Failed to update user');

            await res.json();
            toast.success('User details updated');
            setOpen(false);
            resetFormFields();
            fetchData();
        } catch (error) {
            console.error(error.message);
        }
    };

    const resetFormFields = () => {
        setUserId('');
        setName('');
        setMobile('');
        setEmail('');
        setPassword('');
        setDob('');
    };

    // CSV download
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

    // Image download
    const handleDownload = (imageUrl, imageName) => {
        fetch(imageUrl)
            .then(res => res.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = imageName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            })
            .catch(err => console.error('Image download error:', err));
    };

    // Delete user (note: your current delete endpoint is `DeleteVideo`, which may be incorrect)
    const handleDelete = async (userId) => {
        try {
            await fetch(`${baseURLProd}DeleteVideo`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId }),
            });
            toast.success('User deleted successfully');
            fetchData();
        } catch (error) {
            console.error('Delete failed:', error);
        }
    };

    return {
        // Data
        data, filter, loading,

        // Filters
        search, setSearch,
        fromDate, toDate, setFromDate, setToDate,
        handleDateRangeFilter,
        handleReset,

        // Edit form
        open, handleClose,
        userId, name, dob, mobile, email, password,
        setUserId, setName, setDob, setMobile, setEmail, setPassword,
        handleEdit, handleSubmit,

        // Image preview
        openPreview, previewImageUrl, handleImageClick, handleClosePreview,

        // Actions
        handleDelete, handleDownload, downloadCSV
    };
};

export default AllUserTransectionsHook;
