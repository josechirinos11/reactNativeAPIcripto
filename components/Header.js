import React from 'react'
import {
    SafeAreaView,
    Platform,

    StyleSheet,
    Text,

    View,
} from 'react-native';

const Header = () => {
    return (
        <Text style={styles.encabezado}>
            Criptomonedas
        </Text>
    )
}

const styles = StyleSheet.create({
    encabezado: {
        paddingTop: Platform.OS === 'ios' ? 50 : 10,
        fontFamily: 'Lato-Black',
        backgroundColor: '#5E49E2',
        padding: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontSize: 20, 
        color: '#fff',
        marginBottom: 30

    }
});

export default Header
