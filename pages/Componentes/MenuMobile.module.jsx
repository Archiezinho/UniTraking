import styles from '../../styles/MenuMobile.module.css'
import { BsArchiveFill } from 'react-icons/bs'
import { BsCardList } from 'react-icons/bs'

export function NavMenu(props) {

    function handleMenu() {
        const Nav = document.querySelector(`.${styles['NavMenu-container']}`);
        const Ul = document.querySelector('ul');

        /** MOBILE MENU LINES **/
        const L1 = document.querySelector(`.${styles['menu-line1']}`);
        const L2 = document.querySelector(`.${styles['menu-line2']}`);
        const L3 = document.querySelector(`.${styles['menu-line3']}`);

        if (window.innerWidth >= 1100) {
            if (!Nav.classList.contains(styles['activeMenuB'])) {
                L1.classList.add(styles['activeBtnMenu']);
                L2.classList.add(styles['activeBtnMenu2']);
                L3.classList.add(styles['activeBtnMenu3']);

                Nav.classList.add(styles['activeMenuB'])
                Nav.style.width = '300px'
                Nav.style.height = '100vh'
                Nav.style.borderRadius = '0px'

                Ul.style.opacity = '1'
                Ul.style.transform = 'translate(0%, 0%)';
            } else {
                L1.classList.remove(styles['activeBtnMenu']);
                L2.classList.remove(styles['activeBtnMenu2']);
                L3.classList.remove(styles['activeBtnMenu3']);

                Nav.classList.remove(styles['activeMenuB'])
                Nav.style.width = '0%'
                Nav.style.height = '0%'
                Nav.style.borderRadius = '0 150px 150px 150px'

                Ul.style.opacity = '0'
                Ul.style.transform = 'translate(-100%, 0%)';
            }
        } else {
            if (!Nav.classList.contains(styles['activeMenu'])) {
                L1.classList.add(styles['activeBtnMenu']);
                L2.classList.add(styles['activeBtnMenu2']);
                L3.classList.add(styles['activeBtnMenu3']);

                Nav.classList.add(styles['activeMenu'])
                Nav.style.width = '100%'
                Nav.style.height = '100%'
                Nav.style.borderRadius = '0px'

                Ul.style.opacity = '1'
                Ul.style.transform = 'translate(0%, 0%)';
            } else {
                L1.classList.remove(styles['activeBtnMenu']);
                L2.classList.remove(styles['activeBtnMenu2']);
                L3.classList.remove(styles['activeBtnMenu3']);

                Nav.classList.remove(styles['activeMenu'])
                Nav.style.width = '0%'
                Nav.style.height = '0%'
                Nav.style.borderTopRightRadius = '150px'
                Nav.style.borderBottomRightRadius = '150px'
                Nav.style.borderBottomLeftRadius = '150px'

                Ul.style.opacity = '0'
                Ul.style.transform = 'translate(-100%, 0%)';
            }
        }
    }

    const Handler = () => {
        switch (props.cargo) {
            case 'Admin':
                return (
                    <>
                        <li><a href="/bookings"><BsArchiveFill />Bookings</a></li>
                        <li><a href="/users"><BsArchiveFill />Users</a></li>
                        <li><a href="/exportadores"><BsArchiveFill />Exportadores</a></li>
                        <li><a href="/armazem"><BsArchiveFill />Armazem</a></li>
                    </>
                )
            case 'Depot', 'Estufagem', 'Porto':
                return (
                    <>
                        <li><a href="/bookings"><BsArchiveFill />Bookings</a></li>
                    </>
                )
            case 'Armazem', 'Transportadora':
                return (
                    <>
                        <li><a href="/armazem"><BsArchiveFill />Armazem</a></li>
                    </>
                )
        }
    }

    return (
        <div className={styles['NavMenu-container']}>
            <div data-menu>
                <div className={styles['container-menu']} onClick={handleMenu}>
                    <span className={styles['menu-line1']}></span>
                    <span className={styles['menu-line2']}></span>
                    <span className={styles['menu-line3']}></span>
                </div>
            </div>
            <nav>
                <ul>
                    <Handler />
                </ul>
            </nav>
        </div>
    );
}