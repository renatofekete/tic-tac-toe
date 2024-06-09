const gridElement = document.querySelector('.grid')
const headerElement = document.querySelector('header')
const resetElement = document.querySelector('[data-action="reset"]')
const scoreElement = document.querySelector('[data-action="score"]')
const player1Element = document.querySelector('[data-player="1"]')
const player2Element = document.querySelector('[data-player="2"]')

let currentPlayer = 1
let gameEnded = false

let player1 = 'Player 1'
let player2 = 'Player 2'

let player1Score = 0
let player2Score = 0

const X = 'X'
const O = 'O'

let grid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', ''],
]

function loadGame() {
  gridElement.addEventListener('click', onGridElementClick)
  resetElement.addEventListener('click', resetGame)
  createGrid()
  updateScore()
}

function createGrid() {
  gridElement.innerHTML = ''
  grid.forEach((row, rowId) => {
    row.forEach((item, columnId) => {
      const gridItem = document.createElement('div')
      gridItem.dataset.row = rowId
      gridItem.dataset.column = columnId
      gridItem.innerText = item
      gridElement.append(gridItem)
    })
  })
}

function checkIfWon(element) {
  return (
    (grid[0][0] === element &&
      grid[0][1] === element &&
      grid[0][2] === element) ||
    (grid[1][0] === element &&
      grid[1][1] === element &&
      grid[1][2] === element) ||
    (grid[2][0] === element &&
      grid[2][1] === element &&
      grid[2][2] === element) ||
    (grid[0][0] === element &&
      grid[1][0] === element &&
      grid[2][0] === element) ||
    (grid[0][1] === element &&
      grid[1][1] === element &&
      grid[2][1] === element) ||
    (grid[0][2] === element &&
      grid[1][2] === element &&
      grid[2][2] === element) ||
    (grid[0][0] === element &&
      grid[1][1] === element &&
      grid[2][2] === element) ||
    (grid[0][2] === element && grid[1][1] === element && grid[2][0] === element)
  )
}

function checkIfDraw() {
  return !grid[0].includes('') && !grid[1].includes('') && !grid[2].includes('')
}

function playerWin(player) {
  scoreElement.innerText = `${player === 1 ? player1 : player2} won`
  player === 1 ? player1Score++ : player2Score++
}

function checkIfGameEnd() {
  if (checkIfWon(X)) {
    playerWin(1)
  } else if (checkIfWon(O)) {
    playerWin(2)
  } else if (checkIfDraw()) {
    scoreElement.innerText = 'TIE'
  } else {
    return
  }
  gameEnded = true
  updateScore()
}

function updateScore() {
  player1Element.innerHTML = `${player1} score: ${player1Score}`
  player2Element.innerHTML = `${player2} score: ${player2Score}`
}

function resetGame() {
  grid = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]
  createGrid()
  gameEnded = false
  currentPlayer = 1
  updateScore()
  scoreElement.innerHTML = ''
}

function onGridElementClick(e) {
  if (!grid[e.target.dataset.row][e.target.dataset.column] && !gameEnded) {
    grid[e.target.dataset.row][e.target.dataset.column] =
      currentPlayer === 1 ? X : O
    currentPlayer = currentPlayer === 1 ? 2 : 1
    createGrid()
    checkIfGameEnd()
  }
}

loadGame()
