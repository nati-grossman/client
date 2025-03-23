import React, { useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { StepIndicator } from "./StepIndicator";
import {
  TextField,
  SelectField,
  CheckboxField,
  TextareaField,
} from "../Fields/FormFields";

const StepsDemo: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    location: "",
    isRenovated: false,
    hasParking: false,
    hasStorage: false,
    description: "",
    amenities: "",
  });

  const stepTitles = ["פרטים בסיסיים", "מאפייני הנכס", "פרטים נוספים"];

  const handleChange = (field: string) => (value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const categoryOptions = [
    { value: "apartment", label: "דירה" },
    { value: "house", label: "בית פרטי" },
    { value: "studio", label: "סטודיו" },
  ];

  const locationOptions = [
    { value: "tel-aviv", label: "תל אביב" },
    { value: "jerusalem", label: "ירושלים" },
    { value: "haifa", label: "חיפה" },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <TextField
              label="כותרת הנכס"
              name="title"
              value={formData.title}
              onChange={handleChange("title")}
              placeholder="הכנס כותרת לנכס"
              required
            />
            <SelectField
              label="סוג הנכס"
              name="category"
              value={formData.category}
              onChange={handleChange("category")}
              options={categoryOptions}
              required
            />
          </>
        );
      case 1:
        return (
          <>
            <SelectField
              label="מיקום"
              name="location"
              value={formData.location}
              onChange={handleChange("location")}
              options={locationOptions}
              required
            />
            <CheckboxField
              label="משופץ"
              name="isRenovated"
              value={formData.isRenovated}
              onChange={handleChange("isRenovated")}
            />
            <CheckboxField
              label="חניה"
              name="hasParking"
              value={formData.hasParking}
              onChange={handleChange("hasParking")}
            />
            <CheckboxField
              label="מחסן"
              name="hasStorage"
              value={formData.hasStorage}
              onChange={handleChange("hasStorage")}
            />
          </>
        );
      case 2:
        return (
          <>
            <TextareaField
              label="תיאור הנכס"
              name="description"
              value={formData.description}
              onChange={handleChange("description")}
              placeholder="הכנס תיאור מפורט של הנכס"
              required
            />
            <TextareaField
              label="תוספות ומתקנים"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange("amenities")}
              placeholder="פרט תוספות ומתקנים נוספים"
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container className="py-5" style={{ direction: "rtl" }}>
      <h1 className="text-center mb-4">פרסום מודעה חדשה</h1>
      <StepIndicator
        totalSteps={3}
        currentStep={currentStep}
        stepTitles={stepTitles}
      />
      <Card className="mt-4">
        <Card.Body>
          <form>
            {renderStepContent()}
            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="outline-secondary"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                חזור
              </Button>
              {currentStep === 2 ? (
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
};

export default StepsDemo;
