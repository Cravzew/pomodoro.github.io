import React from 'react';
import {
    infocomponent,
    infocomponentHeader,
    infocomponentInfotext
} from './infocomponent.scss'
import TimeSvg from "../TimeSvg";
import CircleSvg from "../CircleSvg";
import StopSvg from "../StopSvg";

interface IInfoComponent {
    title: string,
    infotext?: number,
    minutes?: number,
    hours?: number,
    prefix?: string,
    postfix?: string,
    type: string
}

function InfoComponent(props: IInfoComponent) {

    const {
        infotext,
        title,
        prefix,
        type,
        minutes,
        postfix,
        hours
    } = props

    return (
        <div className={infocomponent} style={{
            backgroundColor: `${(infotext === 0 || minutes === 0) ? 'var(--background-form)' : ((type === 'timer' && 'var(--type-timer)') || (type === 'focus' && 'var(--type-focus)') || (type === 'stops' && 'var(--type-stops)'))}`
        }}>
            <h3 className={infocomponentHeader}>{title}</h3>
            {type === 'timer' ?
                <p className={infocomponentInfotext}>{hours === 0 ? '' : hours}{hours === 0 ? '' : postfix} {minutes}{prefix}</p>
                :
                <p className={infocomponentInfotext}>{infotext}{prefix}</p>
            }
            {type === 'timer' && <TimeSvg color={minutes === 0 ? '#C4C4C4' : '#9C97D7'}/>}
            {type === 'focus' && <CircleSvg color={infotext === 0 ? '#C4C4C4' : '#FFAE35'}/>}
            {type === 'stops' && <StopSvg color={infotext === 0 ? '#C4C4C4' : '#7FC2D7'}/>}
        </div>
    );
}

export default InfoComponent;