import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle';

const fields = document.querySelectorAll('.game_button')

const signs = document.querySelectorAll('.game_button span')

const gameArray = () => {
    return Array.from(signs).map((sign) => {
        if (sign.classList.contains('game_field--circle')) {
            return 'o'
        } else if (sign.classList.contains('game_field--cross')) {
            return 'x'
        } 
        
        return '_'
    })
} 

const disableAllFields = () => {
    fields.forEach(field => field.disabled = true)
}

const enableEmptyFields = () => {
    fields.forEach(field => {
        field.disabled = field.querySelector('span').classList.contains('game_field--circle')
        || field.querySelector('span').classList.contains('game_field--cross')
    })
}

const crossMove = () => {
    disableAllFields()

    currentPlayer = 'cross'
   
    fetch('https://piskvorky.czechitas-podklady.cz/api/suggest-next-move', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify({
            board: gameArray(),
            player: 'x', 
            }),
    })
        .then((response) => response.json())
        .then((data) => {
            enableEmptyFields()
                const { x, y } = data.position 
                const index = x + y * 10
                fields[index].click()
                

        })
        
}

const changeSing = (event) => {
    
    if (currentPlayer === 'circle') {
        
        event.target.querySelector('span').classList.add('game_field--circle', 'zoom-in')
        document.querySelector('.player span').classList.add('cross')
        document.querySelector('.player span').classList.remove('circle')
        crossMove()

    } else if (currentPlayer === 'cross') {

        currentPlayer = 'circle'
        event.target.querySelector('span').classList.add('game_field--cross', 'zoom-in')
        document.querySelector('.player span').classList.remove('cross')
        document.querySelector('.player span').classList.add('circle')
    }

    event.target.disabled = true
    myFindWinnerFunction()
};

const myFindWinnerFunction = () => {

    const winner = findWinner(gameArray())

    if (winner === 'x') {
        setTimeout(() => {
          alert('Vyhrál křížek!')
          location.reload()
        }, 200)
    } else if (winner === 'o') {
        setTimeout(() => {
          alert('Vyhrálo kolečko!')
          location.reload()
        }, 200)
    } else if (winner === 'tie') {
        setTimeout(() => {
          alert('Hra skončila nerozhodně.')
          location.reload() 
        }, 200)
    }
}

fields.forEach((field) => {
    field.addEventListener('click', changeSing)
})

const confirmFunction = (event) => {
   
   if (!confirm('Opravdu chceš začít znovu?')) {

        event.preventDefault()
    }
}

document.querySelector('.menu_button_restart').addEventListener('click', confirmFunction)