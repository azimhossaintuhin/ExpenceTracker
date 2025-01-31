import {
  ScrollView,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard
} from "react-native";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
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
import { styles } from "../styles/HomeStyle";
import { push } from "../utils/Navigations";
import { useAuth } from "../context/context";



const Home = () => {
  const {user , loginHandler} =  useAuth()
  
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

  const { mutate, isPending ,  } = useMutation({
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

  useEffect(() => {
    loginHandler()
  }, [])

  const profileimage =
  user?.image !== null
    ? user?.image
    : "https://avatar.iran.liara.run/public/boy";
  
    

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scroller}>
          {/* header */}
          <View style={styles.header}>
            <Text style={styles.logoText}>TODO <Text style={{color:Colors.primary , fontSize:15}}>Tracker</Text></Text>
           <View>
            <Pressable onPress={()=>push("Profile")}>
            <Image source={{uri:profileimage}} style={{width:45 , height:45 , borderRadius:30}}/>
            </Pressable>
           </View>
          </View>

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
