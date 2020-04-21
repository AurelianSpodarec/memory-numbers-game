import React, { useState, useEffect } from 'react';

function Cell({ number, active, onClick }) {

    return (
        <div className={[`board__cell`, active ? "is-active" : null].join(" ")} onClick={onClick}>
            <span className="board__cell-number">{number}</span>
        </div >
    )
}

export default Cell;