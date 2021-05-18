const controller = (() => {
    let board = new Array(9).fill("|");
    let marker = "X";
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,4,8],
        [2,4,6],
        [0,3,6],
        [1,4,7],
        [2,5,8]
    ]
    const checkWinner = () => {
        let winner = false;
        winConditions.forEach(condition => {
            
            if (board[condition[0]] != "|" && board[condition[0]] === board[condition[1]] && board[condition[0]] === board[condition[2]]) {
                winner = board[condition[0]]
            }
            
        })
        return winner
    }
    const squareClick = (e) => {
        if (e.target.innerText != "|" || checkWinner()) return 
        console.log(e);
        board[e.target.getAttribute("index")] = marker;
        marker = marker === "X" ? "O" : "X";
        displayBoard();
        const winner = checkWinner();
        console.log(winner)
        if (winner == "O" | winner == "X" | !board.includes("|")) {
            alert(!board.includes("|") ? "It's a tie!" :
            `${winner == "X" ? 
            (document.getElementById("p1name").value == "" ? 
            "P1" : 
            document.getElementById("p1name").value) : 
            (document.getElementById("p2name").value == "" ?
            "P2" :
            document.getElementById("p2name").value)} has won!`)
        }
    }
    const displayBoard = () => {
        let screenboard = document.getElementById("board");
        screenboard.innerHTML = "";
        let index = 0;
        board.forEach(node => {
            
            let screennode = document.createElement("button");
            screennode.setAttribute("index", index);
            index += 1;
            screennode.classList.add("node");
            screennode.innerText = node;
            if (node != "|") screennode.style.color = "black";
            if (node != "|") screennode.style.animationName  = "shadow-move";
            screenboard.addEventListener("click", squareClick)
            screenboard.appendChild(screennode);
            if ((index)%3===0) screenboard.appendChild(document.createElement("br"))
            //console.log(node)
        })
    }

    const resetBoard = () => {
        board = new Array(9).fill("|");
        marker = "X";
        displayBoard();
    }
    return {displayBoard, resetBoard}
})();
controller.displayBoard();
//console.log(controller.board);

document.getElementById("reset").addEventListener("click", controller.resetBoard)