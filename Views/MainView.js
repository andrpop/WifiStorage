import React, { useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    PermissionsAndroid,
    ScrollView,
    Image,
    TextInput,
    ImageBackground,
    TouchableHighlight,
} from 'react-native';
import wifi from 'react-native-android-wifi';
import Button from 'react-native-button';
import Icon from 'react-native-vector-icons/MaterialIcons';


navigator.geolocation = require('@react-native-community/geolocation');

const LATITUDE_DELTA = 0.15;
const LONGITUDE_DELTA = 0.15;

function createStation(longitude, latitude, name) {
    return {
        latitude: latitude,
        longitude: longitude,
        name: name
    };
}

export default class MainView extends React.Component {

    constructor(props){
    super(props);
    this.state = {
        date:'',
      isWifiNetworkEnabled: null,
      ssid: null,
      pass: null,
        capabilities:null,
      ssidExist: null,
      currentSSID: null,
      currentBSSID: null,
      wifiList: null,
      modalVisible: false,
      status:null,
      level: null,
      ip: null,
        send:'',
        markerPosition: {
            latitude: 46.7689,
            longitude: 23.5912,
            latitudeDelta: 0.15,
            longitudeDelta: 0.15
        }
    };

  }

  componentDidMount (){
    console.log(wifi);
    this.askForUserPermissions();
  }

  refreshPage() {
 this.forceUpdate()
 this.connectionStatusOnPress();

    }

