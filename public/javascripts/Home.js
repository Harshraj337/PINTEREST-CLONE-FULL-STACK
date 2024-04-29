
function change(){
    let changeText=document.querySelector('.txt')
    let sliderBtn=document.querySelector('#btn2')
    changeText.innerHTML='Chai Time snacks idea'
    changeText.style.color='orange'
    changeText.style.fontSize='40px'

}
function change2(){
    let changeText=document.querySelector('.txt')
    let sliderBtn=document.querySelector('#btn3')
    changeText.innerHTML='Home decor idea'
    changeText.style.color='Blue'
    changeText.style.fontSize='40px'
}
function change1(){
    let changeText=document.querySelector('.txt')
    let sliderBtn=document.querySelector('#btn1')
    changeText.innerHTML='outfit your idea'
    changeText.style.color='#518C7B'
}

// .......................popup........................
function Hover(){
    let buttonC=document.getElementsByClassName('btn1')
    let hoverC=document.getElementById('popup')
    hoverC.style.display = "flex";
}
document.querySelector(".close").addEventListener("click", function(){
    document.querySelector("#popup").style.display = "none"
})
// ..............................................popup1...............................
function Hover1(){
    let buttonC=document.getElementsByClassName('btn2')
    let hoverC=document.getElementById('popup-1')
    hoverC.style.display = "flex";
}
document.querySelector(".close1").addEventListener("click", function(){
    document.querySelector("#popup-1").style.display = "none"
})