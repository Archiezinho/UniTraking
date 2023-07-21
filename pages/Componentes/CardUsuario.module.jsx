import styles from '../../styles/cardUsuario.module.css'
import { useState } from "react";
import axios from "axios";

export function CardUsuario(props) {
    const [hasError, setHasError] = useState('');
    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [cargo, setCargo] = useState('');

    const functionUpdate = async () => {
        const json = await axios.put('/api/user/' + props.id, {
            nome: !nome ? props.nome : nome.toString(),
            user: !user ? props.user : user.toString(),
            senha: !senha ? props.senha : senha.toString(),
            cargo: !cargo ? props.cargo : cargo.toString(),
            active: true
        });
        console.log(json)
        if (json.status === 200) {
            window.location.reload(true)
            return;
        } else {
            setHasError('Erro ao cadastrar!!');
        };
    }
    const functionDelete = async () => {
        const json = await axios.put('/api/user/' + props.id, {
            nome: props.nome.toString(),
            user: props.user.toString(),
            senha: props.senha.toString(),
            cargo: props.cargo.toString(),
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
            <input type="text" value={!user ? props.user : user}
                onChange={e => setUser(e.target.value)}
            />
            <input type="text" value={!senha ? props.senha : senha}
                className={styles.passwordShow}
                onChange={e => setSenha(e.target.value)}
            />
            <select className={styles.modalAddInput} name="cargo" onChange={e => setCargo(e.target.value)}>
                <option selected>{!cargo ? props.cargo : cargo}</option>
                <option value="Transportadora">Transportadora</option>
                <option value="Armazem">Armazem</option>
                <option value="Depot">Depot</option>
                <option value="Estufagem">Estufagem</option>
                <option value="Porto">Porto</option>
                <option value="Admin">Admin</option>
            </select>
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