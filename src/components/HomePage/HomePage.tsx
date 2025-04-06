import React, { useState, useEffect } from "react";
import DynamicForm from '../Form/DynamicForm'; 
import PageTitle from '../PageTitle';
import { FormConfig } from '../../formValidation/formConfigTypes'; 
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { postData } from '../../services/apiService';



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



const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>    
      <div>Home Page</div>
    </>
  );
};

export default HomePage;
