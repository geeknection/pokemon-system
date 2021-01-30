import React from 'react';
import getMessage from '#/translate';
import HomeScreen from '#/views/pages/home';

interface systemRoutes {
    title: string,
    page: React.FC,
    path: string,
    exact: boolean
}

const systemRoutes: systemRoutes[] = [
    {
        title: getMessage('welcome'),
        page: HomeScreen,
        path: '/',
        exact: false
    }
];

export default systemRoutes;