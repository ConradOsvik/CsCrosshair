const imgInput = document.querySelector('#imgInput');
const descriptionInput = document.querySelector('#descriptionInput');
const crosshairInput = document.querySelector('#crosshairInput');
const sendButton = document.querySelector('#sendButton');

const db = firebase.firestore();
const crosshairs = db.collection('crosshairs');

const time = new Date();
const timeMS = time.getTime();
const timeMSString = timeMS.toString();

sendButton.addEventListener('click', e => {
    if(imgInput.value === '' || descriptionInput.value === '' || crosshairInput.value === ''){
        alert('Fields are empty')
    } else{
        crosshairs.doc(timeMSString).set({
            img: imgInput.value,
            desc: descriptionInput.value,
            crosshair: crosshairInput.value,
            likeCount: Number(0)
        });
        imgInput.value = '';
        descriptionInput.value = '';
        crosshairInput.value = '';
    }
});

const displayDB = document.querySelector('.displayDB');