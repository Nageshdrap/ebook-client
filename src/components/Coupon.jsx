



const Coupon = ({coupon}) =>{
    return(
        <>
            <div className="position-fixed top-50 end-0 translate-middle-y bg-warning px-3 py-2" style={{display:'flex' , flexDirection:'column', alignItems:'center',zIndex:'9',color:'white',borderRadius:'11px'}}>
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