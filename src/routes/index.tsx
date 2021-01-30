import getMessage from '#/translate';
import HomeScreen from '#/views/pages/home';
import PokemonScreen from '#/views/pages/pokemon';

interface routes {
    title: string,
    page: any,
    path: string,
    exact: boolean
}

const systemRoutes: routes[] = [
    {
        title: getMessage('pokemonPage'),
        page: PokemonScreen,
        path: '/pokemon/:id',
        exact: false
    },
    {
        title: getMessage('welcome'),
        page: HomeScreen,
        path: '/',
        exact: false
    }
];

export default systemRoutes;