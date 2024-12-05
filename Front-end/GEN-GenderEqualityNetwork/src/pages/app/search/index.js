import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import Header from '../../../../components/header';
import Colours from '../../../../assets/colours';
import { Picker } from '@react-native-picker/picker';
import FontAwesome from '@expo/vector-icons/FontAwesome'; // Importação do ícone
import MapView, { Marker } from 'react-native-maps';
import {
  requestForegroundPermissionsAsync,
  getCurrentPositionAsync,
  LocationObject,
  watchPositionAsync,
  LocationAccuracy
} from 'expo-location';
import axios from 'axios';

export default function SearchScreen() {

  const [selectedValue, setSelectedValue] = useState('');
  const [bairro, setBairro] = useState([]);
  const [cidade, setCidade] = useState([]);
  const [estado, setEstado] = useState([]);
  const [location, setLocation] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isVisibleMap, setIsVisibleMap] = useState(true);
  const [isVisibleInfo, setIsVisibleInfo] = useState(false);
  const [pesquisa, setPesquisa] = useState(null)


  async function requestLocationPermissions() {
    try {
      const { granted } = await requestForegroundPermissionsAsync();
      if (!granted) {
        console.log("Permissão de localização não concedida.");
        return;
      }
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    } catch (error) {
      console.error("Erro ao solicitar permissão de localização:", error);
    }
  }
  useEffect (() => {
    axios
    .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((response) => {
      console.log(response.data);
    });
  }, []);

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);
    });
  }, []);
  
  const fetchAddress = async () => {
    if (!cep || cep.length < 8) {
      Alert.alert("Erro", "Por favor, insira um CEP válido com 8 dígitos.");
      return;
    }

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(response.data); // Debug: Verificar retorno da API
      if (response.data.erro) {
        Alert.alert("Erro", "CEP inválido ou não encontrado.");
      } else {
        setBairro(response.data.bairro || "");
        setCidade(response.data.localidade || "");
        setEstado(response.data.uf || "");
      }
    
      
    } catch (error) {
      Alert.alert("Erro", "Não foi possível buscar o endereço.");
    }
  };
  
  function searchBy(value) {
    const visibleOptions = ['cep', 'bairro', 'cidade', 'estado'];
    setIsVisible(visibleOptions.includes(value));
  }
  

  function search(){
    if (selectedValue == 'cep'){
      fetchAddress();
      setIsVisibleMap(false);
      setIsVisibleInfo(true);
    }
    if(selectedValue == 'estado'){
      setIsVisibleMap(true);
      setIsVisibleInfo(false);
    }
  }


  return (
    <View style={styles.Container}>
      <Header />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.searchList}>
          <Text style={styles.title}> Pesquisar por </Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(value) => {
                setSelectedValue(value); 
                searchBy(value); 
              }}
              style={styles.picker}
            >
              <Picker.Item style={styles.item} label="CEP" value="cep" />
              <Picker.Item style={styles.item} label="Bairro" value="bairro" />
              <Picker.Item style={styles.item} label="Cidade" value="cidade" />
              <Picker.Item style={styles.item} label="Estado" value="estado" />
              <Picker.Item style={styles.item} label="Violência Doméstica" value="violenciaDomestica" />
              <Picker.Item style={styles.item} label="Feminicídio" value="feminicidio" />
              <Picker.Item style={styles.item} label="Índice Populacional" value="indicePopulacional" />
              <Picker.Item style={styles.item} label="Indicador de Pobreza" value="indicadorDePobreza" />
              <Picker.Item style={styles.item} label="Índice Escolar" value="indiceEscolar" />
              <Picker.Item style={styles.item} label="Taxa de desemprego" value="taxaDeDesemprego" />
              <Picker.Item style={styles.item} label="Disparidade Salarial" value="disparidadeSalarial" />
            </Picker>
          </View>

          <Image 
            source={require('../../../../assets/images/filtroClaro.png')}
            style={styles.filterImage}
            resizeMode="contain"
          />
        </View>

        {isVisible && (
        <View style={styles.searchBar}>
          {/* Input de texto com ícone de pesquisa */}
          <View style={styles.searchInputContainer}>
            <TextInput 
              style={styles.textInput} 
              placeholder="Digite sua pesquisa"
              onChangeText = {setPesquisa}
              value={pesquisa}
            />
            <TouchableOpacity
              onPress={() => search()}
            >
              <FontAwesome name="search" size={20} color={Colours.backgroundColour} style={styles.searchIcon} />
            </TouchableOpacity>          
          </View>
        </View>)}


        {isVisibleMap && (
        <View style={styles.mapContainer}>
        {
            location &&
            <MapView style={styles.map} 
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005
            }}>
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude
                }}
              />
            </MapView>
          }
        </View>)}

      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({ 
  Container: {
    flex: 1,
    backgroundColor: Colours.backgroundColour,
    position: "relative"
  },
  title: {
    marginTop: 20,
    marginLeft: 15,
    marginRight: 2,
    fontWeight: 'bold',
    fontSize: 14,
    color: Colours.offWhite,
  },
  searchList: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center'
  },
  item: {
    fontSize: 14
  },
  pickerContainer: {
    width: '55%',
    height: 40,
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: Colours.lightBlue,
    justifyContent: 'center',
    marginVertical: 10,
    marginHorizontal: 0,
  },
  picker: {
    width: '100%',
    padding: 0,
    fontSize: 10,
  },
  filterImage: {
    width: '10%',
    height: 40,
    margin: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colours.lightBlue,
    width: '92%',
    alignSelf: 'center',
    borderRadius: 16,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontWeight: 'bold',
    color: Colours.backgroundColour
  },
  searchIcon: {
    marginLeft: 10,
  },
  mapContainer: {
    marginTop: 0,
    marginBottom: 10,
  },
  map: {
    width: '90%',
    height: '90%',
    marginTop: 10,
    alignSelf: 'center',
  },
});
