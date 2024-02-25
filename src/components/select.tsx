interface SelectProps {
  id?: string;
  name?: string;
  placeholder?: string;
  selectedItem?: string;
  options: any[];
  required: boolean;
}

export default function Select({
  id,
  name,
  placeholder,
  selectedItem,
  options,
  required = false,
}: Readonly<SelectProps>) {
  return (
    <div className="inline-block">
      {placeholder}
      <br />
      <select
        name={name}
        id={id}
        className="p-2 m-2"
        required={required}
        defaultValue={selectedItem}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
