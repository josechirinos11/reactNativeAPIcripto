
import React from 'react';
import { useEffect, useState } from 'react';
import {
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  
  View,
} from 'react-native';

import Header from './components/Header';
import Cotizacion from './components/Cotizacion';
import Formulario from './components/Formulario';
import axios from 'axios';


const App = () => {
  const [moneda, setMoneda] = useState('')
  const [criptomoneda, setCriptomoneda] = useState('')
  const [consultarApi, setConsultarApi] = useState(false)
  const [resultado,setResultado] = useState({})
  const [ cargando, guardarCargando] = useState(false);

  useEffect(() => {

    console.log(moneda)
    console.log(criptomoneda)

    const cotizarCriptoMoneda = async () => {
      if(consultarApi){
        // consultar a la api
        const url=`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        
        const resultado = await axios.get(url)
        console.log(resultado.data.DISPLAY)
        setResultado(resultado.data.DISPLAY)
       
        setConsultarApi(false)


         // console.log(resultado.data.DISPLAY[criptomoneda][moneda] );
         guardarCargando(true);

         // Ocultar el spinner y mostrar el resultado
         setTimeout(() => {
          setResultado(resultado.data.DISPLAY[criptomoneda][moneda] );
          setConsultarApi(false);
             guardarCargando(false);
             
         }, 3000);




      }

    }


    cotizarCriptoMoneda()
  
    
  },[consultarApi])

  
  // mostrar el spinner o el resultado
  const componente = cargando ? <ActivityIndicator size="large" color="#5E49E2" /> : <Cotizacion  resultado={resultado} />

  return (
    <>
     <ScrollView>
     <Header />
     <Image 
     style={styles.imagen}
     source={require('./assets/img/cryptomonedas.png')}
     />
     <View style={styles.contenido}>
     <Formulario
     moneda={moneda}
     criptomoneda={criptomoneda}
     setMoneda={setMoneda}
     setCriptomoneda={setCriptomoneda}
     setConsultarApi={setConsultarApi}
     setResultado={setResultado}
     />
     </View>

     <View style={{ marginTop: 40 }}>
          {componente}
        </View>
        </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 250,
    marginHorizontal: '2.5%'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
 
});

export default App;
