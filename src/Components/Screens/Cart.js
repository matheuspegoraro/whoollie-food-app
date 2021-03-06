import React, {Component} from 'react';
import { View, Modal, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import GLOBALS from '../../Config/Config';


export default class Cart extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            cartOptions: [],
            isCartLoaded: false,
            number: 1,
            isButtonPressed: false,
            totalValue: 0

        };
    }


    componentWillMount() {
        var self = this;

        axios.get(`${GLOBALS.BASE_URL}/api/cart`)
        .then(function (response) {
            console.log(response.data);
            var temp = [];
            response.data.forEach(element => {
                temp.push(element)
            });
            self.setState({ cartOptions: temp })
            if(temp.length > 0){ self.setState({ isCartLoaded: true, number: 0 }) }
            console.log(self.state.cartOptions)

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }


    _sendCart(){
        var self = this;
        this.setState({ isButtonPressed: true })

        if(this.state.cartOptions.length > 0) {
        axios.post(`${GLOBALS.BASE_URL}/api/request`)
            .then(function (response) {
                // handle success
                self.setState({ isButtonPressed: false })
                console.log(response.data);
                self.setState({ cartOptions: [], isCartLoaded: false });
                Alert.alert(
                    'Pedido feito com sucesso!',
                    'Basta aguardar :)',
                    [
                        { text: 'Okay', onPress: () => Actions.Home() }
                    ],
                    { cancelable: false }
                )

            })
            .catch(function (error) {
                // handle error
                console.log(error.message);
            });

        } else {
            self.setState({ isButtonPressed: false })
            Alert.alert(
                'Carrinho vazio!',
                'Para fazer um pedido veja o menu de opções :)',
                [
                    {text: 'Ver opções', onPress: () => Actions.Categories()},
                    {text: 'Voltar ao menu principal', onPress: () => Actions.Home()}
                ],
                { cancelable: true}
            )
        }
    }


    _removeItemFromCart(idProduct){
        var self = this;
        this.setState({ isButtonPressed: true })

        axios.post(`${GLOBALS.BASE_URL}/api/cart/remove/all/${idProduct}`)
        .then(function (response) {
            // handle success

            axios.get(`${GLOBALS.BASE_URL}/api/cart`)
            .then(function (response) {
                console.log(response.data);
                var temp = [];
                response.data.forEach(element => {
                    temp.push(element)
                });
                self.setState({ cartOptions: temp, isButtonPressed: false })
                if (temp.length > 0) { 
                    self.setState({ isCartLoaded: true }) 
                } else { self.setState({ isCartLoaded: false }) }


                console.log(self.state.cartOptions)
                
    
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
            

        })
        .catch(function (error) {
            // handle error
            console.log(error.message);
        });
    }


    _isCartLoaded() {
        if (this.state.isCartLoaded) {
            return (
                <FlatList
                    data={this.state.cartOptions}
                    keyExtractor={(item, index) => item.desName}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 5, backgroundColor: this.state.number++ % 2 === 0 ? 'lightgray' : 'darkgray' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20 }}>{item.qtTotal} X</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20 }}>{item.desName}</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 20 }}>R${item.qtTotal * item.vlUnity}</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <TouchableOpacity
                                    onPress={() => this._removeItemFromCart(item.idProduct)}
                                >
                                    <Image style={{ width: 30, height: 30 }} source={require('../imgs/deleteIcon.png')} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    }
                >
                </FlatList>
            );
        }
        else {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image style={{ width: 200, height: 200 }} source={require('../imgs/empty-cart.png')} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nenhum item no carrinho atualmente!</Text>
                </View>
            );
        }
    }

    _totalValue(){
        var temp = 0;
                this.state.cartOptions.forEach(element => {
                    temp = temp + element.qtTotal*element.vlUnity;
                });

      return temp;

    }

    _isButtonPressed() {
        if (this.state.isButtonPressed) {
            return (
                <ActivityIndicator size='large' />
            );
        } else {
            return (
                <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#fff' }}>
                    <View style={styles.price}>
                        <Text style={styles.textPrice}> R${ this._totalValue() }</Text>
                    </View>
                
                <TouchableWithoutFeedback
                    onPress={() => this._sendCart()}
                >
                    <View style={styles.child3}>
                        <Text style={styles.textButton}>Concluir pedido</Text>
                    </View>
                </TouchableWithoutFeedback>
                </View>
            );
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.child2}>
                    {this._isCartLoaded()}
                </View>
                {this._isButtonPressed()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ebebe0',
        justifyContent: 'center',
        
    },

    textTop: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },

    child2: {
        flex: 5,
        marginTop: 55
    },

    child3: {
        backgroundColor: '#3cb371',
        borderRadius: 10,
        flexDirection: 'row',
        padding: 10
    },

    textButton: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold'
    },

    price: {
        borderWidth: 0.5,
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#fff'
    },

    textPrice: {
        fontSize: 21,
        fontWeight: 'bold'
    }
})