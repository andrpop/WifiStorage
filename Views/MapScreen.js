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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default class MapScreen extends Component {

    map = null;

    constructor(props){
        super(props);


        this.state = {
            initialPosition: {

                latitude: 46.003127,
                longitude: 24.295159,
                latitudeDelta: 10.00,
                longitudeDelta: 5.00
            },

            isWifiNetworkEnabled: null,
            ssid: null,
            pass: null,
            ssidExist: null,
            currentSSID: null,
            currentBSSID: null,
            wifiList: null,
            modalVisible: false,
            status:null,
            level: null,
            ip: null,
        };

    }


    render() {

        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={this.state.initialPosition}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    // container: {
    //   flex: 1,
    //   padding:15,
    //   backgroundColor: '#F5FCFF',
    //   marginBottom:100
    // },
    container: {
        // ...StyleSheet.absoluteFillObject,
        // justifyContent: 'flex-end',
        // alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    row:{
        flexDirection:'row'
    },
    title: {
        fontSize: 20,
    },
    instructionsContainer: {
        padding:15,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    instructionsTitle: {
        marginBottom:10,
        color: '#333333'
    },
    instructions: {
        color: '#333333'
    },
    button:{
        padding:5,
        width:120,
        alignItems: 'center',
        backgroundColor:'blue',
        marginRight: 15,
    },
    bigButton:{
        padding:5,
        width:180,
        alignItems: 'center',
        backgroundColor:'blue',
        marginRight: 15,
    },
    buttonText:{
        color:'white'
    },
    answer:{
        marginTop: 5,
    }
});
