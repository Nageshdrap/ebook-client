



const Coupon = ({coupon}) =>{

    const handleCoupon = () =>{
        window.scrollTo({top:0,behavior:'smooth'});
    }

    return(
        <>
            <div className="position-fixed top-50 end-0 translate-middle-y bg-warning px-3 py-2" onClick={handleCoupon} style={{display:'flex' , flexDirection:'column', alignItems:'center',zIndex:'2',color:'white',borderRadius:'11px',cursor:'pointer'}}>
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