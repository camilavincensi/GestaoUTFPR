import React, { useState, useEffect } from "react";
import Topo from "./componentes/Topo";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";
import { getAuth, signOut } from 'firebase/auth';

export default function Dados({ route, navigation }) {
    const database = getDatabase();
    const { nome, uid } = route.params;
    const [departamento, setDepartamento] = useState('');
    const [dataadmissao, setDataAdmissao] = useState('');

    const [listaDadosCompras, setListaDadosCompras] = useState([]);
    const [listaDadosContratacoes, setListaDadosContratacoes] = useState([]);
    const [totalRegistrosCompras, setTotalRegistrosCompras] = useState(0);
    const [totalRegistrosContratacoes, setTotalRegistrosContratacoes] = useState(0);

    useEffect(() => {
        const obterDados = async () => {
            try {
                const dadosRef = ref(database, 'user/' + uid);
                const snapshot = await get(dadosRef);

                if (snapshot.exists()) {
                    const dados = snapshot.val();
                    setDepartamento(dados.departamento);
                    setDataAdmissao(dados.dataadmissao);
                }
            } catch (error) {
                console.error('Erro ao obter os dados do banco de dados:', error);
            }
        };

        obterDados();
    }, [database, uid]);

    const inicio = () => {
        navigation.navigate("Inicio", { nome, uid })
    };

    const loginScreen = () => {
        navigation.navigate("Login", { nome })
    };

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
            loginScreen();
        } catch (error) {
            console.log('Erro ao fazer logout:', error);
        }
    };

    const buscarDados = async () => {
        const database = getDatabase();

        const comprasPatch = "compras";
        const contratacoesPatch = "contratacoes";

        const comprasRef = ref(database, comprasPatch);
        const contratacoesRef = ref(database, contratacoesPatch);

        const comprasFiltradas = query(comprasRef, orderByChild('uidUsuario'), equalTo(uid));
        const contratacoesFiltradas = query(contratacoesRef, orderByChild('uidUsuario'), equalTo(uid));

        try {
            const comprasSnapshot = await get(comprasFiltradas);
            const contratacoesSnapshot = await get(contratacoesFiltradas);

            const comprasDados = [];
            const contratacoesDados = [];

            comprasSnapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                comprasDados.push(childData);
            });

            contratacoesSnapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                contratacoesDados.push(childData);
            });

            setListaDadosCompras(comprasDados);
            setListaDadosContratacoes(contratacoesDados);

            setTotalRegistrosCompras(comprasDados.length);
            setTotalRegistrosContratacoes(contratacoesDados.length);
        } catch (error) {
            console.log("Erro ao buscar os dados:", error);
        }
    };

    useEffect(() => {
        buscarDados();
    }, []);

    return (
        <View style={styles.backgoud}>
            <Topo route={route} navigation={navigation} />

            <View style={styles.container}>
                <Text style={styles.texto}>Nome</Text>
                <Text>{nome}</Text>
                <Text style={styles.texto}>Departamento: </Text>
                <Text>{departamento}</Text>
                <Text style={styles.texto}>N° de Compras</Text>
                <Text>{totalRegistrosCompras}</Text>
                <Text style={styles.texto}>N° de Contratações</Text>
                <Text>{totalRegistrosContratacoes}</Text>
                <Text style={styles.texto}>Data de Admissão</Text>
                <Text>{dataadmissao}</Text>

                <TouchableOpacity style={styles.buttonSair} onPress={() => handleLogout()}>
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
    textoSair: {
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
