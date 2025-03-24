import React, { useState, useEffect } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { StepIndicator } from "../Steps/StepIndicator";
import { AdPostingService } from "services/adPostingService";
import { FieldConfig } from "types/Fields/FieldConfig";
import {
  TextField,
  NumberField,
  SelectField,
  CheckboxField,
  TextareaField,
  PriceField,
  PhoneField,
} from "../Fields/FormFields";

interface StepConfig {
  stepNumber: number;
  title: string;
  fields: FieldConfig[];
}

const PostAdForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [allSteps, setAllSteps] = useState<StepConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const stepTitles = ["פרטי הנכס", "מיקום ומאפיינים", "מחיר ופרטי קשר"];
  const adPostingService = new AdPostingService();

  useEffect(() => {
    loadAllSteps();
  }, []);

  const loadAllSteps = async () => {
    setIsLoading(true);
    try {
      const steps = await adPostingService.getAllSteps();
      setAllSteps(steps);
    } catch (error) {
      console.error("Error loading steps:", error);
    }
    setIsLoading(false);
  };

  const handleChange = (field: string) => (value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const success = await adPostingService.submitAdData(formData);
      if (success) {
        // Handle successful submission (e.g., show success message, redirect)
        console.log("Form submitted successfully");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const renderField = (field: FieldConfig) => {
    const commonProps = {
      key: field.name,
      label: field.label,
      name: field.name,
      value: formData[field.name] || "",
      onChange: handleChange(field.name),
      placeholder: field.placeholder,
      required: field.required,
    };

    switch (field.type) {
      case "text":
        return <TextField {...commonProps} />;

      case "number":
        return <NumberField {...commonProps} min={field.min} max={field.max} />;

      case "select":
        return <SelectField {...commonProps} options={field.options} />;

      case "checkbox":
        return (
          <CheckboxField
            {...commonProps}
            value={formData[field.name] || false}
          />
        );

      case "textarea":
        return <TextareaField {...commonProps} rows={field.rows} />;

      case "price":
        return <PriceField {...commonProps} currency={field.currency} />;

      case "phone":
        return <PhoneField {...commonProps} />;

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5" style={{ direction: "rtl" }}>
        <div className="text-center">טוען...</div>
      </Container>
    );
  }

  const currentStepData = allSteps.find(
    (step) => step.stepNumber === currentStep
  );

  return (
    <Container className="py-5" style={{ direction: "rtl" }}>
      <h1 className="text-center mb-4">פרסום מודעה חדשה</h1>
      <StepIndicator
        totalSteps={3}
        currentStep={currentStep - 1}
        stepTitles={stepTitles}
      />
      <Card className="mt-4">
        <Card.Body>
          <h2 className="mb-4">{currentStepData?.title}</h2>
          <form>
            {currentStepData?.fields.map((field) => renderField(field))}
            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="outline-secondary"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                חזור
              </Button>
              {currentStep === 3 ? (
                <Button variant="success" onClick={handleSubmit}>
                  פרסם מודעה
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
};

export default PostAdForm;
