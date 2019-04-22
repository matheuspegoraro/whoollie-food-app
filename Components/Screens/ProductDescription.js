import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

export default class Categories extends Component {

    constructor(props){ 
        super(props) 

        this.state = { 
            productInfo: []

            };
    }

    
    componentWillMount() {
        this._loadInfo();
    }

    componentDidUpdate(prevProps) {
        if(this.props.idProduct !== prevProps.idProduct){
            this._loadInfo();
        }
    }

    _loadInfo() {
        var self = this;
        // requisicao http usando axios
        axios.get(`http://technicalassist.com.br/api/products/${this.props.idProduct}`)
            .then(function (response) {
                var temp = [];
                response.data.forEach(element => {
                    temp.push(element)
                });
                self.setState({ productInfo: temp })
                console.log(self.state.productInfo);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })

    }

    _addItemToCart(){
        var self = this;

        axios.post('http://technicalassist.com.br/api/cart/add/', {
            "idProduct": 36
          })
          .then(function (response) {
            alert('deu certo');
            console.log(response.data)
          })
          .catch(function (error) {
            alert('deu errado');
            console.log(error);
          });
    }


    render() {
        return (
            <View style={styles.container}>
                <View style={styles.child1}>
                    {/* I needed to map the productInfo by its index and then point to the property I want */}
                    <Image style={{ height: 200, width: null }} source={{ uri: `http://technicalassist.com.br${this.state.productInfo.map(index => index.desImagePath)}` }} />
                </View>

                <View style={styles.child2}>
                    {/* I needed to map the productInfo by its index and then point to the property I want */}
                    <Text style={styles.title}>{this.state.productInfo.map(index => index.desName)}</Text>
                    <Text style={styles.title}>R${this.state.productInfo.map(index => index.vlUnity)}</Text>
                </View>

                <View style={styles.child3}>
                    <Text style={styles.description}>{this.state.productInfo.map(index => index.desNote)}</Text>
                </View>

                <View style={styles.child4}>
                <TouchableWithoutFeedback 
                    onPress={() => this._addItemToCart()}
                >
                    <View style={styles.addButton}>
                        <Text style={styles.textButton}>Adicionar item ao carrinho</Text>
                        <Image style={{ height: 30, width: 30 }} source={require('../imgs/shoppingKart.png')} />
                    </View>
                </TouchableWithoutFeedback>
                </View>
            </View> 
        );
    }
}


const styles = StyleSheet.create({
    container: {
       flex: 1,
       marginTop: 50,
       backgroundColor: '#ebebe0'
    },

    child1: {
        flex: 3
    },

    child2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 5,
        marginTop: 5
    },

    child3: {
        flex: 4,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10

    },

    child4: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'stretch'
    },

    title: {
        fontSize: 27,
        fontWeight: 'bold'
    },

    description: {
        fontSize: 21
    },

    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#80ccff',
        padding: 15
    },

    textButton: {
        fontSize: 18
    }

})