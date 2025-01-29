import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard
} from "react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { gloabalwidth, Globalcontainer } from "../constant/Styles";
import Card from "../components/Card";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../constant/Colors";
import Todos from "../components/Todos";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Bottomsheet from "../components/Bottomsheet";
import BottomSheet from "@gorhom/bottom-sheet";
import Animated from "react-native-reanimated";
import { Formik } from "formik";
import ValideationFiled from "../components/CoustomFields";
import * as Yup from "yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiInstance } from "../config/Api";

const Home = () => {
  const [search, setSearch] = useState<boolean>(false);

  const [counter, setCounter] = useState({
    all: 0,
    pending: 0,
    completed: 0,
  });

  const queryClient = useQueryClient();

  const CardData = [
    {
      id: 1,
      title: "All Tasks",
      count: counter.all,
      icon: "format-list-numbered",
    },
    {
      id: 2,
      title: "Pending Tasks",
      count: counter.pending,
      icon: "pending-actions",
    },
    {
      id: 3,
      title: "Completed Tasks",
      count: counter.completed,
      icon: "checklist",
    },
  ];

  // bottom  shett
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetOpen = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  // all Api call willbe her
  const {
    data: todos,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const response = await ApiInstance.get("/todos/");
        return response.data.todos;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: async (data: { todo: string }) => {
      try {
        const response = await ApiInstance.post("/todos/", data);
        return response.data?.todo;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    if (todos) {
      const all = todos.length;
      const pending = todos.filter((todo: any) => !todo.completed).length;
      const completed = todos.filter((todo: any) => todo.completed).length;
      const counter_data = {
        all: all,
        pending: pending,
        completed: completed,
      };
      setCounter(counter_data);
    }
  }, [todos]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroller}>
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Search"
              style={styles.searchInput}
              onTouchStart={() => setSearch(true)}
              onEndEditing={() => setSearch(false)}
            />
            <View style={styles.searchButton}>
              <MaterialIcons name="search" size={20} color="white" />
            </View>
          </View>

          {/* Search Result */}
          {search && (
            <View style={styles.errorContainer}>
              <Image
                source={require("../assets/nores.png")}
                style={styles.errorImage}
              />
              <Text style={styles.errorText}>No Results Found</Text>
            </View>
          )}

          {/* Card List */}
          {!search && (
            <>
              <View style={styles.cardContainer}>
                {CardData.map((item, index) => (
                  <Card item={item} index={index} key={index} />
                ))}
              </View>

              {/* All my TOdos */}
              <View style={styles.todoContainer}>
                <View style={styles.todoHeader}>
                  <Text style={styles.headerText}>All Todos</Text>

                  <Pressable
                    style={styles.hederButton}
                    onPress={handleSheetOpen}
                  >
                    <MaterialIcons name="add" size={20} color={Colors.white} />
                  </Pressable>
                </View>

                {todos?.length === 0 && (
                  <Text style={styles.NullText}>No Todos Found</Text>
                )}

                <Animated.FlatList
                  scrollEnabled={false}
                  data={todos}
                  keyExtractor={(item, index) => index.toString()}
                  style={styles.todoScroller}
                  renderItem={({ item, index }) => {
                    return <Todos key={index} item={item} index={index + 1} />;
                  }}
                />
              </View>
            </>
          )}
        </ScrollView>
        {/* Bottom sheet */}
        <Bottomsheet sheetRef={bottomSheetRef}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetText}>Add Todo</Text>
            <Pressable
              onPress={() => bottomSheetRef.current?.close()}
              style={styles.hederButton}
            >
              <MaterialIcons name="close" size={20} color={Colors.white} />
            </Pressable>
          </View>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.sheetForm}>
              <Formik
                initialValues={{ todo: "" }}
                validationSchema={Yup.object().shape({
                  todo: Yup.string().required("Please enter a todo"),
                })}
                onSubmit={(values, { resetForm }) =>
                  mutate(values, {
                    onSuccess: () => {
                      resetForm();
                      queryClient.invalidateQueries<any>("todos");
                      bottomSheetRef.current?.close();
                      Keyboard.dismiss();
                    },
                  })
                }
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit: todoSubmit,
                  touched,
                  errors,
                  values,
                }) => (
                  <>
                    <ValideationFiled
                      fieldName="todo"
                      values={values}
                      handleChange={handleChange("todo")}
                      handleBlur={handleBlur}
                      errors={errors}
                      touched={touched}
                    />

                    <Pressable
                      style={styles.seetSubmitBtn}
                      onPress={() => todoSubmit()}
                    >
                      {isPending ? (
                        <ActivityIndicator color={Colors.white} size="small" />
                      ) : (
                        <Text style={{ color: Colors.white }}>Add Todo</Text>
                      )}
                    </Pressable>
                  </>
                )}
              </Formik>
            </View>
          </KeyboardAvoidingView>
        </Bottomsheet>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    ...Globalcontainer,
  },
  scroller: {
    width: "100%",
    padding: 10,
  },
  cardContainer: {
    width: "100%",
    paddingHorizontal: 5,
    paddingVertical: 5,
  },

  // Search Bar
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: "white",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 5,
  },
  searchButton: {
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    marginLeft: 8,
  },

  // Search Result (No Result Found)
  errorContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  errorImage: {
    width: gloabalwidth * 0.5,
    height: gloabalwidth * 0.5,
    resizeMode: "contain",
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: "gray",
    fontWeight: "600",
  },

  todoContainer: {
    paddingHorizontal: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    marginTop: 10,
  },
  todoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Manrope",
  },
  hederButton: {
    padding: 4,
    backgroundColor: Colors.primary,
    borderRadius: 5,
  },
  todoScroller: {
    width: "100%",
    paddingBottom: 30,
  },

  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sheetText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sheetForm: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  seetSubmitBtn: {
    padding: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  NullText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.fourthColor,
    marginVertical: 20,
  },
});
