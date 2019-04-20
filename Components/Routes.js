import React from 'react';
import { StatusBar, Image  } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';

import Home from './Screens/Home';
import Login from './Screens/Login';
import Categories from './Screens/Categories';
import Options from './Screens/Options';
import ProductDescription from './Screens/ProductDescription';


export default props => (
    <Router navigationBarStyle={{ backgroundColor: "#FAAF18" }} titleStyle={{ color: "#fff" }}>
        <Stack key="root">
            <Scene key='Home' component={Home} title="HOME" hideNavBar={true} />
            <Scene key='Login' direction='vertical' initial component={Login} title="FAZER LOGIN" hideNavBar={false} />
            <Scene key='Categories' direction='vertical' component={Categories} title="CATEGORIAS" hideNavBar={false} />
            <Scene key='Options' direction='vertical' component={Options} title="OPÇÕES" hideNavBar={false} />
            <Scene key='ProductDescription' direction='vertical' component={ProductDescription} title="Descriçao" hideNavBar={false} />
        </Stack>
    </Router>
)