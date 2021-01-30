import {
    setValueInterface,
    storeInterface,
    systemDataInterface
} from "#/reducers/interfaces";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import setValue from '#/reducers/set-value';

interface historyInterface {
    push(path: string, params?: object): any
}

interface propsScreen {
    systemData: systemDataInterface,
    setValue(data: setValueInterface): any,
    history: historyInterface
}

function PokemonScreen(props: propsScreen) {
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