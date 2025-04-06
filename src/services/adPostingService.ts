import { FieldConfig } from "types/Fields/FieldConfig";

// This interface will be used to define what the server returns for each step
export interface StepConfig {
  stepNumber: number;
  title: string;
  fields: FieldConfig[];
}

export class AdPostingService {
  // This method will now return all steps at once
  async getAllSteps(categoryNumber: number): Promise<StepConfig[]> {
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return mock data based on category
    return [
      {
        stepNumber: 1,
        title: "פרטי הנכס",
        fields: [
          {
            type: "text",
            name: "title",
            label: "כותרת המודעה",
            placeholder: "הכנס כותרת למודעה",
            required: true,
          },
          {
            type: "textarea",
            name: "description",
            label: "תיאור",
            placeholder: "הכנס תיאור מפורט",
            required: true,
            rows: 4,
          },
        ],
      },
      {
        stepNumber: 2,
        title: "מיקום ומאפיינים",
        fields: [
          {
            type: "select",
            name: "city",
            label: "עיר",
            placeholder: "בחר עיר",
            required: true,
            options: [
              { value: "tel-aviv", label: "תל אביב" },
              { value: "jerusalem", label: "ירושלים" },
              { value: "haifa", label: "חיפה" },
            ],
          },
          {
            type: "number",
            name: "rooms",
            label: "מספר חדרים",
            placeholder: "הכנס מספר חדרים",
            required: true,
            min: 1,
            max: 10,
          },
        ],
      },
      {
        stepNumber: 3,
        title: "מחיר ופרטי קשר",
        fields: [
          {
            type: "price",
            name: "price",
            label: "מחיר",
            placeholder: "הכנס מחיר",
            required: true,
            currency: "₪",
          },
          {
            type: "phone",
            name: "phone",
            label: "מספר טלפון",
            placeholder: "הכנס מספר טלפון",
            required: true,
          },
        ],
      },
    ];
  }

  // This will be used to submit the form data to the server
  async submitAdData(data: Record<string, any>): Promise<boolean> {
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Submitting ad data:", data);
    return true;
  }
}
