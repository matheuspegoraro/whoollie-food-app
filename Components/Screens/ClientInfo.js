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

    _sendClientInfo(clientName) {
        var self = this;

        this.setState({ isButtonPressed: true })

        if (clientName !== '') {

            axios.post('http://technicalassist.com.br/api/open/order', {
                desName: clientName
            })
                .then(function (res) {
                    console.log(res.data);

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
                <ActivityIndicator size= 'large' />
            )
        } else {
            return (
                <Button
                onPress={() => this._sendClientInfo(this.state.name)}
                title="Abrir comanda"
                color="#841584"
                accessibilityLabel="Abrir comanda para esse cliente"
            />
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
                    placeholder={'Insira um nome'}
                    placeholderTextColor={'white'}
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
        padding: 5,
        margin: 30,
        fontSize: 30,
        color: '#fff',
        borderBottomWidth: 1
    }

});
