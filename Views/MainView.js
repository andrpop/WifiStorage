import React, {useRef} from "react";
import {
    StyleSheet,
    Text,
    View,
    PermissionsAndroid,
    ScrollView,
    Image,
    TouchableOpacity,
    TextInput,
    ImageBackground,
    TouchableHighlight,
    Modal
} from 'react-native';
import wifi from 'react-native-android-wifi';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firebase from "firebase";
import {db} from './config';
import CustomAlertComponent from "./CustomAlertComponent";

var wifiListComponents = [];

navigator.geolocation = require('@react-native-community/geolocation');

const LATITUDE_DELTA = 0.15;
const LONGITUDE_DELTA = 0.15;

var returnArr = [];


function createStation(longitude, latitude, name) {
    return {
        latitude: latitude,
        longitude: longitude,
        name: name
    };
}

export default class MainView extends React.Component {


    constructor(props) {
        super(props);
        this.onPressAlertPositiveButton = this.onPressAlertPositiveButton.bind(this);

        const highestTimeoutId = setTimeout(() => ';');
        for (let i = 0; i < highestTimeoutId; i++) {
            clearTimeout(i);
        }


        this.state = {
            date: '',
            Alert_Visibility: false,
            Success_Upload: false,
            isWifiNetworkEnabled: null,
            NeedLocation: null,
            ssid: null,
            pass: null,
            redBorderInput: false,
            capabilities: null,
            ssidExist: null,
            currentSSID: null,
            currentBSSID: null,
            wifiList: null,
            modalVisible: false,
            networks: [],
            locationName: 'Nespecificat',
            status: null,
            level: null,
            ip: null,
            send: '',
            markerPosition: {
                latitude: 46.7689,
                longitude: 23.5912,
                latitudeDelta: 0.15,
                longitudeDelta: 0.15
            }
        };

    }


    refreshPage() {
        this.forceUpdate()
        this.connectionStatusOnPress();
        this.ipOnPress();
        this.getSSIDOnPress();
        this.getBSSIDOnPress();
        this.connectionStatusOnPress();
        this.getWifiNetworksOnPress();
        this.getCoords();


        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes

        this.setState({
            //Setting the value of the date time
            date:
                date + '/' + month + '/' + year + ' ',
        });

    }


