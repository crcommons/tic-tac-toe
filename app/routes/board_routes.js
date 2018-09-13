const boardValidator = require('../validators/board_validator');

module.exports = function(app, db) {
    app.get('/', (req, res) => {

        // first make sure we have a query
        if (!req.query.board) {
            res.send(400, "please send a board")
        }

        const board = req.query.board
        const validBoard = boardValidator(req.query.board);

        if (!validBoard) {
            res.status(400).send("Not a valid board");
        } else if (boardIsFull(board)) {
            res.status(400).send("No more moves! Let's play again")
        } else {
            const computerPlay = play(board);
            res.status(200).send(computerPlay)
        }
  });
};

const boardIsFull = (board) => {
    const space = /\s/;
    return !space.test(board);
}

const play = (board) => {
    return board.replace(' ', 'o');
}

