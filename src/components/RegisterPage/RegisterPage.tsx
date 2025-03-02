import React, { useState, useEffect } from "react";
import DynamicForm from '../Form/DynamicForm';
import PageTitle from '../PageTitle';
import { FormConfig } from '../../formValidation/formConfigTypes'; // אם יש לך את הקובץ הזה
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { postData } from '../../services/apiService';
import { UserService } from "services/userService";
import { RegisterRequest } from "types/Registration/RegisterRequest";


const createRegisterFormConfig = (t: TFunction): FormConfig => ({
  fields: [
    {
      name: "firstName",
      label: t("firstName"),
      type: "text",
      validations: [{ type: "required", message: t("firstNameRequired") }],
    },
    {
      name: "lastName",
      label: t("lastName"),
      type: "text",
      validations: [{ type: "required", message: t("lastNameRequired") }],
    },
    {
      name: "email",
      label: t("email"),
      type: "email",
      validations: [
        { type: "required", message: t("emailRequired") },
        { type: "email", message: t("emailInvalid") },
      ],
    },
    {
      name: "password",
      label: t("password"),
      type: "password",
      validations: [
        { type: "required", message: t("passwordRequired") },
        { type: "minLength", value: 6, message: t("passwordMinLength") },
      ],
    },
    {
      name: "confirmPassword",
      label: t("confirmPassword"),
      type: "password",
      validations: [
        { type: "required", message: t("confirmPasswordRequired") },
        { type: "match", field: "password", message: t("passwordsMustMatch") },
      ],
    },
    {
      name: "telephone",
      label: t("telephone"),
      type: "tel",
      validations: [
        { type: "required", message: t("telephoneRequired") },
        { type: "pattern", value: "^[0-9]{10}$", message: t("telephoneInvalid") },
      ],
    },
  ],
  buttons: [{ type: "submit", label: t("register"), className: "btn btn-primary" }],
  onSubmit: async (formData) => {
    const userService = new UserService();
    let data : RegisterRequest = {
      FirstName: formData.firstName,      
      LastName: formData.lastName,       
      Telephone: formData.telephone,      
      Email: formData.email,       
      Password: formData.password,
      ConfirmPassword: formData.confirmPassword     
    };
    const response = await userService.register(data);
  },
});

  

const RegisterPage: React.FC = () => {
    const { t } = useTranslation();
  
    const [registerFormConfig, setRegisterFormConfig] = useState<FormConfig | null>(null);
  
    useEffect(() => {
      setRegisterFormConfig(createRegisterFormConfig(t));
    }, [t]);
  
    if (!registerFormConfig) return null;
  
    return (
      <>    
        <div className="container mt-5">
          <div className="d-flex justify-content-center">
            <div className="w-25">
              <PageTitle text={t("registerScreen")} className="text-center" />
              <DynamicForm config={registerFormConfig} />
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default RegisterPage;
  