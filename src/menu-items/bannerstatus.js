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

const bannerstatus = {
	id: 'Banner-Upload',
	title: 'Banner Upload',
	type: 'group',
	children: [
		{
			id: 'Banner-Upload/Image',
			title: 'Banner Upload Details',
			type: 'item',
			url: '/bannerUpload',
			// icon: icons.StopOutlined
			// icon: icons.RadioButtonCheckedSharpIcon
		},
	]
};

export default bannerstatus;
