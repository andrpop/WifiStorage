import 'react-native-gesture-handler';
import React from 'react';

import { enableScreens } from 'react-native-screens';
enableScreens();


import Navigator from './routes/homeStack';


export default function App() {

  return(
      <Navigator/>
  );

}
// import * as React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Home from "./Views/Home";
// import MainView from "./Views/MainView";
// import MapScreen from "./Views/MapScreen";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import Icon from "react-native-vector-icons/MaterialIcons";
//
//
// const Tab = createBottomTabNavigator();
//
// function MyTabs() {
//   return (
//       <Tab.Navigator
//           initialRouteName="Home"
//           tabBarOptions={{
//             activeTintColor: '#e91e63',
//           }}
//       >
//         <Tab.Screen
//             name="Home"
//             component={Home}
//             options={{
//               tabBarLabel: 'Home',
//               // tabBarIcon: ({ color, size }) => (
//               //     <MaterialCommunityIcons name="home" color={color} size={size} />
//               // ),
//             }}
//         />
//         <Tab.Screen
//             name="Scan"
//             component={MainView}
//             options={{
//               tabBarLabel: 'Scan',
//             //   tabBarIcon: ({ color, size }) => (
//             //       <MaterialCommunityIcons name="bell" color={color} size={size} />
//             //   ),
//             }}
//         />
//         <Tab.Screen
//             name="Harta"
//             component={MapScreen}
//             options={{
//               tabBarLabel: 'Vizualizare Harta',
//               tabBarIcon: ({ color, size }) => (
//                   <Icon name="location-city" size={25} color="#000"/>
//
//               ),
//             }}
//         />
//       </Tab.Navigator>
//   );
// }
//
// export default function App() {
//   return (
//       <NavigationContainer>
//         <MyTabs />
//       </NavigationContainer>
//   );
// }
