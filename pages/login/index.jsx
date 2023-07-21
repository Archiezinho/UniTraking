import styles from '../../styles/Login.module.css'
import { getServerSession } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { authOptions } from '../api/auth/[...nextauth]';
import { BsFillArrowLeftSquareFill } from 'react-icons/bs'


export default function Login() {
    const[user, setUser] = useState('');
    const[password, setPassword] = useState('');
    const[hasError, setHasError] = useState('');
    const { data: session } = useSession();

    const router = useRouter();

    const handleSubmit = async () => {
        if(!user || !password){
            setHasError('Preencha os campos!!!');
        }else{
            setHasError('');
            const request = await signIn('credentials', {
                redirect: false,
                user: user.toString(),
                password: password.toString()
            });
    
            if(request && request.ok){
                switch (session.user.cargo) {
                    case 'Admin':
                        router.push('/bookings');
                        break;
                    case 'Depot', 'Estufagem', 'Porto':
                        router.push('/bookings');
                        break;
                    case 'Armazem', 'Transportadora':
                        router.push('/armazem');
                        break;
                }
            }else{
                setHasError('Veja se digitou seu usuário e senha corretamente!');
            }
        }
    };

    return (
        <div className={styles.Login}>
            <span className={styles.btnBackPage}><a href="/preLogin"><BsFillArrowLeftSquareFill className={styles['bi-arrow-left-square-fill']}/></a></span>
            <div className={styles.containerLogin}>
                <div className={styles.cardLoginLeft}>
                    <h2>Unitracking</h2>
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
                    <button className={styles.btnLogar} onClick={handleSubmit}>Logar</button>
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
