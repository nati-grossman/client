import React, { useState, useEffect } from "react";
import DynamicForm from './DynamicForm'; 
import PageTitle from './PageTitle';
import { FormConfig } from '../formValidation/formConfigTypes'; 
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { postData } from '../services/apiService';



interface LoginResponse {
  token: string;
  ok: string;
}

const createLoginFormConfig = (t: TFunction): FormConfig => ({
  fields: [
    {
      name: "email",
      label: t("email"),
      type: "email",
      validations: [{ type: "required", message: t("emailRequired") }],
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
  ],
  buttons: [{ type: "submit", label: t("submit"), className: "btn btn-primary" }],
  onSubmit: async  (formData) => {
    const data = {
      EmailAdress: formData.email,  
      Password: formData.password    
    };
    const endpoint = "/api/user/login";

    try {
      const response = await postData<LoginResponse>(endpoint, formData);

      debugger
      if (response.ok) {
        //const token = await response.json() as { token: string };  
        //console.log("Login successful, token:", token);
      } else {
        console.log("Login failed");
      }
    } catch (error: unknown) {
      console.error("Error:", error);
    }
  },
});



const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  const [loginFormConfig, setLoginFormConfig] = useState<FormConfig | null>(null);

  useEffect(() => {
    setLoginFormConfig(createLoginFormConfig(t));
  }, [t]);

  if (!loginFormConfig) return null;

  return (
    <>    
      <div className="container mt-5">
        <div className="d-flex justify-content-center">
          <div className="w-25">
            <PageTitle text={t("loginScreen")} className="text-center" />
            <DynamicForm config={loginFormConfig} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
