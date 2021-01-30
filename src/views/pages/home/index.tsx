import React from 'react';
import getMessage from '#/translate';
import { connect } from 'react-redux';
import {
    storeInterface,
    systemDataInterface
} from '#/reducers/interfaces';
import setValue from '#/reducers/set-value';
import Endpoints from '#/endpoints';

declare function alert(message?: any, position?: string, type?: string): void;

interface homeProps {
    systemData: systemDataInterface
}

function HomeScreen(props: homeProps) {
    const [state, setState] = React.useState({
        count: 0,
        next: null,
        previous: null,
        results: []
    });
    /**
     * Carrega os pokémons
     * @returns void
     */
    const loadPokemons = async () => {
        const { pokemons } = props.systemData;
        if (pokemons.length) return;
        const response = await Endpoints.pokemons();
        if (response.status === true) {
            setState(response.values);
        }
        else {
            alert(response.message, 'top-center', 'info');
        }
    }

    React.useEffect(() => {
        loadPokemons();
        return () => {
            loadPokemons();
        }
    }, []);

    return(
        <h1>{getMessage('welcome')}</h1>
    );
}

const mapStateToProps = (store: storeInterface) => ({
    systemData: store.systemData
});
const mapDispatchToProps = () => ({
    setValue
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);