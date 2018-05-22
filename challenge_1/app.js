window.onload = function() {
  init();
}
var init = function() {
  var turn = 0;
  var oWins = 0;
  var xWins = 0;
  var isWon = false;
  var boxes = document.getElementsByClassName('box');
  var boardLength = Math.sqrt(boxes.length)
  var refresh = document.getElementById('refresh');
  refresh.hidden = true;
  var winnerBox = document.getElementById('Win');
  var stats = document.getElementById('stats');
  var playerOne = document.getElementById('playerOne');
  var playerTwo = document.getElementById('playerTwo');
  var nameOne = '';
  var nameTwo = '';
  var board =
  [[0,0,0],
  [0,0,0],
  [0,0,0]];


  for (var i = 0; i < boxes.length; i++) {
    boxes[i].onclick = function() {boardHelpers.handleClick(this);}
  }

  refresh.onclick = function() {
    gameOver.handleRefresh();
  }

  playerOne.onclick = function() {
    scoring.playerOneClick();
  }

  playerTwo.onclick = function() {
    scoring.playerTwoClick();
  }

  var scoring = {
    playerOneClick : function() {
      event.preventDefault();
      nameOne = document.getElementById('nameInput').value;
      document.getElementById('nameInput').value = '';
      scoring.renderScores();
    },
    playerTwoClick : function() {
      event.preventDefault();
      nameTwo = document.getElementById('nameTwoInput').value;
      document.getElementById('nameInput').value = '';
      scoring.renderScores();
    },
    renderScores : function () {
      if(nameOne.length > 0 && nameTwo.length === 0) {
        stats.innerHTML = `X (${nameOne}) Wins:${xWins} VS O Wins:${oWins}`;
      } else if (nameOne.length === 0 && nameTwo.length > 0) {
        stats.innerHTML = `X Wins:${xWins} VS O (${nameTwo}) Wins:${oWins}`;
      } else if (nameOne.length === 0 && nameTwo.length === 0) {
        stats.innerHTML = `X Wins:${xWins} VS O Wins:${oWins}`;
      } else {
      stats.innerHTML = `X (${nameOne}) Wins:${xWins} VS O (${nameTwo}) Wins:${oWins}`;
      }
    }
  }

  var gameOver = {
    winner : function (user) {
      if (boardHelpers.allHoriz(user) || boardHelpers.allVert(user) || boardHelpers.allD(user)) {
        turn = 0;
        isWon = true;
        let winner = 0;
        if (user === 'X') {
          xWins ++;
          winner = nameOne;
        }
        if (user === 'O') {
          oWins ++
          winner = nameTwo;
        }
        if (winner.length > 0) {
          winnerBox.append(`The Winner Is ${winner}, Care for a Rematch?`);
        } else {
          winnerBox.append(`The Winner Is ${user}, Care for a Rematch?`);
        }
        scoring.renderScores();
        refresh.hidden = false;
      } else {
        var tie = true;
        for (var i = 0; i < boxes.length; i++) {
          if(boxes[i].innerHTML === '') {
            tie = false;
            return;
          }
        }
        if (tie) {
          winnerBox.append(`The Winner Is NO ONE YOU BOTH SUCK, Care for a Rematch?`);
          refresh.hidden = false;
        }
      }
    },
    handleRefresh: function () {
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = '';
      }
      winnerBox.innerHTML = '';
      isWon = false;
      turn = 0;
      refresh.hidden = true;
    }
  }

  var boardHelpers = {
    handleClick : function (item) {
      if (item.innerHTML === '' && !isWon) {
        if (turn % 2 === 0) {
          item.innerHTML = 'X';
          gameOver.winner('X')
        } else {
          item.innerHTML = 'O';
          gameOver.winner('O')
        }
        turn++;
      }
    },
    horizontal : function (user, row) {
      var win = true;
      for (var index = row; index < (row + boardLength); index++) {
        if (!boxes[index].innerHTML.includes(user)) {
          win = false;
        }
      }
      return win;
    },
    vertical : function (user, column) {
      var win = true;
      for (var index = column; index < boxes.length; index += boardLength) {
        if (!boxes[index].innerHTML.includes(user)) {
          win = false;
        }
      }
      return win;
    },
    minorD : function (user) {
      var win = true;
      for (var index = 0; index < boxes.length; index += 4) {
        if (!boxes[index].innerHTML.includes(user)) {
          win = false;
        }
      }
      return win;
    },
    majorD : function (user) {
      var win = true;
      for (var index = 2; index < boxes.length - 1; index += 2) {
        if (!boxes[index].innerHTML.includes(user)) {
          win = false;
        }
      }
      return win;
    },
    allHoriz : function (user) {
      if (boardHelpers.horizontal(user, 0) || boardHelpers.horizontal(user, 3) || boardHelpers.horizontal(user, 6)) {
        return true;
      }
      return false;
    },
    allVert : function (user) {
      if (boardHelpers.vertical(user, 0) || boardHelpers.vertical(user, 1) || boardHelpers.vertical(user, 2)) {
        return true;
      }
      return false;
    },
    allD : function(user) {
      if (boardHelpers.majorD(user) || boardHelpers.minorD(user)) {
        return true;
      }
      return false;
    }
  }

}
