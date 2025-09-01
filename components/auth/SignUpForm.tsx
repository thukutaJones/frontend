import {
  isFormValid,
  validatePassword,
  validateUsername,
} from "@/utils/validation";
import { useRouter } from "next/navigation";
import React, { Fragment, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import Link from "next/link";
import InputField from "./InputField";
import { signUpFields } from "@/constants/formFields";
import { FaArrowLeft } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Dropdown from "../DropDown";
import AuthSubmit from "./AuthSubmit";
import axios from "axios";
import { baseUrl } from "@/constants/baseUrl";
import { decodeToken } from "@/utils/decodeToken";

// ✅ Expanded FormData
interface FormData {
  username: string;
  email: string;
  password: string;
  name: string;
  gender: string;
  district: string;
  phone: string;
  preferredLanguage: string;
}

// ✅ Expanded FormErrors
interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  gender?: string;
  district?: string;
  phone?: string;
  preferredLanguage?: string;
  general?: string;
}

const SignUpForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    name: "",
    gender: "",
    district: "",
    phone: "",
    preferredLanguage: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    email: "",
    password: "",
    name: "",
    gender: "",
    district: "",
    phone: "",
    preferredLanguage: "",
    general: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [toggleDropdown, setToggleDropdown] = useState<any>({
    gender: false,
    preferredLanguage: false,
    district: false,
  });

  const router = useRouter();
  const { t } = useTranslation();

  const pageIndexMap: any = {
    0: "page1",
    1: "page2",
  };

  const fields =
    signUpFields[pageIndexMap[currentPageIndex] as keyof typeof signUpFields];

  // ✅ Utility Validators
  const validateEmail = (email: string): string => {
    if (!email) return "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format";
  };

  const validateRequired = (value: string, field: string): string =>
    value ? "" : `${field} is required`;

  // ✅ Handle Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
    }
  };

  // ✅ Handle Next with per-page validation
  const handleNext = () => {
    let newErrors: Partial<FormErrors> = {};

    if (currentPageIndex === 0) {
      newErrors = {
        username: validateUsername(formData.username),
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        name: validatePassword(formData.name),
      };
    } else if (currentPageIndex === 1) {
      newErrors = {
        gender: validateRequired(formData.gender, "Gender"),
        district: validateRequired(formData.district, "District"),
        phone: validateRequired(formData.phone, "Phone number"),
        preferredLanguage: validateRequired(
          formData.preferredLanguage,
          "Preferred Language"
        ),
      };
    }

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    setErrors((prev) => ({ ...prev, general: "" }));
    setCurrentPageIndex(currentPageIndex + 1);
  };

  // ✅ Final Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({
      username: "",
      email: "",
      password: "",
      name: "",
      gender: "",
      district: "",
      phone: "",
      preferredLanguage: "",
      general: "",
    });

    const newErrors: FormErrors = {
      username: validateUsername(formData.username),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      gender: validateRequired(formData.gender, "Gender"),
      name: validateRequired(formData.name, "Name"),
      district: validateRequired(formData.district, "District"),
      phone: validateRequired(formData.phone, "Phone number"),
      preferredLanguage: validateRequired(
        formData.preferredLanguage,
        "Preferred Language"
      ),
      general: "",
    };

    if (Object.values(newErrors).some((error) => error !== "")) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // ✅ api call
      console.log(formData);
      const res = await axios.post(`${baseUrl}/api/register`, formData);
      const accessToken = res.data?.token;
      console.log(`Data: ${res?.data}`)

      localStorage.setItem("access_token", accessToken);

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

      setErrors({general: `${t("errors.invalidRole")}`});
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        general:
          error?.response?.data?.error ||
          "An error occurred during sign up. Please try again.",
      }));
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* General Error */}
        {errors.general && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 animate-in slide-in-from-top-4 fade-in duration-300">
            <div className="flex items-center space-x-3">
              <RiCloseLine className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm font-medium">
                {errors.general}
              </p>
            </div>
          </div>
        )}

        {/* Dynamic Input Fields */}
        {fields?.map((field: any, index: number) => (
          <Fragment key={index?.toString()}>
            {field?.type === "list" ? (
              <Dropdown
                key={`${field?.variable}-${index}`}
                title={t(`general.${field?.id}`)}
                options={field?.options || []}
                handleSelectOption={(option: any) => {
                  setFormData({
                    ...formData,
                    [field?.variable]: option.value,
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
                selectedOption={formData[field?.variable as keyof FormData]}
                variable="name"
              />
            ) : (
              <InputField
                key={`${field?.name}-${index}`}
                label={field?.label}
                value={formData[field.name as keyof FormData]}
                onChange={handleInputChange}
                error={errors[field.name as keyof FormErrors]}
                disabled={isLoading}
                showPassword={showPassword}
                name={field?.name}
                icon={field?.icon}
                placeholder={field?.placeholder}
                showPasswordToggle={field?.showPasswordToggle}
                onTogglePassword={() => setShowPassword(!showPassword)}
              />
            )}
          </Fragment>
        ))}

        {/* Submit or Next */}
        <AuthSubmit
          handleSubmit={currentPageIndex !== 1 ? handleNext : handleSubmit}
          isSubmitting={isLoading}
          title={
            currentPageIndex !== 1 ? t("general.next") : t("general.signUp")
          }
        />
      </form>
    </div>
  );
};

export default SignUpForm;
