import styles from '../../styles/CardLog.module.css'

export function CardLog(props) {
    return (
        <div className={styles.CardLog}>
            <p>
                <strong id={styles.idLog}>{props.id}</strong>
                <strong>{props.name}</strong> fez um <strong>{props.status}</strong> no booking <strong>{props.numberBooking}</strong>
            </p>
        </div>
    )
}