export const PLAYER_X = "X";
export const PLAYER_O = "O";

export function Square({ value, highlight, onSquareClick }) {
    function handleContextMenu(event) {
        event.preventDefault();
        onSquareClick(PLAYER_O);
    }
    return (
        <div>
            <button
                onClick={() => onSquareClick(PLAYER_X)}
                onContextMenu={handleContextMenu}
                className={"square" + (highlight ? " lastcell" : "") + (value === PLAYER_O ? " player-o" : " player-x")}
            >
                {value}
            </button>
        </div>
    );
}

export default Square;
