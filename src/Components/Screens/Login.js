import React, {Component} from 'react';
import { StyleSheet, Text, Modal, View, TextInput, TouchableOpacity, Button, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Actions} from 'react-native-router-flux';
import GLOBALS from '../../Config/Config';


export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            login: '',
            password: '',
            loading: false,
            isButtonPressed: false

        }
    }


    _login(login, password) {
        var self = this;
        this.setState({ isButtonPressed: true })
        // requisicao http usando axios
        axios.post(`${GLOBALS.BASE_URL}/api/device/login`, {
            desLogin: login,
            desPassword: password

        })
            .then(function (response) {
                console.log(response.data.message);
                if (response.data.login) {
                /* axios.post('http://technicalassist.com.br/api/open/order', {
                        desName: 'Marlon',
                        idBoard: 1
                    })
                        .then(function (res) {
                            console.log(res.data);
                        })
                        .catch(function (res) {
                            console.log(res.response);
                        }) */
                    self.setState({ isButtonPressed: false })
                    Actions.ClientInfo();
                } else { 
                    self.setState({ isButtonPressed: false })
                    Alert.alert('Usuário ou senha incorretos!')
                }
            })
            .catch(function (response) {
                self.setState({ isButtonPressed: false })
                console.log(response);
            })

    }

    _isButtonPressed() {
        if (this.state.isButtonPressed) {
            return (

             <ActivityIndicator size='large' color="#00ff00" />

            )
        } else {
            return (
                <TouchableOpacity
                    onPress={() => this._login(this.state.login, this.state.password)}
                >
                    <View style={{ width: 250, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'green', marginTop: 2 }}>
                        <Text style={styles.button}>Entrar</Text>

                    </View>
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <ImageBackground source={require('../imgs/loginImage.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
                <View style={styles.name}>
                    <Text style={styles.textname}>Whoollie Food</Text>
                </View>
                <View style={styles.main}>
                    <TextInput
                        style={styles.textinput}
                        onChangeText={text => this.setState({ login: text })}
                        placeholder={'Login'}
                        placeholderTextColor={'black'}
                    />
                    <TextInput
                        style={styles.textinput}
                        onChangeText={text => this.setState({ password: text })}
                        placeholder={'Senha'}
                        placeholderTextColor={'black'}
                        secureTextEntry={true}
                    />
                   { this._isButtonPressed() }
                    
                </View>
                <View style={styles.bottom}>
                    <TouchableOpacity
                        onPress={() => false}
                    >
                        <Text style={styles.textbottom}>Termos de uso</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    name: {
        flex: 1
    },

    textname: {
        fontSize: 35,
        fontWeight: 'bold',
        color: '#FFC72C',
        alignSelf: 'center',
        marginTop: 10
    },

    textinput: {
        padding: 10,
        margin: 2,
        height: 50,
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center'

    },

    main: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        fontSize: 24,
        color: 'white'
    },

    bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    textbottom: {
        color: '#fff',
        fontSize: 18
    }
});
