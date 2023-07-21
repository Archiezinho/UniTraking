import { getServerSession } from "next-auth";
import { authOptions } from '../api/auth/[...nextauth]';
import apiC from "../../libs/container"
import apiCA from "../../libs/containerArmazem"
import apiU from "../../libs/user"
import styles from '../../styles/Container.module.css'
import { NavMenu } from '../Componentes/MenuMobile.module.jsx';
import { BsCloudArrowDownFill } from 'react-icons/bs'

export default function Container(props) {

    return (
        <div className={styles.unique}>
            <NavMenu cargo={props.user.cargo}/>
            <div className={styles.containerInfo}>
                <h2>Infomações da Transportadora</h2>
                <label htmlFor="idCont">Transportadora</label>
                <input
                    className={styles.idContInfo}
                    type="text"
                    disabled
                    value={props.transportadora}
                />
                <label htmlFor="idCont">Destino</label>
                <input
                    className={styles.idContInfo}
                    type="text"
                    disabled
                    value={props.containerArmazem.destino}
                />
                <h2>Infomações do Container</h2>
                <label htmlFor="idCont">ID Container</label>
                <input
                    className={styles.idContInfo}
                    type="text"
                    disabled
                    value={props.container.identificacao}
                />
                <label htmlFor="idCont">Tara</label>
                <input
                    className={styles.idContInfo}
                    type="text"
                    disabled
                    value={props.container.tara}
                />
                <label htmlFor="idCont">MaxGross</label>
                <input
                    className={styles.idContInfo}
                    type="text"
                    disabled
                    value={props.container.maxgross}
                />
                <label htmlFor="idCont">Net</label>
                <input
                    className={styles.idContInfo}
                    type="text"
                    disabled
                    value={props.container.net}
                />
                <label htmlFor="idCont">CuCap</label>
                <input
                    className={styles.idContInfo}
                    type="text"
                    disabled
                    value={props.container.cuCap}
                />
                <label htmlFor="imgLacre">Imagem do Container</label>
                <a href={props.container.imageContainer} className={`${styles.doc} ${styles.idContInfo}`}><BsCloudArrowDownFill />Ver Imagem do Container</a>
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
    else if (session.user.cargo === 'Admin' || session.user.cargo === 'Transportadora' || session.user.cargo === 'Armazem') {
    }
    else{
        return {
            redirect: {
                destination: '/bookings',
                permanent: true
            }
        }
    }

    const containerArmazem = await apiCA.getContainerArmazem(parseInt(context.query.slug));
    const container = await apiC.getContainer(containerArmazem.containerId);
    const transportadora = await apiU.getUser(containerArmazem.transportadoraId);

    return {
        props: {
            containerArmazem: containerArmazem,
            container: container,
            transportadora: transportadora.nome
        }
    }
};