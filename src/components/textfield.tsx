interface TextfieldProps {
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string;
  type?: string;
  required?: boolean;
}

export default function Textfield({
  id,
  name,
  placeholder,
  value,
  type = "text",
  required = false,
}: Readonly<TextfieldProps>) {
  return (
    <div className="inline-block">
      {placeholder}
      <br />
      <input
        className="p-2 m-2"
        id={id}
        name={name}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
