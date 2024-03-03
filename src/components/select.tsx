"use client";

import { useRouter } from "next/navigation";

interface KV {
  name: string;
  value: string;
}

interface SelectProps {
  id?: string;
  name?: string;
  placeholder?: string;
  selectedItem?: string;
  options: KV[];
  redirectPath?: string;
  required?: boolean;
}

export default function Select({
  id,
  name,
  placeholder,
  selectedItem,
  options,
  redirectPath,
  required = false,
}: Readonly<SelectProps>) {
  const router = useRouter();
  return (
    <div className="inline-block">
      {placeholder}
      {required ? "*" : null}
      <br />
      <select
        name={name}
        id={id}
        className="p-2 m-2"
        required={required}
        defaultValue={selectedItem}
        onChange={
          redirectPath
            ? (e) => router.push(`${redirectPath}/${e.target.value}`)
            : undefined
        }
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
