import * as  Yup  from "yup";

export const LoginSchema = Yup.object().shape({
username: Yup.string().required("Username is Required"),
password: Yup.string().min(6).max(12).required("Password is Required")
});