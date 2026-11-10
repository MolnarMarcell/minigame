import { useRef, useState } from "react";
import { PLAYER_O, PLAYER_X, Square } from "./Square";
import { getWinner } from "../utils/gameUtils";

const BOARD_SIDES = 3;
const BOARD_INDICES = [...Array(BOARD_SIDES).keys()];
const CELL_COUNT = BOARD_SIDES * BOARD_SIDES;

export function Board() {
    const [status, setStatus] = useState(new Array(CELL_COUNT).fill(undefined));
    const [winner, setWinner] = useState();
    const [gameOver, setGameOver] = useState(false);
    const [lastCell, setLastCell] = useState();
    let lastPlayer = useRef();

    function handleClick(idx, player) {
        if (player !== PLAYER_O && player !== PLAYER_X) return;

        if (gameOver) return;

        if (lastPlayer.current === player) return;

        if (status[idx]) return;

        lastPlayer.current = player;
        const newStatus = status.map((value, index) => (index === idx ? player : value));
        const newWinner = getWinner(newStatus);

        setStatus(newStatus);
        setLastCell(idx);
        if (newWinner) setWinner(newWinner);
        if (newWinner || newStatus.every(Boolean)) setGameOver(true);
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
