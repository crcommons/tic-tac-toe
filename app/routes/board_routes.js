const boardValidator = require('../validators/board_validator');
const playOptimally = require('../services/playOptimally');
const checkWinner = require('../services/checkWinner');

module.exports = function(app, db) {
    app.get('/', (req, res) => {

        // first make sure we have a query
        if (!req.query.board) {
            res.send(400, "please send a board")
        }

        // get the various forms of the board that we need (array, lowercase string)
        let unformatedBoard = req.query.board
        const boardString = unformatedBoard.toLowerCase();
        const boardArray = boardString.split('');

        // run the board through the validator and save so we only have to do it once
        const validBoard = boardValidator(boardString);

        if (!validBoard) {
            res.status(400).send("Not a valid board");
        } else {
            let winner = checkWinner(boardArray);
            if (winner) {
                res.status(200).send(`The winner is: ${winner}! ${boardString}`)
            } else if (boardIsFull(boardString)) {
                res.status(400).send("It's a tie! Let's play again")
            } else {
                let computerPlay = playOptimally(boardArray);
                let winner = checkWinner(computerPlay);
                if (winner) {
                    res.status(200).send(`The winner is: ${winner}! ${computerPlay}`)
                } else {
                    res.status(200).send(computerPlay)
                }
            }
        }
  });
};

const boardIsFull = (board) => {
    const space = /\s/;
    return !space.test(board);
}