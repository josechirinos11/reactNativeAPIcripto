import React from 'react'
import { useEffect, useState } from 'react';
import {
    Alert,
    TouchableHighlight,

    StyleSheet,
    Text,

    View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const Formulario = (
    {moneda,
    criptomoneda,
    setMoneda,
    setCriptomoneda,
    setConsultarApi,
    setResultado
}
    ) => {




    const [ criptomonedas, guardarCriptomonedas ] = useState([]);   
    

    useEffect(() => {
        
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const resultado = await axios.get(url)

          
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI()
    },[moneda])


    const obtenerMoneda = (moneda) => {
                setMoneda(moneda)
    }

    const obtenerCriptomoneda = cripto => {
        setCriptomoneda(cripto)
    }

    const cotizarPrecio = () => {
        // validar que agrego moneda y cripto
        if(moneda.trim() === '' || criptomoneda.trim() === '') {
            mostrarAlerta()
            return
        }
        console.log('cotizando......')
             // Cambiar el state de consultar api
             setConsultarApi(true)
    }



    const mostrarAlerta = () => {
        Alert.alert(
            'Error...',
            'Ambos campos son obligatorios', 
            [
                {text: 'OK'}
            ]
        )
    }

    return (
        <View>
            <Text style={styles.label}>Moneda</Text>
            <Picker
               selectedValue={moneda}
                onValueChange={moneda => obtenerMoneda(moneda)} 
            >
                <Picker.Item label="- Seleccione -" value="" />
                <Picker.Item label="Dolar Estadounidense" value="USD" />
                <Picker.Item label="Bolivar Venezolano" value="BS" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="GBP" />
            </Picker>

            <Text style={styles.label}>Criptomoneda</Text>
            <Picker
               selectedValue={criptomoneda}
                onValueChange={cripto => obtenerCriptomoneda(cripto)} 
            >
                <Picker.Item label="- Seleccione -" value="" />
                {criptomonedas.map( cripto => (
                    <Picker.Item key={cripto.CoinInfo.Id} label={cripto.CoinInfo.FullName} value={cripto.CoinInfo.Name} /> 
                ))}
            </Picker>
            <TouchableHighlight
                style={styles.btnCotizar}
                onPress={ () => cotizarPrecio() }
            >
                <Text style={styles.textoCotizar}>Cotizar</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 22,
        marginVertical: 20,
    },
    btnCotizar: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20
        
    },
    textoCotizar: {
        color: '#FFF',
        fontSize: 18,
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center'
    }
});

export default Formulario
