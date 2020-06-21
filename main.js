const db = firebase.firestore();
const crosshairs = db.collection('crosshairs');

const displayDB = document.querySelector('.displayDB');

crosshairs.onSnapshot(snap => {
    for(const ans of snap.docChanges()){
        if(ans.type === "added"){
            displayDB.innerHTML += `
                <div class="crosshair-container" id="${ans.doc.id}">
                    <div class="more-box">
                        <span onclick="showMore(this)" class="material-icons dropdownBtn">more_vert</span>
                        <div id="dropdown" class="more-box-dropdown">
                            <a>
                                <span class="material-icons">content_copy</span><span>Copy</span>                    
                            </a>
                            <a onclick="likeCrosshair(${ans.doc.id})">
                                <span class="material-icons">whatshot</span><span>Like</span>                    
                            </a>
                        </div>
                    </div>
                    <img src="${ans.doc.data().img}" alt="missing img">
                    <h3>Description</h3>
                    <p>${ans.doc.data().desc}</p>
                    <h3>Crosshair Code:</h3>
                    <p>${ans.doc.data().crosshair}</p>
                    <h3>Likes:</h3>
                    <div class="likes-box">
                        <span class="material-icons">whatshot</span>
                        <p>${ans.doc.data().likeCount}</p>            
                    </div>
                </div>
            `;
        }
        else if(ans.type === "modified"){
            let docItem = document.getElementById(ans.doc.id)
            if(docItem){
                docItem.innerHTML = `
                    <div class="more-box">
                        <span onclick="showMore(this)" class="material-icons dropdownBtn">more_vert</span>
                        <div id="dropdown" class="more-box-dropdown">
                            <a>
                                <span class="material-icons">content_copy</span><span>Copy</span>                    
                            </a>
                            <a>
                                <span class="material-icons" onclick="likeCrosshair(${ans.doc.id})">whatshot</span><span>Like</span>                    
                            </a>
                        </div>
                    </div>
                    <img src="${ans.doc.data().img}" alt="missing img">
                    <h3>Description</h3>
                    <p>${ans.doc.data().desc}</p>
                    <h3>Crosshair Code:</h3>
                    <p>${ans.doc.data().crosshair}</p>
                    <h3>Likes:</h3>
                    <div class="likes-box">
                        <span class="material-icons">whatshot</span>
                        <p>${ans.doc.data().likeCount}</p>            
                    </div>
                `
            }
        }
    }
});

const showMore = function(target) {
    target.parentNode.querySelector('.more-box-dropdown').classList.toggle("show");
}
  
window.onclick = function(event) {
    if (!event.target.matches('.dropdownBtn')) {
        var dropdowns = document.getElementsByClassName("more-box-dropdown");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
        }
        }
    }
}

const likeCrosshair = async (id) => {
    const doc = await crosshairs.doc(id.toString()).get()
    const likeCount = doc.data().likeCount;
    const newLikeCount = likeCount + 1;
    console.log(newLikeCount);
    crosshairs.doc(id.toString()).update({
        likeCount: newLikeCount
    })
}