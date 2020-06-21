const db = firebase.firestore();
const crosshairs = db.collection('crosshairs');

const displayDB = document.querySelector('.displayDB');

const getCrosshairs = async () => {
    displayDB.innerHTML = '';
    const ans = await crosshairs.get();
    for(const crosshair of ans.docs){
        createHTML(crosshair.id, crosshair.data());
    }
}

getCrosshairs();

const createHTML = (id, data) => {
    displayDB.innerHTML += `
        <div class="crosshair-container">
            <img src="${data.img}" alt="missing img">
            <h3>Description</h3>
            <p>${data.desc}</p>
            <h3>Crosshair Code:</h3>
            <p>${data.crosshair}</p>
        </div>
    `;
}