import { useRef, useState } from "react";
import { PLAYER_O, PLAYER_X, Square } from "./Square";

const BOARD_SIDES = 3;
const BOARD_INDICES = [...Array(BOARD_SIDES).keys()];
const CELL_COUNT = BOARD_SIDES * BOARD_SIDES;

const WIN_POSITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export function Board() {
    const [status, setStatus] = useState(new Array(CELL_COUNT).fill(undefined));
    const [winner, setWinner] = useState();
    const [gameOver, setGameOver] = useState(false);
    const [lastCell, setLastCell] = useState();
    let lastPlayer = useRef();

    function handleClick(idx, player) {
        if (player !== PLAYER_O && player !== PLAYER_X) return;

        if (lastPlayer.current === player) return;

        if (status[idx]) return;

        if (winner) return;

        lastPlayer.current = player;
        const newStatus = status.map((value, index) => (index === idx ? player : value));
        win_check(newStatus, player);
        console.log(newStatus);
        setStatus(newStatus);
        setLastCell(idx);
    }

    function win_check(newStatus, player) {
        const win_array = WIN_POSITIONS.map((pos) => {
            const c1 = newStatus[pos[0]];
            const c2 = newStatus[pos[1]];
            const c3 = newStatus[pos[2]];
            return c1 && c1 === c2 && c1 === c3 ? true : false;
        });
        console.log(newStatus, win_array);
        const isGameOver = win_array.some((value) => value);
        if (isGameOver) {
            setWinner(player);
            setGameOver(true);
            return;
        }
        if (newStatus.every((cell) => cell)) {
            setGameOver(true);
        }
    }

    function handlePlayAgain() {
        setStatus(new Array(CELL_COUNT).fill(undefined));
        setWinner(undefined);
        setGameOver(false);
        setLastCell(undefined);
        lastPlayer.current = undefined;
    }

    return (
        <div className="board">
            {BOARD_INDICES.map((rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {BOARD_INDICES.map((columnIndex) => {
                        const index = rowIndex * BOARD_SIDES + columnIndex;
                        return (
                            <Square
                                key={index}
                                value={status[index]}
                                highlight={index === lastCell}
                                onSquareClick={(player) => handleClick(index, player)}
                            />
                        );
                    })}
                </div>
            ))}
            {gameOver && winner && <div className="result">Vége a játéknak! {winner} nyert 🎉</div>}
            {gameOver && !winner && <div className="result">Döntetlen, nincs nyertes!</div>}
            {gameOver && (
                <button className="buttonocska" onClick={handlePlayAgain}>
                    Visszaállítás
                </button>
            )}
        </div>
    );
}

export default Board;

