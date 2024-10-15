import { StatusBar } from 'expo-status-bar';
import { Alert, Button, ImageBackground, StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {

  const [vicc,setVicc] = useState("")
  const [adatok,setAdatok] = useState([])
  const [szoveg,setSzoveg] = useState("")

  const tomb=[
    {
      "szoveg":"– Miért mennek a halottak boltba? ??? – Élesztőért",     
      "tipus":"favicc"
    },
    {
      "szoveg":"- Ki az abszolút rendőr? - ??? - Aki letartóztatja a gyilkos galócát és a lopótököt is!",      
      "tipus":"rendőr"
    },
    {
      "szoveg":"-Fiam, te miért öltöztél egy sima hétköznapi vacsorához talpig feketében? -Azzal ne törődjön mama! Maga csak egye inkább azt a finom gombapaprikást!",
      "tipus":"anyós"
    },
    {
      "szoveg":"-Hol csökkent leggyorsabban a rádióaktivitás a 86-os csernobili katasztrófa után? -A Pravadában...",
      "tipus":"szőke nő"
    },
    {
      "szoveg":"-Hogy hívják a sarkköri kocsmát? -Eszkrimó",
      "tipus":"kocsma"
    }
  ]

  const sorsol = () =>{
    let veletlen = Math.floor(Math.random()*tomb.length)
    //alert(veletlen)
    //Alert.alert(tomb[veletlen].szoveg)
    setVicc(tomb[veletlen].szoveg)
  }

  const letoltes = async() =>{
    let x = await fetch("https://api.chucknorris.io/jokes/random")
    let y = await x.json()
    setAdatok(y)
  }

  function Udvozles()
  {
    Alert.alert("Üdvözlet","Hello " + szoveg)
  }

  useEffect(()=>{
    sorsol()
    letoltes()
  },[])

  return (
    <ImageBackground source={require("./img.jpg")} style={styles.hatterKep}>
    
      <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
      ]}>
      <View style={{flex: 2}}>
      <TouchableOpacity style={styles.button} onPress={sorsol}>
        <Text style={{fontSize:20, color:"blue"}}>Új vicc</Text>
      </TouchableOpacity>
      <Text style={{fontSize:20, color:"white"}}>{vicc}</Text>
      </View>

      <View style={{flex: 2}}>
      <TouchableOpacity style={styles.button} onPress={letoltes}>
        <Text style={{fontSize:20, color:"blue"}}>Új Chuck Norris poén :D</Text>
      </TouchableOpacity>
      <Text style={styles.feher}>{adatok.value}</Text>
      </View>
      </View>

      <View style={{flex: 1}}>
      <TextInput
        style={styles.input}
        onChangeText={setSzoveg}
        placeholder="Neved"
        value={szoveg}
      />
      </View>

      <TouchableOpacity style={styles.button} onPress={Udvozles}>
        <Text style={{fontSize:20, color:"blue"}}>Üdvözlet</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop:50,
    alignItems: 'center'
  },
  feher: {
    color:"white",
    fontSize:20
  },
  hatterKep: {
    flex: 1,
    justifyContent: 'center',
    resizeMode:"cover"
  },
  button: {
    alignItems: 'center',
    padding: 40,
  },
  input: {
    height: 40,
    marginTop: 130,
    borderWidth: 1,
    padding: 10,
    backgroundColor:"grey"
  }
});
