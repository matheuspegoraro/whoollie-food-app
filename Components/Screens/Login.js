import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Actions} from 'react-native-router-flux';


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
        axios.post('http://technicalassist.com.br/api/device/login', {
            desLogin: login,
            desPassword: password

        })
            .then(function (response) {
                console.log(response.data.message);
                if (response.data.login) {
                    self.setState({ isButtonPressed: false })

                    axios.post('http://technicalassist.com.br/api/open/order', {
                        desName: 'Marlon',
                        idBoard: 1
                    })
                        .then(function (res) {
                            console.log(res.data);
                        })
                        .catch(function (res) {
                            console.log(res.response);
                        })


                    Actions.Home();
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
                <ActivityIndicator size='large' />
            )
        } else {
            return (
                <TouchableOpacity
                    onPress={() => this._login(this.state.login, this.state.password)}
                >
                    <Text style={styles.button}>Entrar</Text>
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
        margin: 10,
        height: 50,
        width: 300,
        borderColor: 'gray',
        borderRadius: 30,
        borderWidth: 1,
        backgroundColor: '#f2f2f2'

    },

    main: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        fontSize: 30,
        color: 'green',
        fontWeight: 'bold'
    },

    bottom: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },

    textbottom: {
        color: '#fff',
        marginTop: 60,
        fontSize: 18
    }
});
