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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {db} from "./config";

var returnArr = [];

export default class MapScreen extends Component {

    map = null;


    constructor(props) {
        super(props);
        // this.getNetworks();


        this.state = {
            initialPosition: {

                latitude: 46.003127,
                longitude: 24.295159,
                latitudeDelta: 10.00,
                longitudeDelta: 5.00
            },
            coord: {
                latitude: 46.7891292,
                longitude: 23.5917804,
            },
            isWifiNetworkEnabled: null,
            ssid: null,
            pass: null,
            networks: [],
            ssidExist: null,
            currentSSID: null,
            currentBSSID: null,
            wifiList: null,
            modalVisible: false,
            status: null,
            level: null,
            ip: null,
        };

    }

    componentDidMount(): void {
        this.getNetworks();
    }

    getNetworks() {
        let ref = db.ref('Networks/');
        ref.on("value", (data) => {

            data.forEach(function (childSnapshot) {
                var item = childSnapshot.val();
                item.key = childSnapshot.key;
                returnArr.push(item);
            });

            this.setState({networks: returnArr});
        })

    }

    render() {

        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={this.state.initialPosition}
                >
                    {this.state.networks.map((marker, i) => (
                    <Marker

                        key={i}
                        coordinate={{
                            latitude: marker.Latitude,
                            longitude: marker.Longitude
                        }}
                    >
                        <Image source={require('../Images/point.png')} style={{height: 45, width: 45}}/>
                        <MapView.Callout>
                            <TouchableHighlight underlayColor='#dddddd'>
                                <View style={styles.tooltip}>
                                    <Text>{marker.LocationName}</Text>
                                </View>
                            </TouchableHighlight>
                        </MapView.Callout>
                    </Marker>
                    ))}
                </MapView>
            </View>
        );
    }
}
const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    tooltip: {
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    row: {
        flexDirection: 'row'
    },
    title: {
        fontSize: 20,
    },
    instructionsContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    instructionsTitle: {
        marginBottom: 10,
        color: '#333333'
    },
    instructions: {
        color: '#333333'
    },
    button: {
        padding: 5,
        width: 120,
        alignItems: 'center',
        backgroundColor: 'blue',
        marginRight: 15,
    },
    bigButton: {
        padding: 5,
        width: 180,
        alignItems: 'center',
        backgroundColor: 'blue',
        marginRight: 15,
    },
    buttonText: {
        color: 'white'
    },
    answer: {
        marginTop: 5,
    }
});
