import { useContext } from "react";
import { AppContext, AppContextType } from "../contexts/AppContext";
import { getObjectPropertiesAsString } from "../utils";
import Button from "./common/Button";

const DetailPanel = () => {
  //
  const { selectedTreeItem, treeData } = useContext(
    AppContext
  ) as AppContextType;

  return (
    <div className="h-full flex flex-col justify-center items-center p-5">
      <div className="w-full">
        <h6>Selected Tree Item:</h6>
        <p style={{ wordBreak: "break-word", whiteSpace: "pre-line" }}>
          {getObjectPropertiesAsString(selectedTreeItem)}
        </p>
      </div>
      <hr className="w-full my-5" />
      <Button onClick={() => console.log(treeData)}>Log The TreeData</Button>
    </div>
  );
};

export default DetailPanel;
