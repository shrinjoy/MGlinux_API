import React, { useState, useEffect } from 'react'

function BetTable({ onTotalBetChange }) {
    const initialInputs = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ''));
    const [inputs, setInputs] = useState(initialInputs);

    const handleChange = (e, row, col) => {
        const newInputs = [...inputs];
        newInputs[row][col] = e.target.value;
        setInputs(newInputs);
    };

    useEffect(() => {
        const totalBet = inputs
            .flat()
            .filter((value) => !isNaN(value) && value !== '')
            .reduce((acc, curr) => acc + Number(curr), 0);
        onTotalBetChange(totalBet);
    }, [inputs, onTotalBetChange]);

    const rows = inputs.map((row, rowIndex) => (
        <tr key={rowIndex}>
            {row.map((value, colIndex) => (
                <td key={colIndex}>
                    <label htmlFor={`input-${rowIndex}-${colIndex}`}>NR{rowIndex}{colIndex}</label>
                    <input
                        id={`input-${rowIndex}-${colIndex}`}
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(e, rowIndex, colIndex)}
                    />
                </td>
            ))}
        </tr>
    ));
    return (
        <div id="buttonholder" className="mt-2">
            <table id="betinputpanel" className="h-100 col-12">
                <tbody>{rows}</tbody>
            </table>
        </div>
    )
}

export default BetTable