"use client";

import { baseUrl } from "@/constants/baseUrl";
import { decodeToken } from "@/utils/decodeToken";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import FormError from "../FormError";
import FormField from "./FormField";
import { signInFormFields } from "@/constants/formFields";
import AuthSubmit from "./AuthSubmit";
import { isValidEmail } from "@/utils/isValidEmail";
import { useTranslation } from "react-i18next";

interface FormValues {
  email: string;
  password: string;
}

const SignInFormColumn = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState<FormValues>({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();

  const handleLogin = async () => {
    try {
      setFormError("");
      if (!formValues?.email || !formValues?.password) {
        setFormError(t("errors.signInInCompleteFieldsError"));
        return;
      }
      if (!isValidEmail(formValues?.email)) {
        setFormError(t("errors.invalidEmailError"));
        return;
      }
      setIsLoading(true);

      const res = await axios.post(`${baseUrl}/api/auth/login`, formValues);

      const accessToken = res.data?.token;
      // const refreshToken = res.data?.refresh_token;

      localStorage.setItem("access_token", accessToken);
      // localStorage.setItem("refresh_token", refreshToken);

      const decoded: any = await decodeToken(accessToken);

      if (
        decoded?.role === "admin" ||
        decoded?.role === "hod" ||
        decoded?.role === "nurse" ||
        decoded?.role === "doctor" ||
        decoded?.role === "ambulance_driver" ||
        decoded?.role === "patient"
      ) {
        router.replace("/dashboard");
        return;
      }

      setFormError(t("errors.invalidRole"));
    } catch (error: any) {
      console.log(error);
      setFormError(
        error?.response?.data?.message
          ? String(error?.response?.data?.message)
          : t("errors.somthingWentWrong")
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="bg-white/80 animated fadeInRight w-full max-w-md backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
      <form className="space-y-6" onSubmit={handleLogin}>
        {!!formError && <FormError formError={formError} />}
        <div>
          {signInFormFields?.map((field: any, index: number) => (
            <FormField
              key={index}
              title={t(`general.${field?.id}`)}
              wid="w-full mt-4"
              value={formValues[field?.variable as keyof FormValues]}
              handleChangeText={(e: any) =>
                setFormValues({
                  ...formValues,
                  [field?.variable]: e.target.value,
                })
              }
              type={field?.type}
              placeholder={field?.placeholder}
              textStyles="text-sm placeholder:text-gray-300"
            />
          ))}
          <div className="text-right">
            <button
              type="button"
              className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              {t("general.forgetPassword")}
            </button>
          </div>
        </div>
        <AuthSubmit
          handleSubmit={handleLogin}
          isSubmitting={isLoading}
          title={t("general.signIn")}
        />
      </form>
    </div>
  );
};

export default SignInFormColumn;
