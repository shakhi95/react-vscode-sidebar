import { PropsWithChildren } from "react";

interface Props {
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  title?: string;
}

const Button: React.FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  title,
}) => {
  //
  return (
    <div
      onClick={onClick}
      title={title}
      className="p-1 hover:bg-[#4b4b4b] rounded-md cursor-pointer"
    >
      {children}
    </div>
  );
};

export default Button;
