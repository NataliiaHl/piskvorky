let currentPlayer = 'circle';

const elements = document.querySelectorAll('.game_button')

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
};
const changePlayer = () => {
    if (currentPlayer === 'circle') {
        currentPlayer = 'cross'
    } else if (currentPlayer === 'cross') {
        currentPlayer = 'circle'
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


