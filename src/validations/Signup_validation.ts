import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
    username: Yup.string().required("Username is Required"),
    email: Yup.string().email().required("Email is Required"),
    password: Yup.string().min(6).max(12).required("Password is Required"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Passwords must match")
});
