



const Coupon = ({coupon}) =>{
    return(
        <>
            <div className="position-fixed top-50 end-0 bg-warning p-2 translate-middle" style={{display:'flex' , flexDirection:'column', alignItems:'center'}}>
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