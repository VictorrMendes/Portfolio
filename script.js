const downloadButton = document.querySelector('#butao');
const box = document.querySelector('.box');

//lamapada
const lamp = document.querySelector('#lamp img')
const semafaro = document.querySelector('#semafaro_img')

//botão
downloadButton.addEventListener('mouseover', function baixar(){
    box.style.display = 'block';
},);
downloadButton.addEventListener('mouseout', function baixar(){
    box.style.display = 'none';
},);

//eventos

// lampada
lamp.addEventListener('mouseover', acender);
lamp.addEventListener('mouseout', apagar);

//semafaro
semafaro.addEventListener('mouseout', vermelho);

semafaro.addEventListener('mouseover', verde);

//funções

//função lampada
function acender() {
    lamp.src ="./imagem/lampOn.jpeg"
}
function apagar() {
    lamp.src ="./imagem/lampOff.jpeg"
}

//função semafaro
function verde() {
    semafaro.src ="./imagem/luz(1).jpeg";
}
function vermelho() {
    semafaro.src ="./imagem/luz(3).jpeg"
}

//particulas

particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 188,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 130,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 5.017060304327615,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

var count_particles, stats, update;

stats = new Stats();
stats.setMode(0);
stats.domElement.style.position = 'absolute';
stats.domElement.style.left = '0px';
stats.domElement.style.top = '0px';
document.body.appendChild(stats.domElement);

count_particles = document.querySelector('.js-count-particles');

update = function() {
  stats.begin();
  stats.end();
  if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
    count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
  }
  requestAnimationFrame(update);
};

requestAnimationFrame(update);