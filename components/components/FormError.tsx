import React from "react";

const FormError = ({ formError }: { formError: string }) => {
  return (
    <div className="bg-red-900/10 p-4 rounded-xl">
      <p className="text-sm  text-red-600">{formError}</p>
    </div>
  );
};

export default FormError;
