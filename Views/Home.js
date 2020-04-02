import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    TouchableHighlight,
    Animated,
    Easing,
    StatusBar
} from 'react-native';
import Button from 'react-native-button';
import TabNavigator from "./TabNavigator";

export default class HomeScreen extends Component {

    constructor(props){
        super(props);
        console.ignoredYellowBox = [
            'Setting a timer'
        ];

    }



    render() {

        const {navigate} = this.props.navigation;
        return (
            <ImageBackground source={require('../Images/neuronal.jpg')} style={styles.MainContainer}>
                <View style={styles.container}>


                    <Image style={styles.image} source={require('../Images/wifi-area.png')}/>

                    <View style={styles.buttons}>
                        <Button
                            containerStyle={{
                                marginTop: -50,
                                paddingRight: 30,
                                height: 50,
                                width:180,
                                overflow: 'hidden',
                                backgroundColor: '#FFA500',
                                borderRadius: 20,
                            }}
                            style={{fontSize: 15, color: 'black',marginLeft:10}}
                            onPress={()=>this.props.navigation.navigate('TabNavigator')}
                        >
                            <TouchableHighlight >
                                <Image
                                    style={styles.StartButton}
                                    source={require('../Images/wifi-icon.png')}
                                />
                            </TouchableHighlight>
                            START SCAN</Button>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({

    StartButton:{
        width:40,
        marginLeft:10,
        marginTop:3,
        height:40,
        backgroundColor: '#FFA500'
    },
    backdropView: {
        height: 120,
        width: 320,
        backgroundColor: 'rgba(0,0,0,0)',
    },
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        textAlign: 'center',
        color:'#1E90FF',
        fontWeight: 'bold',

    },
    details: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    buttons: {
        marginTop:-120,
        flex: .3,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        marginTop: 50,
        width: 220,
        height: 150,
        alignSelf: 'center'

    }
});
