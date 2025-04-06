import {
  CheckboxField,
  SelectField,
  TextareaField,
  TextField,
} from "components/Fields/FormFields";
import React from "react";
import { Form, FormControl, FormCheck, FormSelect } from "react-bootstrap";
import "./SystemField.css";
import { SelectOption } from "types/Categories/SelectOption";
import { FieldType } from "types/Fields/FieldType";

interface SystemFieldProps {
  fieldType: FieldType;
  label: string;
  name: string;
  value: string | boolean;
  onChange: (value: any) => void;
  placeHolder?: string;
  reqired?: boolean;
  options?: SelectOption[];
}

const SystemField: React.FC<SystemFieldProps> = ({
  fieldType,
  label,
  name,
  value,
  onChange,
  placeHolder,
  reqired,
  options = [],
}) => {
  const renderField = () => {
    switch (fieldType) {
      case FieldType.CheckboxField:
        return (
          <CheckboxField
            label={label}
            name={name}
            onChange={onChange}
            value={value}
            required={reqired}
          />
        );
      case FieldType.TextField:
        return (
          <TextField
            label={label}
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeHolder}
            required={reqired}
          />
        );
      case FieldType.SelectField:
        return (
          <SelectField
            label={label}
            name={name}
            onChange={onChange}
            value={value}
            options={options}
            required={reqired}
          />
        );
      case FieldType.TextareaField:
        return (
          <TextareaField
            label={label}
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeHolder}
            required={reqired}
          />
        );
      default:
        return null;
    }
  };

  return <>{renderField()}</>;
};

export default SystemField;
