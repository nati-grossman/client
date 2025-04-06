import {
  AutocompleteField,
  CheckboxField,
  ListGroupField,
  SelectField,
  TextareaField,
  TextField,
} from "components/Fields/FormFields";
import React from "react";
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
  onSearch?: (query: string) => Promise<SelectOption[]>;
  minChars?: number;
  debounceMs?: number;
  onItemClick?: (value: string | number) => void;
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
  onSearch,
  minChars = 3,
  debounceMs = 300,
  onItemClick,
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
            value={value as string}
            required={reqired}
            placeholder={placeHolder}
          />
        );
      case FieldType.SelectField:
        return (
          <SelectField
            label={label}
            name={name}
            onChange={onChange}
            value={value as string}
            required={reqired}
            options={options}
          />
        );
      case FieldType.TextareaField:
        return (
          <TextareaField
            label={label}
            name={name}
            onChange={onChange}
            value={value as string}
            required={reqired}
            placeholder={placeHolder}
          />
        );
      case FieldType.AutocompleteField:
        if (!onSearch) {
          console.error(
            `AutocompleteField ${name} requires an onSearch function`
          );
          return null;
        }
        return (
          <AutocompleteField
            label={label}
            name={name}
            onChange={onChange}
            value={value as string}
            required={reqired}
            placeholder={placeHolder}
            onSearch={onSearch}
            minChars={minChars}
            debounceMs={debounceMs}
          />
        );
      case FieldType.ListGroupField:
        if (!onItemClick) {
          console.error(
            `ListGroupField ${name} requires an onItemClick function`
          );
          return null;
        }
        return (
          <ListGroupField
            label={label}
            name={name}
            onChange={onChange}
            value={value as string}
            required={reqired}
            items={options}
            onItemClick={onItemClick}
          />
        );
      default:
        return null;
    }
  };

  return <div className="system-field">{renderField()}</div>;
};

export default SystemField;
