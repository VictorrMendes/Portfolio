const downloadButton = document.querySelector('#butao');
const box = document.querySelector('.box');

const lamp = document.querySelector('#lamp img')

downloadButton.addEventListener('mouseover', function baixar(){
    box.style.display = 'block';
},);
downloadButton.addEventListener('mouseout', function baixar(){
    box.style.display = 'none';
},);

lamp.addEventListener('mouseout', acender);

function acender() {
    lamp.src ="./imagem/lampOn.jpeg"

}
