import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, Modal, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, get, remove, query, orderByChild, equalTo } from "firebase/database";
import Topo from "./componentes/Topo";

export default function Contratacao({ navigation, route }) {
    const nome = route.params.nome;
    const uid = route.params.uid;
    const departamento = route.params.departamento;

    const [listaDados, setListaDados] = useState([]);
    const [selectedEmpresa, setSelectedEmpresa] = useState('Todos');
    const [modalVisible, setModalVisible] = useState(false);
    const empresaSelecionada = {
        value: selectedEmpresa,
        label: getLabelFromValue(selectedEmpresa)
    };

    const inicio = () => {
        navigation.navigate("Inicio", { nome, uid, departamento })
    };

    const novaContratacao = () => {
        navigation.navigate("NovaContratacao", { nome, empresaSelecionada, uid, departamento })
    };

    const MinhasContratacoes = () => {
        navigation.navigate("MinhasContratacoes", { nome, uid, departamento })
    };

    const buscarDados = async () => {
        const database = getDatabase();

        const patch = "contratacoes";
        const informacoesRef = ref(database, patch);

        if (selectedEmpresa === 'Todos') {
            try {
                const snapshot = await get(informacoesRef);
                const dados = [];

                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    dados.push(childData);
                });

                setListaDados(dados);
            } catch (error) {
                console.log("Erro ao buscar os dados:", error);
            }
        } else {
            const dadosFiltrados = query(informacoesRef, orderByChild('idempresa'), equalTo(selectedEmpresa));
            try {
                const snapshot = await get(dadosFiltrados);
                const dados = [];

                snapshot.forEach((childSnapshot) => {
                    const childData = childSnapshot.val();
                    dados.push(childData);
                });

                setListaDados(dados);
            } catch (error) {
                console.log("Erro ao buscar os dados:", error);
            }
        }
    };

    useEffect(() => {
        buscarDados();
    }, [selectedEmpresa]);

    const excluirItem = (uidContratacao) => {
        Alert.alert(
            'Confirmação',
            'Deseja excluir a contratação?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Excluir',
                    onPress: () => excluirItemConfirmado(uidContratacao),
                    style: 'destructive',
                },
            ],
        );
    };

    const excluirItemConfirmado = (uidContratacao) => {
        const database = getDatabase();
        const informacoesRef = ref(database, 'contratacoes/' + uidContratacao);

        try {
            remove(informacoesRef)
                .then(() => {
                    setListaDados(listaDados.filter(item => item.uidContratacao !== uidContratacao));
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
            case 'DV':
                return 'UTFPR - Dois Vizinhos';
            case 'FB':
                return 'UTFPR - Francisco Beltrão';
            case 'PB':
                return 'UTFPR - Pato Branco';
            default:
                return '';
        }
    }

    useEffect(() => {
        buscarDados();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.backgoud}>


            <View style={styles.dropdownContainer}>
                <Topo route={route} navigation={navigation} />
                <Picker
                    selectedValue={selectedEmpresa}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedEmpresa(itemValue)
                    } style={styles.dropdown}
                    dropdownIconColor={'white'}
                    mode={'dropdown'}
                    itemStyle={{ color: 'white' }}
                >

                    <Picker.Item style={styles.dropdown} label="UTFPR - Todos" value="Todos" />
                    <Picker.Item style={styles.dropdown} label="UTFPR - Dois Vizinhos" value="DV" />
                    <Picker.Item style={styles.dropdown} label="UTFPR - Francisco Beltrão" value="FB" />
                    <Picker.Item style={styles.dropdown} label="UTFPR - Pato Branco" value="PB" />
                </Picker>
            </View>

            <View style={styles.view}>
                <Text style={styles.listaTitulo}>LISTA DE CONTRATAÇÕES: </Text>
                <FlatList
                    data={listaDados}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.group}>
                            <Text style={[styles.lista, { borderTopWidth: 1, marginTop: 4 }]}>Nome Solicitante: {item.nomeSolicitante}</Text>
                            <Text style={styles.lista}>Departamento: {item.departamentoSolicitante}</Text>
                            <Text style={styles.lista}>Descrição: {item.descricaoSolicitacao}</Text>
                            <Text style={styles.lista}>Observação: {item.observacao}</Text>
                            <Text style={styles.lista}>Empresa: {item.idempresa}</Text>
                            <TouchableOpacity
                                onPress={() => excluirItem(item.uidContratacao)}
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
                        <Text style={styles.modalText} onPress={() => novaContratacao()}>Nova Solicitação</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.modalText} onPress={() => MinhasContratacoes()}>Minhas Solicitações</Text>
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
    group: {
        padding: 10
    },
    view: {
        flex: 1,
        padding: 10,
        width: '100%',
        paddingHorizontal: 20
    },
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
        width: '100%',
        borderRadius: 10,
    },
    dropdown: {
        height: 50,
        width: '80%',
        backgroundColor: '#585666',
        color: '#fff',
        fontSize: 17,
        justifyContent: 'center',
    },
    container: {
        flex: 0.45,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
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
    lista: {
        color: 'black',
        fontSize: 17,
    },
    listaTitulo: {
        color: 'black',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 10
    },
    botaoExcluir: {
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
