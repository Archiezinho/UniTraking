import { getServerSession } from "next-auth";
import { useState } from "react";
import { authOptions } from './api/auth/[...nextauth]';
import axios from "axios";
import api from "../libs/exportador"
import { CardExportador } from './Componentes/CardExpordador.module.jsx'
import styles from '../styles/Usuarios.module.css';
import { NavMenu } from './Componentes/MenuMobile.module.jsx';
import { BsSearch } from 'react-icons/bs'
import { DebounceInput } from 'react-debounce-input'

export default function Exportadores(props) {
    const [exportadorList, setExportadorlist] = useState(props.exportadores);
    const [hasError, setHasError] = useState('');
    const [nome, setNome] = useState('');
    const [search, setSearch] = useState('');

    const searchFilter = e => {
        if (!e) return handleSearch([])

        handleSearch(e)
    }

    const handleSearch = async (search) => {
        const json = await axios.get(`/api/exportador?clienteId=${parseInt(props.user.clienteId)}&nome=${search.toString()}`)
        setExportadorlist(json.data);
    }

    const handleCadastro = async () => {
        if (!nome) {
            setHasError('Preencha os campos!!!');
        } else {
            const json = await axios.post('/api/exportador', {
                nome: nome.toString(),
                clienteId: parseInt(props.user.clienteId),
            });
            console.log(json)
            if (json.status === 200) {
                window.location.reload(true)
                return;
            } else {
                setHasError('Erro ao cadastrar!!');
            };
        };
    };

    return (
        <div className={styles.Usuarios}>
            <NavMenu cargo={props.user.cargo}/>
            <div className={styles.searchUsuarios}>
                <div className={styles.borderSearch}>
                    <DebounceInput type="search" name="search" placeholder='Buscar Usuário' className={styles.searchBarUsuario} minLength={1} debounceTimeout={500} id={styles.search} value={search} onChange={e => { setSearch(e.target.value); searchFilter(e.target.value); }} />
                    <span className={styles.searchIconUsuario}><BsSearch /></span>
                </div>


                <div className={styles.modalAdd}>
                    <h2>Cadastro de Usuário</h2>
                    <input
                        type="text"
                        placeholder='Nome'
                        className={styles.modalAddInput}
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                        id='nomeUsuario'
                    />
                    <button
                        className={styles.btnModalAdd}
                        onClick={handleCadastro}
                    >Cadastrar exportador</button>
                </div>

                <div className={styles.cardUsuarioArea}>
                    {exportadorList.map((exportadorList, index) => (
                        <CardExportador id={`${exportadorList.id}`} nome={`${exportadorList.nome}`} key={index} />
                    ))}
                </div>

            </div>
        </div>
    )
}
export const getServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    if (!session) {
        return {
            redirect: {
                destination: '/preLogin',
                permanent: true
            }
        }
    }
    else if (session.user.cargo !== 'Admin') {
        return {
            redirect: {
                destination: '/bookings',
                permanent: true
            }
        }
    }

    const exportadores = await api.getAllExportadores(session.user.clienteId);
    return {
        props: {
            user: session.user,
            exportadores: exportadores
        }
    }
};