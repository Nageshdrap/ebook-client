import { useEffect } from 'react';
import './term.css';




const Term = () =>{

    useEffect(()=>{
        window.scrollTo({top:0,behavior:'smooth'});
    },[])

    return(
        <>
            <section id="termcondition">
                <div className="container">
                    <h1>Term & Condition</h1>
                    <div>
                        <p>Effective Date: 15-april-2025</p>
                        <p>Welcome to BookTurn ! These Terms and Conditions ("Terms") govern your use of our website and the purchase of products through our online store.</p>
                        <p>By accessing our website or placing an order, you agree to be bound by these Terms. Please read them carefully.</p>
                    </div>
                    <hr />
                    <div>
                        <h1>1. Use of the Website</h1>
                        <ul>
                        <li>You must be at least 15 years old or have parental/guardian consent to use our website.</li>
                        <li>You agree not to misuse the website or interfere with its normal operation.</li>
                        <li>All content on our website (images, text, graphics, etc.) is the property of BookTurn and protected by copyright laws.</li>
                        </ul>
                    </div>
                    <hr />
                    <div>
                        <h1>2.Product information</h1>
                        <ul>
                            <li>We strive to provide accurate product details, pricing, and availability. However, we do not warrant that product descriptions or other content are always accurate or error-free.</li>
                            <li>In case of any discrepancy, we reserve the right to correct errors and update information without prior notice.</li>
                        </ul>
                    </div>
                    <div>
                        <h1>3.Orders & payments</h1>
                        <ul>
                            <li>By placing an order, you agree to provide accurate and complete information.</li>
                            <li>Orders are confirmed only after payment is successfully received.</li>
                            <li>We reserve the right to cancel any order for any reason, including errors in pricing or availability.</li>
                        </ul>
                    </div>
                    <div>
                        <h1>4.Shipping & Delivery</h1>
                        <ul>
                            <li>Orders are processed and shipped within the timeframe mentioned on below:</li>
                            <li><strong>Minimum Delivery Timeline</strong>: 2-3 business days</li>
                            <li><strong>Maximum Delivery Timeline</strong>: 7-10 business days</li>
                            <li>Shipping delays due to external factors (e.g., courier issues, weather) are not our responsibility.</li>
                            <li>Once the order is delivered to the provided address, ownership and risk of loss transfer to the customer.</li>
                        </ul>
                    </div>
                    <div>
                        <h1>5.No Refund Policy</h1>
                        <div>
                            <strong>All sales are final. Once an order is delivered, we do not offer refunds or accept returns.</strong>
                        </div>
                        <ul>
                            <li>Please review your order carefully before confirming the purchase.</li>
                            <li>In case of damaged or incorrect items received, you must notify us within 48 hours of delivery with photographic evidence. We will review each case individually and offer a replacement or credit at our discretion.</li>
                        </ul>
                    </div>
                    <div>
                        <h1>6.Contact Us</h1>
                        <p>If you have any questions about these Terms, please contact us at:</p>
                        <p>📧 Email: nageshachary2@gmail.com</p>
                        <p>📞 Phone: +91 9692331146</p>
                        <p>🏢 Address: old berhampur mentu chaka square </p>
                        <div>
                            <div><strong>State</strong>:odisha</div>
                            <div><strong>District</strong>:Gnajam</div>
                            <div><strong>Pincode</strong>:760009</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

} 


export default Term;