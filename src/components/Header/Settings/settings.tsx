import React, {useState} from 'react';
import SettingsSvg from "./SettingsSvg";
import Modal from "../../Other/Modal/modal";
import {
    modalSettings,
    modalSettingsFooter,
    modalSettingsFooterButton,
} from './settings.scss'

function Settings() {
    const [modalSettings, setModalSettings] = useState(false)

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
                    <div>
                        <div>
                            <p>Один помидор</p>
                            <input type="number"/>
                        </div>
                        <div>
                            <p>Длинный перерыв</p>
                            <input type="number"/>
                        </div>
                        <div>
                            <p>Короткий перерыв</p>
                            <input type="number"/>
                        </div>
                        <div>
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