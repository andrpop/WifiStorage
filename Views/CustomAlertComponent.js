import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Modal} from 'react-native'
import PropTypes from 'prop-types';



export default class CustomAlertComponent extends Component {


    onPositiveButtonPress = () => {
        this.props.onPressPositiveButton();
    };

    render() {
        return (
            <Modal
                visible={this.props.displayAlert}
                transparent={true}
                animationType={"fade"}>
                <View style={styles.mainOuterComponent}>
                    <View style={styles.mainContainer}>
                        {/* First ROw - Alert Icon and Title */}
                        <View style={styles.topPart}>
                            {
                                this.props.displayAlertIcon
                                &&
                                <Image
                                    source={require('../Images/alert.png')}
                                    resizeMode={'contain'}
                                    style={styles.alertIconStyle}
                                />
                            }
                            {
                                this.props.displayUploadIcon
                                &&
                                <Image
                                    source={require('../Images/sent.png')}
                                    resizeMode={'contain'}
                                    style={styles.alertIconStyle}
                                />
                            }
                            <Text style={styles.alertTitleTextStyle}>
                                {`${this.props.alertTitleText}`}
                            </Text>
                        </View>
                        {/* Second Row - Alert Message Text */}
                        <View style={styles.middlePart}>
                            <Text style={styles.alertMessageTextStyle}>
                                {`${this.props.alertMessageText}`}
                            </Text>
                        </View>
                        {/* Third Row - Positive and Negative Button */}
                        <View style={styles.bottomPart}>
                            {
                                this.props.displayPositiveButton
                                &&
                                <TouchableOpacity
                                    onPress={this.onPositiveButtonPress}
                                    style={styles.alertMessageButtonStyle} >
                                    <Text style={styles.alertMessageButtonTextStyle}>{this.props.positiveButtonText}</Text>
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

CustomAlertComponent.propTypes = {
    displayUploadIcon:PropTypes.bool,
    displayAlert: PropTypes.bool,
    displayAlertIcon: PropTypes.bool,
    alertTitleText: PropTypes.string,
    alertMessageText: PropTypes.string,
    displayPositiveButton: PropTypes.bool,
    positiveButtonText: PropTypes.string,
    displayNegativeButton: PropTypes.bool,
    negativeButtonText: PropTypes.string,
    onPressPositiveButton : PropTypes.func,
    onPressNegativeButton : PropTypes.func,
}


const styles = StyleSheet.create({

    mainOuterComponent: {

        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000088'

    },

    alertMessageButtonStyle: {

        paddingHorizontal: 6,
        marginVertical: 4,
        borderRadius: 10,
        width:80,
        height:25,
        alignItems:'center',
        backgroundColor: 'orange',
        justifyContent: 'center'
    },

    alertMessageButtonTextStyle: {

        fontSize: 14,
        fontWeight: 'bold',
        color: 'black'
    },

    alertIconStyle: {

        borderRadius: 1,
        height: 40,
        width: 40
    },

    alertMessageTextStyle: {

        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 16,
        padding: 2

    },

    alertTitleTextStyle: {

        flex: 1,
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 2,
        marginHorizontal: 2
    },

    mainContainer: {
        flexDirection: 'column',
        height: '25%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#001a00',
        borderRadius: 10,
        padding: 4
    },

    topPart: {
        flex: 0.5,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    },

    middlePart: {
        flex: 1,
        width: '100%',
        paddingTop:10,
        paddingHorizontal:15,
        textAlign: 'center',
        textAlignVertical: 'center',
       // paddingH: 4,
        color: '#FFFFFF',
        fontSize: 16,
        marginVertical: 2
    },

    bottomPart: {
        flex: 0.5,
        width: '100%',
        flexDirection: 'row',
        padding: 4,
        justifyContent: 'space-evenly'
    }
});
