import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import StepIndicator from "./StepIndicator";
import SystemField from "components/Fields/SystemFields/SystemField";
import { observer } from "mobx-react-lite";
import { categoriesStore } from "stores/Categories.store";
import { propertyStore } from "stores/Property.store";
import { set } from "mobx";
import { AddPropertyModel } from "types/Property/AddPropertyModel";
import { PropertyService } from "services/propertyService";
import { useNavigate } from "react-router-dom";
import "./AdPostingForm.css";
import { SelectOption } from "types/Categories/SelectOption";
import { Field } from "types/Categories/Field";

interface FieldValidation {
  [key: string]: {
    touched: boolean;
    error?: string;
  };
}

const AdPostingForm: React.FC = observer(() => {
  const [currentStep, setCurrentStep] = useState(0);
  const [fieldValidation, setFieldValidation] = useState<FieldValidation>({});
  const navigate = useNavigate();

  useEffect(() => {
    // Check if categories are loaded
    if (!categoriesStore.levels || categoriesStore.levels.length === 0) {
      categoriesStore.fetchCategories();
      return;
    }

    // Initialize validation state for current step fields
    const currentFields = JSON.parse(
      JSON.stringify(categoriesStore.levels[currentStep]?.fields || [])
    ) as Field[];
    const newValidation: FieldValidation = {};
    currentFields.forEach((field: Field) => {
      if (!fieldValidation[field.name]) {
        newValidation[field.name] = {
          touched: false,
          error: undefined,
        };
      }
    });
    setFieldValidation((prev) => ({ ...prev, ...newValidation }));
  }, [currentStep, categoriesStore.levels]);

  // Add loading state
  if (!categoriesStore.levels || categoriesStore.levels.length === 0) {
    return <div>Loading categories...</div>;
  }

  const validateField = (fieldName: string, value: any): string | undefined => {
    const currentFields = JSON.parse(
      JSON.stringify(categoriesStore.levels[currentStep]?.fields || [])
    ) as Field[];
    const field = currentFields.find((f: Field) => f.name === fieldName);

    if (!field) {
      return undefined;
    }

    if (field.required) {
      if (!value || (typeof value === "string" && value.trim() === "")) {
        return "שדה חובה";
      }
    }
    return undefined;
  };

  const handleChange = (fieldName: string) => (value: any) => {
    if (propertyStore.propertyToAdd) {
      set(propertyStore.propertyToAdd, fieldName, value);
      setFieldValidation((prev) => ({
        ...prev,
        [fieldName]: {
          touched: true,
          error: validateField(fieldName, value),
        },
      }));
    }
  };

  const validateStep = (): boolean => {
    const currentFields = JSON.parse(
      JSON.stringify(categoriesStore.levels[currentStep]?.fields || [])
    ) as Field[];
    let isValid = true;
    const newValidation = { ...fieldValidation };

    currentFields.forEach((field: Field) => {
      if (field.required) {
        const value =
          propertyStore.propertyToAdd[field.name as keyof AddPropertyModel];
        const error = validateField(field.name, value);
        if (error) {
          isValid = false;
          newValidation[field.name] = {
            touched: true,
            error,
          };
        }
      }
    });

    setFieldValidation(newValidation);
    return isValid;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < categoriesStore.levels.length) {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/select-category");
    }
  };

  const handleSearch = async (query: string): Promise<SelectOption[]> => {
    if (!query) return [];
    await new Promise((resolve) => setTimeout(resolve, 300));
    const propertyService = new PropertyService();
    const response = await propertyService.getAddressDetails(query);
    return (
      response?.map((item) => ({
        label: item.addressDetail,
        value: item.addressVal,
      })) ?? []
    );
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      console.log(propertyStore.propertyToAdd);
      const propertyService = new PropertyService();
      await propertyService.addProperty(propertyStore.propertyToAdd);
    }
  };

  const renderStepContent = () => {
    return categoriesStore?.levels[currentStep]?.fields.map((field, index) => (
      <SystemField
        key={index}
        fieldType={field.fieldType}
        label={field.label}
        name={field.name}
        value={
          propertyStore.propertyToAdd[field.name as keyof AddPropertyModel] ||
          ""
        }
        onSearch={handleSearch}
        onChange={handleChange(field.name)}
        options={field.options}
        placeHolder={field.placeHolder}
        required={field.required}
        error={fieldValidation[field.name]?.error}
        touched={fieldValidation[field.name]?.touched}
      />
    ));
  };

  return (
    <Container className="py-5" style={{ direction: "rtl" }}>
      <h1 className="text-center mb-4">פרסום מודעה חדשה</h1>
      <StepIndicator
        totalSteps={categoriesStore.levels.length}
        currentStep={currentStep}
        stepTitles={categoriesStore.levels.map((step) => step.levelTitle)}
      />
      <Card className="mt-4 steps-form-container">
        <Card.Body>
          <form>
            {renderStepContent()}
            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="outline-secondary"
                onClick={handleBack}
                disabled={false}
              >
                {currentStep === 0 ? "חזור לבחירת קטגוריה" : "חזור"}
              </Button>
              {currentStep === categoriesStore.levels.length - 1 ? (
                <Button variant="success" onClick={handleSubmit}>
                  שלח
                </Button>
              ) : (
                <Button variant="primary" onClick={handleNext}>
                  הבא
                </Button>
              )}
            </div>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
});

export default AdPostingForm;
