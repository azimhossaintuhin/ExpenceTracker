import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Pressable,
  Dimensions,
  ActivityIndicator
  
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Formik } from "formik";
import { LoginSchema } from "../../validations/Login_Validation";
import { Colors } from "../../constant/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { push, replace } from "../../utils/Navigations";
import { Globalcontainer } from "../../constant/Styles";
import ValideationFiled from "../../components/CoustomFields";
import {useMutation} from "@tanstack/react-query"
import { ApiInstance } from "../../config/Api";
import { useAuth } from "../../context/context";
import { mmkv } from "../../utils/MMKV";



const width = Dimensions.get("window").width;

const Login = () => {

  const {setLogin} =  useAuth()



  const {mutate , isPending } = useMutation({
    mutationKey:["login"],
    mutationFn:async(data:{username:string , password:string})=>{
      try{
        const response = await ApiInstance.post("token/", data)
        mmkv.setItem("access" ,  response.data.access)
        mmkv.setItem("refresh" ,  response.data.refresh)
        setLogin(true)

      }
      catch(e){
       throw new Error(e)
      }
    },
    onSuccess:(data)=>{
      console.log(data)
      replace("Home")
    },
    onError:(e)=>{
      console.log(e)
    }
  })
  


  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="padding" style={{ width: "100%" }}>
        <View style={styles.textContainer}>
          <Text style={styles.header}>Welcome Back </Text>
          <Text style={styles.subHeader}>Please login to continue</Text>
        </View>

        <View>
          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values,) => mutate(values)}
            validationSchema={LoginSchema}
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
                  fieldName="password"
                  values={values}
                  handleChange={handleChange("password")}
                  handleBlur={handleBlur}
                  errors={errors}
                  touched={touched}
                />

                
                <View style={styles.fgContainer}>
                  <Text style={{ color: Colors.primary }}>
                    Forgot Password?
                  </Text>
                </View>
                <View style={styles.inputContainer}>
                  <Pressable style={styles.button} onPress={() => handleSubmit()}>
                  {
                    isPending ? <ActivityIndicator size="small" color={Colors.white} /> : 
                    (<Text style={styles.buttibText}>Login</Text>)  
                  }
                  </Pressable>
                </View>
              </>
            )}
          </Formik>
          <View>
            <Text style={{ textAlign: "center" }}>
              Don't have an account?
              <Pressable onPress={() => push("SignUp")}>
                <Text style={{ color: Colors.primary }}>Sign Up</Text>
              </Pressable>
            </Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

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
    fontSize: width * 0.1,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 5,
    fontFamily:"Manrope"
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

  fgContainer: {
    alignItems: "flex-end",
    marginTop: -10,
    marginBottom: 20,
    paddingHorizontal: 10,
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
