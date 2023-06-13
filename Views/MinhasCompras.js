import React, { useState, useEffect } from 'react';
import Topo from "./componentes/Topo";
import { Text, View, StyleSheet, KeyboardAvoidingView, Image, TouchableOpacity, FlatList } from 'react-native';
import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";

export default function MinhasCompras({ route, navigation }) {
    const nome = route.params.nome;
    const uid = route.params.uid;
    const departamento = route.params.departamento;

    const [listaDados, setListaDados] = useState([]);

    const inicio = () => {
        navigation.navigate("Inicio", { nome, uid, departamento })
    };

    const buscarDados = async () => {
        const database = getDatabase();

        const patch = "compras";
        const informacoesRef = ref(database, patch);

        const dadosFiltrados = query(informacoesRef, orderByChild('uidUsuario'), equalTo(uid));

        try {
            const snapshot = await get(dadosFiltrados);
            const dados = [];

            console.log(uid)
            
            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                dados.push(childData);
            });

            setListaDados(dados);
        } catch (error) {
            console.log("Erro ao buscar os dados:", error);
        }
    };

    useEffect(() => {
        buscarDados();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.backgoud}>
            <Topo route={route} navigation={navigation} />
            <View style={styles.view}>
                <Text style={styles.listaTitulo}>LISTA DAS MINHAS COMPRAS: </Text>
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
                        </View>
                    )}
                />
            </View>

            <View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => inicio()}>
                        <Image source={require('../Imagens/home.png')} />
                    </TouchableOpacity>
                </View>
            </View>

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
