import React, { useState, useEffect, useRef, useCallback } from 'react'

function BetTable({ onTotalBetChange, onTotalTicketsChange }) {
    const initialInputs = Array.from({ length: 10 }, () => Array.from({ length: 11 }, () => ''));
    const [inputs, setInputs] = useState(initialInputs);
    const [extraCellValues, setExtraCellValues] = useState(Array.from({ length: 10 }, () => ''));
    const memoizedOnTotalTicketsChange = useCallback(onTotalTicketsChange, []);

    const inputRefs = useRef(Array.from({ length: 10 }, () => Array.from({ length: 11 }, () => null)));
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedCol, setSelectedCol] = useState(null);

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
        memoizedOnTotalTicketsChange(totalTickets);
    }, [inputs, memoizedOnTotalTicketsChange]);

    const handleKeyPress = (e, rowIndex, colIndex) => {
        if (e.key === 'ArrowRight') {
            if (colIndex < 10) {
                inputRefs.current[rowIndex][colIndex + 1].focus();
                setSelectedRow(rowIndex);
                setSelectedCol(colIndex + 1);
            } else {
                if (rowIndex < 9) {
                    inputRefs.current[rowIndex + 1][0].focus();
                    setSelectedRow(rowIndex + 1);
                    setSelectedCol(0);
                }
            }
        } else if (e.key === 'ArrowLeft') {
            if (colIndex > 0) {
                inputRefs.current[rowIndex][colIndex - 1].focus();
                setSelectedRow(rowIndex);
                setSelectedCol(colIndex - 1);
            } else {
                if (rowIndex > 0) {
                    inputRefs.current[rowIndex - 1][10].focus();
                    setSelectedRow(rowIndex - 1);
                    setSelectedCol(10);
                }
            }
        } else if (e.key === 'ArrowDown' && rowIndex < 9) {
            inputRefs.current[rowIndex + 1][colIndex].focus();
            setSelectedRow(rowIndex + 1);
            setSelectedCol(colIndex);
        } else if (e.key === 'ArrowUp' && rowIndex > 0) {
            inputRefs.current[rowIndex - 1][colIndex].focus();
            setSelectedRow(rowIndex - 1);
            setSelectedCol(colIndex);
        } else if (e.key === 'Delete' && inputs[rowIndex][colIndex] !== '') {
            handleChange({ target: { value: '0' } }, rowIndex, colIndex);
        }
    };


    const rows = inputs.map((row, rowIndex) => (
        <tr key={rowIndex}>
            {row.map((value, colIndex) => {
                const cellId = colIndex === 10 ? `A${rowIndex}` : `NR${rowIndex}${colIndex}`;
                return (
                    <td key={colIndex}>
                        <label htmlFor={`input-${cellId}`}>{cellId}</label>
                        <input
                            ref={el => inputRefs.current[rowIndex][colIndex] = el}
                            id={`input-${cellId}`}
                            type="text"
                            value={colIndex === 10 ? extraCellValues[rowIndex] : value}
                            onChange={(e) => handleChange(e, rowIndex, colIndex)}
                            onKeyDown={(e) => handleKeyPress(e, rowIndex, colIndex)}
                            className={(selectedRow === rowIndex && selectedCol === colIndex) ? 'selected' : ''}
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