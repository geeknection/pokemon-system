import {
    pokemonSpriteInterface,
    setValueInterface,
    storeInterface,
    systemDataInterface
} from "#/reducers/interfaces";
import { connect } from "react-redux";
import {
    withRouter,
    useParams
} from "react-router-dom";
import setValue from '#/reducers/set-value';
import './scss/pokemon.style.scss';
import { useEffect, useState } from "react";
import Endpoints from "#/endpoints";
import Utils from "#/utils";

declare function alert(message?: any, position?: string, type?: string): void;

interface historyInterface {
    push(path: string, params?: object): any,
    goBack(): any
}
interface matchInterface {
    params: any
}

interface propsScreen {
    systemData: systemDataInterface,
    setValue(data: setValueInterface): any,
    history: historyInterface,
    match: matchInterface,
    pokemon?: pokemonDataInterface
}
interface pokemonDataInterface {
    name: string,
    sprites: pokemonSpriteInterface
}
const pokemonData: pokemonDataInterface = {
    name: '',
    sprites: {}
}

function PokemonScreen(props: propsScreen) {
    const [data, setData] = useState(pokemonData);
    const [loading, setLoad] = useState(false);

    /**
     * Carrega os dados do Pokémon
     * @returns void
     */
    const getPokemonData = async () => {
        const { id } = props.match.params;
        const response = await Endpoints.getDataById(id);
        if (response.status === true) {
            setLoad(false);
            setData(response.values);
            document.title = Utils.formatPokemonName(response.values.name);
        }
        else {
            alert(response.message, 'top-center', 'danger');
            props.history.goBack();
        }
    }
    /**
     * Inicia a configuração das informações do Pokémon
     * @returns void
     */
    const initData = () => {
        if (props.pokemon) {
            setData(props.pokemon);
            document.title = Utils.formatPokemonName(props.pokemon.name);
            setLoad(false);
        }
        else getPokemonData();
    }

    useEffect(() => {
        initData();
        return () => {
            initData;
        }
    }, []);

    return(
        <div className='pokemon-container'>
            
        </div>
    );
}

const mapStateToProps = (store: storeInterface) => ({
    systemData: store.systemData
});
const mapDispatchToProps = {
    setValue
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PokemonScreen));