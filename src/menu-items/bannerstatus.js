import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';

const icons = {
	ImageOutlinedIcon,
	CollectionsOutlinedIcon
};

const bannerstatus = {
	id: 'Banner-Upload',
	title: 'Banner Upload',
	type: 'group',
	icon: icons.ImageOutlinedIcon,
	children: [
		{
			id: 'Banner-Upload/Image',
			title: 'Banner Upload Details',
			type: 'item',
			url: '/bannerUpload',
			icon: icons.CollectionsOutlinedIcon
		}
	]
};

export default bannerstatus;
