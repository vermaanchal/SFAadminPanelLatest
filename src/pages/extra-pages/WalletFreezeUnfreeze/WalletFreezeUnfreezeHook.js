import { baseURLProd } from 'api/api';
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Papa from 'papaparse';
const WalletFreezeUnfreezeHook = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState([])
    const [status, setStatus] = useState('');
    const [newSearchData, setNewSearchData] = useState([])
    const [showApproveButton, setShowApproveButton] = useState(true);
    const [showRejectButton, setShowRejectButton] = useState(true);
    const [loading, setLoading] = useState(false);


    const fetchData = async () => {
        setLoading(true)
        try {
            let req = await fetch(`${baseURLProd}get_wallet_details`, {
                method: "GET",
                'Content-Type': 'application/json',

            })
            const res = await req.json();
            setData(res.data);
            setFilter(res.data)
            setLoading(false)

        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusChange = (status) => {
        setStatus(status);
        setShowApproveButton(true);
        setShowRejectButton(true);
    };

    const handleSubmit = () => {
        if (status) {
            const filtered = data.filter(item => item.status === status);
            setFilter(filtered);

            if (status === 0) {
                setShowRejectButton(false);
            } else if (status === 1) {
                setShowApproveButton(false);
            }
        } else {
            setFilter(data);
            setShowApproveButton(true);
            setShowRejectButton(true);
        }
    };

    const handleReset = () => {
        setSearch('');
        setStatus("")
        setFilter(data);
    };


    //---------------- Search with api functionallity -----------------//
    useEffect(() => {
        if (!search) {
            setFilter(data);
            setNewSearchData([]);
            return;
        }

        const filteredData = data.filter(item =>
            (item.userId?.toLowerCase() || '').includes(search.toLowerCase()) ||
            (item.name?.toLowerCase() || '').includes(search.toLowerCase())
        );

        setNewSearchData(filteredData);

        if (search.length >= 7) {
            fetchSearchResults(search);
        }
    }, [search, data]);

    const fetchSearchResults = async (userId) => {
        try {
            const response = await fetch(`${baseURLProd}SearchWalletFreezeUnfreezeUser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            const result = await response.json();

            if (result.status && Array.isArray(result.walletFreezeSearchList)) {
                const serverData = result.walletFreezeSearchList;
                setNewSearchData(serverData);
                setFilter(serverData);
            } else {
                setNewSearchData([]);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setNewSearchData([]);
        }
    };


    //----------------download CSV file-----------------//
    const downloadCSV = () => {
        const csv = Papa.unparse(filter);

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'walletFreezeUnfreeze.csv');

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    const frozenStatus = async (userId, walletStatus) => {
        console.log(walletStatus, 'oooppp', userId)
        // if(walletStatus === 1){
        try {
            if (window.confirm("Do you really want to freeze the wallet of this user?")) {
                const url = `${baseURLProd}update_wallet_status?UserId=${userId}&updateStatus=false`;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to update wallet status');
                }

                const data = await response.json();
                fetchData();
                toast.success(data.message)
            }
        }
        catch (error) {
            console.error('Error updating wallet status:', error);
        }
        // }
    };

    const UnfrozenStatus = async (userId) => {
        // if(walletStatus === 0){
        try {
            if (window.confirm("Do you really want to Unfreeze the wallet of this user?")) {
                const url = `${baseURLProd}update_wallet_status?UserId=${userId}&&updateStatus=true`;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to update wallet status');
                }

                const data = await response.json();
                fetchData();
                toast.success(data.message)
            }
        }
        catch (error) {
            console.error('Error updating wallet status:', error);
        }
        // }
    };

    return {
        filter, search, setSearch, fetchSearchResults, newSearchData,
        downloadCSV, data, handleReset, handleStatusChange, handleSubmit, status,
        showApproveButton, showRejectButton, UnfrozenStatus, frozenStatus, loading
    }
}

export default WalletFreezeUnfreezeHook

