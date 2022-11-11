import { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, onSnapshot } from "firebase/firestore";

const Home = () => {

    const [listaObjetos, setListaObjetos] = useState([]);
    useEffect(() => {
        const q = query(collection(db, 'animais'))
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
    }, []);
    return (
        <div style={{ padding: '20px' }}>
            <h1>Firebase com Firestore - Animais - PWA</h1>

            <div className="row">
                {listaObjetos.length === 0 && <h2>Nenhum registro encontrado</h2>}
                {listaObjetos.length > 0 && (

                    listaObjetos.map(objeto => (
                        <div className="col-sm-3">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{objeto.nome}</h5>
                                    <p className="card-text">{objeto.raca}</p>
                                    <p className="card-text"><small className="text-muted">Cliente: {objeto.cliente}</small></p>
                                    <p className="card-text"><small className="text-muted">Animal: {objeto.nome}</small></p>
                                    <p className="card-text"><small className="text-muted">Cadastrado: {objeto.usuario}</small></p>
                                </div>
                            </div>
                        </div>
                    ))

                )}
            </div>
        </div>
    )
};

export default Home;