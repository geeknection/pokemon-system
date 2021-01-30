import {
    storeInterface,
    systemDataInterface
} from '#/reducers/interfaces';
import { connect } from 'react-redux';
import { ReactChild } from 'react';
import './sass/splash.style.scss';
import Lottie from 'react-lottie';
import Pickachu from './json/lottie-pickachu.json';

interface splashProps {
    systemData: systemDataInterface,
    children?: ReactChild
}

function SplashScreen(props: splashProps) {
    const { loading } = props.systemData;

    return(
        <div className='splashscreen'>
            {loading === true && 
            <div className='splash-loading'>
                <Lottie options={{
                    loop: true,
                    autoplay: true, 
                    animationData: Pickachu,
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    }
                }}
                height={400}
                width={400}
                isStopped={false}
                isPaused={false}/>
            </div>}
            {loading === false && props.children}
        </div>
    );
}

const mapStateToProps = (store: storeInterface) => ({
    systemData: store.systemData
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);