import React from 'react';
import getMessage from '#/translate';
import {
    pokemonsInterface,
    pokemonSpriteInterface,
    setValueInterface,
    storeInterface,
    systemDataInterface
} from '#/reducers/interfaces';
import setValue from '#/reducers/set-value';
import Endpoints from '#/endpoints';
import Pagination from "react-js-pagination";
import Utils from '#/utils';
import Splashscreen from '#/views/components/splashscreen';
import './scss/home.style.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

declare function alert(message?: any, position?: string, type?: string): void;

interface historyInterface {
    push(path: string, params?: object): any
}

interface homeProps {
    systemData: systemDataInterface,
    setValue(data: setValueInterface): any,
    history: historyInterface
}
interface initialStateInterface {
    count: number,
    next?: string,
    previous?: string,
    results: pokemonsInterface[]
}
const initialState: initialStateInterface = {
    count: 0,
    next: '',
    previous: '',
    results: []
}

function HomeScreen(props: homeProps) {
    const [state, setState] = React.useState(Object.assign({}, initialState));
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState('');
    const [screenWidth, setWidth] = React.useState(window.innerWidth);
    /**
     * Carrega os pokémons
     * @returns void
     */
    const loadPokemons = async (params: string = '') => {
        const response: any = await Endpoints.pokemons(params);
        if (response.status === true) {
            response.values.results.map((item: pokemonsInterface) => {
                item.name = Utils.formatPokemonName(item.name);
                return item;
            });
            setState(response.values);
            window.scrollTo(0, 0);

            await Utils.sleep();

            props.setValue({
                reducer: 'systemData',
                type: 'all',
                value: {
                    ...response.values,
                    loading: false,
                    page
                }
            });
        }
        else {
            alert(response.message, 'top-center', 'info');
        }
    }
    /**
     * Inicia o carregamento dos dados via redux ou api
     * @returns void
     */
    const initData = () => {
        const { results } = props.systemData;
        if (results.length) {
            let data = props.systemData;
            delete data.page;
            setState(data);
        }
        else {
            loadPokemons();
        }
    }
    /**
     * Altera a página da listagem
     * @returns void
     */
    const handlePageChange = (pageNumber: number) => {
        const pageMax = Math.round(state.count / 20);
        if ((pageNumber < 1) || (pageNumber > pageMax)) return;
        const offset = (pageNumber * 20) - 20;

        setPage(pageNumber);
        loadPokemons(`?offset=${offset}&limit=20`);
    }
    /**
     * Retornar o total de páginações
     * @returns void
     */
    const resizePageRange = (): number => (screenWidth <= 1024 ? 5 : 10);
    const filterSearch = (item: pokemonsInterface): pokemonsInterface | void => {
        if (!search) return item;
        if (search) {
            if (item.name.toLowerCase().indexOf(search.toLowerCase()) >= 0) return item;
        }
    }
    /**
     * Retorna a lista de pokémons carregados
     * @returns Array|Void
     */
    const pokemons = (): pokemonsInterface[] => (
        state.results.sort((a: any, b: any) => a.name - b.name).filter(filterSearch)
    );
    /**
     * Verifica a imagem disponível de um Pokémon e retorna
     * @param images 
     * @returns string
     */
    const getPokemonImage = (images: pokemonSpriteInterface): string => {
        let url = images.front_default || require('./img/pokemon-not-found.png').default;
        return url;
    }
    /**
     * Fallback para imagem quebrada
     * @param e 
     * @returns void
     */
    const filterBrokenImg = (e: any): void => {
        e.target.src = require('./img/pokemon-not-found.png').default;
    }
    /**
     * Abre as informações sobre um Pokémon
     * @param item 
     * @returns void
     */
    const seePokemon = (item: pokemonsInterface): void => {
        props.history.push(`/pokemon/${item.id}`, {
            pokemon: item
        });
    }
    /**
     * Atualiza o valor da largura da tela
     * @returns void
     */
    const updateWidth = () => setWidth(window.innerWidth);
    React.useEffect(() => {
        initData();
        addEventListener('resize', updateWidth);
        window.scrollTo(0, 0);
        return () => {
            initData;
            addEventListener('resize', updateWidth);
        }
    }, []);

    return (
        <Splashscreen>
            <div className='home-box'>
                <aside>
                    <img
                        className='img-fluid'
                        src={require('./img/aside.png').default}
                        alt={getMessage('systemTitle')} />
                </aside>
                <main className='grid'>

                    <h1 className='grid-title'>{getMessage('pokemons_list')}</h1>

                    <div className='grid-input-box'>
                        <input
                            className='grid-input'
                            value={search}
                            placeholder={getMessage('search_placeholder')}
                            onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    <div className='grid-list'>
                        {pokemons().map((item, key) => {
                            return (
                                <div className='grid-item' key={key}>
                                    <div className='h-100 text-center'>
                                        <div className='box-img'>
                                            <img
                                                onError={filterBrokenImg}
                                                src={getPokemonImage(item.sprites)}
                                                className='img-fluid grid-image'
                                                alt={item.name} />
                                        </div>
                                        <h2 className='grid-item-title'>{item.name}</h2>
                                    </div>
                                    <button className='btn btn-see' onClick={() => seePokemon(item)}>{getMessage('see')}</button>
                                </div>
                            );
                        })}
                        {pokemons().length === 0 &&
                            <div className='grid-list-none text-center'><h2 className='grid-subtitle'>{getMessage('not_found')}</h2></div>}
                    </div>

                    <div className='grid-footer'>
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={20}
                            totalItemsCount={state.count}
                            pageRangeDisplayed={resizePageRange()}
                            onChange={handlePageChange}
                        />
                    </div>

                </main>
            </div>
        </Splashscreen>
    );
}

const mapStateToProps = (store: storeInterface) => ({
    systemData: store.systemData
});
const mapDispatchToProps = {
    setValue
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeScreen));