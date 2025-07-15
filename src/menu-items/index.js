import staticMenuItems from './staticMenuItems'; // Adjust the path as needed
import { baseURLProd } from 'api/api';
import menuMapping from './mapping'; // Import your mapping

// Function to fetch dynamic menu items
async function fetchDynamicMenuItems() {
  const assignId = localStorage.getItem('assignId');
  const userValue = localStorage.getItem('uservalue');

  if (assignId === '0') {
    return staticMenuItems;
  }

  try {
    let response = await fetch(`${baseURLProd}AssignPages`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        loginId: userValue,
        assignId: assignId
      }),
    });

    let res = await response.json();

    const dynamicItems = res.assignPagesList.map(item => {
      const mappedItem = menuMapping[item.pageName];

      if (mappedItem) {
        return mappedItem;
      }

      return {
        id: item.pageId,
        title: item.pageName,
        type: 'item',
        icon: 'DefaultIcon',
        url: `/some-path/${item.pageId}`,
        children: []
      };
    });

    return { items: dynamicItems };

  } catch (error) {
    console.error("Failed to fetch dynamic menu items:", error);
    return staticMenuItems;
  }
}

const menuItems = await fetchDynamicMenuItems();

export default menuItems;
