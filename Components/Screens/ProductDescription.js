import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback, ImageBackground } from 'react-native';
import axios from 'axios';

export default class Categories extends Component {

    constructor(props){ 
        super(props) 

        this.state = { 
            productInfo: [],
            categoryId: 0

            };
    }

    
    componentWillMount() {
        this._loadInfo();
    }

    componentDidUpdate() {
        this._loadInfo();
    }

    _loadInfo() {
        var self = this;
        // requisicao http usando axios
        axios.get(`http://technicalassist.com.br/api/products/${this.props.idProduct}`)
            .then(function (response) {
                // handle success
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }


    render() {
        return (
         /*   <View style={styles.container}>
                <TouchableWithoutFeedback 
                    onPress={() => false}
                >
                    <View style={styles.kart}>
                        <Text style={styles.text}>Ver carrinho de pedidos</Text>
                        <Image style={{ height: 30, width: 30 }} source={require('../imgs/shoppingKart.png')} />
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.body}>
                    <FlatList
                        data={this.state.options}
                        keyExtractor={(item, index) => item.desName}
                        numColumns={2}
                        renderItem={({ item }) =>

                            <TouchableWithoutFeedback
                                onPress={() => false}
                            >
                                <ImageBackground style={{ width: 180, height: 180, margin: 8, }} source={{ uri: `http://technicalassist.com.br${item.desImagePath}` }}>
                                    <Text style={styles.itemName}>{item.desName}</Text>
                                </ImageBackground>
                            </TouchableWithoutFeedback>}
                    >

                    </FlatList>
                </View>
            </View> */
            <Text style={{ flex: 1, alignContent: 'center' }}>{this.props.idProduct}</Text>
        );
    }
}


const styles = StyleSheet.create({
    container: {
       flex: 1,
       marginTop: 50
    },

})