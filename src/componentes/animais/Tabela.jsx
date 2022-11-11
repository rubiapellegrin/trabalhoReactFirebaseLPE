import { useContext } from 'react'
import Alerta from '../Alerta';
import AnimaisContext from './AnimaisContext';

const Tabela = () => {

    const { listaObjetos, acaoRemover, alerta, setObjeto, setEditar, setAlerta, novoObjeto } = useContext(AnimaisContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Animais</h1>
            <Alerta alerta={alerta} />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => {
                  //  setObjeto({
                  //      id: 0, texto: "", titulo: ""
                  //  });
                  novoObjeto();                 
                    setEditar(false);
                    setAlerta({ status: "", message: "" });
                }}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h2>Nenhum registro encontrado</h2>}
            {listaObjetos.length > 0 && (
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col" width="17%">ID</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Raça</th>
                                <th scope="col">Cliente</th>
                                <th scope="col">Usuario</th>
                                <th scope="col">Peso</th>
                                <th scope="col">UID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaObjetos.map(objeto => (
                                <tr key={objeto.id}>
                                    <td align="center">
                                        <button className="btn btn-danger" title="Remover"
                                            onClick={() => { acaoRemover(objeto); }}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                        <button className="btn btn-info"
                                            data-bs-toggle="modal" data-bs-target="#modalEdicao"
                                            onClick={() => {
                                                setObjeto(objeto);
                                                setEditar(true);
                                                setAlerta({ status: "", message: "" });
                                            }}>
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                    </td>
                                    <td>{objeto.id}</td>
                                    <td>{objeto.nome}</td>
                                    <td>{objeto.raca}</td>
                                    <td>{objeto.cliente}</td>
                                    <td>{objeto.usuario}</td>
                                    <td>{objeto.peso}</td>
                                    <td>{objeto.uid}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );

}

export default Tabela;
