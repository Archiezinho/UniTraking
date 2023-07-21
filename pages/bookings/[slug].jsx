import { getServerSession } from "next-auth";
import { useState } from "react";
import { authOptions } from '../api/auth/[...nextauth]';
import { useRouter } from "next/router";
import axios from "axios";
import apiC from "../../libs/container"
import apiB from "../../libs/booking"
import { CardContainers } from '../Componentes/CardContainers.module.jsx';
import styles from '../../styles/Bookings.module.css'
import { BsPlusLg } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import { NavMenu } from '../Componentes/MenuMobile.module.jsx';
import { uploadFile } from '@/firebase/uploadFile.js';
import { DebounceInput } from 'react-debounce-input'
import { BsCloudArrowDownFill } from 'react-icons/bs'

export default function Booking(props) {
    const [containerList, setContainerList] = useState(props.containers);
    const [hasError, setHasError] = useState('');
    const [search, setSearch] = useState('');
    const [containerId, setContainerId] = useState('');
    const [identificacao, setIdentificacao] = useState('');
    const [tara, setTara] = useState('');
    const [maxgross, setMaxgross] = useState('');
    const [net, setNet] = useState('');
    const [cuCap, setCuCap] = useState('');
    const [imageContainer, setImageContainer] = useState('');
    var image;
    const router = useRouter();

    const searchFilter = e => {
        if (!e) return handleSearch([])

        handleSearch(e)
    }

    const handleSearch = async (search) => {
        const json = await axios.get(`/api/container?bookingId=${parseInt(router.query.slug)}&identificacao=${search.toString()}`)
        setContainerList(json.data);
    }

    const handleUpload = async (e) => {
        const url = await uploadFile(e);
        image = url;
        return;
    }

    const containerFilter = e => {
        if (!e){
            setContainerId('');
            setTara('');
            setMaxgross('');
            setNet('');
            setCuCap('');
            setImageContainer('');
            return;
        } 

        handleGetContainer(e)
    }

    const handleGetContainer = async (e) => {
        const json = await axios.get(`/api/container?identificacao=${e}`);
        setContainerId(json.data.error ? '' : json.data.id);
        setTara(json.data.error ? '' : json.data.tara);
        setMaxgross(json.data.error ? '' : json.data.maxgross);
        setNet(json.data.error ? '' : json.data.net);
        setCuCap(json.data.error ? '' : json.data.cuCap);
        setImageContainer(json.data.error ? '' : json.data.imageContainer);
    }

    const handleCadastroContainer = async () => {
        await handleUpload(imageContainer);
        if (!identificacao || !tara || !maxgross || !net || !cuCap || !image) {
            setHasError('Preencha os campos!!!');
        } else {
            const json = await axios.post('/api/container', {
                identificacao: identificacao.toString(),
                tara: tara.toString(),
                maxgross: maxgross.toString(),
                net: net.toString(),
                cuCap: cuCap.toString(),
                imageContainer: image.toString(),
                bookingId: parseInt(router.query.slug)
            });
            if (json.status === 200) {
                window.location.reload(true)
                return;
            } else {
                setHasError('Erro ao cadastrar!!');
            };
        };
    };

    const handleUpdateContainer = async () => {
        if (image != imageContainer && image) {
            await handleUpload(imageContainer);
        } else {
            image = imageContainer;
        }
        if (!identificacao || !tara || !maxgross || !net || !cuCap || !image) {
            setHasError('Preencha os campos!!!');
        } else {
            const json = await axios.put(`/api/container/${parseInt(containerId)}`, {
                identificacao: identificacao.toString(),
                tara: tara.toString(),
                maxgross: maxgross.toString(),
                net: net.toString(),
                cuCap: cuCap.toString(),
                imageContainer: image.toString(),
                bookingId: parseInt(router.query.slug),
                status: 'Cadastro do Depot Necessário',
                active: true
            });
            if (json.status === 200) {
                window.location.reload(true)
                return;
            } else {
                setHasError('Erro ao cadastrar!!');
            };
        };
    };

    const handleCadastro = async (e) => {
        e.preventDefault();
        if (!containerId) {
            handleCadastroContainer()
        } else {
            handleUpdateContainer()
        }

    }

    const handleFinal = async () => {
        const del = await handleDeleteAllContainerExtras();
        const del2 = await handleDeleteAllEstufas();

        if (del === 'ok' && del2 === 'ok') {
            handleFinalzeBooking();
        }
    }
    const handleDeleteAllContainerExtras = async () => {
        const json = await axios.put(`/api/containerExtra`, {
            bookingId: parseInt(router.query.slug),
            active: 'false',
        });
        if (json.status === 200) {
            return 'ok';
        } else {
            setHasError('Erro ao cadastrar!!');
        };
    }
    const handleDeleteAllEstufas = async () => {
        const json = await axios.put(`/api/estufa`, {
            bookingId: parseInt(router.query.slug),
            active: 'false',
        });
        if (json.status === 200) {
            return 'ok';
        } else {
            setHasError('Erro ao cadastrar!!');
        };
    }
    const handleFinalzeBooking = async () => {
        const json = await axios.put(`/api/booking/${parseInt(props.booking.id)}`, {
            quantidade: parseInt(props.booking.quantidadeContainer),
            numero: props.booking.numeroBooking.toString(),
            armador: props.booking.armador.toString(),
            exportadorId: parseInt(props.booking.exportadorId),
            destino: props.booking.destino.toString(),
            status: 'Finalizado',
            active: 'false',
        });
        if (json.status === 200) {
            router.push('/bookings')
        } else {
            setHasError('Erro ao cadastrar!!');
        };
    }


    /*
    const [showMore, setShowMore] = useState(true);
    const [pageCount, setPageCount] = useState(1);

    const handleLoadMore = async () => {
        const json = await axios.get('/api/container?page=' + (pageCount + 1), {
            bookingId: props.booking.bookingId
        });

        if (json.data.status) {
            if (json.data.container.length === 0) {
                setShowMore(false);
            }
            setContainerList([...containerList, ...json.data.container]);
        }
        setPageCount(pageCount + 1);
    }
    */

    const handleCContainerArea = async (e) => {
        e.preventDefault();

        if (containerList.length >= props.booking.quantidadeContainer) {
            return;
        }
        else {
            const modal = document.querySelector(`.${styles['CreateContainerArea']}`);
            modal.classList.toggle(styles['activeModal'])
        }
    }

    return (
        <div className={styles.Containers}>
            <NavMenu cargo={props.user.cargo}/>
            <div className={props.user.cargo !== 'Admin' ? styles.searchArea2 : styles.searchArea}>
                <span data-addc className={props.user.cargo === 'Admin' || props.user.cargo === 'Depot' ? "" : styles.null} onClick={(e) => { handleCContainerArea(e) }}><BsPlusLg /> Container</span>
                <span data-addc className={props.user.cargo !== 'Admin' ? styles.null : ''} onClick={handleFinal}>Finalizar Booking</span>
                <label htmlFor="search
                Cont" className={styles.searchBtn}><BsSearch /></label>
                <DebounceInput type="search" name="searchCont" minLength={1} debounceTimeout={500} id={styles.searchCont} value={search} onChange={e => { setSearch(e.target.value); searchFilter(e.target.value); }} />
            </div>
            <div className={styles.CreateContainerArea}>
                <h2>Cadastrar Container</h2>
                <form className={styles.formCContainer}>
                    <div className={styles.ContArea}>
                        <div className={styles.campoCadastro}>
                            <label htmlFor="idCont">ID Container</label>
                            <DebounceInput
                                type="text"
                                name="idCont"
                                id="idCont"
                                minLength={1}
                                debounceTimeout={1000}
                                value={identificacao}
                                onChange={e => { setIdentificacao(e.target.value); containerFilter(e.target.value) }}
                            />
                        </div >

                        <div className={styles.campoCadastro}>
                            <label htmlFor="tara">Tara</label>
                            <input
                                type="text"
                                name="tara"
                                id="tara"
                                value={tara}
                                onChange={e => setTara(e.target.value)}
                            />
                        </div>
                        <div className={styles.campoCadastro}>
                            <label htmlFor="maxgross">MaxGross</label>
                            <input
                                type="text"
                                name="maxgross"
                                id="maxgross"
                                value={maxgross}
                                onChange={e => setMaxgross(e.target.value)}
                            />
                        </div>
                        <div className={styles.campoCadastro}>
                            <label htmlFor="net">Net</label>
                            <input
                                type="text"
                                name="net"
                                id="net"
                                value={net}
                                onChange={e => setNet(e.target.value)}
                            />
                        </div>
                        <div className={styles.campoCadastro}>
                            <label htmlFor="cuCap">CuCap</label>
                            <input
                                type="text"
                                name="cuCap"
                                id="cuCa"
                                value={cuCap}
                                onChange={e => setCuCap(e.target.value)}
                            />
                        </div>
                        <div className={styles.imgCont}>
                            <label htmlFor="imgCont">Imagem do Container</label>
                            <input
                                type="file"
                                name="imgCont"
                                id="imgCont"
                                onChange={e => setImageContainer(e.target.files[0])}
                            />
                        </div>
                        <a href={imageContainer}><BsCloudArrowDownFill />Ver Documento</a>
                        <div className={styles.btnArea}>
                            <button onClick={(e) => { handleCContainerArea(e) }} className={styles.btnCancel}>Cancelar</button>
                            <button className={styles.btnCancel} onClick={(e) => { handleCadastro(e) }}>
                                Criar Container
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <div className={styles.ContainersCards}>
                {containerList.map((containerList, index) => (
                    <CardContainers id={`${containerList.id}`} identificacao={`${containerList.identificacao}`} status={`${containerList.status}`} key={index} />
                ))}
            </div>
        </div>
    );
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
    else if (session.user.cargo === 'Admin' || session.user.cargo === 'Depot' || session.user.cargo === 'Estufagem' || session.user.cargo === 'Porto') {
    }
    else{
        return {
            redirect: {
                destination: '/bookings',
                permanent: true
            }
        }
    }

    const booking = await apiB.getBooking(parseInt(context.query.slug));

    if (session.user.clienteId !== booking.clienteId) {
        return {
            redirect: {
                destination: '/bookings',
                permanent: true
            }
        }
    }

    const containers = await apiC.getAllContainers(booking.id);

    return {
        props: {
            booking: booking,
            containers: containers,
            user: session.user
        }
    }
};