import './loader.css';



const Loader = ({loading}) =>{



    return(
        <>
             { loading && <div className="loader-container"><span className="loader"></span></div>}

        </>
    )
}

export default Loader;