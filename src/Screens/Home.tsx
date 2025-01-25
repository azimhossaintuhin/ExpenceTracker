import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  FlatList,
} from "react-native";
import { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { gloabalwidth, Globalcontainer } from "../constant/Styles";
import Card from "../components/Card";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "../constant/Colors";
import Todos from "../components/Todos";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Bottomsheet from "../components/Bottomsheet";
import BottomSheet from "@gorhom/bottom-sheet";


const Home = () => {
  const data = [1, 2, 3, 4];
  const [search, setSearch] = useState<boolean>(false);

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
                {data.map((item, index) => (
                  <Card item={item} index={index} key={index} />
                ))}
              </View>
              {/* All my TOdos */}
              <View style={styles.todoContainer}>
                <View style={styles.todoHeader}>
                  <Text style={styles.headerText}>All Todos</Text>
                  <Pressable style={styles.hederButton}>
                    <MaterialIcons name="add" size={20} color={Colors.white} />
                  </Pressable>
                </View>

                <FlatList
                  data={data}
                  keyExtractor={(item, index) => index.toString()}
                  style={styles.todoScroller}
                  renderItem={({ item, index }) => {
                    return <Todos item={item} index={index} />;
                  }}
                />

                <Bottomsheet
                sheetRef={useRef<BottomSheet>(null)}
                changeHandler={(index) => console.log(index)}
                >
                <Text>Bottom sheet</Text>
                </Bottomsheet>
              </View>
            </>
          )}
        </ScrollView>
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
});
