import React from 'react';
import getMessage from '#/translate';
import { connect } from 'react-redux';
import {
    setValueInterface,
    storeInterface,
    systemDataInterface
} from '#/reducers/interfaces';
import setValue from '#/reducers/set-value';
import Endpoints from '#/endpoints';
import { withRouter } from 'react-router-dom';
import { ReactNode } from 'react';

declare function alert(message?: any, position?: string, type?: string): void;

interface homeProps {
    systemData: systemDataInterface,
    setValue(data: setValueInterface): any,
    children?: ReactNode
}

function HomeScreen(props: homeProps) {
    const [state, setState] = React.useState({
        count: 0,
        next: '',
        previous: '',
        results: []
    });
    const [page, setPage] = React.useState(0);
    /**
     * Carrega os pokémons
     * @returns void
     */
    const loadPokemons = async () => {
        const response = await Endpoints.pokemons();
        if (response.status === true) {
            setState(response.values);
            props.setValue({
                reducer: 'systemData',
                type: 'all',
                value: response.values
            });
        }
        else {
            alert(response.message, 'top-center', 'info');
        }
    }

    /**
     * Inicia o carregamento dos dados via redux ou api
     */
    const initData = () => {
        const { results } = props.systemData;
        if (results.length) {
            setState(props.systemData);
        }
        else {
            loadPokemons();
        }
    }

    React.useEffect(() => {
        initData();
        return () => {
            initData;
        }
    }, []);

    return(
        <h1>{getMessage('welcome')}</h1>
    );
}

const mapStateToProps = (store: storeInterface) => ({
    systemData: store.systemData
});
const mapDispatchToProps = {
    setValue
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeScreen));