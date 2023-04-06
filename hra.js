let currentPlayer = 'circle';

const elements = document.querySelectorAll('.game_button');

const changeSing = (event) => {
    if (currentPlayer === 'circle') {
        event.target.querySelector('span').classList.add('game_field--circle')
        document.querySelector('.player span').classList.add('cross')
        document.querySelector('.player span').classList.remove('circle')
    } else if (currentPlayer === 'cross') {
        event.target.querySelector('span').classList.add('game_field--cross')
        document.querySelector('.player span').classList.remove('cross')
        document.querySelector('.player span').classList.add('circle')
    }
    event.target.disabled = true;
    changePlayer()
};
const changePlayer = () => {
   console.log(currentPlayer)
    if (currentPlayer === 'circle') {
        currentPlayer = 'cross'
    } else if (currentPlayer === 'cross') {
        currentPlayer = 'circle'
    }
}

elements.forEach((item) => {
    item.addEventListener('click', changeSing)
})


