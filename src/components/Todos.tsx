import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { TodosProps } from "../types";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../constant/Colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiInstance } from "../config/Api";
import BottomSheet from "@gorhom/bottom-sheet";
import Bottomsheet from "./Bottomsheet";
import { Formik } from "formik";
import * as Yup from "yup";
import ValideationFiled from "./CoustomFields";

const Todos: React.FC<TodosProps> = ({ item, index }) => {
  const [edit, setEdit] = React.useState<boolean>(false);

  const queryClient = useQueryClient();

  // delete mutation
  const { mutate: deleteMutation } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async (id: string) => {
      try {
        const response = await ApiInstance.delete(`/todos/${id}/`);
        return response.data.message;
      } catch (error) {
        console.error("Delete Error:", error);
        throw new Error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  // update mutation
  const { mutate: updateMutation , isPending } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async (data: { id: string; todo: string }) => {
      try {
        const response = await ApiInstance.patch(`/todos/${data.id}/`, data);
        return response.data.message;
      } catch (error) {
        console.error("Update Error:", error);
        throw new Error(error);
      }
    },
    onSuccess: () => {
      setEdit(false);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return (
    <View style={styles.todoContainer}>
      {edit ? (
        <View style={styles.editContainer}>
          <Formik
            initialValues={{ todo: item.todo }}
            onSubmit={(values) => {
              updateMutation({ id: item.id, todo: values.todo });
            }}
            validationSchema={Yup.object().shape({
              todo: Yup.string().required("Please enter a todo"),
            })}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <>
                <ValideationFiled
                  fieldName="todo"
                  values={values}
                  handleChange={handleChange("todo")}
                  handleBlur={handleBlur}
                />
                <Pressable
                  onPress={() => handleSubmit()}
                  style={styles.doneButton}
                >
                  {
                    isPending ? <ActivityIndicator color={Colors.white} size="small" /> :   <Text style={styles.doneButtonText}>Done</Text>
                  }
                
                </Pressable>
              </>
            )}
          </Formik>
        </View>
      ) : (
        <>
          <Text style={styles.todoText}>
            {index}. {item.todo}
          </Text>
          <View style={styles.iconContainer}>
            <Pressable onPress={() => setEdit(!edit)}>
              <MaterialIcon name="edit" size={20} color="blue" />
            </Pressable>
            <Pressable
              onPress={() => {
                console.log("clicked", item.id);
                deleteMutation(item.id);
              }}
            >
              <MaterialIcon name="delete" size={20} color="red" />
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  todoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.fourthColor,
    backgroundColor: Colors.white,
  },
  todoText: {
    fontSize: 16,
    fontWeight: "bold",
    width: "75%",
    color: "#000",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    width: "25%",
  },
  editContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    borderWidth: 1,
    borderColor: Colors.fourthColor,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
  },
  iconButton: {
    marginLeft: 10,
  },
  doneButton: {
    marginLeft: 10,
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "100%",
  },
  doneButtonText: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
