import React from 'react';
import {infocomponent, infocomponentHeader, infocomponentInfotext} from './infocomponent.scss'
import TimeSvg from "../TimeSvg";
import CircleSvg from "../CircleSvg";
import StopSvg from "../StopSvg";

interface IInfoComponent {
    title: string,
    infotext?: number,
    prefix?: string,
    type: string
}

function InfoComponent(props: IInfoComponent) {

    const {
        infotext,
        title,
        prefix,
        type,
    } = props

    const hours = Math.floor(infotext / 60 / 60);
    const minutes = Math.floor(infotext / 60) - (hours * 60);
    const seconds = infotext % 60;

    return (
        <div className={infocomponent} style={{
            backgroundColor: `${(infotext === 0) ? 'var(--background-form)' : ((type === 'timer' && 'var(--type-timer)') || (type === 'focus' && 'var(--type-focus)') || (type === 'stops' && 'var(--type-stops)'))}`
        }}>
            <h3 className={infocomponentHeader}>{title}</h3>
            {type === 'timer' ?
                <p className={infocomponentInfotext}>
                    {infotext === 0 ? '0с' : ''}
                    {hours ? `${hours}ч` : ''}
                    {minutes ? `${minutes}м` : ''}
                    {hours === 0 ? `${seconds}с` : ''}
                </p>
                :
                <p className={infocomponentInfotext}>{infotext}{prefix}</p>
            }
            {type === 'timer' && <TimeSvg color={infotext === 0 ? '#C4C4C4' : '#9C97D7'}/>}
            {type === 'focus' && <CircleSvg color={infotext === 0 ? '#C4C4C4' : '#FFAE35'}/>}
            {type === 'stops' && <StopSvg color={infotext === 0 ? '#C4C4C4' : '#7FC2D7'}/>}
        </div>
    );
}

export default InfoComponent;