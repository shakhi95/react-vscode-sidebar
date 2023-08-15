import { useContext } from "react";
import Button from "./common/Button";
import { VscNewFile, VscNewFolder, VscCollapseAll } from "./icons";
import { AppContext, AppContextType } from "../contexts/AppContext";

const SideBarOptions = () => {
  const { addFile, addFolder, collapseAll } = useContext(
    AppContext
  ) as AppContextType;

  return (
    <div
      className="flex justify-between items-center p-2"
      onClick={(e) => e.stopPropagation()}
    >
      <span className="font-thin text-xs uppercase">Explorer:</span>
      <div className="flex gap-2">
        <Button title="New File" onClick={() => addFile()}>
          <VscNewFile />
        </Button>
        <Button title="New Folder" onClick={() => addFolder()}>
          <VscNewFolder />
        </Button>
        <Button title="Collapse All" onClick={() => collapseAll()}>
          <VscCollapseAll />
        </Button>
      </div>
    </div>
  );
};

export default SideBarOptions;
