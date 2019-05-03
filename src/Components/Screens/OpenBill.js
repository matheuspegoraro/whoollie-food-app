import React, {Component} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Button, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Actions} from 'react-native-router-flux';
import GLOBALS from '../../Config/Config';


export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            isButtonPressed: false

        }
    }

    componentDidMount() {
        var self = this;

        var test = '';

        // requisição HTTP usando axios
        axios.get(`${GLOBALS.BASE_URL}/api/requests/current/order`)
            .then(function (response) {
                console.log(response.data);
                
                var temp = [];
                response.data.forEach(element => {
                    
                    test = element.idRequest;
                    
                    axios.get(`${GLOBALS.BASE_URL}/api/requests/products/${element.idRequest}`)
                        .then(function (res) {
                        
                        console.log(test);

                        var sub_temp = [];
                        res.data.forEach(element => {
                            
                            console.log(element.desName)
                            
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                    
                });
            })
            .catch(function (error) {
                console.log(error);
            });
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
        backgroundColor: 'cornsilk'
    },

    orderedItems: {
        flex: 9
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