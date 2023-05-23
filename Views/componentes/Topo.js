import React from "react";
import {Image, SafeAreaView, StyleSheet, Text, View} from "react-native";
import imagem from '../../Imagens/user.png'

export default function Topo({route}){

    const nome = route.params.nome;


    return <SafeAreaView style={styles.containerTopo}>
        <View style={styles.userContainer}>
            <Text style={[styles.textoTopo, styles.negrito]}>Olá,{nome}!</Text>
            <Text style={styles.textoTopo}>Compras e Contratações UTFPR</Text>
        </View>
        <Image style={styles.image}
               source={imagem}
        />
    </SafeAreaView>
}


const styles = StyleSheet.create({
    image:{
        width: 57,
        height: 57,
        marginVertical: 30,
        marginHorizontal: 20
    },
    containerTopo: {
        backgroundColor: '#FFCF57',
        flex: 0.23,
        width: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        flexDirection: 'row',
    },
    userContainer: {
        flexDirection: 'column',
        marginVertical: 30
    },
    textoTopo: {
        fontSize: 17,
        paddingLeft: 10,
        justifyContent: 'center',
        marginHorizontal: 20,
    },
    negrito: {
        fontWeight: 'bold',
        fontSize: 20
    },
})
