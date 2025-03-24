import { FieldConfig } from "types/Fields/FieldConfig";

// This interface will be used to define what the server returns for each step
interface StepConfig {
  stepNumber: number;
  title: string;
  fields: FieldConfig[];
}

export class AdPostingService {
  // This method will now return all steps at once
  async getAllSteps(): Promise<StepConfig[]> {
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return [
      {
        stepNumber: 1,
        title: "פרטי הנכס",
        fields: [
          {
            type: "text",
            name: "title",
            label: "כותרת המודעה",
            placeholder: "תאר את הנכס בקצרה",
            required: true,
          },
          {
            type: "select",
            name: "propertyType",
            label: "סוג הנכס",
            required: true,
            options: [
              { value: "apartment", label: "דירה" },
              { value: "house", label: "בית פרטי" },
              { value: "studio", label: "סטודיו" },
              { value: "penthouse", label: "פנטהאוז" },
              { value: "garden-apartment", label: "דירת גן" },
            ],
          },
          {
            type: "number",
            name: "rooms",
            label: "מספר חדרים",
            placeholder: "הכנס מספר חדרים",
            required: true,
            min: 1,
            max: 20,
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
            required: true,
            options: [
              { value: "tel-aviv", label: "תל אביב" },
              { value: "jerusalem", label: "ירושלים" },
              { value: "haifa", label: "חיפה" },
              { value: "beer-sheva", label: "באר שבע" },
            ],
          },
          {
            type: "text",
            name: "street",
            label: "רחוב",
            placeholder: "הכנס את שם הרחוב",
            required: true,
          },
          {
            type: "number",
            name: "houseNumber",
            label: "מספר בית",
            required: true,
          },
          {
            type: "checkbox",
            name: "features",
            label: "מאפייני הנכס",
            options: [
              { value: "elevator", label: "מעלית" },
              { value: "parking", label: "חניה" },
              { value: "storage", label: "מחסן" },
              { value: "airConditioner", label: "מיזוג" },
              { value: "balcony", label: "מרפסת" },
            ],
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
            type: "checkbox",
            name: "priceOptions",
            label: "אפשרויות מחיר",
            options: [
              { value: "negotiable", label: "מחיר גמיש" },
              { value: "includesVAT", label: 'כולל מע"מ' },
            ],
          },
          {
            type: "phone",
            name: "phone",
            label: "טלפון ליצירת קשר",
            required: true,
          },
          {
            type: "textarea",
            name: "description",
            label: "תיאור הנכס",
            placeholder: "תאר את הנכס בפירוט",
            required: true,
            rows: 4,
          },
        ],
      },
    ];
  }

  // This will be used to submit the form data to the server
  async submitAdData(formData: any): Promise<boolean> {
    // Simulating API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Submitting form data:", formData);
    return true;
  }
}
