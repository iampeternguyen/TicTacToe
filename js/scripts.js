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
var winner=0; //0 if there is no winner, 1 if there is a winner
var player = {};
var computer = {};
var moveCounter = 0;
var played = [];
function startGame () {
  played = [];
  winner = 0;
  moveCounter = 0;
  $("#start").css("visibility", "visible");
  clearBoard ();
}

function clearBoard () {
  board = {
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
  for (i=1; i<=9;i++) {
    $('#box' + i).html("");
  }
  $("#winner").html("");

}

function placeMark (loc) {
  if (winner===0) {
    var currentUser = this;
    if (board[loc] === "") {
      if (this.mark == 'x') {
        $('#box' + loc).css("visibility", "hidden");
        $('#box' + loc).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
        $('#box' + loc).html("X");
        board[loc] = 'x';
      }
      else if (this.mark == 'o') {
        $('#box' + loc).css("visibility", "hidden");
        $('#box' + loc).css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0});
        $('#box' + loc).html("O");
        board[loc] = 'o';
      }
      played.push(loc);
      checkEmpty();
      checkWin();
      if (this == player){
        moveCounter++;
        setTimeout(computerTurn, 500);

         //TODO delate this by 1 second
      }

    }
    else {
      //alert("Space aready taken!");
    }
  }
}

function checkEmpty () {
  if (played.length == 9) {
    setTimeout(startGame, 1000);
  }
}
function computerTurn () {
  var location;

  if (win()) {
    placeMark.call(computer, location);
  } else if (block()) {
    placeMark.call(computer, location);
  } else {
    move ();
    placeMark.call(computer, location);

  }

  function win () {
    for (var i = 0; i < winning.length; i++){
      if (board[winning[i][0]] == computer.mark && board[winning[i][1]] == computer.mark) {
        if (board[winning[i][2]] === '') {
          location = winning[i][2];
          return true;
        }
      }
      else if (board[winning[i][0]] == computer.mark && board[winning[i][2]] == computer.mark) {
        if (board[winning[i][1]] === '') {
          location = winning[i][1];
          return true;
        }
      }
      else if (board[winning[i][1]] == computer.mark && board[winning[i][2]] == computer.mark) {
        if (board[winning[i][0]] === '') {
          location = winning[i][0];
          return true;
        }
      }

    }
  }

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
  }
  function move () {
    function pickAnyOne () {
      let choices = openSpaces([1,2,3,4,5,6,7,8,9],played);
      let index = Math.floor(Math.random() * choices.length);
      location = choices[index];
      if (board[location] !=='' && choices.length !==0){
        pickAnyOne();
      }
    }
    function pickOne () {
      let choices = openSpaces([1,2,2,3,4,4,6,6,7,8,8,9], played);
      let index = Math.floor(Math.random() * choices.length);
      location = choices[index];
      if (board[location] !=='' && choices.length !==0){
        pickOne();
      }
    }
    function openSpaces (set1,set2){
      return set1.filter( item => !set2.includes(item));
    }
    //First Move Response
    if (moveCounter == 1 && player.mark=='x' &&(
      board[1] == player.mark ||
      board[2] == player.mark ||
      board[3] == player.mark ||
      board[4] == player.mark ||
      board[6] == player.mark ||
      board[7] == player.mark ||
      board[8] == player.mark ||
      board[9] == player.mark))
      {
      location=5;
    }
    else if (moveCounter == 1 && board[5] == player.mark) {
      let choices = openSpaces([1,3,7,9],played);
      let index = Math.floor(Math.random() * choices.length);
      location = choices[index];
    }
    else { //other moves
      if (board[5] == computer.mark) {
        pickOne();
      }
      else {
        pickAnyOne();

      }

    }

  }
}



function setUser(j) {
  if (j===0) {
    player.mark = 'x';
    computer.mark = 'o';
  }
  else if (j==1){
    player.mark = 'o';
    computer.mark = 'x';
    computerTurn();
  }

  $("#start").css("visibility", "hidden");
  $("#winner").css("visibility", "hidden");
  $("#startover").css("visibility", "visible");




}

function checkWin(){
  for (var i = 0; i < winning.length; i++){
    if (winning[i].every( (element, array, index) => {return board[element] == player.mark;}   )) {
      $("#winner").css("visibility", "visible");

      $('#winner').html("Player wins!");
      winner =1;
      setTimeout(startGame, 1000);
    }
    else if (winning[i].every( (element, array, index) => {return board[element] == computer.mark;}   )) {
      $("#winner").css("visibility", "visible");
      $('#winner').html("Computer wins!");
      winner =1;
      setTimeout(startGame, 1000);
    }
  }
}
