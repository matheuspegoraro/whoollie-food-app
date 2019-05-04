import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Actions} from 'react-native-router-flux';
import GLOBALS from '../../Config/Config';
import Pusher from 'pusher-js/react-native';

Pusher.logToConsole = true;

var pusher = new Pusher('7a6218b4df87abcc1c7c', {
    cluster: 'us2',
    forceTLS: true
});

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            isButtonPressed: false

        }
    }

    _clearOrder() {
        
    }

    _sendClientInfo(clientName) {
        var self = this;

        this.setState({ isButtonPressed: true })

        if (clientName !== '') {

            axios.post(`${GLOBALS.BASE_URL}/api/open/order`, {
                desName: clientName
            })
                .then(function (res) {
                    console.log(res.data);

                    var channel = pusher.subscribe(`${res.data.desChannel}`);
                    channel.bind(`close-order-id-${res.data.idOrder}`, function(data) {
                        axios.post(`${GLOBALS.BASE_URL}/api/clear/order`)
                        .then(function (response) {
                            Actions.ClientInfo();
                            console.log('order clearned');
                        })
                        .catch(function (response) {
                            console.log('error clear order')
                        })
                    });

                    self.setState({ name: '', isButtonPressed: false })
                    Actions.Home();

                })
                .catch(function (res) {
                    console.log(res.response);
                    self.setState({ isButtonPressed: false })
                    alert('erro')
                })

        } else {
            self.setState({ isButtonPressed: false })
            Alert.alert('Insira um nome válido!')
        }

    }


    _isButtonPressed() {
        if(this.state.isButtonPressed) {
            return(
                <ActivityIndicator size= 'large' color="#00ff00" />
            )
        } else {
            return (
                <TouchableOpacity
                    onPress={() => this._sendClientInfo(this.state.name)}
                >
                    <View style={{ width: 250, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', marginTop: 2 }}>
                        <Text style={styles.button}>Abrir comanda</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    }



    render() {
        return (
            <ImageBackground
                source={require('../imgs/bg.png')} style={{width: '100%', height: '100%'}}
            >
            <View style={styles.container}>
                <TextInput
                    style={styles.textinput}
                    onChangeText={ text => this.setState({ name: text }) }
                    placeholder={'Insira nome do cliente'}
                    placeholderTextColor={'gray'}
                />

                {this._isButtonPressed()}
               
            </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textinput: {
        padding: 10,
        margin: 2,
        height: 50,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        fontSize: 22
    },

    button: {
        fontSize: 20,
        color: 'white'
    }

});
