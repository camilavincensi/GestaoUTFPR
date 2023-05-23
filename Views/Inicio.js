import React, { useState } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Inicio({ navigation, route }) {

    const nome = route.params.nome;

    const comprar = () => {
        navigation.navigate("Compra", { nome, selectedEmpresa })
    };

    const [selectedEmpresa, setSelectedEmpresa] = useState('Todos');

    return (
        <KeyboardAvoidingView style={styles.backgoud}>
            <SafeAreaView style={styles.containerTopo}>
                <View style={styles.userContainer}>
                    <Text style={styles.textoTopo}>Olá,</Text>
                    <Text style={[styles.textoTopo, styles.negrito]}>{nome}!</Text>
                </View>
                <Text style={styles.textoTopo}>Compras e Contratações UTFPR</Text>
                <View style={styles.iconContainer}>
                    <Image
                        source={require('../Imagens/user.png')}
                    />
                </View>
            </SafeAreaView>

            <View style={styles.dropdownContainer}>
                <Picker
                    selectedValue={selectedEmpresa}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedEmpresa(itemValue)
                    } style={styles.dropdown}
                    dropdownIconColor={'white'}
                    mode={'dropdown'}
                    itemStyle={{ color: 'white' }}
                >

                    <Picker.Item style={styles.dropdown} label="UTFPR - Todos" value="All" />
                    <Picker.Item style={styles.dropdown} label="UTFPR - Dois Vizinhos" value="DV" />
                    <Picker.Item style={styles.dropdown} label="UTFPR - Francisco Beltrão" value="FB" />
                    <Picker.Item style={styles.dropdown} label="UTFPR - Pato Branco" value="PB" />
                </Picker>
            </View>

            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText} onPress={() => comprar()}>Compra</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Contratação</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    backgoud: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f3f2f2'
    },
    containerTopo: {
        backgroundColor: '#FFCF57',
        flex: 0.3,
        justifyContent: 'center',
        width: '100%',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40
    },
    userContainer: {
        flexDirection: 'row',
    },
    textoTopo: {
        fontSize: 17,
        paddingLeft: 10,
        justifyContent: 'center',
    },
    negrito: {
        fontWeight: 'bold'
    },
    dropdownContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    dropdown: {
        height: 50,
        width: '80%',
        backgroundColor: '#585666',
        color: '#fff',
        fontSize: 17,
    },
    iconContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '95%',
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        padding: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#282424',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 100
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        justifyContent: 'center',
    },
});
