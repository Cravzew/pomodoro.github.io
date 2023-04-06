import React from 'react';
import {main, mainContainer} from './page.scss'

function Page({children, padTop}: { children: React.ReactNode, padTop?: string }) {

    return (
        <main className={main} style={{
            paddingTop: padTop
        }}>
            <div className={mainContainer}>
                {children}
            </div>
        </main>
    );
}

export default Page;