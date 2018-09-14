module.exports = function(board) {
    let theWinnerIs = undefined
    wins.forEach((win) => {
        let first = board[win[0]];
        let second = board[win[1]];
        let third = board[win[2]];
        if (first === second && first === third && first != ' ') {
            theWinnerIs = board[win[0]];
        }
    })
    return theWinnerIs;
}

const wins = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8]
]