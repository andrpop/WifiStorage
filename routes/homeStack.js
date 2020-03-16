import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import HomeScreen from "../Views/Home";
import MainView from '../Views/MainView';


const  screens ={
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerShown: false,
        },
    },
        MainView: {
            screen: MainView,
            navigationOptions: {
                headerShown: false,
            },
        },


};


const HomeStack = createStackNavigator(screens);

HomeStack.navigationOptions = {
    headerVisible: false,
    headerMode:'none'
};
export default createAppContainer(HomeStack);
