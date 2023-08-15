import { useContext } from "react";
import DetailPanel from "./DetailPanel";
import SideBar from "./SideBar";
import { AppContext, AppContextType } from "../contexts/AppContext";
import { rootObj } from "../utils";

const App = () => {
  const { setSelectedTreeItem } = useContext(AppContext) as AppContextType;

  return (
    <div className="flex w-[100vw] h-[100vh] overflow-hidden text-white select-none">
      <div
        className="h-full w-2/4 bg-[#181818] flex flex-col"
        onClick={() => setSelectedTreeItem(rootObj)}
      >
        <SideBar />
      </div>
      <div className="h-full w-2/4 bg-[#1f1f1f] border border-[#292929]">
        <DetailPanel />
      </div>
    </div>
  );
};

export default App;
