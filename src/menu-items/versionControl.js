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

const versionControl = {
    id: 'version_control',
    title: 'Version',
    type: 'group',
    children: [
        {
            id: 'vesion_control',
            title: 'Version Update',
            type: 'item',
            url: '/version_control',
            // icon: icons.ReceiptLongOutlinedIcon
            // icon: icons.RadioButtonCheckedSharpIcon
        },
    ]
};

export default versionControl;
