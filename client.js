// const io = require("socket.io-client");
const socket=io('http://localhost:8000');
const form=document.getElementById('send-container')
const messageInp=document.getElementById('messageInp')
const container=document.querySelector('.container')
const audio=new Audio('notification_tune.mp3')
// const autoscroll=()=>{
// container.scrollTop=container.scrollHeight;
// }

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message=messageInp.value;
    append(`You: ${message}`,'right')
    socket.emit('send',message);
    messageInp.value='';
})

const append= (message,position)=>{
    const newuser=document.createElement('div');
    newuser.innerText=message;
    console.log(newuser.innerText);
    newuser.classList.add('message');
    newuser.classList.add(position);
    container.append(newuser);
    // autoscroll();
    if(position=='left' || position=='center'){
        audio.play();
    }
}

const namee=prompt('Enter your name to join:');
socket.emit('new-user-joined',namee);

socket.on('user-joined',namee=>{
console.log('inside user-joined');
    append(`${namee} joined the chat` , 'center')
})

socket.on('recieve',data=>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left',name=>{
    append(`${name} left the chat`, 'center')
})