import React, { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import StepIndicator from "../PostingProperty/Steps/StepIndicator";
import SystemField from "components/SystemFields/SystemField";
import { observer } from "mobx-react-lite";
import { categoriesStore } from "stores/Categories.store";
import { propertyStore } from "stores/Property.store";
import { set } from "mobx";
import { AddPropertyModel } from "types/Property/AddPropertyModel";
import { PropertyService } from "services/propertyService";
import { useNavigate } from "react-router-dom";
import "./StepsDemo.css";

const AdPostingForm: React.FC = observer(() => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Log the levels when they change
    console.log("Category levels updated:", categoriesStore.levels);
  }, []);

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
    } else {
      // Navigate back to category selection page when on the first step
      navigate("/select-category");
    }
  };

  const handleSubmit = async () => {
    console.log(propertyStore.propertyToAdd);
    const propertyService = new PropertyService();
    await propertyService.addProperty(propertyStore.propertyToAdd);
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
        onChange={handleChange(field.name)}
        options={field.options}
        placeHolder={field.placeHolder}
        reqired={field.reqired}
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
