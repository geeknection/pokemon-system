import React from 'react';
import getMessage from '#/translate';
import {
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

interface homeProps {
    systemData: systemDataInterface,
    setValue(data: setValueInterface): any
}

function HomeScreen(props: homeProps) {
    const [state, setState] = React.useState({
        count: 0,
        next: '',
        previous: '',
        results: []
    });
    const [page, setPage] = React.useState(1);
    const [search, setSearch] = React.useState('');
    const [screenWidth, setWidth] = React.useState(window.innerWidth);
    /**
     * Carrega os pokémons
     * @returns void
     */
    const loadPokemons = async (params: string = '') => {
        const response = await Endpoints.pokemons(params);
        if (response.status === true) {
            setState(response.values);

            await Utils.sleep();

            props.setValue({
                reducer: 'systemData',
                type: 'all',
                value: {
                    ...response.values,
                    loading: false
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
            setState(props.systemData);
        }
        else {
            loadPokemons();
        }
    }
    /**
     * Avança a páginação
     * @returns void
     */
    const nextPage = () => {
        if (!state.next) return;
        setPage(page + 1);
        loadPokemons(state.next);
    }
    /**
     * Volta a paginação
     * @returns void
     */
    const previousPage = () => {
        if (!state.previous) return;
        setPage(page - 1);
        loadPokemons(state.previous);
    }
    /**
     * Altera a página da listagem
     * @returns void
     */
    const handlePageChange = (pageNumber: number) => {
        const pageMax = Math.round(state.count / 20);
        if ((pageNumber < 1) || (pageNumber > pageMax)) return;

        if (pageNumber > page) nextPage();
        else if (pageNumber < page) previousPage();
    }
    /**
     * Retornar o total de páginações
     * @returns void
     */
    const resizePageRange = (): number => (screenWidth <= 1024 ? 5 : 10);

    React.useEffect(() => {
        initData();
        addEventListener('resize', () => {
            setWidth(window.innerWidth);
        });
        return () => {
            initData;
        }
    }, []);

    return (
        <Splashscreen>
            <div className='home-box'>
                <aside>
                    <img
                        className='img-fluid'
                        src={require('./img/aside.png').default}
                        alt='Pokemon Test' />
                </aside>
                <main className='grid'>

                    <h1 className='grid-title'>{getMessage('pokemons_list')}</h1>

                    <div className='grid-input-box'>
                        <input
                            className='grid-input'
                            value={search}
                            placeholder={getMessage('search_placeholder')}
                            onChange={(e) => setSearch(e.target.value)} />
                        <button className='btn btn-search'>{getMessage('search')}</button>
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