interface Props {
  id?: string;
  label?: string;
  onChange?: (e: any) => void;
  checked?: boolean;
  // funny name for bigger checkboxes eheheheheh
  beeg?: boolean;
  className?: string;
}

export default function Checkbox({
  id,
  label,
  onChange,
  checked,
  beeg,
  className,
}: Readonly<Props>) {
  return (
    <label className="p-2 flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={`${className} accent-fenice-red ${beeg ? "h-5 w-5" : ""}`}
      />
      {label ? <span className="ml-1">{label}</span> : null}
    </label>
  );
}
