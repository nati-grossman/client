import React from "react";
import "./StepIndicator.css";

interface StepIndicatorProps {
  totalSteps: number;
  currentStep: number;
  stepTitles?: string[];
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  totalSteps,
  currentStep,
  stepTitles = [],
}) => {
  return (
    <div className="step-indicator-container" style={{ direction: "rtl" }}>
      <div className="step-indicator">
        {Array.from({ length: totalSteps }, (_, index) => (
          <div key={index} className="step-item">
            {index < totalSteps - 1 && (
              <div className="step-connector">
                <div
                  className={`connector-line ${
                    index <= currentStep - 1 ? "active" : ""
                  }`}
                />
              </div>
            )}
            <div
              className={`step-circle ${index <= currentStep ? "active" : ""}`}
            >
              {index + 1}
            </div>
            {stepTitles[index] && (
              <div className="step-title">{stepTitles[index]}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
