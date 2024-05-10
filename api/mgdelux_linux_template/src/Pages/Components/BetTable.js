import React, { useState, useEffect, useRef, useCallback } from 'react';

function BetTable({ onTotalBetChange, onTotalTicketsChange, clearTrigger, onClearAllValues, luckyTrigger, onLuckyPick }) {
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
                const existingValue = newInputs[i][col] !== '' ? parseFloat(newInputs[i][col]) : 0;//etar mane ki bara tue old value tor all bet er nebe naki tor bet field er nebe 


                //first get the latest values
                newInputs[i][col] = parseInt(document.getElementById(`input-MD${i}${col}`).value || 0) + parseInt(document.getElementById(`input-MD${row}${col}`).value || 0);
                //then remove the 
                newInputs[i][col] -= parseInt(document.getElementById(`input-MD${row}${col}`).getAttribute("data-old") || 0)
                // we check if the value is less than 1 if so then we set it to empty string 
                if (newInputs[i][col] < 1) {
                    newInputs[i][col] = ""
                }
            }


            //check value is less than 0 and set it to 0 if it is 
            if (newValue < 0) {
                newValue = 0;
            }
            newInputs[10][col] = newValue;

            //storing the lastet value for next iteration 
            document.getElementById(`input-MD${row}${col}`).setAttribute("data-old", newValue);
            //same rule for the side bet 
        }

        if (col === 10) {
            for (let i = 0; i < newInputs[row].length - 1; i++) {
                const existingValue = newInputs[row][i] !== '' ? parseFloat(newInputs[row][i]) : 0;


                newInputs[row][i] = parseInt(document.getElementById(`input-MD${row}${i}`).value || 0) + parseInt(document.getElementById(`input-MD${row}${col}`).value || 0);
                newInputs[row][i] -= parseInt(document.getElementById(`input-MD${row}${col}`).getAttribute("data-old") || 0)

                if (newInputs[i][col] < 1) {
                    newInputs[i][col] = ""
                }
            }
            if (newValue < 0) {
                newValue = 0;
            }
            newInputs[row][10] = newValue;




            document.getElementById(`input-MD${row}${col}`).setAttribute("data-old", newValue);
            //
        }

        if ((row === 10 && newValue === '') || (col === 10 && newValue === '')) {
            for (let i = 0; i < newInputs.length; i++) {
                for (let j = 0; j < newInputs[i].length; j++) {
                    if (!((i === 10 && j === col) || (i === row && j === 10))) {
                        newInputs[i][j] = inputs[i][j];
                    }
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
                    const cellId = `MD${rowIndex}${colIndex}`;
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
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
        }

        if (e.key === 'ArrowRight') {
            if (colIndex < 9) {
                inputRefs.current[rowIndex][colIndex + 1].focus();
                inputRefs.current[rowIndex][colIndex + 1].select();
                setSelectedRow(rowIndex);
                setSelectedCol(colIndex + 1);
            } else if (rowIndex < 10) {
                inputRefs.current[rowIndex + 1][0].focus();
                inputRefs.current[rowIndex + 1][0].select();
                setSelectedRow(rowIndex + 1);
                setSelectedCol(0);
            } else {
                inputRefs.current[0][0].focus();
                inputRefs.current[0][0].select();
                setSelectedRow(0);
                setSelectedCol(0);
            }
        } else if (e.key === 'ArrowLeft') {
            if (colIndex > 0) {
                inputRefs.current[rowIndex][colIndex - 1].focus();
                inputRefs.current[rowIndex][colIndex - 1].select();
                setSelectedRow(rowIndex);
                setSelectedCol(colIndex - 1);
            } else {
                if (rowIndex > 0) {
                    inputRefs.current[rowIndex - 1][10].focus();
                    inputRefs.current[rowIndex - 1][10].select();
                    setSelectedRow(rowIndex - 1);
                    setSelectedCol(10);
                }
            }
        } else if (e.key === 'ArrowDown' && rowIndex < 10) {
            inputRefs.current[rowIndex + 1][colIndex].focus();
            inputRefs.current[rowIndex + 1][colIndex].select();
            setSelectedRow(rowIndex + 1);
            setSelectedCol(colIndex);
        } else if (e.key === 'ArrowUp' && rowIndex > 0) {
            inputRefs.current[rowIndex - 1][colIndex].focus();
            inputRefs.current[rowIndex - 1][colIndex].select();
            setSelectedRow(rowIndex - 1);
            setSelectedCol(colIndex);
        }
    };

    // Clear All Inputs
    useEffect(() => {
        if (clearTrigger) {
            const newInputs = initialInputs.map(row => row.map(() => ''));
            setInputs(newInputs);
            setExtraCellValues(Array.from({ length: 10 }, () => ''));
            inputRefs.current[0][0].focus();
            onClearAllValues();
        }
    }, [clearTrigger]);

    // LuckyPik Function
    useEffect(() => {
        if (luckyTrigger) {
            const randomRow = Math.floor(Math.random() * 10);
            const randomCol = Math.floor(Math.random() * 10);

            // Check if the randomly selected cell is not in Master Row or Column
            if (randomRow !== 10 && randomCol !== 10) {
                const newInputs = [...inputs];
                newInputs[randomRow][randomCol] = "1";
                setInputs(newInputs);
            }
            onLuckyPick();
        }
    }, [luckyTrigger])

    const rows = inputs.map((row, rowIndex) => (
        <tr key={rowIndex}>
            {row.map((value, colIndex) => {
                if (rowIndex !== 10 || colIndex !== 10) {
                    const cellId = `MD${rowIndex}${colIndex}`;
                    return (
                        <td key={colIndex}>
                            <label htmlFor={`input-${cellId}`}>{rowIndex === 10 ? "ALL B" : colIndex === 10 ? `ALL A` : `MD${rowIndex}${colIndex}`}</label>
                            <input
                                ref={el => inputRefs.current[rowIndex][colIndex] = el}
                                id={`input-${cellId}`}
                                type="text"
                                value={value}
                                onChange={(e) => handleChange(e, rowIndex, colIndex)}
                                onKeyDown={(e) => handleKeyPress(e, rowIndex, colIndex)}
                                className={(selectedRow === rowIndex && selectedCol === colIndex) ? 'selected' : ''}
                                data-old={0}
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
        <>
            <div id="buttonholder">
                <table id="betinputpanel" className="h-100 col-12">
                    <tbody>{rows}</tbody>
                </table>

            </div>
            <div className='col-md-12'>
                <div className='buttonsRow stoneGroup'>
                    <div className="btnItem">
                        <button
                            className="gamebutton"
                            style={{ backgroundColor: "#47e315", width: 135, height: 25, fontSize: 13 }}
                        >
                            Stone Group MG
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BetTable;
