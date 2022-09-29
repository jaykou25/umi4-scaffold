function normalizeItem(item) {
  return {
    ...item,
    icon: item.meta?.icon,
    hideInMenu: item.hidden,
    children: item.children ? item.children.map((child) => normalizeItem(child)) : [],
  };
}

export function normalizeMenu(menuData) {
  return menuData.map((row) => normalizeItem(row));
}
