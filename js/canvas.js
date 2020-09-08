
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const ctrcolor = document.querySelector('.controller_colors');
const brush = document.querySelector('.brush_range input');
const modeButton = document.querySelector('#btnModejs');
const savebtn = document.getElementById('btnSaveJs');
const clearbtn = document.getElementById('clearJS');

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = 'white';
ctx.fillRect(0,0,canvas.width, canvas.height);

ctx.strokeStyle = 'black';
ctx.fillStyle = 'black';
ctx.lineWidth = 2.5;

// ctx fillRect : x, y, width, height

let painting = false;
let modeIsFill = false;

function startPainting(){ painting = true; }
function stopPainting(){ painting = false; }

function mouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }
    else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function clickCanvas(){
    console.log(modeIsFill);
    if(modeIsFill){
        console.log(ctx.fillStyle);
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
}

function rightClickCanvas(event){
    event.preventDefault();
    alert('우클릭 금지 ^^');
}

if(canvas){
    // 캔버스에서의 offset 구하기
    canvas.addEventListener('mousemove', mouseMove);
    // mousedown : click 했을때 발생하는 이벤트, 
    canvas.addEventListener('mousedown', startPainting);
    canvas.addEventListener('mouseup', stopPainting);
    // 마우스가 down상태에서 캔버스 밖으로 벗어날때
    canvas.addEventListener('mouseleave', stopPainting);
    // 마우스를 click 하면 fillRect를 만들어둠
    canvas.addEventListener('click', clickCanvas);
    canvas.addEventListener('contextmenu', rightClickCanvas);
}

function init_color(){
    // Array.from 으로 childNode를 배열로 읽어올 수 있다( **사용해보기 )
    ctrcolor.childNodes.forEach(res => {
        res.addEventListener('click', () => {
            ctx.strokeStyle = res.style.backgroundColor;
            ctx.fillStyle = res.style.backgroundColor;
        });
    })
}

function changeBrush(event){
    ctx.lineWidth = event.target.value;
}

function init_brush(){
    brush.addEventListener('input', changeBrush);
}

function changeButton(event){
    if(modeIsFill){
        modeIsFill = false;
        event.target.innerText = 'Fill Off';
    }
    else{
        modeIsFill = true;
        event.target.innerText = 'Fill On';
    }
}

function saveimg(){
    const canvasImg = canvas.toDataURL('image/png');
    const LINK = document.createElement("a");
    LINK.href = canvasImg;
    LINK.download = 'New Painting';
    LINK.click();
}

function init(){
    init_color();
    init_brush();

    modeButton.addEventListener('click', changeButton);
    savebtn.addEventListener('click', saveimg);
    clearbtn.addEventListener('click', () => {
        window.location.reload();
    })
}

init();