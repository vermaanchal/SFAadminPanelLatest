import { useState } from "react"
import { useEffect } from "react"
import axios from "../../../../node_modules/axios/index";
import { baseURLProd } from "api/api";
import { toast, ToastContainer } from 'react-toastify';

const WhatsappLogsHooks = () => {
    const [whatsappLog, setWhatsappLog] = useState([]);

    useEffect(() => {
        const fetchWhatsappLogs = async () => {
            try {
                const res = await axios.get(`${baseURLProd}GetWhatsAppOTPLogs`);
                if (res && res.data) {
                    setWhatsappLog(res?.data ?? [])
                }

            } catch (error) {
                throw new Error("Error while getting Whatsapp Log !")
            }

        }
        fetchWhatsappLogs();
    }, [])

    return {
        whatsappLog,
        setWhatsappLog
    }
}

export default WhatsappLogsHooks
