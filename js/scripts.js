var board = {
  1: "",
  2: "",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "",
  8: "",
  9: "",
};

var winning = [
  [1,2,3],
  [4,5,6],
  [7,8,9],
  [1,5,9],
  [1,4,7],
  [2,5,8],
  [3,6,9],
  [3,5,7],
];
var winner; //0 if there is no winner, 1 if there is a winner
var player = {};
var computer = {};

function startGame () {
  winner = 0;
  $("#start").css("visibility", "visible");
}

function placeMark (loc) {
  var currentUser = this;
  if (board[loc] === "") {
    if (this.mark == 'x') {
      $('#box' + loc).html("X");
      board[loc] = 'x';
    }
    else if (this.mark == 'o') {
      $('#box' + loc).html("O");
      board[loc] = 'o';
    }
    if (this == player){
      computerTurn();
    }
    checkWin();
  }
  else {
    //alert("Space aready taken!");
  }

}
function computerTurn () {
  var location;
  if (block()) {
    placeMark.call(computer, location);
  }

  // if (board['1'] !== ''){
  //   placeMark.call(computer, 5);
  //   }
  //TODO Switch statement that goes what should i do? I should win, I should block, I should play for optimal space
  //TODO Create blocking algorithm is opponent has xx already computer should block with o
  function block () {
    for (var i = 0; i < winning.length; i++){
      if (board[winning[i][0]] == player.mark && board[winning[i][1]] == player.mark) {
        if (board[winning[i][2]] === '') {
          location = winning[i][2];
          return true;
        }
      }
      else if (board[winning[i][0]] == player.mark && board[winning[i][2]] == player.mark) {
        if (board[winning[i][1]] === '') {
          location = winning[i][1];
          return true;
        }
      }
      else if (board[winning[i][1]] == player.mark && board[winning[i][2]] == player.mark) {
        if (board[winning[i][0]] === '') {
          location = winning[i][0];
          return true;
        }
      }

    }

    // if (board['1'] == player.mark && board['2'] == player.mark){
    //   placeMark.call(computer, 3);
    // }
  }
  //TODO Create a winning algrorithm if computer has oo then go ooo
  //TODO Create an algorithm to get middle or corner in the beginning

}



function setUser(j) {
  if (j===0) {
    player.mark = 'x';
    computer.mark = 'o';
  }
  else if (j==1){
    player.mark = 'o';
    computer.mark = 'x';
  }

  $("#start").css("visibility", "hidden");

}

function checkWin(){
  for (var i = 0; i < winning.length; i++){
    if (winning[i].every( (element, array, index) => {return board[element] == 'x';}   )) {
      $('#winner').html("Player is the winner");
      winner =1;
    }
    else {
      //console.log("no winner");
    }
  }
}
