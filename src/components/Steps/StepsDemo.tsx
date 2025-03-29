import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { StepIndicator } from "./StepIndicator";
import SystemField from "components/SystemFields/SystemField";
import { observer } from "mobx-react-lite";
import { categoriesStore } from "stores/Categories.store";
import { propertyStore } from "stores/Property.store";
import { set } from "mobx";
import { AddPropertyModel } from "types/Property/AddPropertyModel";
import { PropertyService } from "services/propertyService";

const StepsDemo: React.FC = observer(() => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    console.log(categoriesStore.levels)
  },[categoriesStore.levels])
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

  const handleChange = (field: string) => (value: any) => {
    if (propertyStore.propertyToAdd) {
      set(propertyStore.propertyToAdd, field, value);
    }
  };
  const handleNext = () => {
    if (currentStep < categoriesStore.levels.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };
  const handleSubmit = async () => {
    console.log(propertyStore.propertyToAdd);
    const propertyService = new PropertyService();
    await propertyService.addProperty(propertyStore.propertyToAdd)
  };

  const renderStepContent = () => {
    return categoriesStore?.levels[currentStep]?.fields.map((field, index) => (
      <SystemField 
      key={index} 
      fieldType={field.fieldType} 
      label={field.label}
      name={field.name} 
      value={propertyStore.propertyToAdd[field.name as keyof AddPropertyModel] || ''} // Ensure valid field access
      onChange={handleChange(field.name)} // Use the correct handler
      options={field.options}
    />
    ))
  };

  return (
    <Container className="py-5" style={{ direction: "rtl" }}>
      <h1 className="text-center mb-4">פרסום מודעה חדשה</h1>
      <StepIndicator
        totalSteps={categoriesStore.levels.length}
        currentStep={currentStep}
        stepTitles={categoriesStore.levels.map(step => step.levelTitle)}
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

export default StepsDemo;
