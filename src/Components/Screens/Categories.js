import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import axios from 'axios';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import GLOBALS from '../../Config/Config'

export default class Categories extends Component {

    constructor(props){
        super(props) 

        this.state = { 
            desName: [],
            desCategory: '',
            dtRegister: ''

            };
    }

    
    componentDidMount() {

        var self = this;
        axios.get(`${GLOBALS.BASE_URL}/api/categories/products`)
            .then(function (response) {
                console.log(response.data);
                var temp = [];
                response.data.forEach(element => {
                    if( element.isActive == "1") {
                        temp.push(element)
                    }

                });

                self.setState({ desName: temp })
            })
            .catch(function (response) {
                console.log(response.data);
            })
    }


    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.desName}
                    keyExtractor={(item, index) => item.desName}
                    renderItem={({ item }) =>

                        <TouchableOpacity
                            onPress={() => Actions.Options({ idProductCategory: item.idProductCategory }) }
                        >
                            <ImageBackground style={{ width: null, height: 120, marginTop: 2 }} source={{ uri: `${GLOBALS.BASE_URL}${item.desImagePath}` }}>
                                <Text style={styles.itemName}>{item.desName}</Text>
                            </ImageBackground>

                        </TouchableOpacity>}


                >

                </FlatList>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
       flex: 1,
       marginTop: 50
    },

    itemName: {
        marginTop: 70,
       
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff'
    }

    

})