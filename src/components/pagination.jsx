



const Pagination = ({totalPage , page , setPage}) =>{
    return(
        <>
            <nav aria-label="..." className="mt-3">
                <ul class="pagination justify-content-center">
                    <li class={`page-item ${page === 1 ? 'disabled' : ''}`} style={{cursor:'pointer'}}><a  class="page-link" onClick={()=>setPage(page-1)} disabled={page === 1}>Prev</a></li>
                    {
                       [...Array(totalPage)].map((_,index)=>(
                        <li class={`page-item ${page === index + 1 ? 'active' : ''}`}><a class="page-link" >{index + 1}</a></li>
                       )) 
                    }
                    <li class={`page-item ${page === totalPage ? 'disabled' : ''}`} style={{cursor:'pointer'}}><a class="page-link" onClick={()=>setPage(page + 1)} disabled={page === totalPage}>Next</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Pagination;