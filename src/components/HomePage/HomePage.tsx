import React from "react";
import { useTranslation } from "react-i18next";
import { TFunction } from "i18next";
import { postData } from "../../services/apiService";

interface LoginResponse {
  token: string;
  ok: string;
}

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <div>Home Page</div>
    </>
  );
};

export default HomePage;
