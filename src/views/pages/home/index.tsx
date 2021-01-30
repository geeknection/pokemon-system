import React from 'react';
import getMessage from '#/translate';

//@todo: verificar a interface do props
function HomeScreen(props: any) {
    return(
        <h1>{getMessage('welcome')}</h1>
    );
}

export default HomeScreen;