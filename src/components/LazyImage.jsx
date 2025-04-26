import { useEffect, useRef, useState } from "react"
import Spinner from "./spinner";




const LazyImage = ({src , alt }) =>{
    const imgref = useRef();
    const [isVisible , setIsVisible] = useState(false);

    useEffect(()=>{
        const observer = new IntersectionObserver(
            ([entry]) =>{
                if(entry.isIntersecting){
                    setIsVisible(true);
                    observer.unobserve(imgref.current);
                }
            },
            {
                threshold:0.1,
            }
        );

        if(imgref.current){
            observer.observe(imgref.current);
        }
    },[]);

    return (
        <div ref={imgref} className="position-relative" style={{width:'100%',height:'100%'}}>
            {
                isVisible? (
                    <img src={src} alt={alt} className="img-fluid" style={{width:'100%',height:'100%'}}/>
                ):(
                    <div><Spinner /></div>
                )
            }
        </div>
    )
}


export default LazyImage;