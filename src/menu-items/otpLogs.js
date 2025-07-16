import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

const icons = {
    KeyOutlinedIcon,
    MessageOutlinedIcon
};

const otpLogs = {
    id: 'otp_logs',
    title: 'Otp Logs',
    type: 'group',
    icon: icons.KeyOutlinedIcon,
    children: [
        {
            id: 'whatsapp_otp',
            title: 'WhatsApp Otp Logs',
            type: 'item',
            url: '/whatsapp_otp_logs',
            icon: icons.MessageOutlinedIcon
        }
    ]
};

export default otpLogs;
