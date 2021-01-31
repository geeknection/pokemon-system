interface propsData {
    loading: boolean,
    style?: {
        width: string,
        height: string,
        marginBottom?: string
    },
    children?: any,
}

function Skeleton(props: propsData) {
    return(
        <>
            {props.loading && <div className='skeleton-box' style={props.style || {}}></div>}
            {!props.loading && props.children}
        </>
    );
}

export default Skeleton;