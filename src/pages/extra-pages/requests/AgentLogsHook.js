import { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURLProd } from 'api/api';

const AgentLogsHook = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAgentLogs = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${baseURLProd}GetAgentLogsDuration`);
            if (res?.status) {
                setData(res.data?.agentLogs || []);
            }
        } catch (error) {
            console.error('Error fetching agent logs:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgentLogs();
    }, []);

    return { data, loading };
};

export default AgentLogsHook;
