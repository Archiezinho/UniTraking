import { getServerSession } from "next-auth";
import { useState } from "react";
import { authOptions } from '../api/auth/[...nextauth]';
import { useRouter } from "next/router";
import axios from "axios";
import apiCo from "../../libs/container"
import apiCx from "../../libs/containerExtra";
import apiMo from "../../libs/motorista"
import apiEs from "../../libs/estufa"
import apiBo from "../../libs/booking"
import styles from '../../styles/Container.module.css'
import styles2 from '../../styles/Bookings.module.css'
import { NavMenu } from '../Componentes/MenuMobile.module.jsx';
import { BsClipboard2CheckFill } from 'react-icons/bs'
import { BsPatchCheckFill } from 'react-icons/bs'
import { BsCloudArrowDownFill } from 'react-icons/bs'
import { FaTruck } from 'react-icons/fa'
import { uploadFile } from '@/firebase/uploadFile.js';
import { DebounceInput } from 'react-debounce-input'

export default function Container(props) {
    const [hasError, setHasError] = useState('');
    const [motoristaId, setMotoristaId] = useState(!props.motorista ? '' : props.motorista.motoristaId);
    const [cpfMotorista, setCpfMotorista] = useState(!props.motorista ? '' : props.motorista.cpf);
    const [nomeMotorista, setNomeMotorista] = useState(!props.motorista ? '' : props.motorista.nome);
    const [documentoMotorista, setDocumentoMotorista] = useState(!props.motorista ? '' : props.motorista.documento);
    const [placaCaminhao, setPlacaCaminhao] = useState(!props.containerExtra ? '' : props.containerExtra.placaCaminhao);
    const [imageLacre, setImageLacre] = useState(!props.containerExtra ? '' : props.containerExtra.imageLacre);
    const [peso, setPeso] = useState(!props.estufa ? '' : props.estufa.peso);
    const [volume, setVolume] = useState(!props.estufa ? '' : props.estufa.volume);
    const [embalagem, setEmbalagem] = useState(!props.estufa ? '' : props.estufa.embalagem);
    const [tipo, setTipo] = useState(!props.estufa ? '' : props.estufa.tipoCarga);
    const [imageLacreArmador, setImageLacreArmador] = useState(!props.estufa ? '' : props.estufa.imageLacreArmador);
    const [imageLacreSif, setImageLacreSif] = useState(!props.estufa ? '' : props.estufa.imageLacreSif);
    const [documentoCarga, setDocumentoCarga] = useState(!props.estufa ? '' : props.estufa.documentoCarga);
    const [documentoCargaPerigosa, setDocumentoCargaPerigosa] = useState(!props.estufa ? '' : props.estufa.documentoCargaPerigosa);
    const [legenda, setlegenda] = useState(!props.estufa ? '' : props.estufa.legenda);
    const [motoristaId2, setMotoristaId2] = useState(!props.motorista2 ? '' : props.motorista2.motoristaId);
    const [cpfMotorista2, setCpfMotorista2] = useState(!props.motorista2 ? '' : props.motorista2.cpf);
    const [nomeMotorista2, setNomeMotorista2] = useState(!props.motorista2 ? '' : props.motorista2.nome);
    const [documentoMotorista2, setDocumentoMotorista2] = useState(!props.motorista2 ? '' : props.motorista2.documento);
    var docMotorista, imgLacre, imgArm, imgSif, docCarga, docCargaP;
    const router = useRouter();

    const handleUpload = async (e, campo) => {
        const url = await uploadFile(e);
        switch (campo) {
            case 'docMotorista':
                docMotorista = url
                break;
            case 'imgLacre':
                imgLacre = url
                break;
            case 'imgArm':
                imgArm = url
                break;
            case 'imgSif':
                imgSif = url
                break;
            case 'docCarga':
                docCarga = url
                break;
            case 'docCargaP':
                docCargaP = url
                break;
        }
        return;
    }

    const motoristaFilter = (e, campo) => {
        if (!e){
            setMotoristaId('');
            setNomeMotorista('');
            setDocumentoMotorista('');
            return;
        }

        handleGetMotorista(e, campo)
    }
    const handleGetMotorista = async (e, campo) => {
        const json = await axios.get(`/api/motorista?cpf=${e}`);
        switch (campo) {
            case 1:
                setMotoristaId(json.data.error ? '' : json.data.id);
                setNomeMotorista(json.data.error ? '' : json.data.nome);
                setDocumentoMotorista(json.data.error ? '' : json.data.documento);
                break;
            case 2:
                setMotoristaId2(json.data.error ? '' : json.data.id);
                setNomeMotorista2(json.data.error ? '' : json.data.nome);
                setDocumentoMotorista2(json.data.error ? '' : json.data.documento);
                break;
        }
    }

    const handlePostMotorista = async (nome, documentoMotorista, cpf) => {
        await handleUpload(documentoMotorista, 'docMotorista');
        if (!nome || !docMotorista || !cpf) {
            setHasError('Preencha os campos!!!');
        } else {
            const json = await axios.post('/api/motorista', {
                nome: nome.toString(),
                documento: docMotorista.toString(),
                cpf: cpf.toString(),
            });
            if (json.status === 200) {
                return json.data.id;
            } else {
                setHasError('Erro ao cadastrar o motorista!!');
            };
        };
    }

    const handleUpdateMotorista = async (nome, documentoMotorista, cpf) => {
        if (docMotorista != documentoMotorista && docMotorista) {
            await handleUpload(documentoMotorista, 'docMotorista');
        } else {
            docMotorista = documentoMotorista;
        }
        if (!nome || !docMotorista || !cpf) {
            setHasError('Preencha os campos!!!');
        } else {
            const json = await axios.put(`/api/motorista/${motoristaId}`, {
                nome: nome.toString(),
                documento: docMotorista.toString(),
                cpf: cpf.toString(),
                active: true
            });
            if (json.status === 200) {
            } else {
                setHasError('Erro ao cadastrar o motorista!!');
            };
        };
    }

    const handleCadastroExtra = async (motorId) => {
        if (!motorId) {
            motorId = motoristaId
        }
        await handleUpload(imageLacre, 'imgLacre');
        if (!imageLacre || !placaCaminhao) {
            setHasError('Preencha os campos!!!');
        } else {
            const json = await axios.post('/api/containerExtra', {
                imageLacre: imgLacre.toString(),
                placaCaminhao: placaCaminhao.toString(),
                motoristaId: parseInt(motorId),
                containerId: parseInt(router.query.slug),
                bookingId: parseInt(props.booking.id),
            });
            if (json.status === 200) {
                var status = 'Depot';  
                handleStatus(status);
            } else {
                setHasError('Erro ao cadastrar!!');
            };
        };
    }

    const handleCadastro = async (e) => {
        e.preventDefault();
        if (!motoristaId) {
            const motorId = await handlePostMotorista(nomeMotorista, documentoMotorista, cpfMotorista)
            handleCadastroExtra(motorId)
        } else {
            handleUpdateMotorista(nomeMotorista, documentoMotorista, cpfMotorista)
            handleCadastroExtra()
        }
    }
    const handleCadastroEstufa = async (e) => {
        e.preventDefault();
        if (!motoristaId2) {
            const motorId = await handlePostMotorista(nomeMotorista2, documentoMotorista2, cpfMotorista2)
            handleCadastroEstufamento(motorId)
        } else {
            handleUpdateMotorista(nomeMotorista2, documentoMotorista2, cpfMotorista2)
            handleCadastroEstufamento()
        }
    }
    const handleCadastroEstufamento = async (motorId) => {
        if (!motorId) {
            motorId = motoristaId2
        }
        await handleUpload(imageLacreArmador, 'imgArm');
        await handleUpload(imageLacreSif, 'imgSif');
        await handleUpload(documentoCarga, 'docCarga');
        await handleUpload(documentoCargaPerigosa, 'docCargaP');
        if (!peso || !volume || !embalagem || !tipo || !imgArm || !imgSif || !docCarga || !docCargaP || !legenda) {
            setHasError('Preencha os campos!!!');
        } else {
            const json = await axios.post('/api/estufa', {
                peso: parseFloat(peso),
                volume: parseFloat(volume),
                embalagem: embalagem.toString(),
                tipo: tipo.toString(),
                imageLacreArmador: imgArm.toString(),
                imageLacreSif: imgSif.toString(),
                documentoCarga: docCarga.toString(),
                documentoCargaPerigosa: docCargaP.toString(),
                legenda: legenda.toString(),
                containerId: parseInt(router.query.slug),
                motoristaId: parseInt(motorId),
                bookingId: parseInt(props.booking.id),
            });
            if (json.status === 200) {
                var status = 'Estufagem';  
                handleStatus(status);
            } else {
                setHasError('Erro ao cadastrar!!');
            };
        };
    };
    const handleStatus = async (status) => {
        const json = await axios.put(`/api/container/${parseInt(router.query.slug)}`, {
            identificacao: props.container.identificacao.toString(),
            tara: props.container.tara.toString(),
            maxgross: props.container.maxgross.toString(),
            net: props.container.net.toString(),
            cuCap: props.container.cuCap.toString(),
            imageContainer: props.container.imageContainer.toString(),
            bookingId: parseInt(props.booking.id),
            status: status.toString(),
            active: 'true'
        });
        if (json.status === 200) {
            window.location.reload(true)
        } else {
            setHasError('Erro ao cadastrar!!');
        };
    }

    const handleCContainerArea = async (e) => {
        e.preventDefault();
        const modal = document.querySelector(`.${styles2['CreateContainerArea']}`);
        modal.classList.toggle(styles['activeModal1'])
    }
    const handleCEstufaArea = async (e) => {
        e.preventDefault();
        const modal = document.querySelector(`.${styles2['CreateBookingArea']}`);
        modal.classList.toggle(styles['activeModal2'])
    }

    return (
        <div className={styles.Container}>
            <NavMenu cargo={props.user.cargo}/>
            <div className={styles.contProgress}>
                <div className={styles.progressIcon}>
                    <span data-container-recebido className={`${styles['z-index5']} ${!props.containerExtra ? '' : styles.activeProIcon}`}><BsClipboard2CheckFill className={styles['material-icons']} /></span>

                    <span data-semiprogress1 className={!props.estufa ? '' : styles.activePro}></span>

                    <span data-container-transito className={`${styles['z-index5']} ${!props.estufa ? '' : styles.activeProIcon}`}><FaTruck className={styles['material-icons']} /></span>

                    <span data-semiprogress2 className={props.container.status === 'Porto' ? styles.activePro : ''}></span>

                    <span data-container-finalizado className={`${styles['z-index5']} ${props.container.status === 'Porto' ? styles.activeProIcon : ''}`}><BsPatchCheckFill className={styles['material-icons']} /></span>
                </div>
                <div className={styles.progressText}>
                    <p className={!props.containerExtra ? styles.opac : styles.activeProIcon}>Container Comfirmado<br></br> <strong>Realizado as {!props.containerExtra ? '' : props.containerExtra.created_at}</strong></p>
                    <p className={!props.estufa ? styles.opac : styles.activeProIcon}> Container Estufado <br></br> <strong>Realizado as {!props.estufa ? '' : props.estufa.created_at}</strong></p>
                    <p className={props.container.status === 'Porto' ? styles.activeProIcon : styles.opac}> Container Entregue <br></br> <strong>Realizado as {!props.estufa ? '' : props.estufa.created_at}</strong></p>
                </div>
            </div>
            <div className={styles.separator}>

                <div className={styles.containerInfo}>
                    <h2>Infomações do Container</h2>
                    <label htmlFor="idCont">ID Container</label>
                    <input
                        className={styles.idContInfo}
                        type="text"
                        disabled
                        value={props.container.identificacao}
                    />
                    <label htmlFor="idCont">Tara</label>
                    <input
                        className={styles.idContInfo}
                        type="text"
                        disabled
                        value={props.container.tara}
                    />
                    <label htmlFor="idCont">MaxGross</label>
                    <input
                        className={styles.idContInfo}
                        type="text"
                        disabled
                        value={props.container.maxgross}
                    />
                    <label htmlFor="idCont">Net</label>
                    <input
                        className={styles.idContInfo}
                        type="text"
                        disabled
                        value={props.container.net}
                    />
                    <label htmlFor="idCont">CuCap</label>
                    <input
                        className={styles.idContInfo}
                        type="text"
                        disabled
                        value={props.container.cuCap}
                    />
                    <label htmlFor="imgLacre">Imagem do Container</label>
                    <a href={props.container.imageContainer} className={`${styles.doc} ${styles.idContInfo}`}><BsCloudArrowDownFill />Ver Imagem do Container</a>
                    <hr />
                    <h2 className={!props.containerExtra ? styles.null : ''}>Infomações do Depot</h2>


                    <label htmlFor="imgCont" className={!props.containerExtra ? styles.null : ''}>Placa do Caminhão</label>
                    <input
                        type="text"
                        name="imgCont"
                        className={!props.containerExtra ? styles.null : styles.idContInfo}
                        disabled
                        value={placaCaminhao}
                    />
                    <label htmlFor="imgLacre" className={!props.containerExtra ? styles.null : ''}>Imagem Lacre</label>
                    <a href={imageLacre} className={`${styles.doc} ${!props.containerExtra ? styles.null : styles.idContInfo}`}><BsCloudArrowDownFill />Ver Imagem do lacre</a>

                    <hr />

                    <h2 className={!props.containerExtra ? styles.null : ''}>Infomações do Motorista</h2>
                    <h2 className={!props.containerExtra ? styles.null : ''}>Depot/Estufagem</h2>
                    <label htmlFor="idCont" className={!props.containerExtra ? styles.null : ''}>Nome Motorista</label>
                    <input
                        className={!props.containerExtra ? styles.null : styles.idContInfo}
                        type="text"
                        disabled
                        value={nomeMotorista}
                    />
                    <label htmlFor="idCont" className={!props.containerExtra ? styles.null : ''}>Cpf Motorista</label>
                    <input
                        className={!props.containerExtra ? styles.null : styles.idContInfo}
                        type="text"
                        disabled
                        value={cpfMotorista}
                    />

                    <label htmlFor="documentoMotorista" className={!props.containerExtra ? styles.null : ''}>Documento motorista</label>
                    <a href={documentoMotorista} className={`${styles.doc} ${!props.containerExtra ? styles.null : styles.idContInfo}`}><BsCloudArrowDownFill />ver Documento</a>

                    <button className={`${styles.marginB} ${props.user.cargo === 'Admin' ||  props.user.cargo === 'Depot' && !props.containerExtra ? styles.btnComponent : styles.null}`} onClick={e => handleCContainerArea(e)}>Cadastrar Infomações do Depot</button>
                </div>


                <div className={!props.estufa ? styles.null : styles.CadEstufamento}>
                    <h2>Estufamento</h2>

                    <label htmlFor="Estufamento">Peso</label>
                    <input
                        className={styles.idContInfo}
                        type="text"
                        value={peso}
                        disabled
                    />
                    <label htmlFor="Estufamento">Volume</label>
                    <input
                        className={styles.idContInfo}
                        type="text"
                        value={volume}
                        disabled
                    />
                    <label htmlFor="Estufamento">Embalagem</label>
                    <input
                        className={styles.idContInfo}
                        type="text"
                        value={embalagem}
                        disabled
                    />
                    <label htmlFor="Estufamento">Tipo Carga</label>
                    <input
                        className={styles.idContInfo}
                        type="text"
                        value={tipo}
                        disabled
                    />
                    <label htmlFor="Estufamento">Imagem do Lacre Armador</label>
                    <a href={imageLacreArmador} className={`${styles.doc} ${styles.idContInfo}`}><BsCloudArrowDownFill />Ver Imagem do lacre</a>
                    <label htmlFor="Estufamento">Imagem do Lacre Sif</label>
                    <a href={imageLacreSif} className={`${styles.doc} ${styles.idContInfo}`}><BsCloudArrowDownFill />Ver Imagem do lacre</a>
                    <label htmlFor="Estufamento">Documento da Carga</label>
                    <a href={documentoCarga} className={`${styles.doc} ${styles.idContInfo}`}><BsCloudArrowDownFill />Ver Imagem do lacre</a>
                    <label htmlFor="Estufamento">Documento da Carga Perigosa</label>
                    <a href={documentoCargaPerigosa} className={`${styles.doc} ${styles.idContInfo}`}><BsCloudArrowDownFill />Ver Imagem do lacre</a>
                    <label htmlFor="Estufamento">Legenda</label>
                    <textarea
                        rows="3"
                        className={`${styles.idContInfo}`}
                        type='text'
                        value={legenda}
                        disabled
                    />
                    <hr />
                    <h2>Infomações do Motorista</h2>
                    <h2>Estufagem/Porto</h2>
                    <label htmlFor="idCont">Cpf Motorista</label>
                    <input
                        className={styles.idContInfo}
                        type="text"
                        value={cpfMotorista2}
                        disabled
                    />

                    <label htmlFor="idCont">Nome Motorista</label>
                    <input
                        className={styles.idContInfo}
                        type="text"
                        value={nomeMotorista2}
                        disabled
                    />

                    <label htmlFor="documentoMotorista">Documento motorista</label>
                    <a href={documentoMotorista2} className={`${styles.doc} ${styles.idContInfo}`}><BsCloudArrowDownFill />ver Documento</a>
                </div>
                <div className={props.user.cargo === 'Admin' ||  props.user.cargo === 'Estufagem' && !props.estufa && props.containerExtra ? styles.CadEstufamento : styles.null}>
                    <button className={styles.btnComponent} onClick={e => handleCEstufaArea(e)}>Cadastrar Estufamento</button>
                </div>
            </div>
            <div className={props.user.cargo === 'Admin' ||  props.user.cargo === 'Porto' && props.estufa && props.containerExtra ? styles.separator : styles.null}>
                <div className={styles.CadEstufamento}>
                    <button className={styles.btnComponent} onClick={() => {var status = 'Porto';  handleStatus(status)}}>Finalizar Entrega</button>
                </div>
            </div>

            <div className={styles2.CreateContainerArea}>
                <h2>Cadastrar Informações do depot</h2>
                <form className={styles2.formCContainer}>
                    <div className={styles2.campoCadastro}>
                        <label htmlFor="idCont">Cpf Motorista</label>
                        <DebounceInput
                            type="text"
                            minLength={1}
                            debounceTimeout={1000}
                            value={cpfMotorista}
                            onChange={e => { setCpfMotorista(e.target.value); motoristaFilter(e.target.value, 1) }}
                        />
                    </div>
                    <div className={styles2.campoCadastro}>
                        <label htmlFor="idCont">Nome Motorista</label>
                        <input
                            type="text"
                            value={nomeMotorista}
                            onChange={e => setNomeMotorista(e.target.value)}
                        />
                    </div>
                    <div className={styles2.imgCont}>
                        <label htmlFor="imgCont">Documento motorista</label>
                        <input
                            type="file"
                            name="imgCont"
                            onChange={e => setDocumentoMotorista(e.target.files[0])}
                        />
                    </div>
                    <div className={styles2.campoCadastro}>
                        <label htmlFor="imgCont">Placa do Caminhão</label>
                        <input
                            type="text"
                            name="imgCont"
                            value={placaCaminhao}
                            onChange={e => setPlacaCaminhao(e.target.value)}
                        />
                    </div>
                    <div className={styles2.imgCont}>
                        <label htmlFor="imgCont">Imagem do Lacre</label>
                        <input
                            type="file"
                            name="imgCont"
                            onChange={e => setImageLacre(e.target.files[0])}
                        />
                    </div>
                    <div className={styles2.btnArea}>
                        <button onClick={(e) => { handleCContainerArea(e) }} className={styles2.btnCancel}>Cancelar</button>
                        <button className={styles2.btnCancel} onClick={e => handleCadastro(e, 1)}>Cadastrar Infomações do Motorista</button>
                    </div>
                </form>
            </div>
            <div className={styles2.CreateBookingArea}>
                <form className={styles2.formCBooking}>
                    <h2>Cadastro Estufamento</h2>
                    <div className={styles2.campoCadastro}>
                        <label htmlFor="Estufamento">Peso</label>
                        <input
                            type="text"
                            value={peso}
                            onChange={e => setPeso(e.target.value)}
                        />
                    </div>
                    <div className={styles2.campoCadastro}>
                        <label htmlFor="Estufamento">Volume</label>
                        <input
                            type="text"
                            value={volume}
                            onChange={e => setVolume(e.target.value)}
                        />
                    </div>
                    <div className={styles2.campoCadastro}>
                        <label htmlFor="Estufamento">Embalagem</label>
                        <input
                            type="text"
                            value={embalagem}
                            onChange={e => setEmbalagem(e.target.value)}
                        />
                    </div>
                    <div className={styles2.campoCadastro}>
                        <label htmlFor="Estufamento">Tipo Carga</label>
                        <input
                            type="text"
                            value={tipo}
                            onChange={e => setTipo(e.target.value)}
                        />
                    </div>
                    <div className={styles2.imgCont}>
                        <label htmlFor="Estufamento">Imagem do Lacre Armador</label>
                        <input
                            type="file"
                            onChange={e => setImageLacreArmador(e.target.files[0])}
                        />
                    </div>
                    <div className={styles2.imgCont}>
                        <label htmlFor="Estufamento">Imagem do Lacre Sif</label>
                        <input
                            type="file"
                            onChange={e => setImageLacreSif(e.target.files[0])}
                        />
                    </div>
                    <div className={styles2.imgCont}>
                        <label htmlFor="Estufamento">Documento da Carga</label>
                        <input
                            type="file"
                            onChange={e => setDocumentoCarga(e.target.files[0])}
                        />
                    </div>
                    <div className={styles2.imgCont}>
                        <label htmlFor="Estufamento">Documento da Carga Perigosa</label>
                        <input
                            type="file"
                            onChange={e => setDocumentoCargaPerigosa(e.target.files[0])}
                        />
                    </div>
                    <div className={`${styles2.campoCadastro} ${styles.marginB}`}>
                        <label htmlFor="Estufamento">Legenda</label>
                        <textarea
                            rows="3"
                            type='text'
                            value={legenda}
                            onChange={e => setlegenda(e.target.value)}
                        />
                    </div>
                    <h2>Infomações do Motorista</h2>

                    <div className={styles2.campoCadastro}>
                        <label htmlFor="idCont">Cpf Motorista</label>
                        <DebounceInput
                            type="text"
                            minLength={1}
                            debounceTimeout={1000}
                            value={cpfMotorista2}
                            onChange={e => { setCpfMotorista2(e.target.value); motoristaFilter(e.target.value, 2) }}
                        />
                    </div>
                    <div className={styles2.campoCadastro}>
                        <label htmlFor="idCont">Nome Motorista</label>
                        <input
                            type="text"
                            value={nomeMotorista2}
                            onChange={e => setNomeMotorista2(e.target.value)}
                        />
                    </div>
                    <div className={styles2.imgCont}>
                        <label htmlFor="imgCont">Documento motorista</label>
                        <input
                            type="file"
                            name="imgCont"
                            onChange={e => setDocumentoMotorista2(e.target.files[0])}
                        />
                    </div>

                    <div className={`${styles2.btnArea} ${styles.marginB}`}>
                        <button onClick={(e) => { handleCEstufaArea(e) }} className={styles.btnCancel}>Cancelar</button>
                        <button className={styles2.btnCancel} onClick={e => handleCadastroEstufa(e, 2)}>Cadastrar Estufagem</button>
                    </div>
                </form>
            </div>

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

    const container = await apiCo.getContainer(parseInt(context.query.slug));

    const booking = await apiBo.getBooking(container.bookingId);

    if (session.user.clienteId !== booking.clienteId) {
        return {
            redirect: {
                destination: '/bookings',
                permanent: true
            }
        }
    }
    const containerExtra = await apiCx.getAllContainerExtras(container.id);
    const motorista = !containerExtra ? null : await apiMo.getMotorista(containerExtra.motoristaId);
    const estufa = await apiEs.getAllEstufas(container.id);
    const motorista2 = !estufa ? null : await apiMo.getMotorista(estufa.motoristaId);

    return {
        props: {
            booking: booking,
            container: container,
            containerExtra: containerExtra,
            motorista: motorista,
            motorista2: motorista2,
            estufa: estufa,
            user: session.user
        }
    }
};