const socket = io('http://localhost:8000');


const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp')
const messageContainer = document.querySelector(".container")

var audio = new Audio('42523_download_thinkk_ringtone_apple_sms_ringtones.mp3');



const append = (message,position)=>{
     const messageElement = document.createElement('div');
     messageElement.innerText = message;
     messageElement.classList.add('message');
     messageElement.classList.add(position);
     messageContainer.append(messageElement);
     if(position=='left'){
         audio.play();
     }
     
}

form.addEventListener('submit', (e)=>{
  
     e.preventDefault();
     
     const message = messageInput.value;
    append(`"You": ${message}`, 'right');
    append(document.getElementById("time2").innerHTML=Date(),'right');
    scrolltobottom();
    socket.emit('send', message);
    messageInput.value = ''
    document.getElementById('btn').disabled=true;
})
function success(){
    if(document.getElementById("messageinp").value==""){
        document.getElementById('btn').disabled=true;
    }
    else{
        document.getElementById('btn').disabled=false;
    }
    }
const name = prompt("Enter your name to join");
append('"You" joined', 'right');
socket.emit('new-user-joined', name);
socket.on('user-joined', name=>{
     append(`"${name}" joined the chat`, 'left')
     scrolltobottom();
})
socket.on('receive', data=>{
    append(`"${data.name}": ${data.message}`, 'left')
   
    append(document.getElementById("time").innerHTML=Date(),'left');
    scrolltobottom();
})
socket.on('left', name=>{
    append(`"${name}" left the chat`, 'left')
    scrolltobottom();
})
function scrolltobottom(){
    messageContainer.scrollTop=messageContainer.scrollHeight;
}
