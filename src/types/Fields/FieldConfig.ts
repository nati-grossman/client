interface BaseFieldConfig {
  type: string;
  name: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}

interface TextFieldConfig extends BaseFieldConfig {
  type: "text";
}

interface NumberFieldConfig extends BaseFieldConfig {
  type: "number";
  min?: number;
  max?: number;
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldConfig extends BaseFieldConfig {
  type: "select";
  options: SelectOption[];
}

interface CheckboxFieldConfig extends BaseFieldConfig {
  type: "checkbox";
  options?: SelectOption[];
}

interface TextareaFieldConfig extends BaseFieldConfig {
  type: "textarea";
  rows?: number;
}

interface PriceFieldConfig extends BaseFieldConfig {
  type: "price";
  currency?: string;
}

interface PhoneFieldConfig extends BaseFieldConfig {
  type: "phone";
}

interface AutocompleteFieldConfig extends BaseFieldConfig {
  type: "autocomplete";
  minChars?: number;
  debounceMs?: number;
  searchEndpoint: string;
}

interface ListGroupFieldConfig extends BaseFieldConfig {
  type: "listgroup";
  items: SelectOption[];
  onItemClick: (value: string | number) => void;
}

export type FieldConfig =
  | TextFieldConfig
  | NumberFieldConfig
  | SelectFieldConfig
  | CheckboxFieldConfig
  | TextareaFieldConfig
  | PriceFieldConfig
  | PhoneFieldConfig
  | AutocompleteFieldConfig
  | ListGroupFieldConfig;
