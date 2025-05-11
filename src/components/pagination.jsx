



const Pagination = ({totalPage , page , setPage}) =>{
    return(
        <>
            <nav aria-label="..." className="m-auto">
                <ul class="pagination">
                    <li class={`page-item ${page === 1 ? 'disabled' : ''}`} ><button  class="page-link" onClick={()=>setPage(page-1)} disabled={page === 1}>Prev</button></li>
                    {
                       [...Array(totalPage)].map((_,index)=>(
                        <li class={`page-item ${page === index + 1 ? 'active' : ''}`}><button class="page-link" >{index + 1}</button></li>
                       )) 
                    }
                    <li class={`page-item ${page === totalPage ? 'disabled' : ''}`}><button class="page-link" onClick={()=>setPage(page + 1)} disabled={page === totalPage}>Next</button></li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination;