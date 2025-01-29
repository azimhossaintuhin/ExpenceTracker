import { Globalcontainer,gloabalwidth} from "../constant/Styles";
import { StyleSheet } from "react-native";
import { Colors } from "../constant/Colors";

export const styles = StyleSheet.create({
    container: {
      ...Globalcontainer,
      paddingHorizontal: 4,
    },
    header:{
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      marginBottom:20,
      paddingHorizontal:5
    },
    logoText:{
      fontSize:25,
      fontWeight:"bold",
      fontFamily:"Manrope"
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
  