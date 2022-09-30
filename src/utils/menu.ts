type PatchItemType = (item: any) => Record<string, any>;

function normalizeItem(item, patchItem?: PatchItemType) {
  const patchResult = patchItem ? patchItem(item) : {};
  return {
    ...item,
    icon: item.meta?.icon,
    hideInMenu: item.hidden,
    ...patchResult,
    children: item.children
      ? item.children.map((child) => normalizeItem(child, patchItem))
      : [],
  };
}

export function normalizeMenu(menuData, patchItem?: PatchItemType) {
  return menuData.map((row) => normalizeItem(row, patchItem));
}
