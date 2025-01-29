import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Globalcontainer } from "../constant/Styles";
import { Colors } from "../constant/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { beautifyKey } from "../utils/Beautify";
import { mmkv } from "../utils/MMKV";
import { replace } from "../utils/Navigations";
import { useAuth } from "../context/context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Formik } from "formik";
import ValideationFiled from "../components/CoustomFields";
import { ApiInstance } from "../config/Api";

const Profile = () => {
  const { user, setLogin, loginHandler } = useAuth();

  const [edit, setEdit] = useState<boolean>(false);
  const [profileImage, setImage] = useState<string>(user?.image || "");
  
  const excludeField = ["username", "created_at", "id", "image"];
  const key = Object.keys(user).filter((item) => !excludeField.includes(item));

  // handler for logout
  const logoutHandler = () => {
    mmkv.clearAll();
    setLogin(false);
    replace("Login");
  };

  // handler for image picker
  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    }
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (values: any) => {
      try {
        const formdata = new FormData();
        if (profileImage) {
          const uri = profileImage;
          const uriParts = uri.split(".");
          console.log("uriParts:", uriParts);
          const fileType = uriParts[uriParts.length - 1];
          const filename = uri.split("/").pop().split(".")[0];
          console.log("filename:", filename);
          formdata?.append("image", {
            uri,
            name: `${filename}.${fileType}`,
            type: `image/${fileType}`,
          });
        }
        formdata.append("full_name", values.full_name);
        formdata.append("phone", values.phone);
        formdata.append("address", values.address);
        formdata.append("email", values.email);

        const response = await ApiInstance.patch("user/", formdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      } catch (error) {
        console.log("Error in updateProfile:", error);
      }
    },
    onSuccess: (data) => {
      console.log("Updated Profile:", data);
      loginHandler();
      setEdit(false);
    },
    onError: (error) => {
      console.log("Error in updateProfile:", error);
    },
  });

  const image =
    user?.image !== null
      ? user?.image
      : "https://avatar.iran.liara.run/public/boy";

  useEffect(() => {
    loginHandler();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        style={styles.ProfileContainer}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        <SafeAreaView style={styles.ProfileContainer}>
          <View style={styles.profileHero}>
            <Pressable
              onPress={() => {
                edit ? handlePickImage() : null;
              }}
            >
              <Image
                source={{ uri: profileImage || image }}
                style={styles.profileImage}
              />
            </Pressable>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{user?.username}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
            <View style={styles.profileActionBtn}>
              <Pressable
                style={styles.actionBtn}
                onPress={() => setEdit(!edit)}
              >
                <MaterialIcons
                  name={edit ? "person" : "edit"}
                  size={15}
                  color="white"
                />
              </Pressable>
              <Pressable style={styles.actionBtn} onPress={logoutHandler}>
                <MaterialIcons name="logout" size={15} color="white" />
              </Pressable>
            </View>
          </View>

          <View style={styles.userInfo}>
            {edit ? (
              <View>
                <Text style={styles.userProfileHeader}>Update Profile</Text>
                <View style={styles.infoContainer}>
                  <Formik
                    initialValues={{
                      full_name: user?.full_name || "",
                      phone: user?.phone || "",
                      address: user?.address || "",
                      email: user?.email || "",
                    }}
                    onSubmit={(values) => {
                      mutate(values);
                    }}
                  >
                    {({ handleChange, handleBlur, handleSubmit, values }) => (
                      <View style={{ marginVertical: 10 }}>
                        <ValideationFiled
                          fieldName="full_name"
                          values={values}
                          handleChange={handleChange("full_name")}
                          handleBlur={handleBlur}
                        />
                        <ValideationFiled
                          fieldName="phone"
                          values={values}
                          handleChange={handleChange("phone")}
                          handleBlur={handleBlur}
                        />
                        <ValideationFiled
                          fieldName="address"
                          values={values}
                          handleChange={handleChange("address")}
                          handleBlur={handleBlur}
                        />
                        <Pressable
                          onPress={() => handleSubmit()}
                          style={styles.actionBtn}
                        >
                          {isPending ? (
                            <ActivityIndicator
                              color={Colors.white}
                              size="small"
                            />
                          ) : (
                            <Text style={{ color: Colors.white }}>Update</Text>
                          )}
                        </Pressable>
                      </View>
                    )}
                  </Formik>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.userProfileHeader}>
                  Profile Information
                </Text>
                {key.map((item, index) => (
                  <View key={index} style={styles.infoContainer}>
                    <Text style={styles.infoHeader}>{beautifyKey(item)}</Text>
                    <View style={styles.info}>
                      <Text style={styles.infoText}>{user?.[item]}</Text>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  ProfileContainer: {
    ...Globalcontainer,
  },
  profileHero: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    marginVertical: 10,
  },
  profileInfo: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  profileActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
    marginTop: 10,
  },
  actionBtn: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Manrope",
    color: Colors.textary,
  },
  userEmail: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Manrope",
    color: "gray",
  },
  userInfo: {
    padding: 10,
    marginHorizontal: 10,
  },
  userProfileHeader: {
    color: "#000",
    fontFamily: "Manrope",
    fontWeight: "bold",
    fontSize: 20,
  },
  infoContainer: {
    marginVertical: 10,
  },
  infoHeader: {
    color: "#000",
    fontFamily: "Manrope",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 10,
  },
  info: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "rgba(128, 128, 128, 0.2)",
    borderRadius: 5,
  },
  infoText: {
    color: "#000",
    fontFamily: "Manrope",
    fontSize: 15,
    fontWeight: "bold",
  },
});
