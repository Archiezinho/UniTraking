import styles from '../../styles/cardUsuario.module.css'
import { useState } from "react";
import axios from "axios";

export function CardExportador(props) {
    const [hasError, setHasError] = useState('');
    const [nome, setNome] = useState('');

    const functionUpdate = async () => {
        if (!nome) {
            setHasError('Preencha os campos!!!');
        } else {
            const json = await axios.put('/api/exportador/' + props.id, {
                nome: nome.toString(),
                active: true
            });
            console.log(json)
            if (json.status === 200) {
                window.location.reload(true)
                return;
            } else {
                setHasError('Erro ao cadastrar!!');
            };
        };
    }
    const functionDelete = async () => {
        const json = await axios.put('/api/exportador/' + props.id, {
            nome: props.nome.toString(),
            active: 'false'
        });
        console.log(json)
        if (json.status === 200) {
            window.location.reload(true)
            return;
        } else {
            setHasError('Erro ao cadastrar!!');
        };
    }

    return (
        <div className={styles.CardUsuario}>
            <input type="text" value={!nome ? props.nome : nome}
                onChange={e => setNome(e.target.value)}
            />
            <input type="text" value={props.id} disabled />
            <button
                className={styles.btnUpdateUsuario}
                onClick={functionUpdate}
            >Update</button>
            <button
                className={styles.btnDeleteUsuario}
                onClick={functionDelete}
            >Deletar</button>
        </div>
    )
}