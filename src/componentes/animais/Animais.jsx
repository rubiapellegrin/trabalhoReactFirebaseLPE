import { useState, useEffect } from 'react';
import Tabela from './Tabela';
import AnimaisContext from './AnimaisContext';
import Formulario from './Formulario';
import { auth, db } from '../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import {
    doc, addDoc, collection, query, onSnapshot, updateDoc,
    deleteDoc, where
} from "firebase/firestore";



function Animais() {

    const [user, loading, error] = useAuthState(auth);
    const [listaObjetos, setListaObjetos] = useState([]);
    const [alerta, setAlerta] = useState({
        status: "", message: ""
    });
    const [objeto, setObjeto] = useState({
        id: "", nome: "", raca: "", cliente: "",
        uid: user?.uid, usuario: user?.displayName, peso:""
    });
    const novoObjeto = () => {
        setObjeto({
            id: 0, nome: "", raca: "", cliente: "",
            uid: user?.uid, usuario: user?.displayName, peso:""
        });
    }
    useEffect(() => {
        if (user?.uid != null) {
            const uid = user?.uid;
            const colRef = collection(db, "animais");
            const q = query(colRef, where("uid", "==", uid))
            onSnapshot(q, (querySnapshot) => {
                setListaObjetos(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    nome: doc.data().nome,
                    raca: doc.data().raca,
                    cliente: doc.data().cliente,
                    usuario: doc.data().usuario,
                    peso: doc.data().peso,
                    uid: doc.data().uid
                })))
            })
        }
    }, [user]);
    const [editar, setEditar] = useState(false);
    const acaoCadastrar = async (e) => {
        e.preventDefault();
        if (editar) {
            try {
                const postDocRef = doc(db, 'animais', objeto.id)
                await updateDoc(postDocRef, {
                    nome: objeto.nome,
                    raca: objeto.raca,
                    uid: objeto.uid,
                    cliente: objeto.cliente,
                    usuario: objeto.usuario,
                    peso: objeto.peso
                })
                setAlerta({
                    status: "success", message: "Cadastro atualizado com sucesso!"
                });
            } catch (err) {
                setAlerta({
                    status: "error", message: "Erro ao atualizar o cadastro: " + err
                });
            }
        } else { // novo
            try {
                addDoc(collection(db, 'animais'),
                    {
                        nome: objeto.nome,
                        raca: objeto.raca,
                        uid: objeto.uid,
                        cliente: objeto.cliente,
                        usuario: objeto.usuario,
                        peso: objeto.peso
                    }).then(function (docRef) {
                        setObjeto({ ...objeto, id: docRef.id });
                    })
                setEditar(true);
                setAlerta({
                    status: "success", message: "Animal cadastrado com sucesso!"
                });
            } catch (err) {
                setAlerta({
                    status: "error", message: "Erro ao criar o cadastro: " + err
                });
            }
        }
    };
    const acaoRemover = async (objeto) => {
        if (window.confirm("Remover este animal?")) {
            try {
                const postDocRef = doc(db, 'animais', objeto.id)
                await deleteDoc(postDocRef);
                setAlerta({
                    status: "success", message: "Animal removido com sucesso!"
                });
            } catch (err) {
                setAlerta({
                    status: "error", message: "Erro ao remover: " + err
                });
            }
        }
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }
    return (
        <AnimaisContext.Provider value={
            {
                listaObjetos, setListaObjetos, acaoRemover,
                alerta, setAlerta,
                objeto, setObjeto,
                editar, setEditar,
                acaoCadastrar, handleChange, novoObjeto
            }}>
            <Tabela />
            <Formulario />
        </AnimaisContext.Provider>
    );
}
export default Animais;