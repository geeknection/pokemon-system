import { pokemonsInterface } from "#/reducers/interfaces";
import getMessage from "#/translate";

interface propsData {
    data: pokemonsInterface,
    modal: boolean,
    screenWidth: number,
    moreThen?: number,
    lessThen?: number,
    toggleModal(): void
}

function PokemonDetails(props: propsData) {
    const { data, modal, screenWidth, moreThen, lessThen, toggleModal } = props;
    if (moreThen) {
        if (screenWidth < moreThen) return <></>;
    }
    else if (lessThen) {
        if (screenWidth > lessThen) return <></>;
    }

    return (
        <div className={`pokemon-details ${(modal && screenWidth <= 1024) ? 'active' : ''}`}>
            <h2 className='pokemon-details-subtitle'>{getMessage('details')}</h2>
            <span className='close' onClick={toggleModal}>{getMessage('close')}</span>

            <div className='row'>
                <ul>
                    <li>
                        <strong>{getMessage('height')}</strong>: {data.height}cm
                    </li>
                    <li>
                        <strong>{getMessage('weight')}</strong>: {data.weight}kg
                    </li>
                </ul>
                <ul>
                    <li className='li-title'>
                        <h3>{getMessage('stats')}</h3>
                    </li>
                    {data.stats.map((item, key) => {
                        return (
                            <li key={key}>
                                <strong>{item.stat.name}</strong>: {item.base_stat}
                            </li>
                        );
                    })}
                </ul>
                <ul>
                    <li className='li-title'>
                        <h3>{getMessage(data.abilities.length > 1 ? 'abilities' : 'ability')}</h3>
                    </li>
                    {data.abilities.map((item, key) => {
                        return (
                            <li key={key}>
                                <strong>{item.ability.name}</strong>
                            </li>
                        );
                    })}
                </ul>
                <ul>
                    <li className='li-title'>
                        <h3>{getMessage(data.types.length > 1 ? 'types' : 'type')}</h3>
                    </li>
                    {data.types.map((item, key) => {
                        return (
                            <li key={key}>
                                <strong>{item.type.name}</strong>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
export default PokemonDetails;