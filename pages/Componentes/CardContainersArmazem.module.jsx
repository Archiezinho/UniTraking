import { useRouter } from 'next/router'
import styles from '../../styles/CardCont.module.css'

export function CardContainersArmazem(props) {
    const router = useRouter()

    const handlePush = async () => {
        router.push(`/containerArmazem/${props.id}`)
    }

    return (
        <div className={styles.Card}>
            <span data-number>Transportadora:</span>
            <span data-number>{props.nome}</span>
            <span data-number>Destino:</span>
            <span data-number>{props.destino}</span>

            <button onClick={handlePush}>Acessar</button>
        </div>
    )
}