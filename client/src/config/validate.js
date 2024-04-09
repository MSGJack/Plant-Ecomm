import * as yup from "yup";

// Validate user registeration
export const registerSchema = yup.object({
  first_name: yup.string().required("First name is required.").max(100),
  last_name: yup.string().required("Last name is required.").max(100),
  email: yup
    .string()
    .required("EMail is required")
    .email("Must be a valid email")
    .max(100),
  password: yup
    .string()
    .required("Password is required.")
    .min(8, "Password must be longer than 8 characters")
    .max(100)
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,100}$/,
      "Password must contain at least one lower case and one upper case letter and a number."
    ),
});

export const addressSchema = yup.object({});
