// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    LoadingOutlined
} from '@ant-design/icons';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';

const icons = {
    DescriptionOutlinedIcon,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined,
    ContactPhoneOutlinedIcon,
    ReceiptLongOutlinedIcon, ForwardToInboxOutlinedIcon, CalendarMonthIcon, RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const otpLogs = {
    id: 'otp_logs',
    title: 'Otp Logs',
    type: 'group',
    children: [
        {
            id: 'whatsapp_otp',
            title: 'WhatsApp Otp Logs',
            type: 'item',
            url: '/whatsapp_otp_logs',
            // icon: icons.ReceiptLongOutlinedIcon
            // icon: icons.RadioButtonCheckedSharpIcon
        },
    ]
};

export default otpLogs;
