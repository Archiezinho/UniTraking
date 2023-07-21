import { getServerSession } from "next-auth";
import { useState } from "react";
import { authOptions } from './api/auth/[...nextauth]';
import { useRouter } from "next/router";
import axios from "axios";
import api from "../libs/containerArmazem"
import apiU from "../libs/user"
import { CardContainersArmazem } from './Componentes/CardContainersArmazem.module.jsx';
import styles from '../styles/Bookings.module.css'
import { BsPlusLg } from 'react-icons/bs'
import { BsSearch } from 'react-icons/bs'
import { NavMenu } from './Componentes/MenuMobile.module.jsx';
import { uploadFile } from '@/firebase/uploadFile.js';
import { DebounceInput } from 'react-debounce-input'
import { BsCloudArrowDownFill } from 'react-icons/bs'

export default function Armazem(props) {
    const [containerList, setContainerList] = useState(props.containersArmazem);
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
    const [destino, setDestino] = useState('');
    const [armazemId, setArmazemId] = useState('');
    const router = useRouter();

    const searchFilter = e => {
        if (!e){
            setContainerList(props.containersArmazem)
            return;
        }

        handleSearch(e)
    }

    const handleSearch = async (search) => {
        const json = await axios.get(`/api/user?nome=${search.toString()}`)
        const json2 = await axios.get(`/api/containerArmazem?transportadoraId=${json.data.id}`)
        let list = new Array(json2.data.length);
        for (let i = 0; i < json2.data.length; i++) {
            var nome = { nome: json.data.nome }
            list[i] = Object.assign({}, nome, json2.data[i])
        }
        setContainerList(list);
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
                return;
            } else {
                setHasError('Erro ao cadastrar!!');
            };
        };
    };

    const handleCadastroArmazem = async () => {
        if (!destino || !armazemId) {
            setHasError('Preencha os campos!!!');
        } else {
            const json = await axios.post('/api/containerArmazem', {
                destino: destino.toString(),
                containerId: parseInt(containerId),
                transportadoraId: parseInt(props.user.id),
                armazemId: parseInt(armazemId),
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
        handleCadastroArmazem();

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
        const modal = document.querySelector(`.${styles['CreateContainerArea']}`);
        modal.classList.toggle(styles['activeModal'])
    }

    return (
        <div className={styles.Containers}>
            <NavMenu cargo={props.user.cargo}/>
            <div className={props.user.cargo === 'Armazem' ? styles.searchArea2 : styles.searchArea}>
                <span data-addc className={props.user.cargo === 'Armazem' ? styles.null : ''} onClick={(e) => { handleCContainerArea(e) }}><BsPlusLg /> Container</span>
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
                        <div className={styles.campoCadastro}>
                            <label htmlFor="armazemId">Número do Armazem</label>
                            <input
                                type="text"
                                name="armazemId"
                                id="armazemId"
                                value={armazemId}
                                onChange={e => setArmazemId(e.target.value)}
                            />
                        </div>
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
                    <CardContainersArmazem id={`${containerList.id}`} nome={`${containerList.nome}`} destino={`${containerList.destino}`} key={index} />
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

    const containersArmazem = await api.getAllContainerArmazem(parseInt(session.user.id));

    const containers = async () => {
        let myArray = new Array(containersArmazem.length);
        for (let i = 0; i < containersArmazem.length; i++) {
            const json = await apiU.getUser(containersArmazem[i].transportadoraId)
            myArray[i] = { nome: json.nome }
            myArray[i] = Object.assign({}, myArray[i], containersArmazem[i])
        }
        return myArray;
    }

    return {
        props: {
            containersArmazem: await containers(),
            user: session.user
        }
    }
};