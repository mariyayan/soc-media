import React from 'react';
import { useState } from 'react';
import './pagination.css';



function Pagination({ itemsQuantity, handler }) { 

    const [activeBtn, setActiveBtn] = useState(1);
    let itemsPerPage = 5;
    let pageQuantity = itemsQuantity / 5 + (itemsQuantity % 5 ? 1 : 0);
    let paginationBtns = [];

    function btnHandler(firstInd, lastInd, i) {
        setActiveBtn(i);
        handler(firstInd, lastInd);
    }

    for (let i = 1; i <= pageQuantity; i++) {
        let lastInd = i * itemsPerPage;
        let firstInd = lastInd - itemsPerPage;
        paginationBtns.push(<button className = {activeBtn == i ? "clicked-btn btn pagination-btn border" : 'btn pagination-btn transition-style border'} disabled = {activeBtn == i ? true : false} onClick={() => btnHandler(firstInd, lastInd, i)} key={i}>{i}</button>);
    }

    return (
        <div className = 'pagination'>	
			{paginationBtns}
		</div>
    );
}

export default Pagination;