  async askForUserPermissions() {
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Wifi networks',
            'message': 'We need your permission in order to find wifi networks'
          }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Thank you for your permission! :)");
      } else {
        console.log("You will not able to retrieve wifi available networks list");
      }
    } catch (err) {
      console.warn(err)
    }
  }

  serviceCheckOnPress(){
    wifi.isEnabled(
        (isEnabled)=>{
          this.setState({isWifiNetworkEnabled: isEnabled});
          console.log(isEnabled);
        });
  }

  getCoords(){
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
          (error) =>alert(JSON.stringify(error)),
          {enableHighAccuracy: false, timeout: 100 ,}
      );

  }

  serviceSetEnableOnPress(enabled){
    wifi.setEnabled(enabled)
  }

  connectOnPress(){
    wifi.findAndConnect(this.state.ssid, this.state.pass, (found) => {
      this.setState({ssidExist:found});
    });
  }

  disconnectOnPress(){
    wifi.disconnect();
  }

  getSSIDOnPress(){
    wifi.getSSID((ssid) => {
      this.setState({currentSSID:ssid});
    });
  }

  getBSSIDOnPress(){
    wifi.getBSSID((bssid) => {
      this.setState({currentBSSID:bssid});
    });
  }

    getWifiNetworksOnPress(){
        var wifiArray = [];
    wifi.loadWifiList((wifiStringList) => {
       //   console.log(wifiStringList);
          wifiArray = JSON.parse(wifiStringList);
          this.setState({
            wifiList:wifiArray,
            modalVisible: true
          });
        },
        (error) => {
          console.log(error);
        }
    );


  }

  connectionStatusOnPress(){
    wifi.connectionStatus((isConnected) => {
      this.setState({status:isConnected});
    });
  }

  levelOnPress(){
    wifi.getCurrentSignalStrength((level)=>{
      this.setState({level:level});
    });
  }

  ipOnPress(){
    wifi.getIP((ip)=>{
      this.setState({ip:ip});
    });
  }

  afisareMesaj(){
      this.setState({send:'Datele au fost trimise cu succes!'})
      setTimeout(function(){

          //Put All Your Code Here, Which You Want To Execute After Some Delay Time.
    this.setState({send:''})
          this.props.navigation.navigate('Home')
      }.bind(this), 1000);
  }

  renderModal(){
    var wifiListComponents = [];
    for (w in this.state.wifiList){
      wifiListComponents.push(
          <View key={w} style={styles.instructionsContainer}>
            <Text style={styles.instructionsTitle}>{this.state.wifiList[w].SSID}</Text>
            <Text>BSSID: {this.state.wifiList[w].BSSID}</Text>
            <Text>Capabilities: {this.state.wifiList[w].capabilities}</Text>
            <Text>Frequency: {this.state.wifiList[w].frequency}</Text>
            <Text>Level: {this.state.wifiList[w].level}</Text>
            <Text>Timestamp: {this.state.wifiList[w].timestamp}</Text>
          </View>
      );
    }
    return wifiListComponents;
  }

    componentDidMount() {
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

    render() {
        return (
            <ImageBackground source={require('../Images/hexa.jpg')} style={styles.MainContainer}>
            <View style={styles.container}>
                <Image style={styles.image} source={require('../Images/wifi-area.png')}/>
                <ScrollView style={styles.scrollView}>


                    <View style={styles.wrap}>
                        {this.state.status===false &&
                        <View style={styles.notConnected}>
                        <View style={styles.mesaj} >
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
                                    width:130,
                                    paddingRight: 20,
                                    justifyContent:'center',
                                    backgroundColor: '#FFA500',
                                    borderRadius: 20,
                                }}
                                style={{fontSize: 15, color: 'black', fontWeight:'bold'}}
                                onPress={()=>this.refreshPage()}

                            >
                                <TouchableHighlight >
                                    <Image
                                        style={styles.StartButton}
                                        source={require('../Images/refresh.png')}
                                    />
                                </TouchableHighlight>
                                Refresh</Button>
                        </View>}

                        {this.state.status &&
                        <View style={{        alignItems:'center'}}>
                            <View style={styles.mesaj}>
                                <Image
                                    style={styles.checkButton}
                                    source={require('../Images/check.png')}
                                />
                                <Text style={styles.infoc}>
                                    Sunteti conectat!
                                </Text>
                        </View>
                            <View style={styles.searchSection}>
                                <Icon style={styles.searchIcon} name="location-city" size={25} color="#000"/>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Denumirea Locatiei"
                                    onChangeText={(searchString) => {this.setState({searchString})}}
                                    underlineColorAndroid="transparent"
                                />
                            </View>

                        <Text style={styles.info}>
                            Denumire retea: "{this.state.currentSSID}"
                        </Text>
                    <Text style={styles.info}>
                        Adresa MAC retea: {this.state.currentBSSID}
                    </Text>
                        <Text style={styles.info}>
                            IP: {this.state.ip}
                        </Text>
                        <View>
                            <Text style={styles.info}>
                                Coordonate: {this.state.markerPosition.latitude} , {this.state.markerPosition.longitude}
                            </Text>

                        </View>
                    {/*<ScrollView>*/}
                    {/*    {this.renderModal()}*/}
                    {/*</ScrollView>*/}
                    {/*<Text>*/}
                    {/*    Latitude: {this.state.markerPosition.latitude}*/}
                    {/*</Text>*/}
                    {/*<Text>*/}
                    {/*    Longitude: {this.state.markerPosition.longitude}*/}
                    {/*</Text>*/}
                    <Text style={styles.info}>Data: {this.state.date}
                    </Text>
                            <View style={styles.buttons}>
                                <Button
                                    containerStyle={{
                                        // marginTop: -50,
                                        paddingRight: 30,
                                        height: 50,
                                        width:200,
                                        overflow: 'hidden',
                                        backgroundColor: '#FFA500',
                                        borderRadius: 20,
                                    }}
                                    style={{fontSize: 15, color: 'black',marginLeft:10}}
                                     onPress={()=>this.afisareMesaj()}
                                >
                                    <TouchableHighlight >
                                        <Image
                                            style={styles.StartButton}
                                            source={require('../Images/wifi-.png')}
                                        />
                                    </TouchableHighlight>
                                    INCARCA DATELE</Button>

                                                                {/*<Button*/}
                                {/*    containerStyle={{*/}
                                {/*        // marginTop: -50,*/}
                                {/*        paddingRight: 30,*/}
                                {/*        height: 50,*/}
                                {/*        width:200,*/}
                                {/*        overflow: 'hidden',*/}
                                {/*        backgroundColor: '#FFA500',*/}
                                {/*        borderRadius: 20,*/}
                                {/*    }}*/}
                                {/*    style={{fontSize: 15, color: 'black',marginLeft:10}}*/}
                                {/*    onPress={()=>this.renderModal()}*/}
                                {/*>*/}
                                    {/*<TouchableHighlight >*/}
                                    {/*    <Image*/}
                                    {/*        style={styles.StartButton}*/}
                                    {/*        source={require('../Images/wifi-.png')}*/}
                                    {/*    />*/}
                                    {/*</TouchableHighlight>*/}
                                    {/*Render Modal</Button>*/}
                            </View>
                            <View style={{backgroundColor:'rgba(130, 224, 170)'}}>
                            <Text style={{color:'green'}}>{this.state.send}</Text>
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
    checkButton:{

        width:30,
        height:30,
    },
    StartButton:{
        width:40,
        marginLeft:10,
        marginTop:3,
        height:40,
       backgroundColor: '#FFA500'
    },
    buttons: {

        padding:15,

    },
    searchSection: {
        flex: 1,
        borderRadius:20,
        flexDirection: 'row',

        width:300,
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
        borderRadius: 20,
        backgroundColor: '#fff',
        color: '#424242',
    },

    mesaj: {
         flexDirection: 'row',
        alignItems:'center',
        padding:15,

    },
    notConnected:{
        justifyContent:'center',
        flexDirection:'column',
        alignItems:'center'
    },
    container: {
        display:'flex',
        // position:'absolute',
        padding:20,
        //alignContent: 'center',
        justifyContent: 'center',
    },

    scrollView: {
      //  position:'absolute',
        marginTop:40,
        backgroundColor: 'rgba(  178, 186, 187,  0.9)',
        borderRadius:35,
        alignContent:'center',
        padding:10,
        // opacity:0.9

    },
    image: {
        marginTop: 20,
        // position:'absolute'
        width: 180,
        height: 130,
        alignSelf: 'center'

    },
    info:{fontWeight:'bold',
        fontSize:15,
        padding:5
    },
    infoc:{fontWeight:'bold',
        padding:5,
        color:'green'
    },
    infonc:{fontWeight:'bold',
        padding:5,
        color:'red'
    },
    wrap:{
        flexDirection:'column',
       // marginTop: -30,
        paddingTop:20,
        alignItems:'center',
        justifyContent:'space-between',
        // margin:20,
        flex:1
    }


});
