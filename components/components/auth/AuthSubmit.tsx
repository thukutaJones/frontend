"use client";

import { ArrowRight } from "lucide-react";
import React from "react";
import { useTranslation } from "react-i18next";

const AuthSubmit = ({
  handleSubmit,
  isSubmitting,
  title,
  isSubmittingText,
}: {
  handleSubmit: any;
  isSubmitting: boolean;
  title: string;
  isSubmittingText?: string;
}) => {

  const { t } = useTranslation()

  return (
    <div className="">
      <button
        type="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>{isSubmittingText ? isSubmittingText : "Submitting"}</span>
          </>
        ) : (
          <>
            <span>{title}</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
      <p className="text-center text-gray-600 mt-8">
        {title === t('general.signIn')
          ? t('general.doNotHaveAccount')
          : t('general.alreadyHaveAccount')}{" "}
        <button
          type="button"
          className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          onClick={
            title === t('general.signIn')
              ? () => location.href = "/sign-up"
              : () => location.href = "/sign-in"
          }
        >
          {title === t('general.signIn') ? t('general.signUp') : t('general.signIn')}
        </button>
      </p>
    </div>
  );
};

export default AuthSubmit;
