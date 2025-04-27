



const Coupon = ({coupon}) =>{
    return(
        <>
            <div className="position-absolute top-50 start-100 translate-middle" style={{display:'flex' , flexDirection:'column', alignItems:'center'}}>
                {
                    coupon.split('').map((letter,index)=>(
                        <span key={index}>{letter}</span>
                    ))
                }
            </div>
        </>
    );
};

export default Coupon;