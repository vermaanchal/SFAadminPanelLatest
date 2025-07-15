import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import UpdateOutlinedIcon from '@mui/icons-material/UpdateOutlined';

const icons = {
    SystemUpdateAltOutlinedIcon,
    UpdateOutlinedIcon
};

const versionControl = {
    id: 'version_control',
    title: 'Version',
    type: 'group',
    icon: icons.SystemUpdateAltOutlinedIcon,
    children: [
        {
            id: 'version_update',
            title: 'Version Update',
            type: 'item',
            url: '/version_control',
            icon: icons.UpdateOutlinedIcon
        }
    ]
};

export default versionControl;
