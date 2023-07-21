import styles from '../styles/PreLogin.module.css'
import boat from '../public/images/container.png'
import truck from '../public/images/truck.png'
import Link from 'next/link'
import Image from 'next/image'
import { getServerSession } from "next-auth";
import { authOptions } from './api/auth/[...nextauth]';

export default function PreLogin() {
    return (
        <div className={styles.PreLogin}>
            <div className={styles.PreLoginLog}>
                <span className={styles.sun}></span>
                <Image src={boat} alt="" className={styles.boatImg} />
                <p>Já possui cadastro?</p>
                <Link className={styles.btnLog} href={'/login'}>Efetuar Login</Link>
            </div>
            <div className={styles.PreLoginCad}>
                <Image src={truck} alt="" className={styles.truckImg} />
                <p>Ainda não possui seu cadastro na Unitracking?</p>
                <Link className={styles.btnCad} href={'/cadastroEmp'}>Cadastrar</Link>
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