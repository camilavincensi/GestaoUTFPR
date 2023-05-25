import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, KeyboardAvoidingView, Image, Animated, Keyboard, SafeAreaView } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import firebase from '../firebaseConfig';
import { getDatabase, ref, set, get, child, remove } from "firebase/database";

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const database = getDatabase(firebase);

  const entrar = async () => {
    try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const uid = user.uid;
      const userRef = ref(database, '/user/' + uid);
      const snapshot = await get(child(userRef, 'nome'));
      const nome = snapshot.val();

      navigation.navigate("Inicio", { nome, uid });
    } catch (error) {
      console.log(error);

      let errorMessage = 'Ocorreu um erro durante o login. Por favor, tente novamente.';

      if (error.code === 'auth/invalid-email') {
        errorMessage = 'O email fornecido é inválido.';
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Email ou senha incorretos. Por favor, verifique suas credenciais.';
      }

      alert(errorMessage);
    }
  };


  //animacao
  const [offset] = useState(new Animated.ValueXY({ x: 0, y: 40 }));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({ x: 280, y: 280 }));

  useEffect(() => {
    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
        useNativeDriver: true // precisa dessa linha para não apresentar um warn no app
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true
      })
    ]).start();
  }, []);

  function keyboardDidShow() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 170,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(logo.y, {
        toValue: 170,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  function keyboardDidHide() {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 280,
        duration: 100,
        useNativeDriver: false,

      }),
      Animated.timing(logo.y, {
        toValue: 280,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  }

  return (
    <KeyboardAvoidingView style={styles.backgoud}>
      <SafeAreaView style={styles.containerTopo}>
        <Animated.Image
          source={require('../Imagens/gestao.png')}
          style={styles.imagem}
        />
      </SafeAreaView>

      <Animated.View style={[styles.container]}>
        <View>
          <Image
              source={require('../Imagens/logoOK.png')}
              style={styles.logoOK}
          />
        </View>

        <TextInput
          style={styles.input}
          placeholder='Login'
          autoCorrect={false}
          onChangeText={(texto) => setEmail(texto)}
        />

        <TextInput
          style={styles.input}
          placeholder='Senha'
          autoCorrect={false}
          onChangeText={(texto) => setPassword(texto)}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.botao} onPress={() => entrar()}>
          <Text style={styles.botaoText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.versao}>Versão 1.0</Text>

      </Animated.View>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  versao:{
    paddingTop: 150,
    fontSize: 15,
    fontWeight: 'bold'
  },
  logoOK:{
    height: 70,
    width:350,
    marginHorizontal: 18,
    marginVertical: 60
  },
  imagem:{
    height: 209,
    width: 384,
  },
  backgoud: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFCF57',
  },
  containerTopo: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    padding: 15,
    backgroundColor: '#FFFFAF',
    borderTopRightRadius: 22,
    borderTopLeftRadius: 22
  },
  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 30,
    padding: 15,
  },
  botao: {
    backgroundColor: '#130d06',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  botaoText: {
    color: '#FFF',
    fontSize: 18
  }
});

