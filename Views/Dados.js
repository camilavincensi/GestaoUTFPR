import React from "react";
import Topo from "./componentes/Topo";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Link} from "@react-navigation/native";
import LoginScreen from "./Login";

export default function Dados({ route, navigation}){

    const nome = route.params.nome;

    const inicio = () => {
        navigation.navigate("Inicio", { nome })
    };

    const loginScreen = () => {
        navigation.navigate("Login", { nome })
    };


    return (
        <View style={styles.backgoud}>
            <Topo route={route} navigation={navigation} />

            <View style={styles.container}>
                <Text style={styles.texto}>Nome</Text>
                <Text style={styles.texto}>Departamento</Text>
                <Text style={styles.texto}>N° de Solicitações</Text>
                <Text style={styles.texto}>Data de Admissão</Text>

                <TouchableOpacity style={styles.buttonSair} onPress={() => loginScreen()}>
                    <Text style={styles.textoSair}>Sair</Text>
                </TouchableOpacity>
            </View>
            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => inicio()}>
                        <Image source={require('../Imagens/home.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    backgoud: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#f3f2f2'
    },
    container: {
        flex: 1,
        //  justifyContent: 'center',
        width: '80%',
        marginHorizontal: 15,
        marginTop: 15
    },
    texto: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 20,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        bottom: 70,
    },
    textoSair:{
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
        marginVertical: 5
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFCF57',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    buttonSair: {
        width: 125,
        height: 35,
        borderRadius: 30,
        backgroundColor: 'red',
        alignItems: 'center',
        marginVertical: 50,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
})
