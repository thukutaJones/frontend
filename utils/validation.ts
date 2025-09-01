export const validatePassword = (password: string): string => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return "";
};

export const validateUsername = (username: string): string => {
  if (!username) return "Username is required";
  if (username.length < 3) return "Username must be at least 3 characters";
  if (!/^[a-zA-Z0-9._-]{3,20}$/.test(username)) {
    return "Username can only contain letters, numbers, dots, hyphens, and underscores";
  }
  return "";
};

export const isFormValid = (formData: any) => {
  return formData.username.length >= 3 && formData.password.length >= 6;
};
