import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Globalcontainer } from "../../constant/Styles";
import { Formik } from "formik";
import { SignupSchema } from "../../validations/Signup_validation";
import ValideationFiled from "../../components/CoustomFields";
import { goBack, push } from "../../utils/Navigations";
import { Colors } from "../../constant/Colors";
import { useMutation } from "@tanstack/react-query";
import { ApiInstance } from "../../config/Api";

const SignUp = () => {

  const {mutate , isPending} =  useMutation({
    mutationKey:["signup"],
    mutationFn:async(data:{username:string , password:string})=>{
      try{
        const response = await ApiInstance.post("register/", data)
        return response.data
      }
      catch(e){
        throw new Error(e)
      }
    },
    onSuccess:(data)=>{
      console.log(data)
      goBack()
    },
    onError:(e)=>{
      console.log(e.message)
    }
  })


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ width: "100%" }} behavior="padding">
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.header}>Welcome To Our Platform</Text>
            <Text style={styles.subHeader}>Sign Up to continue</Text>
          </View>

          <Formik
            initialValues={{ username: "",email:"", password: "", confirmPassword: "" }}
            onSubmit={(values) => mutate(values)}
            validationSchema={SignupSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              touched,
              values,
            }) => (
              <>
                <ValideationFiled
                  fieldName="username"
                  values={values}
                  handleChange={handleChange("username")}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />


                <ValideationFiled
                  fieldName="email"
                  values={values}
                  handleChange={handleChange("email")}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />

                <ValideationFiled
                  fieldName="password"
                  values={values}
                  handleChange={handleChange("password")}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />

                <ValideationFiled
                  fieldName="confirmPassword"
                  values={values}
                  handleChange={handleChange("confirmPassword")}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />

                <View style={styles.inputContainer}>
                  <Pressable style={styles.button} onPress={() => handleSubmit()}>
                   {isPending ? <ActivityIndicator color={Colors.white} size="small" /> : <Text style={styles.buttibText}>Sign Up</Text>}
                  </Pressable>
                </View>
              </>
            )}
          </Formik>
          <View>
            <Text style={{ textAlign: "center" }}>
              Already have an account? 
              <Pressable onPress={() => goBack()}>
                <Text style={{ color: Colors.primary }}> Signin </Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    ...Globalcontainer,
    padding:20,
    justifyContent:"center",
    alignItems:"center",
  },
  textContainer: {
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 15,
    color: Colors.textary,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
    paddingHorizontal: 5,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttibText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 18,
  },
});
