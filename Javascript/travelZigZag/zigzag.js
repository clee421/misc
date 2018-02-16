class Position {
  constructor(start, width, height) {
    this.row = start[0]
    this.col = start[1]
    this.bounds = {
      left: 0,
      top: 0,
      right: width - 1,
      bottom: height -1
    }
    
    this.render = (data) => {
      console.log(data)
    }
  }
  
  setRender(render) {
    this.render = render
  }
  
  hasSpace() {
    return this.bounds.left <= this.bounds.right
  }
  
  goDown() {
    if(!this.hasSpace()) return
    
    console.log("Going down!")
    while(this.row + 1 <= this.bounds.bottom) {
      this.row++
      this.render([this.row, this.col])
    }
    
    this.bounds.left++
  }
  
  goRight(step) {
    if(!this.hasSpace()) return
    
    console.log("Going right!")
    for(let i = 0; i < step; i++) {
      this.col++
      this.render([this.row, this.col])
    }
  }
  
  goUp() {
    if(!this.hasSpace()) return
    
    console.log("Going up!")
    while(this.row - 1 >= this.bounds.top) {
      this.row--
      this.render([this.row, this.col])
    }
    
    this.bounds.left++
  }
}

console.reset = function() {
  return process.stdout.write("\x1B[2J");
}

const travelZigZag = (start, width, height, render = null) => {
  const pos = new Position(start, width, height)
  if (render !== null) {
    pos.setRender(render)
  }
  
  console.log("Starting!")
  pos.render([pos.row, pos.col])
  
  while (pos.hasSpace()) {
    pos.goDown()
    pos.goRight(1)
    pos.goUp()
    pos.goRight(1)
  }
}

const render = (width, height) => {
  let board = Array(height).fill(null)
  board = board.map( el => Array(width).fill(null) )
  
  return (pos) => {
    let r = pos[0]
    let c = pos[1]
    board[r][c] = "X"
    
    console.reset()
    board.forEach( row => {
      let rowArr = []
      row.forEach( p => {
        if (p === null) rowArr.push("_")
        if (p !== null) rowArr.push(p)
      })
      let str = rowArr.join(" ")
      console.log(str)
    })
  }
}

const width = 10
const height = 10
const renderBoard = render(width, height)

travelZigZag([0, 0], width, height, renderBoard)