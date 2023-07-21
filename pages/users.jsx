import { getServerSession } from "next-auth";
import { useState } from "react";
import { authOptions } from './api/auth/[...nextauth]';
import axios from "axios";
import api from "../libs/user"
import { CardUsuario } from './Componentes/CardUsuario.module.jsx'
import styles from '../styles/Usuarios.module.css';
import { NavMenu } from './Componentes/MenuMobile.module.jsx';
import { BsSearch } from 'react-icons/bs'
import { DebounceInput } from 'react-debounce-input'

export default function Usuarios(props) {
    const [userList, setUserlist] = useState(props.users);
    const [hasError, setHasError] = useState('');
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');
    const [search, setSearch] = useState('');

    const searchFilter = e => {
        if (!e) return handleSearch([])

        handleSearch(e)
    }

    const handleSearch = async (search) => {
        const json = await axios.get(`/api/user?clienteId=${parseInt(props.user.clienteId)}&user=${search.toString()}`)
        setUserlist(json.data);
    }

    const handleCadastro = async () => {
        if (!user || !senha || !nome || !cargo || cargo === 'Selecionar cargo') {
            setHasError('Preencha os campos!!!');
        } else {
            const json = await axios.post('/api/user', {
                nome: nome.toString(),
                user: user.toString(),
                senha: senha.toString(),
                cargo: cargo.toString(),
                clienteId: parseInt(props.user.clienteId),
            });
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
                    <input
                        type="text"
                        placeholder='Usuário'
                        className={styles.modalAddInput}
                        value={user}
                        onChange={e => setUser(e.target.value)}
                        id='emailUsuario'
                    />
                    <input
                        type="text"
                        placeholder='Senha'
                        className={styles.modalAddInput}
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                        id='senhaUsuario'
                    />
                    <select className={styles.modalAddInput} name="cargo" onChange={e => setCargo(e.target.value)}>
                        <option selected>Selecionar cargo</option>
                        <option value="Transportadora">Transportadora</option>
                        <option value="Armazem">Armazem</option>
                        <option value="Depot">Depot</option>
                        <option value="Estufagem">Estufagem</option>
                        <option value="Porto">Porto</option>
                        <option value="Admin">Admin</option>
                    </select>
                    <button
                        className={styles.btnModalAdd}
                        onClick={handleCadastro}
                    >Cadastrar usuário</button>
                </div>

                <div className={styles.cardUsuarioArea}>
                    {userList.map((userList, index) => (
                        <CardUsuario id={`${userList.id}`} user={`${userList.user}`} senha={`${userList.senha}`} nome={`${userList.nome}`} cargo={`${userList.cargo}`} key={index} />
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

    const users = await api.getAllUsers(session.user.clienteId);
    return {
        props: {
            user: session.user,
            users: users
        }
    }
};