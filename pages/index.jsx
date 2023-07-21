import styles from '../styles/Home.module.css';
import top from '../public/images/top.png';
import bottom from '../public/images/bottom.png';
import { BsShieldFillCheck } from 'react-icons/bs'
import { BsGeoAltFill } from 'react-icons/bs'
import Link from 'next/link';
import Image from 'next/image'

export default function Home() {
    return (
        <div className={styles.Home}>
            <Image src={top} alt="ilustração" className={styles.imgBg}/>
            <div className={styles.titleSubTitle}>
                <h1>Unitracking</h1>
                <p>Venha conhecer nossos serviços. </p>
            </div>
            <div className={styles.cardsHome}>
                <div className={styles.rastreabilidadeCard}>
                    <span className={styles.containerImg}><BsGeoAltFill className={styles['bi-geo-alt-fill']}/></span>
                    <div className={styles.leftSideRas}>
                        <h2>Rastreabilidade</h2>
                        <p>Acompanhe sua carga de onde estiver.</p>
                    </div>
                    <div className={styles.leftRightRas}>
                        
                    </div>
                </div>
                <div className={styles.cadBookingsHome}>
                    <span className={styles.shieldImg}><BsShieldFillCheck className={styles['bi-shield-fill-check']}/></span>
                    <div className={styles.leftSideSec}>
                        <h2>Segurança</h2>
                        <p>Cadastre seus Bookings com total segurança.</p>
                    </div>
                    <div className={styles.rightSideSec}>

                    </div>
                </div>
            </div>
            <Link className={styles.btnAcesso} href={'/preLogin'}>Acesse agora</Link>
            <Image src={bottom} alt="" />
        </div>
    )
}