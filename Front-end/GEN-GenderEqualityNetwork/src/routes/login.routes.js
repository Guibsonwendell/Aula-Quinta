import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones
import Welcome1 from "../pages/welcome1";
import Welcome2 from "../pages/welcome2";
import Welcome3 from "../pages/welcome3";
import SignIn from "../pages/signin";
import SignUp from "../pages/signup";
import OngSignUp from "../pages/OngSignUp";
import HomeScreen from "../pages/app/home";
import PostScreen from "../pages/app/post";
import ProfileScreen from "../pages/app/profile";
import SearchScreen from "../pages/app/search";
import Colours from '../../assets/colours';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MyApp() {
    return (
        <Tab.Navigator
        
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let iconSize = focused ? 30 : 20; // Aumenta o tamanho do ícone se estiver selecionado

                    // Define os ícones para cada rota
                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Post') {
                        iconName = focused ? 'albums' : 'albums-outline'; 
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    // bulb-outline - icone da lampada, pode ser util

                    // Retorna o ícone correspondente
                    return <Ionicons name={iconName} size={iconSize} color={color} />;
                },
                tabBarActiveTintColor: Colours.offWhite,
                tabBarInactiveTintColor: Colours.offWhite,
                tabBarStyle: {
                    backgroundColor: Colours.headerColour, // Fundo da barra de navegação
                    borderTopWidth: 0, // Remove a borda superior (opcional)
                },
                headerShown: false, // Remove o cabeçalho de todas as telas no Tab.Navigator
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Post" component={PostScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default function LoginRoutes() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen 
                name="Home" 
                component={HomeScreen}
                options={{ headerShown: false }}
             /> */}

            <Stack.Screen
                name="Welcome1"
                component={Welcome1}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Welcome2"
                component={Welcome2}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Welcome3"
                component={Welcome3}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="OngSignUp"
                component={OngSignUp}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MyApp"
                component={MyApp}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
