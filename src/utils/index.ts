import { TreeItemType } from "../components/TreeItem";

export const getLastIndexInFolder = (
  array: TreeItemType[],
  folderTreeId: string
): number => {
  let folderIndex = 0;

  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i].treeId === folderTreeId) folderIndex = i;
    if (array[i].parentTreeId === folderTreeId) return i;
  }
  return folderIndex; // Return folderIndex if the folder has no child
};

export const getFirstIndexOfTreeId = (
  array: TreeItemType[],
  treeId: string
) => {
  const inx = array.findIndex((item) => item.treeId === treeId);
  return inx;
};

export const getObjectPropertiesAsString = (obj: any) => {
  let result = "";
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result += key + ": " + obj[key] + "\n";
    }
  }
  return result;
};

export const rootObj: TreeItemType = {
  treeId: "root",
  name: "root",
  type: "folder",
  folderStatus: "open",
  visibility: "shown",
  parentTreeId: "",
};
