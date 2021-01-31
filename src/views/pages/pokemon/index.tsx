import {
    pokemonSpriteInterface,
    setValueInterface,
    storeInterface,
    systemDataInterface
} from "#/reducers/interfaces";
import { connect } from "react-redux";
import {
    Link,
    withRouter
} from "react-router-dom";
import setValue from '#/reducers/set-value';
import './scss/pokemon.style.scss';
import {
    useEffect,
    useState
} from "react";
import Endpoints from "#/endpoints";
import Utils from "#/utils";
import getMessage from "#/translate";
import VanillaTilt from 'vanilla-tilt';

declare function alert(message?: any, position?: string, type?: string): void;

interface historyInterface {
    push(path: string, params?: object): any,
    goBack(): any,
    go(value: number): any
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
    const [currentImage, setCurrent] = useState({
        url: '',
        type: 'front'
    });

    /**
     * Carrega os dados do Pokémon
     * @returns void
     */
    const getPokemonData = async (): Promise<void> => {
        const { id } = props.match.params;
        const response = await Endpoints.getDataById(id);
        if (response.status === true) {
            setLoad(false);
            setData(response.values);
            document.title = Utils.formatPokemonName(response.values.name);
            setCurrent({
                url: response.values.sprites.front_default,
                type: 'front'
            });
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
    const initData = (): void => {
        if (props.pokemon) {
            setData(props.pokemon);
            document.title = Utils.formatPokemonName(props.pokemon.name);
            setLoad(false);
        }
        else getPokemonData();
    }
    /**
     * Alterna a foto do Pokémon que será exibida
     * @param e 
     * @param image 
     * @param type 
     * @returns void
     */
    const handleSprite = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, image: string = '', type: string): void => {
        e.preventDefault();
        e.stopPropagation();
        setCurrent({
            url: image || require('./img/pokemon-not-found.png').default,
            type
        });
    }
    /**
     * Retorna as classes nas opções de imagens do pokémon
     * @param type 
     * @returns string
     */
    const classNamePokeImg = (type: string): string => {
        return (`btn-link ${currentImage.type === type && 'active'}`).trim();
    }
    /**
     * Inicia o VanillaTilt que cria um efeito de skew no elemento
     * @returns void
     */
    const vanillaInit = (): void => {
        const element: any = document.querySelector(".pokemon-image > img");
        if (element && (window.innerWidth > 1024)) {
            VanillaTilt.init(element, {
                max: 25,
                speed: 400
            });
        }
    }
    /**
     * Volta para a navegação anterior
     * @param e 
     * @returns void
     */
    const goBack = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        props.history.go(-1);
    }

    useEffect(() => {
        initData();
        vanillaInit();
        return () => {
            initData;
            VanillaTilt;
        }
    }, []);

    return (
        <div className='pokemon-content'>
            <div className='container'>

                {/** CABEÇALHO COM O BOTÃO VOLTAR */}
                <div className='pokemon-goback'>
                    <Link to='/' onClick={goBack} className='d-inline-block'>
                        <img
                            className='img-fluid img-goback'
                            src={require('./img/left-arrow.svg').default}
                            alt={getMessage('goBack')} />
                    </Link>
                </div>

                {/** DADOS DO POKÉMON */}
                <div className='pokemon-box row'>

                    {/** IMAGEM DO POKÉMON */}
                    <div className='pokemon-images row-column'>
                        <h1 className='pokemon-name'>{Utils.formatPokemonName(data.name)}</h1>
                        <div className='pokemon-image'>
                            <img
                                data-tilt data-tilt-reverse='true'
                                onError={Utils.filterBrokenImg}
                                src={currentImage.url  || require('./img/pokemon-not-found.png').default}
                                className='img-fluid'
                                alt={data.name} />
                        </div>
                        <div className='pokemon-image-options'>
                            <a
                                className={classNamePokeImg('front')}
                                title={data.name}
                                onClick={(e) => handleSprite(e, data.sprites.front_default, 'front')}>
                                <img
                                    onError={Utils.filterBrokenImg}
                                    className='img-fluid'
                                    src={data.sprites.front_default || require('./img/pokemon-not-found.png').default}
                                    alt={`${data.name} Front Default`} />
                            </a>
                            <a
                                className={classNamePokeImg('back')}
                                title={data.name}
                                onClick={(e) => handleSprite(e, data.sprites.back_default, 'back')}>
                                <img
                                    onError={Utils.filterBrokenImg}
                                    className='img-fluid'
                                    src={data.sprites.back_default || require('./img/pokemon-not-found.png').default}
                                    alt={`${data.name} Back Default`} />
                            </a>
                        </div>
                    </div>

                    {/** DETALHES DO POKÉMON */}

                </div>

            </div>
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