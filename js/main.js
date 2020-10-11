'use strict';

console.log('Lets Play')

var gSize;
var gLastNumber;
var gTimerInterval;
var gNums;
var gBoard;
var gGameToggle = false;

function levelClicked(elBtn) {
    if (!gGameToggle) {
        var dataSet = elBtn.dataset;
        gSize = +dataSet.level;
        gLastNumber = gSize ** 2;
        init();
    }
}

function init() {
    gNums = createNums(gSize);
    gBoard = createGameBoard();
    renderGameBoard();
}

function createNums(size) {
    var nums = [];
    for (var i = 0; i < size ** 2; i++) {
        nums[i] = i + 1;
    }
    return nums;
}

function renderGameBoard() {
    var htmlStr = '';
    for (var i = 0; i < gSize; i++) {
        htmlStr += '<tr>';
        for (var j = 0; j < gSize; j++)
            htmlStr += '<td  onclick="cellClicked(this)" class="unclicked" data-value="' + gBoard[i][j] + '">' + gBoard[i][j] + '</td>';
    }
    htmlStr += '</tr>';

    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = htmlStr;
}

function cellClicked(elTd) {
    var dataSet = elTd.dataset;
    var num = +dataSet.value;
    if (num === 1 && !gGameToggle) startTime();
    if (gNums[0] === gLastNumber && num === gLastNumber) stopTimer();
    if (num === gNums[0]) {
        console.log(gNums[0]);
        console.log(num);
        console.log(gLastNumber);
        gNums.shift();
        elTd.classList.add('clicked');
        elTd.classList.remove('unclicked');
    }
}

function createGameBoard() {
    var nums = gNums.slice();
    var board = [];
    for (var i = 0; i < gSize; i++) {
        board[i] = [];
        for (var j = 0; j < gSize; j++) {
            var randomIdx = getRndInteger(0, nums.length - 1);
            board[i][j] = nums[randomIdx];
            nums.splice(randomIdx, 1);
        }
    }
    return board;
}

function startTime() {
    gGameToggle = true;
    var startTime = new Date();
    gTimerInterval = setInterval(function () {
        var currTime = new Date();
        var seconds = (currTime - startTime) / 1000;
        var elTimer = document.querySelector('.timer');
        elTimer.innerText = seconds;
    }, 100)
}

function stopTimer() {
    clearInterval(gTimerInterval);
    // var elTitle = document.querySelector('.title');
    // elTitle.innerText = 'Your score is:';
    var elTimer = document.querySelector('.timer');
    elTimer.style.color = '#664C55';
    setTimeout(function () { elTimer.style.color = 'white' }, 1000);
    showRestartBtn();
}

function showRestartBtn(){
    var elRestartBtn = document.querySelector('.restart');
    elRestartBtn.innerHTML = '<button class="btn" onclick="restartGame()" >RESTART</button>';
}

function restartGame(){
    gGameToggle=false;
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = '';
    var elRestartBtn = document.querySelector('.restart');
    elRestartBtn.innerHTML = '';
    var elTimer = document.querySelector('.timer');
    elTimer.innerText = '0:000';
}


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

