"use client";

import { baseUrl } from "@/constants/baseUrl";
import { decodeToken } from "@/utils/decodeToken";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import FormError from "../FormError";
import FormField from "./FormField";
import { signUpFields } from "@/constants/formFields";
import AuthSubmit from "./AuthSubmit";
import { isValidEmail } from "@/utils/isValidEmail";
import { FaArrowLeft } from "react-icons/fa";
import Dropdown from "../DropDown";
import { useTranslation } from "react-i18next";

interface FormValues {
  full_name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dob: string;
  gender: string;
  phone_number: string;
  address: string;
  nationId: string;
  preferred_lang: string;
  accessibility: string;
  staff_role: string;
  conditions: string;
  emergencyContact: string;
}

const SignUpFormColumn = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [formValues, setFormValues] = useState<FormValues>({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    phone_number: "",
    address: "",
    nationId: "",
    preferred_lang: "",
    accessibility: "",
    staff_role: "",
    conditions: "",
    emergencyContact: "",
  });
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [formError, setFormError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [toggleDropdown, setToggleDropdown] = useState<any>({
    gender: false,
    preferred_lang: false,
  });

  const pageIndexMap: any = {
    0: "page1",
    1: "page2",
  };

  const fields =
    signUpFields[pageIndexMap[currentPageIndex] as keyof typeof signUpFields];

  const handleSignUp = async () => {
    try {
      setFormError("");
      if (!formValues?.email || !formValues?.password) {
        setFormError("Please enter both email and password to continue!!");
        return;
      }
      if (!isValidEmail(formValues?.email)) {
        setFormError("Please enter a valid email address!!");
        return;
      }

      const res = await axios.post(`${baseUrl}/users/login`, formValues);

      const accessToken = res.data?.access_token;
      const refreshToken = res.data?.refresh_token;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

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
        error?.response?.data?.detail
          ? String(error?.response?.data?.detail)
          : t("errors.somthingWentWrong")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    setFormError("");
    // Validate required fields on the current page
    const requiredFields = fields.filter((field: any) => field.required);
    for (let field of requiredFields) {
      if (!formValues[field.variable as keyof FormValues]) {
        setFormError(t("errors.inCompleteFields"));
        return;
      }
      if (field.type === "email" && !isValidEmail(formValues.email)) {
        setFormError(t("errors.invalidEmailError"));
        return;
      }
      if (
        field.variable === "confirmPassword" &&
        formValues.password !== formValues.confirmPassword
      ) {
        setFormError(t("errors.nonMatchingPasswords"));
        return;
      }
    }
    // If all validations pass, go to the next page
    setCurrentPageIndex(currentPageIndex + 1);
  };
  return (
    <div className="bg-white/80 animated fadeInRight w-full max-w-md backdrop-blur-xl rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-all duration-300">
      <form className="space-y-6" onSubmit={handleSignUp}>
        {!!formError && <FormError formError={formError} />}
        {currentPageIndex !== 0 && (
          <button
            type="button"
            onClick={() => setCurrentPageIndex(currentPageIndex - 1)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-blue-100 px-4 py-2 rounded-lg hover:scale-105 transition-transform"
          >
            <FaArrowLeft className="text-black" />
            <span className="text-black text-sm font-semibold hover:text-blue-700 transition-colors">
              {t("general.back")}
            </span>
          </button>
        )}

        <div>
          {fields?.map((field: any, index: number) => (
            <Fragment key={index?.toString()}>
              {field?.type === "list" ? (
                <Dropdown
                  key={`${field?.variable}-${index}`}
                  title={t(`general.${field?.id}`)}
                  options={field?.options || []}
                  handleSelectOption={(option: any) => {
                    setFormValues({
                      ...formValues,
                      [field?.variable]: option,
                    });
                  }}
                  isOpen={toggleDropdown[field?.variable]}
                  handleClose={() =>
                    setToggleDropdown({
                      ...toggleDropdown,
                      [field?.variable]: false,
                    })
                  }
                  handleOpen={() =>
                    setToggleDropdown({
                      ...toggleDropdown,
                      [field?.variable]: true,
                    })
                  }
                  selectedOption={
                    typeof formValues[field?.variable as keyof FormValues] ===
                      "object" &&
                    formValues[field?.variable as keyof FormValues] !== null
                      ? (formValues[field?.variable as keyof FormValues] as any)
                          .name
                      : formValues[field?.variable as keyof FormValues] || ""
                  }
                  variable="name"
                />
              ) : (
                <FormField
                  key={`${field?.variable}-${index}`}
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
              )}
            </Fragment>
          ))}
        </div>
        <AuthSubmit
          handleSubmit={currentPageIndex !== 1 ? handleNext : handleSignUp}
          isSubmitting={isLoading}
          title={
            currentPageIndex !== 1 ? t("general.next") : t("general.signUp")
          }
        />
      </form>
    </div>
  );
};

export default SignUpFormColumn;
