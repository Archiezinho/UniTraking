import { useRouter } from 'next/router'
import styles from '../../styles/CardCont.module.css'

export function CardContainers(props) {
    const router = useRouter()

    const handlePush = async () => {
        router.push(`/container/${props.id}`)
    }

    return (
        <div className={styles.Card}>
            <span data-number>Número do identificacao:</span>
            <span data-number>{props.identificacao}</span>
            <span data-number>Status:</span>
            <span data-number>{props.status}</span>

            <button onClick={handlePush}>Acessar</button>
        </div>
    )
}