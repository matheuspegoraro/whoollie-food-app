import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import axios from 'axios';


export default class Home extends Component {

   /* componentWillMount() {
        // requisicao http usando axios
        axios.post('http://technicalassist.com.br/api/device/login', {
            desLogin: 'ipad01',
            desPassword: '1234'

        })
            .then(function (response) {
                console.log(response.data.message);
            })
            .catch(function (response) {
                console.log(response);
            })

    } */

    render() {
        return(
            <View style={styles.container}>
                <View>
                    <TouchableOpacity
                        onPress={() => Actions.Categories()}
                    >
                        <Image style={styles.imgMenu} source={require('../imgs/menu.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => false}
                    >
                        <Image style={styles.imgMenu} source={require('../imgs/bill.png')} />
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity
                        onPress={() => Actions.Cart()}
                    >
                        <Image style={styles.imgMenu} source={require('../imgs/cart.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => false}
                    >
                        <Image style={styles.imgMenu} source={require('../imgs/about.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'cornsilk',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },

    imgMenu: {
        margin: 20,
        width: 130,
        height: 170
    }

})
