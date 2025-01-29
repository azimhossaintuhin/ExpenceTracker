import { StyleSheet, Text, View , Image} from 'react-native'
import  {useFonts} from "expo-font"
import React, { useEffect } from 'react'
import { push, replace } from '../utils/Navigations'
import { Globalcontainer } from '../constant/Styles'
import { useAuth } from '../context/context'

const Splash = () => {

    const [loaded] = useFonts({
        "Manrope": require("../assets/fonts/Manrope-VariableFont_wght.ttf")
    })

    const {login , loading} = useAuth()

    useEffect(() => {
        
        const timer = setTimeout(() => {
            if (loaded && !loading) {
              if (login) {
                console.log("login");
                replace("Home");
              } else {
                console.log("not login");
                replace("Login");
              }
            }
          }, 350);
          
          return () => clearTimeout(timer); 

    
        
    }, [login, loaded]);


  return (
    <View style={styles.container}>
        <Image source={require("../assets/todo.png")}  style={styles.image}/>
        <Text style={styles.text}>Todo Tracker</Text>
    </View>
  )
}



export default Splash

const styles = StyleSheet.create({
    container: {
       ...Globalcontainer,
       padding:20,
       justifyContent:"center",
       alignItems:"center",
       
    },
    text: {
        fontSize: 20,
        fontWeight: "bold",
    },
    image: {
        width: 100,
        height:100,
        resizeMode:"contain"
    }
})