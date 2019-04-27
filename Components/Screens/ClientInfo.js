import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Actions} from 'react-native-router-flux';


export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: ''

        }
    }

    _sendClientInfo(clientName) {
        var self = this;

        axios.post('http://technicalassist.com.br/api/open/order', {
            desName: clientName
        })
            .then(function (res) {
                console.log(res.data);

                Actions.Home();

            })
            .catch(function (res) {
                console.log(res.response);
            })

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
                    placeholder={'Insira um nome'}
                    placeholderTextColor={'white'}
                />

                <Button
                    onPress={() => this._sendClientInfo(this.state.name)}
                    title="Abrir comanda"
                    color="#841584" 
                    accessibilityLabel="Abrir comanda para esse cliente"
                />
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
        padding: 5,
        margin: 30,
        fontSize: 30,
        color: '#fff',
        borderBottomWidth: 1
    }

});
