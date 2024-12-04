import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, AppState } from 'react-native';
import Colours from '../../../assets/colours';
import { useNavigation } from "@react-navigation/native";
import { supabase } from '../../lib/supabase';
import { Button, Input } from '@rneui/themed';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})

export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
      else navigation.navigate('MyApp')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
            <Image
            source={require('../../../assets/images/logoGen.png')}
            style={styles.image}  
            resizeMode="contain"          
            />
        </View>

        <View style={styles.inputContainer}>
            <TextInput
                placeholder="Usuário"
                style={styles.input}
                onChangeText={(text) => setEmail(text)}
                value={email}
            />
            <TextInput
                placeholder="Senha"
                style={styles.input}
                onChangeText={(text) => setPassword(text)}
                value={password}
                secureTextEntry={true}
            />

            <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.textForgot}>Esqueceu a senha</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.signin}
            onPress={() => signInWithEmail()}
            >
                <Text style= {styles.text}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.signup}
              onPress={() => navigation.navigate('OngSignUp')}>
                <Text style={styles.text}>Cadastrar</Text>
            </TouchableOpacity>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({ 
  container: { 
    flex: 1,
    backgroundColor: Colours.backgroundColour,
    justifyContent: 'center',
    alignItems: 'center',
    position:'relative',
    zIndex: 0
  },

  imageContainer:{
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
    zIndex: 1
  },

  image:{
    width: '100%',
    position: 'absolute', // Faz a imagem flutuar
    top: -600, // Ajuste conforme necessário para sobrepor a view
    zIndex: 2,
  },

  inputContainer:{
    flex: 2,
    paddingTop: '20%',
    zIndex: 3

  },

  input:{
    backgroundColor: Colours.lightBlue,
    marginTop: '3%',
    paddingLeft: 10,
    borderRadius: 30,
    width: 250,
    padding: 5
  },

  forgotPassword:{
    marginTop: 8,
    marginRight: '3%',
    alignSelf: 'flex-end',
  },

  signin:{
    backgroundColor: Colours.headerColour,
    borderRadius: 30,
    marginTop: 40,
    justifyContent: 'center',
    alignItems:'center',
    marginBottom:15,
    padding:10
  },

  signup:{
    borderWidth: 2, 
    borderColor: Colours.headerColour,
    borderRadius: 30,
    marginTop: 30,
    justifyContent: 'center',
    alignItems:'center',
    marginBottom:15,
    padding: 5

  },

  text: {
    color: Colours.offWhite,
    fontWeight: 'bold',
  },

  textForgot: {
    color: Colours.offWhite,
    fontSize: 10,
  }

});
