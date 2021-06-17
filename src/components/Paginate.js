import React from 'react'

const Paginate = ({ pageNumber, itemsPerPage, total, pageHandler }) => {

    const paginationPageNumber = [];

    for (let i = 1; i <= Math.ceil(total / itemsPerPage); i++) {
        paginationPageNumber.push(i);
    }
    return (
        <nav className="paginator">
            <ul className="paginator-list">
                {paginationPageNumber.map(item => {

                    let active = item === pageNumber;
                    let className = active ? "active" : "";
                    return (
                        <li
                            className="paginator-item"
                            key={item}>
                            {console.log("item" + item)}
                            <a href="!#" className={className} onClick={() => pageHandler(item)}>{item}</a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Paginate
