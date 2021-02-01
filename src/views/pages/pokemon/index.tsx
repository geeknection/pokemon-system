import {
    pokemonsInterface,
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
import Pokemon from "#/classes/pokemon";
import PokemonDetails from "#/views/components/pokemon/details";
import Skeleton from "#/views/components/skeleton";

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
    pokemon?: pokemonsInterface
}
const pokemonData = new Pokemon().data;

function PokemonScreen(props: propsScreen) {
    const [data, setData] = useState(pokemonData);
    const [loading, setLoad] = useState(true);
    const [currentImage, setCurrent] = useState({
        url: '',
        type: 'front'
    });
    const [modal, setModal] = useState(false);
    const [screenWidth, setWidth] = useState(window.innerWidth);

    /**
     * Carrega os dados do Pokémon
     * @returns void
     */
    const getPokemonData = async (): Promise<void> => {
        const { id } = props.match.params;
        const response = await Endpoints.getDataById(id);
        if (response.status === true) {
            setLoad(false);
            const pokemon = new Pokemon(response.values);
            setData(pokemon.data);
            document.title = pokemon.data.name;
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
            const pokemon = new Pokemon(props.pokemon);
            setData(pokemon.data);
            document.title = pokemon.data.name;
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
            url: image,
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
        const element: any = document.querySelector(".pokemon-image img");
        if (element && (screenWidth > 1024)) {
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
        e.preventDefault();
        e.stopPropagation();
        if (document.referrer !== `${process.env.REACT_APP_URL}`) {
            props.history.push('/');
        }
        else {
            props.history.go(-1);
        }
    }
    /**
     * Abre ou fecha o modal de detalhes
     * @returns void
     */
    const toggleModal = (): void => setModal(!modal);
    /**
     * Atualiza o valor da largura da tela
     * @returns void
     */
    const updateWidth = () => setWidth(window.innerWidth);

    useEffect(() => {
        initData();
        vanillaInit();
        addEventListener('resize', updateWidth);
        return () => {
            initData
            vanillaInit;
            addEventListener('resize', updateWidth);
        }
    }, []);

    return (
        <div className='pokemon-content'>
            <div className='container'>

                {/** CABEÇALHO COM O BOTÃO VOLTAR */}
                <div className='pokemon-goback'>
                    <a
                        href={`${process.env.PUBLIC_URL}/`}
                        onClick={goBack}
                        className='d-inline-block'>
                        <img
                            className='img-fluid img-goback'
                            src={require('./img/left-arrow.svg').default}
                            alt={getMessage('goBack')} />
                    </a>
                </div>

                {/** DADOS DO POKÉMON */}
                <div className='pokemon-box row'>

                    {/** IMAGEM DO POKÉMON */}
                    <div className='pokemon-images row-column'>
                        <h1 className='pokemon-name'>{data.name}</h1>
                        <div className='pokemon-image'>
                            <Skeleton
                                loading={loading}
                                style={{
                                    width: '200px',
                                    height: '200px'
                                }}></Skeleton>
                            {
                            <img
                                style={loading ? {
                                    display: 'none'
                                } : {}}
                                data-tilt data-tilt-reverse='true'
                                onError={Utils.filterBrokenImg}
                                src={currentImage.url}
                                className='img-fluid'
                                alt={data.name} />}
                        </div>
                        <div className='pokemon-image-options'>
                            <Skeleton
                                loading={loading}
                                style={{
                                    width: '96px',
                                    height: '96px'
                                }}>
                                <a
                                    className={classNamePokeImg('front')}
                                    title={data.name}
                                    onClick={(e) => handleSprite(e, data.sprites.front_default, 'front')}>
                                    <img
                                        onError={Utils.filterBrokenImg}
                                        className='img-fluid'
                                        src={data.sprites.front_default}
                                        alt={`${data.name} Front Default`} />
                                </a>
                            </Skeleton>
                            <Skeleton
                                loading={loading}
                                style={{
                                    width: '96px',
                                    height: '96px'
                                }}>
                                <a
                                    className={classNamePokeImg('back')}
                                    title={data.name}
                                    onClick={(e) => handleSprite(e, data.sprites.back_default, 'back')}>
                                    <img
                                        onError={Utils.filterBrokenImg}
                                        className='img-fluid'
                                        src={data.sprites.back_default}
                                        alt={`${data.name} Back Default`} />
                                </a>
                            </Skeleton>
                        </div>
                        <button className='btn btn-details' onClick={toggleModal}>{getMessage('seeDetails')}</button>
                    </div>
                    <PokemonDetails
                        toggleModal={toggleModal}
                        screenWidth={screenWidth}
                        moreThen={1024}
                        data={data}
                        modal={modal}
                        loading={loading}/>
                </div>

                <PokemonDetails
                    toggleModal={toggleModal}
                    screenWidth={screenWidth}
                    lessThen={1024}
                    data={data}
                    loading={loading}
                    modal={modal}/>
                {(modal && window.innerWidth <= 1024) && <div className='modal-bg' onClick={toggleModal}></div>}

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