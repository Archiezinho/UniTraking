import styles from '../../styles/Login.module.css'
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from 'axios';
//import api from "../../libs/user"
import { authOptions } from '../api/auth/[...nextauth]';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'


export default function cadastroAdm() {
    const[user, setUser] = useState('');
    const[password, setPassword] = useState('');
    const[hasError, setHasError] = useState('');

    const router = useRouter();

    const handleSubmit = async () => {
        if(!user || !password){
            setHasError('Preencha os campos!!!');
        }else{
            const json = await axios.post('/api/user', {
                nome: 'SuperAdm',
                user: user.toString(),
                senha: password.toString(),
                cargo: 'Admin',
                clienteId: parseInt(router.query.slug)
            });
            if(json.status === 200){
                const logged = handleLogin();
                console.log(logged)
                if(logged){
                    window.location.href = '/bookings';
                }
            }else{
                setHasError('Erro ao cadastrar!!');
            };
        };
    };

    const handleLogin = async () => {
        const csrfReq = await axios.get('/api/auth/csrf');
        if(csrfReq.data.csrfToken) {
            const authReq = await axios.post('/api/auth/callback/credentials', {
                json: true,
                csrfToken: csrfReq.data.csrfToken,
                user: user.toString(),
                password: password.toString()
            });
            if(authReq.status === 200) {
                const userData = await axios.get('/api/auth/session');
                if(userData.data.user) {
                    return true;
                }
            }
        }
        return false;
    }

    return (
        <div className={styles.Login}>
            <span className={styles.btnBackPage}><a href="/preLogin"><BsFillArrowLeftSquareFill className={styles['bi-arrow-left-square-fill']}/></a></span>
            <div className={styles.containerLogin}>
                <div className={styles.cardLoginLeft}>
                    <h2>Cadastre</h2>
                    <h2>seu</h2>
                    <h2>Usuário</h2>
                </div>
                <div className={styles.cardLoginRight}>
                    <div className={styles.LoginArea}>
                        <label htmlFor="User">Username</label>
                        <input type="text" name="User" placeholder='User' value={user} onChange={e => setUser(e.target.value)}/>
                    </div>
                    <div className={styles.SenhaArea}>
                        <label htmlFor="Senha">Senha</label>
                        <input type="password" name="Senha" placeholder='Senha' value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>
                    <input type='text' readOnly value={hasError}/>
                    <button className={styles.btnLogar} onClick={handleSubmit}>Cadastro</button>
                </div>
            </div>
        </div>
    )
}
export const getServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    /*if(session){
        return {
            redirect: {
                destination: '/bookings',
                permanent: true
            }
        }
    }*//*
    const users = await api.getAllUsers(parseInt(context.query.slug));
    if (users) {
        return {
            redirect: {
                destination: '/preLogin',
                permanent: true
            }
        }
    }*/

    return {
        props: {
        }
    }
};
