import { useState } from 'react'
import styles from '../styles/CadastroEmp.module.css'
import axios from 'axios';
import { useRouter } from 'next/router';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'
import { getServerSession } from "next-auth";
import { authOptions } from './api/auth/[...nextauth]';

export default function CadastroEmp() {
    const [cnpj, setCnpj] = useState('');
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [razao, setRazao] = useState('');
    const[hasError, setHasError] = useState('');

    const router = useRouter()

    const handleCadastro = async () => {
        if(!cnpj || !nome || !endereco || !email || !telefone || !razao){
            setHasError('Preencha os campos!!!');
        }else{
            const json = await axios.post('/api/cliente', {
                cnpj: cnpj.toString(),
                nome: nome.toString(),
                endereco: endereco.toString(),
                email: email.toString(),
                telefone: telefone.toString(),
                razaoSocial:razao.toString()
            });
            if(json.status === 200){
                router.push('/login/' + json.data.id)
            }else{
                setHasError('Erro ao cadastrar!!');
            };
        };
    };

    return (
        <div className={styles.CadastroEmp}>
            <span className={styles.btnBackPage}><a href="/preLogin"><BsFillArrowLeftSquareFill className={styles['bi-arrow-left-square-fill']}/></a></span>
            <div className={styles.containerCadastroEmp}>
                <div className={styles.cadLeftside}>
                    <h2>Cadastro da Empresa</h2>
                </div>
                <div className={styles.cadRightSide}>
                    <div className={styles.containerCad}>
                        <label htmlFor="cnpj">Cnpj</label>
                        <input type="text" placeholder='XX. XXX. XXX/0001-XX' value={cnpj} onChange={e => setCnpj(e.target.value)}/>
                        <label htmlFor="nome">Nome</label>
                        <input type="text" placeholder='' value={nome} onChange={e => setNome(e.target.value)}/>
                        <label htmlFor="end">Endereço</label>
                        <input type="text" placeholder='' value={endereco} onChange={e => setEndereco(e.target.value)}/>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='@hotmail.com' value={email} onChange={e => setEmail(e.target.value)}/>
                        <label htmlFor="tel">Telefone</label>
                        <input type="text" placeholder='(00) 0000-0000' value={telefone} onChange={e => setTelefone(e.target.value)}/>
                        <label htmlFor="rs">Razão Social</label>
                        <input type="text" placeholder='' value={razao} onChange={e => setRazao(e.target.value)}/>

                        <input type='text' value={hasError}/>
                        <button className={styles.btnCad} onClick={handleCadastro}>Cadastrar</button>
                    </div>
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
    }*/
    return {
        props: {
        }
    }
};