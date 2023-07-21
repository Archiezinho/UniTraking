import { getServerSession } from "next-auth";
import { useState } from "react";
import { authOptions } from './api/auth/[...nextauth]';
import axios from "axios";
import api from "../libs/log"
import { CardLog } from './Componentes/CardLog.module.jsx'
import styles from '../styles/Log.module.css'
import { NavMenu } from './Componentes/MenuMobile.module.jsx';

export default function Log(props) {
    const [ showMore, setShowMore ] = useState(true);
    const [ pageCount, setPageCount ] = useState(1);
    const [ logList, setLogList ] = useState(props.logs);

    const handleLoadMore = async () => {
        const json = await axios.get('/api/log?page=' + (pageCount + 1), {
            clienteId: props.user.clienteId
        });

        if (json.data.status){
            if(json.data.log.length === 0){
                setShowMore(false);
            }
            setLogList([...logList, ...json.data.log]);
        }
        setPageCount(pageCount + 1);
    }

    /*** TESTE DE FUNCIONALIDADE !PODE APAGAR! */
    const userList = [
        {
            id: 1,
            name: 'Dalva',
            status: 'Delete',
            bookingNumber: '0001'
        },
        {
            id: 2,
            name: 'Matheus',
            status: 'Update',
            bookingNumber: '0002'
        },
        {
            id: 3,
            name: 'Isac',
            status: 'Update',
            bookingNumber: '0003'
        },
        {
            id: 4,
            name: 'Wagner',
            status: 'Delete',
            bookingNumber: '0004'
        },
        {
            id: 5,
            name: 'Lucas',
            status: 'Update',
            bookingNumber: '0005'
        }
    ];

    return (
    <div className={styles.Log}>
        <NavMenu cargo={props.user.cargo}/>
    {userList.map((userList, index) => (
        <CardLog id={`${userList.id}`} name={userList.name} status={userList.status} numberBooking={`#${userList.bookingNumber}`} key={index} />
    ))}</div>)
}
export const getServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);
    if(!session){
        return {
            redirect: {
                destination: '/preLogin',
                permanent: true
            }
        }
    }
    const logs = await api.getAllLogs(session.user.clienteId);
    return {
        props: {
            user: session.user,
            logs: logs
        }
    }
};