    async askForUserPermissions() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Wifi networks',
                    'message': 'We need your permission in order to find wifi networks'
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Thank you for your permission! :)");
            } else {
                console.log("You will not able to retrieve wifi available networks list");
            }
        } catch (err) {
            console.warn(err)
        }
    }

    serviceCheckOnPress() {
        wifi.isEnabled(
            (isEnabled) => {
                this.setState({isWifiNetworkEnabled: isEnabled});
                console.log(isEnabled);
            });
    }

    getCoords() {
        navigator.geolocation.getCurrentPosition((position) => {
                let lat = parseFloat(position.coords.latitude);
                let long = parseFloat(position.coords.longitude);
                let initialRegion = {
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                };
                this.setState({markerPosition: initialRegion});
            },
            (error) => alert(JSON.stringify(error)),
            {enableHighAccuracy: false, timeout: 100,}
        );

    }


    getSSIDOnPress() {
        wifi.getSSID((ssid) => {
            this.setState({currentSSID: ssid});
        });
    }

    getBSSIDOnPress() {
        wifi.getBSSID((bssid) => {
            this.setState({currentBSSID: bssid});
        });
    }

    getWifiNetworksOnPress() {
        var wifiArray = [];
        wifi.loadWifiList((wifiStringList) => {
                wifiArray = JSON.parse(wifiStringList);
                this.setState({
                    wifiList: wifiArray,
                    modalVisible: true
                });
            },
            (error) => {
                console.log(error);
            }
        );

    }

    connectionStatusOnPress() {
        wifi.connectionStatus((isConnected) => {
            this.setState({status: isConnected});
        });
    }


    ipOnPress() {
        wifi.getIP((ip) => {
            this.setState({ip: ip});
        });
    }


    renderModal() {
        let w;
        this.getSSIDOnPress();

        for (w in this.state.wifiList)
            if (this.state.wifiList[w].SSID === this.state.currentSSID) {
                this.setState({capabilities: this.state.wifiList[w].capabilities});
            }
        return wifiListComponents;
    }

    componentDidMount() {

        this.getNetworks();
        this.askForUserPermissions();
        this.ipOnPress();
        this.getSSIDOnPress();
        this.getBSSIDOnPress();
        this.connectionStatusOnPress();
        this.getWifiNetworksOnPress();
        this.getCoords();

        setTimeout(() => {
            this.renderModal();
        }, 1);


        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes

        this.setState({
            //Setting the value of the date time
            date:
                date + '/' + month + '/' + year + ' ',
        });
        this.setState()

    }

    Show_Custom_Alert() {

        this.setState({Alert_Visibility: true});
    }

    Show_Upload_Message() {
        this.setState({Success_Upload: true})
    }

    onPressAlertPositiveButton = () => {
        this.setState({Alert_Visibility: false});
        this.setState({Success_Upload: false});
        this.setState({NeedLocation: false});
    };


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

    validLocationName() {
        this.setState({redBorderInput: false});
    }


    addNewNetwork() {
        returnArr = [];
        this.getNetworks();
        let k = false;


        for (let w in returnArr)
            if (returnArr[w].BSSID === this.state.currentBSSID) {
                this.Show_Custom_Alert();
                k = true;
            }

        if (k === false) {
            let ESSID = this.state.currentSSID;
            let BSSID = this.state.currentBSSID;
            let date = this.state.date;
            let Latitude = this.state.markerPosition.latitude;
            let Longitude = this.state.markerPosition.longitude;
            let id;
            if (returnArr.length === 1)
                id = 1;
            else
                id = returnArr.length;

            let Capabilities = this.state.capabilities;
            let LocationName = this.state.locationName;
            if (LocationName === 'Nespecificat') {
                this.setState({NeedLocation: true});
                this.setState({redBorderInput: true});
            } else {
                db.ref('Networks/').push({
                    ESSID,
                    BSSID,
                    Latitude,
                    Longitude,
                    date,
                    Capabilities,
                    LocationName,
                    id

                }).then((data) => {
                    //success callback
                    console.log('data ', data)
                }).catch((error) => {
                    //error callback
                    console.log('error ', error)
                })
                this.Show_Upload_Message();
            }
        }

    }


    render() {
        return (
            <ImageBackground source={require('../Images/hexa.jpg')} style={styles.MainContainer}>
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../Images/wifi-area.png')}/>


                    <ScrollView style={styles.scrollView}>

                        {this.state.Alert_Visibility &&
                        <CustomAlertComponent
                            displayAlert={true}
                            displayAlertIcon={true}
                            alertTitleText={'Duplicarea datelor'}
                            alertMessageText={'Reteaua cu aceste caracteristici exista deja in baza de date!'}
                            displayPositiveButton={true}
                            positiveButtonText={'OK'}

                            onPressPositiveButton={this.onPressAlertPositiveButton}
                        />
                        }
                        {this.state.NeedLocation &&
                        <CustomAlertComponent
                            displayAlert={true}
                            displayAlertIcon={true}
                            alertTitleText={'Denumirea locatiei este nespecificata'}
                            alertMessageText={'Va rugam sa introduceti denumirea locatiei corespunzatoare retelei scanate!'}
                            displayPositiveButton={true}
                            positiveButtonText={'OK'}

                            onPressPositiveButton={this.onPressAlertPositiveButton}
                        />

                        }


                        {this.state.Success_Upload &&
                        <CustomAlertComponent
                            displayUploadIcon={true}
                            displayAlert={true}
                            displayAlertIcon={false}
                            alertTitleText={'Incarcare reusita'}
                            alertMessageText={'Datele de identificare a retelei dumneavoastra au fost incarcate cu succes!'}
                            displayPositiveButton={true}
                            positiveButtonText={'OK'}

                            onPressPositiveButton={this.onPressAlertPositiveButton}
                        />
                        }
                        <View style={styles.wrap}>
                            {this.state.status === false &&
                            <View style={styles.notConnected}>
                                <View style={styles.mesaj}>
                                    <Image
                                        style={styles.checkButton}
                                        source={require('../Images/X.png')}
                                    />
                                    <Text style={styles.infonc}>
                                        Nu sunteti conectat!
                                    </Text>
                                </View>
                                <Button
                                    containerStyle={{

                                        height: 50,
                                        width: 130,
                                        paddingRight: 20,
                                        justifyContent: 'center',
                                        backgroundColor: '#FFA500',
                                        borderRadius: 20,
                                    }}
                                    style={{fontSize: 15, color: 'black', fontWeight: 'bold'}}
                                    onPress={() => this.refreshPage()}

                                >
                                    <TouchableHighlight>
                                        <Image
                                            style={styles.StartButton}
                                            source={require('../Images/refresh.png')}
                                        />
                                    </TouchableHighlight>
                                    Refresh</Button>
                            </View>}

                            {this.state.status &&
                            <View style={{alignItems: 'center'}}>
                                <View style={styles.mesaj}>
                                    <Image
                                        style={styles.checkButton}
                                        source={require('../Images/check.png')}
                                    />
                                    <Text style={styles.infoc}>
                                        Sunteti conectat!
                                    </Text>
                                </View>
                                <View
                                    style={[styles.searchSection, this.state.redBorderInput && styles.TextInputError]}>

                                    <Icon style={styles.searchIcon} name="location-city" size={25} color="#000"/>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Denumirea Locatiei"
                                        onChangeText={(searchString) => {
                                            this.setState({locationName: searchString})
                                        }}
                                        onFocus={() => this.setState({ redBorderInput: false })}
                                        underlineColorAndroid="transparent"
                                    />
                                </View>

                                <Text style={styles.info}>
                                    Denumire retea: "{this.state.currentSSID}"
                                </Text>
                                <Text style={styles.info}>
                                    Adresa MAC retea: {this.state.currentBSSID}
                                </Text>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={styles.info}>Capabilitati:</Text>
                                    <Text style={styles.infoCap}>
                                        {this.state.capabilities}
                                    </Text>
                                </View>
                                <Text style={styles.info}>
                                    IP: {this.state.ip}
                                </Text>
                                <View>
                                    <Text style={styles.info}>
                                        Coordonate: {this.state.markerPosition.latitude} , {this.state.markerPosition.longitude}
                                    </Text>
                                </View>

                                <Text style={styles.info}>Data: {this.state.date}
                                </Text>
                                <View style={styles.buttons}>
                                    <Button
                                        containerStyle={{
                                            paddingRight: 30,
                                            height: 50,
                                            width: 200,
                                            overflow: 'hidden',
                                            backgroundColor: '#FFA500',
                                            borderRadius: 20,
                                        }}
                                        style={{fontSize: 15, color: 'black', marginLeft: 10}}
                                        onPress={() => this.addNewNetwork()}

                                    >
                                        <TouchableHighlight>
                                            <Image
                                                style={styles.StartButton}
                                                source={require('../Images/wifi-.png')}
                                            />
                                        </TouchableHighlight>
                                        INCARCA DATELE</Button>

                                </View>
                                <View style={{backgroundColor: 'rgba(130, 224, 170)'}}>
                                    <Text style={{color: 'green'}}>{this.state.send}</Text>
                                </View>

                            </View>}

                        </View>

                    </ScrollView>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({

    MainContainer: {
        flex: 1,
        //  justifyContent: 'center',
        //alignItems: 'center',
    },
    checkButton: {

        width: 30,
        height: 30,
    },
    StartButton: {
        width: 40,
        marginLeft: 10,
        marginTop: 3,
        height: 40,
        backgroundColor: '#FFA500'
    },
    buttons: {

        paddingTop: 5,


    },
    Alert_Main_View: {

        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#009688",
        height: 200,
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,

    },

    Alert_Title: {

        fontSize: 25,
        color: "#fff",
        textAlign: 'center',
        padding: 10,
        height: '28%'

    },

    Alert_Message: {

        fontSize: 22,
        color: "#fff",
        textAlign: 'center',
        padding: 10,
        height: '42%'

    },

    buttonStyle: {

        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },

    TextStyle: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 22,
        marginTop: -5
    },
    searchSection: {
        flex: 1,
        borderRadius: 20,
        flexDirection: 'row',

        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        borderColor: 'red',

        borderRadius: 20,
        backgroundColor: '#fff',
        color: '#424242',
    },
    TextInputError: {
        flex: 1,
        borderRadius: 20,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor:'red',
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },

    mesaj: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,

    },
    notConnected: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    container: {
        display: 'flex',
        // position:'absolute',
        padding: 20,
        //alignContent: 'center',
        justifyContent: 'center',
    },

    scrollView: {
        marginTop: 10,
        backgroundColor: 'rgba(  178, 186, 187,  0.9)',
        borderRadius: 35,
        alignContent: 'center',
        padding: 10,

    },
    image: {
        marginTop: 3,
        // position:'absolute'
        width: 180,
        height: 130,
        alignSelf: 'center'

    },
    info: {
        fontWeight: 'bold',
        fontSize: 15,
        padding: 5
    },
    infoCap: {
        fontWeight: 'bold',
        fontSize: 13,
        padding: 5
    },
    infoc: {
        fontWeight: 'bold',
        padding: 5,
        color: 'green'
    },
    infonc: {
        fontWeight: 'bold',
        padding: 5,
        color: 'red'
    },
    wrap: {
        flexDirection: 'column',
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    }


});

