import React from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// Custom styles
const fieldStyles = {
  border: "1px solid rgb(96, 197, 140)",
  borderRadius: "4px",
};

// Custom styles for checkbox and radio
const customControlStyles = {
  borderColor: "rgb(96, 197, 140)",
};

interface BaseFieldProps {
  label: string;
  name: string;
  value: any;
  onChange: (value: any) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

// Text Input Field
export const TextField: React.FC<BaseFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Control
        type="text"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ? t(placeholder) : ""}
        isInvalid={!!error}
        disabled={disabled}
        style={!error ? fieldStyles : undefined}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

// Number Input Field
export const NumberField: React.FC<
  BaseFieldProps & { min?: number; max?: number }
> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
  min,
  max,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Control
        type="number"
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ? t(placeholder) : ""}
        isInvalid={!!error}
        disabled={disabled}
        min={min}
        max={max}
        style={!error ? fieldStyles : undefined}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

// Select Field
interface SelectOption {
  value: string | number;
  label: string;
}

export const SelectField: React.FC<
  BaseFieldProps & { options: SelectOption[] }
> = ({ label, name, value, onChange, error, required, disabled, options }) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Select
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        isInvalid={!!error}
        disabled={disabled}
        style={!error ? fieldStyles : undefined}
      >
        <option value="">{t("select.placeholder")}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {t(option.label)}
          </option>
        ))}
      </Form.Select>
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

// Checkbox Field
export const CheckboxField: React.FC<Omit<BaseFieldProps, "placeholder">> = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Check
        type="checkbox"
        id={name}
        label={
          <>
            {t(label)}
            {required && <span className="text-danger">*</span>}
          </>
        }
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        isInvalid={!!error}
        disabled={disabled}
        style={customControlStyles}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

// Radio Group Field
export const RadioGroupField: React.FC<
  BaseFieldProps & { options: SelectOption[] }
> = ({ label, name, value, onChange, error, required, disabled, options }) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      {options.map((option) => (
        <Form.Check
          key={option.value}
          type="radio"
          id={`${name}-${option.value}`}
          name={name}
          label={t(option.label)}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
          isInvalid={!!error}
          disabled={disabled}
          style={customControlStyles}
        />
      ))}
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

// Textarea Field
export const TextareaField: React.FC<BaseFieldProps & { rows?: number }> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
  rows = 3,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Control
        as="textarea"
        rows={rows}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ? t(placeholder) : ""}
        isInvalid={!!error}
        disabled={disabled}
        style={!error ? fieldStyles : undefined}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{t(error)}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

// Price Field with Currency
export const PriceField: React.FC<BaseFieldProps & { currency?: string }> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
  currency = "₪",
}) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <InputGroup>
        <Form.Control
          type="number"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ? t(placeholder) : ""}
          isInvalid={!!error}
          disabled={disabled}
          style={!error ? fieldStyles : undefined}
        />
        <InputGroup.Text style={fieldStyles}>{currency}</InputGroup.Text>
        {error && (
          <Form.Control.Feedback type="invalid">
            {t(error)}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
};

// Phone Number Field
export const PhoneField: React.FC<BaseFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required,
  disabled,
}) => {
  const { t } = useTranslation();

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {t(label)}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
      <InputGroup>
        <InputGroup.Text style={fieldStyles}>+972</InputGroup.Text>
        <Form.Control
          type="tel"
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder ? t(placeholder) : ""}
          isInvalid={!!error}
          disabled={disabled}
          style={!error ? fieldStyles : undefined}
        />
        {error && (
          <Form.Control.Feedback type="invalid">
            {t(error)}
          </Form.Control.Feedback>
        )}
      </InputGroup>
    </Form.Group>
  );
};
