import React, {ReactNode, useEffect, useRef, useState} from 'react';
import ReactDOM from "react-dom";

interface IDropdown {
    button: React.ReactNode;
    children: React.ReactNode;
    isOpen?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}

const NOOP = () => {
}

export function Dropdown({button, children, isOpen, onOpen = NOOP, onClose = NOOP,}: IDropdown) {

    const [isOpenDropDown, setIsOpenDropdown] = useState(isOpen)

    useEffect(() => setIsOpenDropdown(isOpen), [isOpen])
    useEffect(() => isOpenDropDown ? onOpen() : onClose(), [isOpenDropDown])

    const handleOpen = () => {
        if (isOpen === undefined) {
            setIsOpenDropdown(!isOpenDropDown)
        }
    }

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (event.target instanceof Node && !ref.current?.contains(event.target)) {
                setIsOpenDropdown(false)
            }
        }

        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, []);

    const ref = useRef<HTMLDivElement>(null)

    const node = document.querySelector('#dropdown');
    if (!node) return null;


    return (
        <div>
            <div onClick={handleOpen} ref={ref}>
                {button}
            </div>
            {isOpenDropDown && ReactDOM.createPortal((
                    <div
                        style={{
                            position: 'absolute',
                            top: (ref.current?.getBoundingClientRect().y || 0) + window.scrollY + 30,
                            left: (ref.current?.getBoundingClientRect().x || 0) + window.scrollX - 67,
                        }}
                    >
                        <div className="bg-black p-3" onClick={() => setIsOpenDropdown(false)}>
                            {children}
                        </div>
                    </div>
                ), node
            )}
        </div>
    );
}
