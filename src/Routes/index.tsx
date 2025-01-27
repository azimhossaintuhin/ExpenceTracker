import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Splash from "../Screens/Splash";
import Login from "../Screens/auth/Login";
import { RootStackParamList } from "../types";
import { navigationRef } from "../utils/Navigations";
import Home from "../Screens/Home";
import SignUp from "../Screens/auth/SignUp";
import { useAuth } from "../context/context";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Routes = () => {
  const { login } = useAuth();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        id={undefined}
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={Splash} />

        {/* Conditional rendering for auth-related screens */}
        {!login ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <Stack.Screen name="Home" component={Home} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
