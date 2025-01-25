import { globalContainerType } from "../types"
import { Colors } from "./Colors"
import { Dimensions } from "react-native";
export const Globalcontainer:globalContainerType = {
    flex:1,
    backgroundColor:Colors.white,
}


export const gloabalwidth = Dimensions.get("window").width;