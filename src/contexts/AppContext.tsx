import { PropsWithChildren, createContext, useState } from "react";
import { TreeItemType } from "../components/TreeItem";
import { getFirstIndexOfTreeId, getLastIndexInFolder, rootObj } from "../utils";

export type AppContextType = {
  treeData: TreeItemType[];
  selectedTreeItem: TreeItemType;
  setSelectedTreeItem: React.Dispatch<React.SetStateAction<TreeItemType>>;
  addFile: () => void;
  addFolder: () => void;
  collapseAll: () => void;
  deleteItem: (
    itemTreeId: TreeItemType["treeId"],
    itemTreeType: TreeItemType["type"]
  ) => void;
  renameItem: (
    itemTreeId: TreeItemType["treeId"],
    newName: TreeItemType["name"]
  ) => void;
  toggleFolderStatus: (
    itemTreeId: TreeItemType["treeId"],
    newFolderStatus: TreeItemType["folderStatus"]
  ) => void;
};

export const AppContext = createContext<AppContextType | null>(null);

const AppProvider: React.FC<PropsWithChildren> = ({ children }) => {
  //
  const [treeData, setTreeData] = useState<TreeItemType[]>([]);
  const [selectedTreeItem, setSelectedTreeItem] =
    useState<TreeItemType>(rootObj);

  const addItem = (type: TreeItemType["type"]) => {
    let data = [...treeData];
    const id = String(new Date().getTime());
    let treeId = "";
    let indexToAddItem = 0;

    if (selectedTreeItem.type === "file") {
      treeId = selectedTreeItem.treeId
        .split(".")
        .slice(0, -1)
        .concat(id)
        .join(".");

      indexToAddItem =
        type === "file"
          ? getLastIndexInFolder(data, selectedTreeItem.parentTreeId) + 1
          : getFirstIndexOfTreeId(data, selectedTreeItem.parentTreeId) + 1;

      //
    } else if (selectedTreeItem.type === "folder") {
      //

      treeId = `${selectedTreeItem.treeId}.${id}`;
      indexToAddItem =
        type === "file"
          ? getLastIndexInFolder(data, selectedTreeItem.treeId) + 1
          : getFirstIndexOfTreeId(data, selectedTreeItem.treeId) + 1;

      if (selectedTreeItem.folderStatus === "close") {
        data = data.map((item) => {
          if (item.treeId === selectedTreeItem.treeId) {
            const temp = { ...item };
            temp.folderStatus = "open";
            return temp;
          } else if (item.treeId.includes(`${selectedTreeItem.treeId}.`)) {
            const temp = { ...item };
            temp.folderStatus = "close";
            const isItemDirectChild =
              item.parentTreeId === selectedTreeItem.treeId;
            temp.visibility = isItemDirectChild ? "shown" : "hidden";
            return temp;
          } else return item;
        });
      }
    }

    data.splice(indexToAddItem, 0, {
      id,
      treeId,
      name: "",
      type,
      folderStatus: "open",
      visibility: "shown",
      parentTreeId: treeId.split(".").slice(0, -1).join("."),
    });

    setTreeData(data);
  };

  const addFile = () => addItem("file");

  const addFolder = () => addItem("folder");

  const collapseAll = () => {
    const data = treeData.map((item) => {
      const temp = { ...item };
      temp.folderStatus = "close";
      if (temp.treeId.split(".").length > 2) temp.visibility = "hidden";
      return temp;
    });

    setTreeData(data);
    if (selectedTreeItem.treeId.split(".").length > 2) {
      setSelectedTreeItem(rootObj);
    }
  };

  const deleteItem: AppContextType["deleteItem"] = (
    itemTreeId,
    itemTreeType
  ) => {
    let data: TreeItemType[] = [];
    if (itemTreeType === "file") {
      data = treeData.filter((item) => item.treeId !== itemTreeId);
    } else {
      data = treeData.filter((item) => {
        if (item.treeId === itemTreeId) return false;
        if (item.treeId.includes(`${itemTreeId}.`)) return false;
        else return true;
      });
    }

    setTreeData(data);
    if (selectedTreeItem.treeId.includes(itemTreeId)) {
      setSelectedTreeItem(rootObj);
    }
  };

  const renameItem: AppContextType["renameItem"] = (itemTreeId, newName) => {
    const data = treeData.map((item) => {
      if (item.treeId === itemTreeId) {
        const temp = { ...item };
        temp.name = newName;
        return temp;
      } else return item;
    });
    setTreeData(data);
  };

  const toggleFolderStatus: AppContextType["toggleFolderStatus"] = (
    itemTreeId,
    newFolderStatus
  ) => {
    const data = treeData.map((item) => {
      if (item.treeId === itemTreeId) {
        const temp = { ...item };
        temp.folderStatus = newFolderStatus;
        return temp;
      } else if (item.treeId.includes(`${itemTreeId}.`)) {
        const temp = { ...item };
        temp.folderStatus = "close";
        const isItemDirectChild = item.parentTreeId === itemTreeId;
        temp.visibility = isItemDirectChild
          ? newFolderStatus === "open"
            ? "shown"
            : "hidden"
          : "hidden";
        return temp;
      } else return item;
    });

    setTreeData(data);
  };

  return (
    <AppContext.Provider
      value={{
        treeData,
        selectedTreeItem,
        setSelectedTreeItem,
        addFile,
        addFolder,
        collapseAll,
        renameItem,
        deleteItem,
        toggleFolderStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
