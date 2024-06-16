function CreateGameManager(){
    let players = [CreatePlayer("Player1","X"),CreatePlayer("Player2","O")]
    let turn = players[0]
    let changeTurn = () => turn = turn.name==="Player1"?players[1]:players[0]
    let gameBoard = CreateGameBoard()
    let resetGame = () =>{
        gameBoard = CreateGameBoard();
        turn = players[0]
        addEventListeners()
    }

    let winConditionCheck = () => {
        let tempArray = gameBoard.gameArray;
        let winner = "";
        tempArray.forEach(x=>{
            if(x.every(a=> a !==null && a.textContent !== "" && a.textContent === x[0].textContent)){
                if(x[0].textContent === players[0].sign)
                    winner = "Player1"
                else if(x[0].textContent === players[1].sign)
                    winner = "Player2"
            }
        })
        let array = []

        for (let i = 0;i<3;i++){
            array = []
            for (let j = 0;j<3;j++){
                array.push(tempArray[j][i].textContent)
            }
            if(array.every(x=> x === tempArray[0][i].textContent)){
                if(tempArray[0][i].textContent === players[0].sign)
                    winner = "Player1"
                else if(tempArray[0][i].textContent === players[1].sign)
                    winner = "Player2"
            }
        }

        array = []

        for (let i = 0;i<3;i++)
            array.push(tempArray[i][i].textContent)


        if(array.every(x=> x === tempArray[0][0].textContent)){
            if(tempArray[0][0].textContent === players[0].sign)
                winner = "Player1"
            else if(tempArray[0][0].textContent === players[1].sign)
                winner = "Player2"
        }

        array = []
        for (let i = 0;i<3;i++)
            array.push(tempArray[i][2-i].textContent)

        if(array.every(x=> x === tempArray[0][2].textContent)){
            if(tempArray[0][2].textContent === players[0].sign)
                winner = "Player1"
            else if(tempArray[0][2].textContent === players[1].sign)
                winner = "Player2"
        }

        if(winner !== ""){
            alert(`${winner} won!`)
            resetGame()
        }
        else{
            array = []
            for (let i = 0;i<3;i++){
                for (let j = 0;j<3;j++){
                    array.push(tempArray[i][j].textContent)
                }
            }
            if(array.every(x=>x !== "")){
                alert(`Draw!`)
                resetGame()
            }
        }







    }
    let addEventListeners = ()=>{
        for (let i = 0;i<3;i++){
            for(let j = 0 ; j< 3;j++){
                let newObj = gameBoard.gameArray[i][j]
                newObj.addEventListener("click",function handler(){
                    if(!newObj.classList.contains("not-selected"))
                        newObj.removeEventListener("click",handler)
                    else{
                        newObj.firstElementChild.textContent = turn.sign
                        winConditionCheck()
                        changeTurn();
                        newObj.classList.remove("not-selected")
                    }
                })
                newObj.addEventListener("mouseenter",function handler() {
                    if(!newObj.classList.contains("not-selected"))
                        newObj.removeEventListener("mouseenter",handler)
                    else
                        newObj.firstElementChild.textContent = turn.sign
                })
                newObj.addEventListener("mouseleave",function handler(){
                    if(!newObj.classList.contains("not-selected"))
                        newObj.removeEventListener("mouseleave",handler)
                    else
                        newObj.firstElementChild.textContent = ""
                })
            }
        }
    }
    addEventListeners()

    return {gameBoard,players,turn,changeTurn}
}


function CreatePlayer(name,sign){
    return {name,sign}
}

function CreateGameBoard(){
    let gameArray = [[null,null,null],[null,null,null],[null,null,null]]
    let gameContainer = document.querySelector(".game-container")
    let body = document.querySelector("body")
    if(gameContainer)
        body.removeChild(gameContainer)
    gameContainer = document.createElement("div")
    gameContainer.classList.add("game-container")
    for (let i = 0;i < 9 ;i++){
        let newObj = document.createElement("div")
        newObj.classList.add("item")
        newObj.classList.add("not-selected")
        newObj.appendChild(document.createElement("div"))
        gameContainer.appendChild(newObj);
        body.appendChild(gameContainer)
        gameArray[Math.floor(i/3)][i%3] = newObj
    }
    return {gameArray}
}





CreateGameManager();

