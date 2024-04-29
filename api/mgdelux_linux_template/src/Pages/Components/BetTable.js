import React, { useState, useEffect, useRef, useCallback } from 'react';

function BetTable({ onTotalBetChange, onTotalTicketsChange, buttonTrigger, onClearAllValues }) {
    const initialInputs = Array.from({ length: 11 }, () => Array.from({ length: 11 }, () => ''));
    const [inputs, setInputs] = useState(initialInputs);
    const [extraCellValues, setExtraCellValues] = useState(Array.from({ length: 10 }, () => ''));
    const memoizedOnTotalTicketsChange = useCallback(onTotalTicketsChange, []);

    const inputRefs = useRef(Array.from({ length: 11 }, () => Array.from({ length: 11 }, () => null)));
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedCol, setSelectedCol] = useState(null);

    // Input Generator
    const handleChange = (e, row, col) => {
        const newValue = e.target.value;
        const newInputs = [...inputs];

        newInputs[row][col] = newValue;

        if (row === 10) {
            for (let i = 0; i < newInputs.length - 1; i++) {
                const existingValue = newInputs[i][col] !== '' ? parseFloat(newInputs[i][col]) : 0;
                newInputs[i][col] = existingValue + parseFloat(newValue);
            }
            newInputs[10][col] = newValue;
        }

        if (col === 10) {
            for (let i = 0; i < newInputs[row].length - 1; i++) {
                const existingValue = newInputs[row][i] !== '' ? parseFloat(newInputs[row][i]) : 0;
                newInputs[row][i] = existingValue + parseFloat(newValue);
            }
            newInputs[row][10] = newValue;
        }

        if ((row === 10 && newValue === '') || (col === 10 && newValue === '')) {
            for (let i = 0; i < newInputs.length; i++) {
                for (let j = 0; j < newInputs[i].length; j++) {
                    newInputs[i][j] = '';
                }
            }
        }

        setInputs(newInputs);
    };

    // Total Bet Generator
    useEffect(() => {
        const totalBet = inputs
            .flatMap((row, rowIndex) => {
                if (rowIndex !== 10) {
                    return row.filter((value, colIndex) => colIndex !== 10 && !isNaN(value) && value !== '');
                }
                return [];
            })
            .reduce((acc, curr) => acc + Number(curr), 0);
        onTotalBetChange(totalBet);
    }, [inputs, onTotalBetChange]);


    // Total Ticket Generator
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

    // Navigate using KeyBoard
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
        }
    };

    // Clear All Inputs
    useEffect(() => {
        if (buttonTrigger) {
            const newInputs = initialInputs.map(row => row.map(() => ''));
            setInputs(newInputs);
            setExtraCellValues(Array.from({ length: 10 }, () => ''));
            onClearAllValues();
        }
    }, [buttonTrigger]);

    const rows = inputs.map((row, rowIndex) => (
        <tr key={rowIndex}>
            {row.map((value, colIndex) => {
                if (rowIndex !== 10 || colIndex !== 10) {
                    const cellId = `NR${rowIndex}${colIndex}`;
                    return (
                        <td key={colIndex}>
                            <label htmlFor={`input-${cellId}`}>{rowIndex === 10 ? "ALL B" : colIndex === 10 ? `ALL A` : `NR${rowIndex}${colIndex}`}</label>
                            <input
                                ref={el => inputRefs.current[rowIndex][colIndex] = el}
                                id={`input-${cellId}`}
                                type="text"
                                value={value}
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
        <div id="buttonholder">
            <table id="betinputpanel" className="h-100 col-12">
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}

export default BetTable;
