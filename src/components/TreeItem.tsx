//
import { useState, useContext } from "react";
import Button from "./common/Button";
import {
  VscRemove,
  VscFile,
  VscFolder,
  VscFolderOpened,
  VscChevronDown,
  VscChevronRight,
  VscPreserveCase,
} from "./icons";
import { AppContext, AppContextType } from "../contexts/AppContext";

export type TreeItemType = {
  type: "file" | "folder";
  id: string;
  treeId: string;
  parentTreeId: string;
  name: string;
  folderStatus: "open" | "close";
  visibility: "shown" | "hidden";
};

const TreeItem: React.FC<TreeItemType> = (props) => {
  //
  const { type, name, id, treeId, folderStatus } = props;

  const [isTyping, setIsTyping] = useState(name === "");
  const [inputValue, setInputValue] = useState(name);

  const {
    selectedTreeItem,
    setSelectedTreeItem,
    deleteItem,
    renameItem,
    toggleFolderStatus,
  } = useContext(AppContext) as AppContextType;

  const isSelected = selectedTreeItem.id === id;

  const checkAfterInputBlur = () => {
    if (name === "" && inputValue === "") deleteItem(treeId, type);
    else if (name === inputValue) return;
    else if (name !== "" && inputValue === "") return;
    else renameItem(treeId, inputValue);
  };

  return (
    <div
      className={`text-xs flex items-center py-1 hover:bg-[#323232] border ${
        isSelected && !isTyping ? "border-[#095590]" : " border-transparent"
      }`}
      onClick={() => {
        if (!isTyping) {
          setSelectedTreeItem({
            ...props,
            folderStatus: folderStatus === "close" ? "open" : "close",
          });
          toggleFolderStatus(
            treeId,
            folderStatus === "close" ? "open" : "close"
          );
        }
      }}
      style={{ paddingLeft: treeId.split(".").length * 16 }}
    >
      {isTyping ? (
        <>
          <div className="flex flex-1 gap-2 items-center w-full">
            <span className={type === "file" ? "opacity-0" : ""}>
              {chevronSelector[folderStatus]}
            </span>
            {iconSelector[type === "file" ? "file" : folderStatus]}
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="outline-none border border-[#095590] bg-transparent flex-1 "
              type="text"
              autoFocus
              onBlur={() => {
                setIsTyping(false);
                checkAfterInputBlur();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setIsTyping(false);
                  checkAfterInputBlur();
                }
              }}
            />
          </div>
          <div className="flex gap-1 items-center opacity-0">
            <Button title="Cancel">
              <VscPreserveCase />
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-1 gap-2 items-center cursor-pointer">
            <span className={type === "file" ? "opacity-0" : ""}>
              {chevronSelector[folderStatus]}
            </span>
            {iconSelector[type === "file" ? "file" : folderStatus]}
            <span>{name}</span>
          </div>
          <div className="flex gap-1 items-center opacity-30 hover:opacity-100">
            <Button
              title="Remove"
              onClick={(e) => {
                e.stopPropagation();
                deleteItem(treeId, type);
              }}
            >
              <VscRemove />
            </Button>
            <Button
              title="Rename"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedTreeItem(props);
                setIsTyping(true);
              }}
            >
              <VscPreserveCase />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

const iconSelector = {
  file: <VscFile />,
  open: <VscFolderOpened />,
  close: <VscFolder />,
};

const chevronSelector = {
  open: <VscChevronDown />,
  close: <VscChevronRight />,
};

export default TreeItem;
