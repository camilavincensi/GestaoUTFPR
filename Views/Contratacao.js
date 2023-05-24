import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, query, equalTo, get } from "firebase/database";
import Topo from "./componentes/Topo";

export default function Contratacao({ navigation, route }) {

    const nome = route.params.nome;
    const [listaDados, setListaDados] = useState([]);
    const [selectedEmpresa, setSelectedEmpresa] = useState('Todos');
    const [modalVisible, setModalVisible] = useState(false);

    const empresaSelecionada = {
        value: selectedEmpresa,
        label: getLabelFromValue(selectedEmpresa)
    };

    const inicio = () => {
        navigation.navigate("Inicio", { nome })
    };

    const novaContratacao = () => {
        navigation.navigate("NovaContratacao", { nome, empresaSelecionada })
    };

    const minhasSolicitacoes = () => {
        navigation.navigate("MinhasSolicitacoes", { nome, empresaSelecionada })
    };

    useEffect(() => {
        const buscarDados = async () => {
            const database = getDatabase();
            const informacoesRef = ref(database, "empresas");
            const queryRef = query(informacoesRef, equalTo("empresas", selectedEmpresa));

            console.log("Referência:", informacoesRef.toString());
            console.log("Empresa selecionada:", selectedEmpresa);
            try {
                const snapshot = await get(queryRef);
                const dados = [];

                console.log("Snapshot:", snapshot.val());
                console.log("Dados:", dados);

                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    dados.push(childData);
                });

                setListaDados(dados);
            } catch (error) {
                console.log("Erro ao buscar os dados:", error);
            }
        };

        buscarDados();
    }, [selectedEmpresa]);

    function getLabelFromValue(value) {
        switch (value) {
            case 'Todos':
                return 'UTFPR - Todos';
            case 'Dois Vizinhos':
                return 'UTFPR - Dois Vizinhos';
            case 'Francisco Beltrão':
                return 'UTFPR - Francisco Beltrão';
            case 'Pato Branco':
                return 'UTFPR - Pato Branco';
            default:
                return '';
        }
    }

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

                    <Picker.Item style={styles.dropdown} label="UTFPR - Todos" value="All" />
                    <Picker.Item style={styles.dropdown} label="UTFPR - Dois Vizinhos" value="DV" />
                    <Picker.Item style={styles.dropdown} label="UTFPR - Francisco Beltrão" value="FB" />
                    <Picker.Item style={styles.dropdown} label="UTFPR - Pato Branco" value="PB" />
                </Picker>
            </View>
            <FlatList
                data={listaDados}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <Text style={styles.itemText}>{item.nomeSolicitante}</Text>
                        <Text style={styles.itemText}>{item.departamento}</Text>
                        <Text style={styles.itemText}>{item.descricaoSolicitante}</Text>
                        <Text style={styles.itemText}>{item.observacao}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => inicio()}>
                        <Image source={require('../Imagens/home.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                        <Image source={require('../Imagens/incluir.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity>
                        <Text style={styles.modalText} onPress={() => novaContratacao()}>Nova Solicitação</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.modalText} onPress={() => minhasSolicitacoes()}>Minhas Solicitações</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                        <Text style={styles.modalButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

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
    iconContainer: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: '95%',
        flexDirection: 'row',
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
    container: {
        //flex: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        padding: 15
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        position: 'absolute',
        bottom: 70,
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
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        width: '80%',
        height: '40%',
        marginTop: '80%',
        marginBottom: '60%',
        marginLeft: '10%',
        marginRight: '10%',
        borderRadius: 20,
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontWeight: 'bold',
        padding: 20,
        fontSize: 17,
    },
    modalButton: {
        backgroundColor: '#FFCF57',
        borderRadius: 20,
        padding: 10,
        marginTop: 20,
        width: '70%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 17,
    },
});
