import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import OnlinePredictionOutlinedIcon from '@mui/icons-material/OnlinePredictionOutlined';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';

const icons = {
    SupportAgentOutlinedIcon,
    MarkEmailUnreadOutlinedIcon,
    CallOutlinedIcon,
    OnlinePredictionOutlinedIcon,
    ManageHistoryOutlinedIcon
};

const agentrecord = {
    id: 'agent',
    title: 'Agent',
    type: 'group',
    icon: icons.SupportAgentOutlinedIcon,
    children: [
        {
            id: 'agent-request',
            title: 'Agent Request',
            type: 'item',
            url: '/AgentRequest',
            icon: icons.MarkEmailUnreadOutlinedIcon
        },
        {
            id: 'callrecords',
            title: 'Agent Call Records',
            type: 'item',
            url: '/AgentCallrecords',
            icon: icons.CallOutlinedIcon
        },
        {
            id: 'liveuser',
            title: 'Online Agent',
            type: 'item',
            url: '/getOnlineAgent',
            icon: icons.OnlinePredictionOutlinedIcon
        },
        {
            id: 'agentlogs',
            title: 'Agent Logs',
            type: 'item',
            url: '/agentLogs',
            icon: icons.ManageHistoryOutlinedIcon
        }
    ]
};

export default agentrecord;
