// assets
import { StopOutlined } from '@ant-design/icons';
import AppBlockingOutlinedIcon from '@mui/icons-material/AppBlockingOutlined';
import RadioButtonCheckedSharpIcon from '@mui/icons-material/RadioButtonCheckedSharp';

// icons
const icons = {
    StopOutlined,
    AppBlockingOutlinedIcon, RadioButtonCheckedSharpIcon
};

// ==============================|| MENU ITEMS - SAMPLE PAGE & DOCUMENTATION ||============================== //

const agentrecord = {
    id: 'agent',
    title: 'Agent',
    type: 'group',
    children: [
        {
            id: 'agent-request',
            title: 'Agent Request',
            type: 'item',
            url: '/AgentRequest',
            // icon: icons.ContactPhoneOutlinedIcon
            icon: icons.RadioButtonCheckedSharpIcon
        },

        {
            id: 'callrecords',
            title: 'Agent Call Records',
            type: 'item',
            url: '/AgentCallrecords',
            // icon: icons.AppBlockingOutlinedIcon,
            icon: icons.RadioButtonCheckedSharpIcon,
        },

        {
            id: 'liveuser',
            title: ' Online Agent',
            type: 'item',
            url: '/getOnlineAgent',
            // icon: icons.AppBlockingOutlinedIcon,
            icon: icons.RadioButtonCheckedSharpIcon,
        }
    ]
};

export default agentrecord;
