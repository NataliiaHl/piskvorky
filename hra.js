import { findWinner } from 'https://unpkg.com/piskvorky@0.1.4'

let currentPlayer = 'circle';

const elements = document.querySelectorAll('.game_button')

const signs = document.querySelectorAll('.game_button span')

const changeSing = (event) => {
    if (currentPlayer === 'circle') {
        event.target.querySelector('span').classList.add('game_field--circle', 'zoom-in')
        document.querySelector('.player span').classList.add('cross')
        document.querySelector('.player span').classList.remove('circle')
    } else if (currentPlayer === 'cross') {
        event.target.querySelector('span').classList.add('game_field--cross', 'zoom-in')
        document.querySelector('.player span').classList.remove('cross')
        document.querySelector('.player span').classList.add('circle')
    }
    event.target.disabled = true;
    changePlayer()
    signsBox()
};

const changePlayer = () => {
    if (currentPlayer === 'circle') {
        currentPlayer = 'cross'
    } else if (currentPlayer === 'cross') {
        currentPlayer = 'circle'
    }
}

const signsBox = () => {
    const gameArray = Array.from(signs).map((sign) => {
        if (sign.classList.contains('game_field--circle')) {
            return 'o'
        } else if (sign.classList.contains('game_field--cross')) {
            return 'x'
        } 
        
        return '_'
    })

    const winner = findWinner(gameArray)

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
        }, 200);
    }
}

elements.forEach((item) => {
    item.addEventListener('click', changeSing)
})

const confirmFunction = (event) => {
   const restart = confirm('Opravdu chceš začít znovu?')
   if (restart === false) {
        event.preventDefault()
   }
}
document.querySelector('.menu_button_restart').addEventListener('click', confirmFunction)






