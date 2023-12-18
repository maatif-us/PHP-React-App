import { FC, ChangeEvent } from "react";

interface TextInputProps {
  name: string;
  placeholder: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export const TextInput: FC<TextInputProps> = ({
  name,
  placeholder,
  value,
  onChange,
  type,
}) => {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      max={type === "number" ? 999999 : undefined}
      className="py-1 px-3 border-2 border-gray-200 rounded-xl transition ease-in-out focus:border-cyan-500 focus:outline-none"
    />
  );
};
