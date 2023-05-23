import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, TextInput, Modal, Keyboard } from 'react-native';
import { getDatabase, ref, set, push } from "firebase/database";
import Topo from "./componentes/Topo";

export default function NovaCompra({ navigation, route }) {
    const { nome, empresaSelecionada } = route.params;
    const { value, label } = empresaSelecionada;
    const database = getDatabase();

    const [nomeSolicitante, setNomeSolicitante] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [descricaoSolicitacao, setDescricaoSolicitacao] = useState("");
    const [observacao, setObservacao] = useState("");

    const cancelar = () => {
        navigation.navigate("Compra", { nome })
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [keyboardOpen, setKeyboardOpen] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow', () => setKeyboardOpen(true)
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide', () => setKeyboardOpen(false)
        );
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const salvarInformacoes = () => {
        const dados = {
            nomeSolicitante,
            departamento,
            descricaoSolicitacao,
            observacao,
        };

        const informacoesRef = push(ref(database, "empresas/" + value));

        set(informacoesRef, dados)
            .then(() => {
                console.log("Informações salvas com sucesso!");
            })
            .catch((error) => {
                console.log("Erro ao salvar as informações:", error);
            });
    };

    return (
        <KeyboardAvoidingView style={styles.backgoud}>
            <Topo route={route}/>

            <View style={styles.container}>
                <Text style={styles.texto}>Nome do solicitante</Text>
                <TextInput style={styles.input} placeholder="Digite aqui" value={nomeSolicitante} onChangeText={setNomeSolicitante} />

                <Text style={styles.texto}>Departamento</Text>
                <TextInput style={styles.input} placeholder="Digite aqui" value={departamento} onChangeText={setDepartamento} />

                <Text style={styles.texto}>Descrição da solicitação</Text>
                <TextInput style={styles.input} placeholder="Digite aqui" value={descricaoSolicitacao} onChangeText={setDescricaoSolicitacao} />

                <Text style={styles.texto}>Observação</Text>
                <TextInput style={[styles.input, { height: 150, paddingBottom: 110 }]} multiline={true} placeholder="Digite aqui" value={observacao} onChangeText={setObservacao} />
            </View>

            <View style={[styles.buttonContainer, keyboardOpen && { opacity: 0 }]}>
                <TouchableOpacity style={styles.button} onPress={() => cancelar()}>
                    <Text style={styles.negrito}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => salvarInformacoes()}>
                    <Text style={styles.negrito}>Salvar</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Salvo com sucesso!</Text>
                    <View style={styles.closeButtonContainer}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Image source={require('../Imagens/fechar.png')} />
                        </TouchableOpacity>
                    </View>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '90%',
        padding: 15,
    },
    texto: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 20,
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 17,
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '95%',
        position: 'absolute',
        bottom: 20,
    },
    button: {
        width: 125,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#FFCF57',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '80%',
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
    closeButtonContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
    },
});
