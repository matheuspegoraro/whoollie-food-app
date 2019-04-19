import React from 'react';
import { StatusBar, Image  } from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';

import Home from './Screens/Home';
import Login from './Screens/Login';
import Categories from './Screens/Categories';
import Options from './Screens/Options';


export default props => (
    <Router navigationBarStyle={{ backgroundColor: "#FAAF18" }} titleStyle={{ color: "#fff" }}>
        <Stack key="root">
            <Scene key='Home' component={Home} initial title="HOME" hideNavBar={true} />
            <Scene key='Login' direction='vertical' component={Login} title="FAZER LOGIN" hideNavBar={false} />
            <Scene key='Categories' direction='vertical' component={Categories} title="CATEGORIAS" hideNavBar={false} />
            <Scene key='Options' direction='vertical' component={Options} title="OPÇÕES" hideNavBar={false} />
        </Stack>
    </Router>
)