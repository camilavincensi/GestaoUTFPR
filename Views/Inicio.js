import React, { useState } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Topo from "./componentes/Topo";

export default function Inicio({ navigation, route }) {

    const nome = route.params.nome;
    const uid = route.params.uid;

    console.log("uid = " + uid)
    const comprar = () => {
        navigation.navigate("Compra", { nome, selectedEmpresa, uid })
    };

    const contratacao = () => {
        navigation.navigate("Contratacao", { nome, selectedEmpresa })
    };

    const [selectedEmpresa, setSelectedEmpresa] = useState('Todos');

    return (
        <KeyboardAvoidingView style={styles.backgoud}>
            <Topo route={route} navigation={navigation}/>
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
                    <Picker.Item key={0} style={styles.dropdown} label="UTFPR - Todos" value="All" />
                    <Picker.Item style={styles.dropdown} label="UTFPR - Dois Vizinhos" value="DV" />
                    <Picker.Item style={styles.dropdown} label="UTFPR - Francisco Beltrão" value="FB" />
                    <Picker.Item style={styles.dropdown} label="UTFPR - Pato Branco" value="PB" />
                </Picker>
            </View>

            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => comprar()}>
                        <Image source={require('../Imagens/compra.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => contratacao()}>
                        <Image source={require('../Imagens/contratacao.png')} />
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
        //justifyContent: 'center',
        backgroundColor: '#f3f2f2'
    },

    dropdownContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 20,
        //borderRadius: 10,
    },
    dropdown: {
        height: 50,
        width: '80%',
        backgroundColor: '#585666',
        //color: '#fff',
        fontSize: 17,
        borderRadius: 20
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
       // alignItems: 'center',
        justifyContent: 'center',
        //width: '100%',
       // marginTop: 20,
    },
    button: {
        backgroundColor: '#F6F6F6',
        padding: 10,
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 100,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        justifyContent: 'center',
    },
});
