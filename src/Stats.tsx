import React from 'react';
import Header from "./components/Header/header";
import Page from "./components/Other/Page/Page";
import UpperStats from "./components/StatsPage/UpperStats/UpperStats";

function Stats() {
    return (
        <>
            <Header/>
            <Page padTop={'88px'}>
                <section style={{
                    width: '100%'
                }}>
                    <UpperStats/>
                </section>
            </Page>
        </>
    );
}

export default Stats;