import React, { useState, useEffect } from 'react';

function Cell({ style, number, active, onClick }) {

    return (
        <div style={style} className={[`board__cell`, active ? "is-active" : null].join(" ")} onClick={onClick}>
            {/* // <div style={style} className="board__cell" onClick={onClick}> */}
            <span className="board__cell-number">{number}</span>
        </div >
    )
}

export default Cell;