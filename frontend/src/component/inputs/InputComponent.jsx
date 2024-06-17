import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import React from "react";

function InputComponent({ type, label, value, onChange, name, placeholder }) {
  return (
    <>
      <Label>{label}</Label>
      <Input
        type={type}
        className={"mt-3 mb-3"}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
      />
    </>
  );
}

export default InputComponent;
