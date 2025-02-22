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
    <label>
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
