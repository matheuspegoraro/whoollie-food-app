import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Actions} from 'react-native-router-flux';


export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            isButtonPressed: false

        }
    }



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.orderedItems}>

                </View>
                <View style={styles.totalPrice}>
                    <Text>R$ 100,00</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'cornsilk',
        justifyContent: 'center',
        alignItems: 'center'
    },

    orderedItems: {
        flex: 9,
        backgroundColor: 'red'
    },

    totalPrice: {
        flex: 1,
        flexDirection: 'row',
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    }

});