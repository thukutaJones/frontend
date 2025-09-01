import {
  isFormValid,
  validatePassword,
  validateUsername,
} from "@/utils/validation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import SubmitButton from "./SubmitButton";
import Link from "next/link";
import InputField from "./InputField";
import { signInFields } from "@/constants/formFields";
import AuthSubmit from "./AuthSubmit";
import { useTranslation } from "react-i18next";
import { decodeToken } from "@/utils/decodeToken";
import { baseUrl } from "@/constants/baseUrl";
import axios from "axios";

interface FormData {
  username: string;
  password: string;
}

interface FormErrors {
  username?: string;
  password?: string;
  general?: string;
}

const validCredentials = [
  { username: "admin", password: "admin123" },
  { username: "doctor.smith", password: "doctor123" },
  { username: "nurse.jane", password: "nurse123" },
  { username: "reception", password: "reception123" },
  { username: "manager", password: "manager123" },
  { username: "dr.wilson", password: "wilson123" },
  { username: "staff.member", password: "staff123" },
  { username: "medical.admin", password: "medical123" },
];

const SignInForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    username: "",
    password: "",
    general: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { t } = useTranslation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "", general: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({ username: "", password: "", general: "" });

    const newErrors: FormErrors = {
      username: validateUsername(formData.username),
      password: validatePassword(formData.password),
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
      const res = await axios.post(`${baseUrl}/api/login`, formData);
      const accessToken = res.data?.token;

      localStorage.setItem("access_token", accessToken);

      const decoded: any = await decodeToken(accessToken);
      console.log(decoded)
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

        {/* Input Fields */}
        {signInFields.map((field, index) => (
          <InputField
            key={index?.toString()}
            label={field?.label}
            value={formData[field.name as keyof FormData]}
            onChange={handleInputChange}
            error={errors[field.name as keyof FormErrors]}
            disabled={isLoading}
            showPassword={showPassword}
            name={field?.name}
            icon={field?.icon}
            showPasswordToggle={field?.showPasswordToggle}
            placeholder={field?.placeholder}
            onTogglePassword={() => setShowPassword(!showPassword)}
          />
        ))}

        {/* Remember Me & Forgot Password */}
        <div className="flex items-end justify-between">
          <button
            type="button"
            className="text-blue-900 text-sm font-semibold hover:underline transition-all duration-200"
            disabled={isLoading}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <AuthSubmit
          handleSubmit={handleSubmit}
          isSubmitting={isLoading}
          title={t("general.signIn")}
        />
      </form>
    </div>
  );
};

export default SignInForm;
