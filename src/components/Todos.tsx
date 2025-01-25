import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TodosProps } from '../types'
import  MetarialIcon from "@expo/vector-icons/MaterialIcons"
import { Colors } from '../constant/Colors'

const Todos:React.FC<TodosProps> = ({item,index}) => {
  return (
   <View style={styles.todoContiner}>
   
      <Text style={styles.todoText}>{item}</Text>
    <View style={styles.iconContainer}>
      <MetarialIcon name="edit" size={20} color="blue"/>
      <MetarialIcon name="delete" size={20} color="red"/>
    </View>
   </View>
  )
}

export default Todos

const styles = StyleSheet.create({
  todoContiner:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    padding:10,
    marginVertical:5,
    borderRadius:5,
    borderWidth:1,
    borderColor:Colors.fourthColor,
    backgroundColor:Colors.white
  },
  todoText:{
    fontSize:16,
    fontWeight:"bold"
  },
  iconContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
    width:59
  }
})