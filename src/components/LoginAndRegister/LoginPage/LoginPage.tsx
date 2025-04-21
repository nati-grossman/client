import React, { useState, useEffect } from "react";
import PageTitle from "../GlobalComponent/PageTitle";
import { FormConfig } from "../../../formValidation/formConfigTypes";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { UserService } from "services/userService";
import { LoginRequest } from "types/LoginAndRegister/Login/LoginRequest";

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
  buttons: [
    { type: "submit", label: t("submit"), className: "btn btn-primary" },
  ],
  onSubmit: async (formData) => {
    const data: LoginRequest = {
      email: formData.email,
      password: formData.password,
    };
    const userService = new UserService();
    const response = await userService.login(data);
  },
});

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  const [loginFormConfig, setLoginFormConfig] = useState<FormConfig | null>(
    null
  );

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
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
