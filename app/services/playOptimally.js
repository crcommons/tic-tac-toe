const checkWinner = require('./checkWinner');

module.exports = function(masterBoard) {
    let score = {}
    let indexes = []
    let currentIndex;

    const checkOptimizationScore = (board) => {
        let winner = checkWinner(board);
        if (winner === 'o') {
            score[currentIndex] += 1
        } else if (winner === 'x') {
            score[currentIndex] -= 1
        } else {
            board.forEach((marker, index) => {
                if (board[index] === ' ') {
                    let copyBoard = board.slice();
                    let playedBoard = play(copyBoard, index, checkTurn(board))
                    checkOptimizationScore(playedBoard, index)

                }
            })
        }
    }

    const play = (b, i, m) => {
        b[i] = m;
        return b;
    }

    const checkTurn = (board) => {
        let counts = {
            o: 0,
            x: 0
        };
        board.forEach((marker) => { 
            counts[marker] = (counts[marker] || 0)+1; 
        });

        if (counts.o > counts.x) {
            return 'x'
        } else {
            return 'o'
        }
    }

    const findHighestScore = () => {
        let highestScore = {
            score: 0,
            index: 0
        }

        indexes.forEach((index) => {
            if (score[index] > highestScore.score) {
                highestScore.score = score[index]
                highestScore.index = index
            } 
        })
        return highestScore.index
    }

    // This is where we actually play
    masterBoard.forEach((marker, index) => {
        if (marker === ' ') {
            score[index] = 0;
            indexes.push(index);
            currentIndex = index
            let copyOfMaster = masterBoard.slice()
            let playedBoard = play(copyOfMaster, index, 'o')
            checkOptimizationScore(playedBoard)

        }
    })

    let arrayPlayedBoard = play(masterBoard, findHighestScore(), 'o');
    let stringPlayedBoard = arrayPlayedBoard.join('');
    return stringPlayedBoard
}