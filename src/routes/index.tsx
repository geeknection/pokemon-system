import getMessage from '#/translate';
import HomeScreen from '#/views/pages/home';

interface routes {
    title: string,
    page: any,
    path: string,
    exact: boolean
}

const systemRoutes: routes[] = [
    {
        title: getMessage('welcome'),
        page: HomeScreen,
        path: '/',
        exact: false
    }
];

export default systemRoutes;