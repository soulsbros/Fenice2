import { ReactElement } from "react";

interface Props {
  icon?: ReactElement;
  label?: string;
  onClick: () => void;
}

export default function Button({ label, icon, onClick }: Props) {
  return (
    <button
      className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
      onClick={onClick}
    >
      {icon} {label}
    </button>
  );
}
