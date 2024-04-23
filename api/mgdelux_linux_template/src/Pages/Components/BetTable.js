import React, { useState, useEffect, useRef, useCallback } from 'react';

function BetTable({ onTotalBetChange, onTotalTicketsChange }) {
    const initialInputs = Array.from({ length: 11 }, () => Array.from({ length: 11 }, () => ''));
    const [inputs, setInputs] = useState(initialInputs);
    const [extraCellValues, setExtraCellValues] = useState(Array.from({ length: 10 }, () => ''));
    const memoizedOnTotalTicketsChange = useCallback(onTotalTicketsChange, []);

    const inputRefs = useRef(Array.from({ length: 11 }, () => Array.from({ length: 11 }, () => null)));
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedCol, setSelectedCol] = useState(null);

    const handleChange = (e, row, col) => {
        if (col === 10 && row !== 10) {
            // Update all cells in the same row by adding the input value
            const newExtraCellValues = [...extraCellValues];
            newExtraCellValues[row] = e.target.value;
            setExtraCellValues(newExtraCellValues);
            const newRowValues = inputs[row].map((value, index) => {
                return isNaN(value) ? e.target.value : Number(value) + Number(e.target.value); // Add the new value
            });
            const newInputs = [...inputs];
            newInputs[row] = newRowValues;
            setInputs(newInputs);
        } else if (row === 10 && col !== 10) {
            // Update all cells in the same column by adding the input value
            const newExtraCellValues = [...extraCellValues];
            newExtraCellValues[col] = e.target.value;
            setExtraCellValues(newExtraCellValues);
            const updatedInputs = [...inputs];
            updatedInputs.forEach((rowValues, index) => {
                rowValues[col] = isNaN(rowValues[col]) ? e.target.value : Number(rowValues[col]) + Number(e.target.value);
            });
            setInputs(updatedInputs);
        } else {
            // Update only the current cell
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
                if (rowIndex !== 10 && colIndex !== 10) {
                    const cellId = `NR${rowIndex}${colIndex}`;
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
            if (colIndex < 9) {
                inputRefs.current[rowIndex][colIndex + 1].focus();
                setSelectedRow(rowIndex);
                setSelectedCol(colIndex + 1);
            } else if (rowIndex < 10) {
                inputRefs.current[rowIndex + 1][0].focus();
                setSelectedRow(rowIndex + 1);
                setSelectedCol(0);
            } else {
                inputRefs.current[0][0].focus();
                setSelectedRow(0);
                setSelectedCol(0);
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
            handleChange({ target: { value: '' } }, rowIndex, colIndex);
        }
    };

    const rows = inputs.map((row, rowIndex) => (
        <tr key={rowIndex}>
            {row.map((value, colIndex) => {
                if (rowIndex !== 10 || colIndex !== 10) {
                    const cellId = `NR${rowIndex}${colIndex}`;
                    return (
                        <td key={colIndex}>
                            <label htmlFor={`input-${cellId}`}>{rowIndex === 10 || colIndex === 10 ? `A${rowIndex}` : `NR${rowIndex}${colIndex}`}</label>
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
                } else {
                    return null;
                }
            })}
        </tr>
    ));

    return (
        <div id="buttonholder" className="mt-2">
            <table id="betinputpanel" className="h-100 col-12">
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

export default BetTable;
