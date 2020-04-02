import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainView from "./MainView";
import MapScreen from "./MapScreen";
import CustomAlertComponent from "./CustomAlertComponent";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import { } from 'react-native-vector-icons';
const Tab = createBottomTabNavigator();

let color = '#e91e63';
let size =25;
function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Scan"
            tabBarOptions={{

                activeTintColor: '#FFA500',
                animationEnabled: true,
                inactiveTintColor: 'white',
                // indicatorStyle: {
                //     backgroundColor: 'transparent'
                // },
                style: {
                    backgroundColor: 'rgba(22, 22, 22, 0.9)',
                    borderTopWidth: 3,
                    borderTopColor: '#996600',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0
                }

            }}
        >
            <Tab.Screen
                name="Scan"

                component={MainView}

                options={{
                    tabBarLabel: 'Scan',
                    tabBarIcon: ({ color, focused }) => (
                        <Icon
                            focused={focused}
                            color={color}
                            name="wifi" size={25} />
                    ),


                }}
            />
            <Tab.Screen
                name="Harta"
                component={MapScreen}
                options={{

                    tabBarLabel: 'Vizualizare Harta',
                    tabBarIcon: ({ color, focused }) => (
                        <Icon
                            focused={focused}
                            color={color}
                            name="map-marker-radius" size={25}  />
                    ),

                }}
            />

        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
}
