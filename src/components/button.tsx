interface Props {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: Props) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
