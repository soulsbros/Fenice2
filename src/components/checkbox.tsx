interface Props {
  id?: string;
  label?: string;
  onChange?: (e: any) => void;
  checked?: boolean;
}

export default function Checkbox({
  id,
  label,
  onChange,
  checked,
}: Readonly<Props>) {
  return (
    <label className="p-2">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="align-middle accent-fenice-red"
      />
      {label ? <span className="align-middle"> {label}</span> : null}
    </label>
  );
}
