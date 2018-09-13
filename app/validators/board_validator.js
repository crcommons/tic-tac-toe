module.exports = function(board) {
   if (board.length != 9) {
        return false;
   }

   if (checkDifference(board) > 1) {
        return false;
   }
   if (checkForOtherLetters(board)) {
        return false;
   }

   if (xTurn(board)) {
        return false
   }

   return true
};

const checkDifference = (board) => {
    const oLength = (board.match(/o/g)||[]).length;
    const xLength = (board.match(/x/g)||[]).length;
    
    return difference(oLength, xLength);
}

const difference = (a, b) => { 
    return Math.abs(a - b); 
}

const checkForOtherLetters = (board) => {
    const pattern = /[a-np-wyz0-9!@#\$%\^\&*\)\(+=._-]/i;
    return ((pattern.test(board)));
}

const xTurn = (board) => {
    const oLength = (board.match(/o/g)||[]).length;
    const xLength = (board.match(/x/g)||[]).length;

    return (oLength > xLength);
}
