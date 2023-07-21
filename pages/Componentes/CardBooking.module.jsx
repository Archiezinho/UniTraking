import styles from '../../styles/CardCont.module.css'
import { useRouter } from "next/router";

export function CardBooking(props) {
    const router = useRouter();

    const handlePush = async () => {
        router.push(`/bookings/${props.id}`)
    }

    return (
        <div className={styles.Card}>
            <span data-number>Número do Booking:</span>
            <span data-number>{props.numeroBooking}</span>
            <span data-number>quantidade de Containers:</span>
            <span data-number>{props.quantidadeContainer}</span>

            <button onClick={handlePush}>Acessar</button>
        </div>
    )
}