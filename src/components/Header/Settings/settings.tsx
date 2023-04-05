import React, {useState} from 'react';
import SettingsSvg from "./SettingsSvg";
import Modal from "../../Other/Modal/modal";
import {
    modalSettingsFooter,
    modalSettingsFooterButton,
    modalSettingsBodyContent,
    modalSettingsBody
} from './settings.scss'

function Settings() {
    const [modalSettings, setModalSettings] = useState(false)
    const [inputWork, setInputWork] = useState('25')

    function handleChangeWork(e: React.ChangeEvent<HTMLInputElement>) {
        setInputWork(e.target.value)
    }

    return (
        <li>
            <button onClick={() => setModalSettings(true)}>
                <div>
                    <SettingsSvg/>
                    <span>Настройки</span>
                </div>
            </button>
            {modalSettings &&
                <Modal setModal={setModalSettings} title={"Настройки"} footer={
                    <div className={modalSettingsFooter}>
                        <button className={modalSettingsFooterButton}>Сохранить</button>
                        <button className={modalSettingsFooterButton} onClick={() => setModalSettings(false)}>По
                            умолчанию
                        </button>
                    </div>
                }>
                    <div className={modalSettingsBody}>
                        <div className={modalSettingsBodyContent}>
                            <p>Один помидор</p>
                            <input type="number" min={1} max={99} value={localStorage.getItem('work-time')}
                                   onChange={handleChangeWork}/>
                        </div>
                        <div className={modalSettingsBodyContent}>
                            <p>Длинный перерыв</p>
                            <input type="number"/>
                        </div>
                        <div className={modalSettingsBodyContent}>
                            <p>Короткий перерыв</p>
                            <input type="number"/>
                        </div>
                        <div className={modalSettingsBodyContent}>
                            <p>Частота длинных перерывов</p>
                            <input type="number"/>
                        </div>
                    </div>
                </Modal>
            }
        </li>
    )
}

export default Settings;