import { getServerSession } from "next-auth";
import { useState } from 'react'
import { authOptions } from '../api/auth/[...nextauth]';
import axios from "axios";
import api from "../../libs/booking"
import { CardBooking } from '../Componentes/CardBooking.module.jsx'
import styles from '../../styles/Bookings.module.css'
import { BsPlusLg } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import { NavMenu } from '../Componentes/MenuMobile.module.jsx';
import { DebounceInput } from 'react-debounce-input'

export default function Bookings(props) {
    const [bookingList, setBookingList] = useState(props.bookings);
    const [hasError, setHasError] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [numero, setNumero] = useState('');
    const [armador, setArmador] = useState('');
    const [destino, setDestino] = useState('');
    const [exportadorId, setExportadorId] = useState('');
    const [search, setSearch] = useState('');

    
    /*
    const [showMore, setShowMore] = useState(true);
    const [pageCount, setPageCount] = useState(1);
    const handleLoadMore = async () => {
        const json = await axios.get('/api/booking?page=' + (pageCount + 1), {
            clienteId: props.user.clienteId
        });

        if (json.data.status) {
            if (json.data.booking.length === 0) {
                setShowMore(false);
            }
            setBookingList([...bookingList, ...json.data.booking]);
        }
        setPageCount(pageCount + 1);
    }*/

    const searchFilter = e => {
        if (!e) return handleSearch([])

        handleSearch(e)
    }

    const handleSearch = async (search) => {
        const json = await axios.get(`/api/booking?clienteId=${parseInt(props.user.clienteId)}&numero=${search.toString()}`)
        setBookingList(json.data);
    }

    const handleCadastro = async () => {
        if(!quantidade || !numero || !armador || !exportadorId || !destino){
            setHasError('Preencha os campos!!!');
        }else{
            const json = await axios.post('/api/booking', {
                quantidade: parseInt(quantidade),
                numero: numero.toString(),
                armador: armador.toString(),
                exportadorId: parseInt(exportadorId),
                destino: destino.toString(),
                clienteId: parseInt(props.user.clienteId),
            });
            if(json.status === 200){
                window.location.reload(true)
            }else{
                setHasError('Erro ao cadastrar!!');
            };
        };
    };

    const handleCBookingArea = async (e) => {
        e.preventDefault();
        const modal = document.querySelector(`.${styles['CreateBookingArea']}`); 
        modal.classList.toggle(styles['activeModal'])
    }

    return (
        <div className={styles.Bookings}>
            <NavMenu cargo={props.user.cargo}/>
            <div className={props.user.cargo !== 'Admin' ? styles.searchArea2 : styles.searchArea}>
                <span data-addb className={props.user.cargo !== 'Admin' ? styles.null : ''} onClick={(e) => {handleCBookingArea(e)}}><BsPlusLg /> Bookings</span>
                <label htmlFor="search" className={styles.searchBtn}><BsSearch /></label>
                <DebounceInput type="search" name="search" minLength={1} debounceTimeout={500} id={styles.search} value={search} onChange={e => {setSearch(e.target.value); searchFilter(e.target.value); }}/>
            </div>

            <div className={styles.CreateBookingArea}>
                <h2>Cadastrar Booking</h2>
                <form className={styles.formCBooking}>
                    <div className={styles.campoCadastro}>
                        <label htmlFor="number">Número</label>
                        <input
                            type="text"
                            name="number"
                            id="number"
                            value={numero} 
                            onChange={e => setNumero(e.target.value)}
                            />
                    </div>
                    <div className={styles.campoCadastro}>
                        <label htmlFor="armador">Armador</label>
                        <input
                            type="text"
                            name="armardor"
                            id="armardor" 
                            value={armador} 
                            onChange={e => setArmador(e.target.value)}
                            />
                    </div>
                    <div className={styles.campoCadastro}>
                        <label htmlFor="exportador">Número do exportador</label>
                        <input
                            type="text"
                            name="exportador"
                            id="exportador" 
                            value={exportadorId} 
                            onChange={e => setExportadorId(e.target.value)}
                            />
                    </div>
                    <div className={styles.campoCadastro}>
                        <label htmlFor="qtdCont">Quantidade Containers</label>
                        <input
                            type="text"
                            name="qtdcont"
                            id="qtdCont" 
                            value={quantidade} 
                            onChange={e => setQuantidade(e.target.value)}
                            />
                    </div>
                    <div className={styles.campoCadastro}>
                        <label htmlFor="destino">Destino</label>
                        <input
                            type="text"
                            name="destino"
                            id="destino"
                            value={destino} 
                            onChange={e => setDestino(e.target.value)}
                            />
                    </div>
                    <div className={styles.btnArea}>
                        <button onClick={(e) => {handleCBookingArea(e)}} className={styles.btnCB}>Cancelar</button>
                        <button className={styles.btnCancel} onClick={handleCadastro}>
                            Criar Booking
                        </button>
                    </div>
                </form>
            </div>

            <div className={styles.bookingsContainer}>
                {bookingList.map((bookingList, index) => (
                    <CardBooking id={`${bookingList.id}`} quantidadeContainer={`${bookingList.quantidadeContainer}`} numeroBooking={`${bookingList.numeroBooking}`} key={index} />
                ))}</div>
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
    /*else if (session.user.cargo === 'Admin' || session.user.cargo === 'Depot' || session.user.cargo === 'Estufagem' || session.user.cargo === 'Porto') {
    }
    else{
        return {
            redirect: {
                destination: '/bookings',
                permanent: true
            }
        }
    }*/

    const bookings = await api.getAllBookings(session.user.clienteId);
    return {
        props: {
            user: session.user,
            bookings: bookings
        }
    }
};
