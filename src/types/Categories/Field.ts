import { SelectOption } from "./SelectOption";

export interface Field {
    fieldId: number;
    fieldType: number;
    label: string;
    name: string;
    placeHolder: string;
    reqired: boolean;
    title: string;
    options?: SelectOption[]
  }