import React, { useState, useEffect } from 'react'

function BetTable({ onTotalBetChange, onTotalTicketsChange }) {
    const initialInputs = Array.from({ length: 10 }, () => Array.from({ length: 11 }, () => ''));
    const [inputs, setInputs] = useState(initialInputs);
    const [extraCellValues, setExtraCellValues] = useState(Array.from({ length: 10 }, () => ''));

    const handleChange = (e, row, col) => {
        if (col === 10) {
            const newExtraCellValues = [...extraCellValues];
            newExtraCellValues[row] = e.target.value;
            setExtraCellValues(newExtraCellValues);
            // Update all cells in the same row
            const newRowValues = inputs[row].map(() => e.target.value);
            const newInputs = [...inputs];
            newInputs[row] = newRowValues;
            setInputs(newInputs);
        } else {
            const newInputs = [...inputs];
            newInputs[row][col] = e.target.value;
            setInputs(newInputs);
        }
    };

    useEffect(() => {
        const totalBet = inputs
            .flat()
            .filter((value) => !isNaN(value) && value !== '')
            .reduce((acc, curr) => acc + Number(curr), 0);
        onTotalBetChange(totalBet);
    }, [inputs, onTotalBetChange]);

    useEffect(() => {
        const totalTickets = [];
        inputs.forEach((row, rowIndex) => {
            row.forEach((value, colIndex) => {
                if (colIndex !== 10) {
                    const cellId = `${rowIndex}${colIndex}`;
                    if (!isNaN(value) && value !== '') {
                        totalTickets.push(`${cellId}Q${value}`);
                    }
                }
            });
        });
        onTotalTicketsChange(totalTickets);
    }, [inputs, onTotalTicketsChange]);

    const rows = inputs.map((row, rowIndex) => (
        <tr key={rowIndex}>
            {row.map((value, colIndex) => {
                const cellId = colIndex === 10 ? `A${rowIndex}` : `NR${rowIndex}${colIndex}`;
                return (
                    <td key={colIndex}>
                        <label htmlFor={`input-${cellId}`}>{cellId}</label>
                        <input
                            id={`input-${cellId}`}
                            type="text"
                            value={colIndex === 10 ? extraCellValues[rowIndex] : value}
                            onChange={(e) => handleChange(e, rowIndex, colIndex)}
                        />
                    </td>
                );
            })}
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