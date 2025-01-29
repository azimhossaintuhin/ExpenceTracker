import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useEffect } from "react";
import { TodosProps } from "../types";
import MaterialIcon from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../constant/Colors";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiInstance } from "../config/Api";
import { Formik } from "formik";
import * as Yup from "yup";
import ValideationFiled from "./CoustomFields";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const Todos: React.FC<TodosProps> = ({ item, index }) => {
  const [edit, setEdit] = React.useState<boolean>(false);
  const queryClient = useQueryClient();

  // Initialize shared values based on current completion status
  const bgColor = useSharedValue(
    item.completed ? Colors.primary : Colors.white
  );
  const textColor = useSharedValue(item.completed ? Colors.white : "#000");
  const editIconColor = useSharedValue(item.completed ? Colors.white : "blue");
  const deleteIconColor = useSharedValue(item.completed ? Colors.white : "red");

  // Effect to update shared values when item.completed changes
  useEffect(() => {
    bgColor.value = withTiming(item.completed ? Colors.primary : Colors.white);
    textColor.value = withTiming(item.completed ? Colors.white : "#000");
    editIconColor.value = withTiming(item.completed ? Colors.white : "blue");
    deleteIconColor.value = withTiming(item.completed ? Colors.white : "red");
  }, [item.completed]);

  // Delete Mutation
  const { mutate: deleteMutation } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async (id: string) => {
      await ApiInstance.delete(`/todos/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Delete Error:", error);
    },
  });

  // Update Mutation
  const { mutate: updateMutation, isPending } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async (data: { id: string; todo: string }) => {
      await ApiInstance.patch(`/todos/${data.id}/`, data);
    },
    onSuccess: () => {
      setEdit(false);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Update Error:", error);
    },
  });

  // Toggle Completion Mutation
  const { mutate: completedTodo } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async () => {
      await ApiInstance.patch(`/todos/${item.id}/`, {
        completed: !item.completed,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Completion Error:", error);
    },
  });

  // Long Press Gesture
  const longPressHandler = Gesture.LongPress().onStart(() => {
    runOnJS(completedTodo)();
  });

  // Animated styles
  const containerStyle = useAnimatedStyle(() => ({
    backgroundColor: bgColor.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    color: textColor.value,
  }));

  const editIconStyle = useAnimatedStyle(() => ({
    color: editIconColor.value,
  }));

  const deleteIconStyle = useAnimatedStyle(() => ({
    color: deleteIconColor.value,
  }));

  return (
    
    <GestureDetector gesture={longPressHandler}>
      <Animated.View style={[styles.todoContainer, containerStyle]}>
        {edit ? (
          <KeyboardAvoidingView behavior="padding" style={{ width: "100%" }}>
            <View style={styles.editContainer}>
              <Formik
                initialValues={{ todo: item.todo }}
                onSubmit={(values) => {
                  updateMutation({ id: item.id, todo: values.todo });
                  Keyboard.dismiss();
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
                      {isPending ? (
                        <ActivityIndicator color={Colors.white} size="small" />
                      ) : (
                        <Text style={styles.doneButtonText}>Done</Text>
                      )}
                    </Pressable>
                  </>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        ) : (
          <>
            <Animated.Text style={[styles.todoText, textStyle]}>
              {index}. {item.todo}
            </Animated.Text>
            <View style={styles.iconContainer}>
              {item.completed ? (
                <Animated.View>
                  <MaterialIcon
                    name="check-circle"
                    size={20}
                    color={Colors.white}
                  />
                </Animated.View>
              ) : (
                <Pressable onPress={() => setEdit(!edit)}>
                  <Animated.Text style={editIconStyle}>
                    <MaterialIcon name="edit" size={20} />
                  </Animated.Text>
                </Pressable>
              )}
              <Pressable onPress={() => deleteMutation(item.id)}>
                <Animated.Text style={deleteIconStyle}>
                  <MaterialIcon name="delete" size={20} />
                </Animated.Text>
              </Pressable>
            </View>
          </>
        )}
      </Animated.View>
    </GestureDetector>
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
