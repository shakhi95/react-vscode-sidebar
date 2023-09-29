import { useContext } from "react";
import TreeItem from "./TreeItem";
import { AppContext, AppContextType } from "../contexts/AppContext";

const SideBarTree = () => {
  //
  const { treeData } = useContext(AppContext) as AppContextType;

  return (
    <div className="overflow-auto" onClick={(e) => e.stopPropagation()}>
      {treeData
        .filter(({ visibility }) => visibility === "shown")
        .map((item) => (
          <TreeItem key={item.treeId} {...item} />
        ))}
    </div>
  );
};

export default SideBarTree;
