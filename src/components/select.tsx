"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent } from "react";

interface KV {
  name: string;
  value: string;
}

interface Props {
  id?: string;
  name?: string;
  placeholder?: string;
  selectedItem?: string;
  options: KV[];
  redirectPath?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

export default function Select({
  id,
  name,
  placeholder,
  selectedItem,
  options,
  redirectPath,
  onChange,
  required = false,
}: Readonly<Props>) {
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
            : onChange
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
