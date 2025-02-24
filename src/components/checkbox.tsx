interface Props {
  id?: string;
  label?: string;
  onChange?: (e: any) => void;
  checked?: boolean;
  // funny name for bigger checkboxes eheheheheh
  beeg?: boolean;
}

export default function Checkbox({
  id,
  label,
  onChange,
  checked,
  beeg,
}: Readonly<Props>) {
  return (
    <label className="p-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className={`align-middle accent-fenice-red ${beeg ? "h-5 w-5" : ""}`}
      />
      {label ? <span className="align-middle"> {label}</span> : null}
    </label>
  );
}
