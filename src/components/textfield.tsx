interface TextfieldProps {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
}

export default function Textfield({
  id,
  name,
  placeholder,
  value,
  required = false,
}: Readonly<TextfieldProps>) {
  return (
    <input
      className="p-2 m-2"
      id={id}
      name={name}
      type="text"
      defaultValue={value}
      placeholder={placeholder}
      required={required}
    />
  );
}
