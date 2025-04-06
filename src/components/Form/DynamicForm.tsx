import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { FormConfig } from '../../formValidation/formConfigTypes';  
//import { validateEmail } from '../validate/exports'


interface DynamicFormProps {
  config: FormConfig;  
}



const DynamicForm: React.FC<DynamicFormProps> = ({ config }) => {
  const { i18n } = useTranslation();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleReset = () => {
    setFormData({}); 
    config.onReset?.();
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    debugger

    /*
    כאן צריך לקרוא לפונקציות כמו : 
    validateEmail
    validatePassword
    validatePhoneNumber
    */
    config.fields.forEach((field) => {
      const value = formData[field.name];
      field.validations.forEach((validation) => {
        if (validation.type === 'required' && !value) {
          newErrors[field.name] = validation.message;
        } else if (validation.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
          newErrors[field.name] = validation.message;
        } else if (validation.type === 'minLength' && value && value.length < (validation.value as number)) {
          newErrors[field.name] = validation.message;
        } else if (validation.type === 'password' && value && value.length < 8) { // לדוגמה אורך מינימלי של 8 תווים
          newErrors[field.name] = validation.message;
        }
      });
    });


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      config.onSubmit(formData);  
    }
  };


  return (
    <form onSubmit={handleSubmit} className="container mt-4 p-4 border rounded shadow bg-light">
      {config.fields.map((field) => (
      <div className={`mb-3 ${i18n.language === "he" ? "text-end" : "text-start"}`} key={field.name}>
        <label className="form-label">{field.label}</label>
        {field.type === 'text' || field.type === 'email' ? (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className="form-control"
          />
        ) : field.type === 'password' ? (
          <input
            type="password"
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className="form-control"
          />
        ) : field.type === 'tel' ? (
          <input
              type="tel"
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              className="form-control"
              pattern="^\d{9,}$"
              />
        ) : field.type === 'select' ? (
          <select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            className="form-select"
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : null}
        {errors[field.name] && <p className="text-danger mt-1">{errors[field.name]}</p>}
      </div>
      ))}
    
      {/* כפתורים דינאמיים */}
      <div className="d-flex gap-2">
        {config.buttons.map((button) =>
          button.type === 'reset' ? (
            <button key={button.label} type="button" onClick={handleReset} className={button.className}>
              {button.label}
            </button>
          ) : (
            <button key={button.label} type={button.type} className={button.className} style={{backgroundColor: ' #60c58c'}}>
              {button.label}
            </button>
          )
        )}
      </div>
    </form>  
  );
};

export default DynamicForm;
