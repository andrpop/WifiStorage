import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";

import HomeScreen from "../Views/Home";
import MainView from '../Views/MainView';
import MapScreen from "../Views/MapScreen";
import TabNavigator from "../Views/TabNavigator";

const  screens = {
          Home: {
            screen: HomeScreen,
            navigationOptions: {
                headerShown: false,
            },
          },
        TabNavigator:{
              screen: TabNavigator,
            navigationOptions: {
                headerShown: false,
            },
        }
        // MainView: {
        //     screen: MainView,
        //     navigationOptions: {
        //         headerShown: false,
        //     },
        // },
        //
        // MapScreen: {
        //     screen: MapScreen,
        //     navigationOptions: {
        //         headerShown: false,
        //     },
        // },
};


const HomeStack = createStackNavigator(screens);

HomeStack.navigationOptions = {
    headerVisible: false,
    headerMode:'none'
};
export default createAppContainer(HomeStack);
