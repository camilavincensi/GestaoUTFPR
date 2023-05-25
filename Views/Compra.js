import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, get, remove } from "firebase/database";
import Topo from "./componentes/Topo";

export default function Compra({ navigation, route }) {
    const [listaDados, setListaDados] = useState([]);
    const nome = route.params.nome;
    const [selectedEmpresa, setSelectedEmpresa] = useState('Todos');
    const [modalVisible, setModalVisible] = useState(false);
    const empresaSelecionada = {
        value: selectedEmpresa,
        label: getLabelFromValue(selectedEmpresa)
    };

    const inicio = () => {
        navigation.navigate("Inicio", { nome })
    };

    const novaCompra = () => {
        navigation.navigate("NovaCompra", { nome, empresaSelecionada })
    };

    useEffect(() => {
        const buscarDados = async () => {
            const database = getDatabase();

            if (empresaSelecionada.value == "Todos") {
                patch = "empresas";
            } else {
                patch = "empresas/" + empresaSelecionada.value;
            };

            const informacoesRef = ref(database, patch);
            try {
                const snapshot = await get(informacoesRef);
                const dados = [];

                if (empresaSelecionada.value == "Todos") {
                    snapshot.forEach((childSnapshot) => {
                        console.log(childSnapshot.key)
                        const informacoesRefChild = ref(database, 'empresas/');

                        //var parentNodeRef = informacoesRefChild.child(childSnapshot.key);
                        //var childNodeRef = parentNodeRef.child(parentNodeRef.key);

                        const variavelteste = get(child(informacoesRefChild, childSnapshot.key))

                        console.log(variavelteste);

                        //const snapshotChild =  get(informacoesRefChild);

                        //console.log(snapshotChild)

                        // snapshotChild.forEach((childSnapshotChild) => {
                        //   const childDataChild = childSnapshotChild.val();
                        //   dados.push(childDataChild);
                        // });
                    });
                } else {
                    snapshot.forEach((childSnapshot) => {
                        console.log(childSnapshot.key)
                        const childData = childSnapshot.val();
                        dados.push(childData);
                    });
                }

                setListaDados(dados);
            } catch (error) {
                console.log("Erro ao buscar os dados:", error);
            }
        };

        buscarDados();
    }, [selectedEmpresa]);

    const excluirItem = (key) => {
        console.log(key);
        const database = getDatabase();
        const informacoesRef = ref(database, 'empresas/' + selectedEmpresa + '/' + key);

        try {
            remove(informacoesRef)
                .then(() => {
                    setListaDados(listaDados.filter(item => item.key !== key));
                    alert('Item excluído com sucesso!');
                })
                .catch((error) => {
                    console.log('Erro ao excluir o item:', error);
                });
        } catch (error) {
            console.log('Erro ao excluir o item:', error);
        }
    };

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
            <Topo route={route} navigation={navigation} />

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
                <Text style={styles.listaTitulo}>LISTA DE COMPRAS: </Text>
                <FlatList style={styles.flatList}
                    data={listaDados}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text style={[styles.lista, {borderTopWidth : 1, marginTop: 4}]}>Nome Solicitante: {item.nomeSolicitante}</Text>
                            <Text style={styles.lista}>Departamento: {item.departamento}</Text>
                            <Text style={styles.lista}>Descrição: {item.descricaoSolicitacao}</Text>
                            <Text style={styles.lista}>Observação: {item.observacao}</Text>
                            <TouchableOpacity
                                onPress={() => excluirItem(item.uid)}
                            >
                                <Text style={styles.botaoExcluir}>Excluir</Text>
                            </TouchableOpacity>
                            
                        </View>
                    )}
                />
            </View>
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
                        <Text style={styles.modalText} onPress={() => novaCompra()}>Nova Solicitação</Text>
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
        flex: 0.82,
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
    flatList: {
        width: '100%',
        height: '20%'
    },
    lista: {   
        color: 'black',
        fontSize: 17,
    },
    listaTitulo:{
        marginTop: 4,
        marginBottom: 4,
        width: '100%',    
        color: 'black',
        fontSize: 17,
        textAlign: 'center', 
        fontWeight: 'bold',
    },
    botaoExcluir:{
        backgroundColor: 'red',
        width: '35%',    
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 4,
        borderRadius: 10,
    },
});
