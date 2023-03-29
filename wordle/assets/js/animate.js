let columns = 10;
let rows = 10;

let wrapper = document.querySelector('#tile-container');

const createTile = index => {
    const tile = document.createElement('div');

    tile.classList.add('tile');
    return tile;
}

const createTiles = quantity => {
    Array.from(Array(quantity)).map((tile, index) => {
        wrapper.appendChild(createTile(index));
    })
}

const createGrid = () => {
    wrapper.innerHTML = '';

    columns = Math.floor(document.body.clientWidth / 50);
    rows = Math.floor(document.body.clientHeight / 50);

    wrapper.style.setProperty('--columns', columns);
    wrapper.style.setProperty('--rows', rows);

    createTiles(rows * columns);
}

const colors = [
    'rgb(229,)'
]

const animate = () => {
    anime({
      targets: ".tile",
      translateY: function (el, i) {
        return 10;
      },
      scale: 1,
      rotate: function () {
        return anime.random(-360, 360);
      },
      borderRadius: function () {
        return ["50%", anime.random(10, 35) + "%"];
      },
      duration: function () {
        return anime.random(1200, 1800);
      },
      delay: function () {
        return anime.random(0, 400);
      },
      direction: "alternate",
      loop: true,
      backgroundColor: function() {
        return `rgba(${anime.random(0, 10)}, ${anime.random(100, 255)}, ${anime.random(50, 175)}, 0.1)`
      }
    });
}



window.onresize = () => createGrid();

createGrid();

