import React, {Component} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';


export default class Cart extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            cartOptions: [],
            isCartLoaded: false
        };
    }


    componentDidMount() {
        var self = this;

        axios.get('http://technicalassist.com.br/api/cart')
        .then(function (response) {
            console.log(response.data);
            var temp = [];
            response.data.forEach(element => {
                temp.push(element)
            });
            self.setState({ cartOptions: temp })
            if(temp.length > 0){ self.setState({ isCartLoaded: true }) }
            console.log(self.state.cartOptions)

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    }


    _sendCart(){
        var self = this;

        if(this.state.cartOptions.length > 0) {
        axios.post('http://technicalassist.com.br/api/request')
            .then(function (response) {
                // handle success
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


    _isCartLoaded() {
        if (this.state.isCartLoaded) {
            return (
                <FlatList
                    data={this.state.cartOptions}
                    keyExtractor={(item, index) => item.desName}
                    renderItem={({ item }) =>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={{ fontSize: 18 }}>{item.qtTotal}</Text>
                            <Text style={{ fontSize: 18 }}>{item.desName}</Text>
                            <Text style={{ fontSize: 18 }}>{item.vlUnity}</Text>
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

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.child1}>
                    <Text style={styles.textTop}>Qtd.</Text>
                    <Text style={styles.textTop}>Nome</Text>
                    <Text style={styles.textTop}>Valor Unitário</Text>
                </View>

                <View style={styles.child2}>
                    {this._isCartLoaded()}
                </View>

                <TouchableWithoutFeedback
                    onPress={() => this._sendCart()}
                >
                    <View style={styles.child3}>
                        <Text style={styles.textBottom}>Concluir pedido</Text>
                    </View>
                </TouchableWithoutFeedback>
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

    child1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        backgroundColor: '#80ccff'
    },

    textTop: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },

    child2: {
        flex: 5
    },

    child3: {
        flex: 0.5,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center'
    },

    textBottom: {
        fontSize: 23,
        fontWeight: 'bold',
        color: '#fff'
    }
})