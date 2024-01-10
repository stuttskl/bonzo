import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView } from "react-native-safe-area-context";

import HomeScreen from "./src/screens/Home";
import Dashboard from "./src/screens/Dashboard";

type RootStackParamList = {
    Home: undefined;
    Dashboard: { code: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerMode: "screen",
                    headerTintColor: "white",
                    headerStyle: { backgroundColor: "black" },
                }}>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Dashboard" options={{ title: "Dashboard" }}>
                    {(props: any) => <Dashboard {...props} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default function App() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppNavigator />
        </SafeAreaView>
    );
}
