interface TextfieldProps {
  id?: string;
  placeholder?: string;
}

export default function Textfield({
  id,
  placeholder,
}: Readonly<TextfieldProps>) {
  return (
    <input className="p-2 m-2" id={id} type="text" placeholder={placeholder} />
  );
}
