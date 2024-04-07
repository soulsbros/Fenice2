interface TextfieldProps {
  id?: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
}

export default function Textfield({
  id,
  name,
  placeholder,
  defaultValue,
  type = "text",
  required = false,
}: Readonly<TextfieldProps>) {
  return (
    <div className="inline-block">
      {placeholder}
      {required ? "*" : null}
      <br />
      <input
        className="p-2 m-2"
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
