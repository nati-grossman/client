import { CheckboxField, SelectField, TextareaField, TextField } from "components/Fields/FormFields";
import React, { useState } from "react";
import { SelectOption } from "types/Categories/SelectOption";
import { FieldType } from "types/Fields/FieldType";

interface SystemFieldProps {
    fieldType: FieldType,
    label: string,
    name: string,
    value: string | boolean,
    onChange: (value: any) => void,
    placeholder?: string,
    required?: boolean,
    options?: SelectOption[]
}

const SystemField: React.FC<SystemFieldProps> = ({ fieldType, label, name, onChange, placeholder, value, required, options }) => {
    const renderField = () => {
        switch (fieldType) {
            case FieldType.CheckboxField:
                return (
                    <CheckboxField label={label} name={name} onChange={onChange} value={value} />
                );
            case FieldType.TextField:
                return (
                    <TextField label={label} name={name} onChange={onChange} value={value} placeholder={placeholder} />
                );
            case FieldType.SelectField:
                return (
                    <SelectField label={label} name={name} onChange={onChange} value={value} options={options!} />
                );
            case FieldType.TextareaField:
                return (
                    <TextareaField label={label} name={name} onChange={onChange} value={value} placeholder={placeholder}/>
                );
            default:
                return null;
        }
    };
    return (<>
    {renderField()}
    </>)

}
export default SystemField;