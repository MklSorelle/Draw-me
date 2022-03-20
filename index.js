// ----------------------------------------------------------affectation couleur --------------------------------------------------

function changerCouleurRectangle(e) {
    couleurs = ["turquoise", "red", "yellow", "purple", "black", "pink", "blue", "grey", "brown", "Navy blue", "Golden", "Orange", "Beige", "Magenta", "Salmon"]

    // Aleatoire
    const aleatoire0a1 = Math.random();
    const aleatoire0a2 = aleatoire0a1 * 15;
    const choix = Math.floor(aleatoire0a2)
    Divcolor = e.target;
    Divcolor.style.backgroundColor = couleurs[choix];
}

function changerCouleurCircle(e) {
    couleurs = ["turquoise", "red", "yellow", "purple", "black", "pink", "blue", "grey", "brown", "Navy blue", "Golden", "Orange", "Beige", "Magenta", "Salmon"]

    // Aleatoire
    const aleatoire0a1 = Math.random();
    const aleatoire0a2 = aleatoire0a1 * 15;
    const choix = Math.floor(aleatoire0a2)
    Divcolor = e.target;
    Divcolor.style.backgroundColor = couleurs[choix];
}

function changerCouleurTriangle(e) {
    couleurs = ["turquoise", "red", "yellow", "purple", "black", "pink", "blue", "grey", "brown", "Navy blue", "Golden", "Orange", "Beige", "Magenta", "Salmon"]

    // Aleatoire
    const aleatoire0a1 = Math.random();
    const aleatoire0a2 = aleatoire0a1 * 15;
    const choix = Math.floor(aleatoire0a2)
    Divcolor = e.target;
    Divcolor.style.borderBottomColor = couleurs[choix];
}

function changerCouleurText(e) {
    couleurs = ["turquoise", "red", "yellow", "purple", "black", "pink", "blue", "grey", "brown", "Navy blue", "Golden", "Orange", "Beige", "Magenta", "Salmon"]

    // Aleatoire
    const aleatoire0a1 = Math.random();
    const aleatoire0a2 = aleatoire0a1 * 15;
    const choix = Math.floor(aleatoire0a2)
    Divcolor = e.target;
    Divcolor.style.color = couleurs[choix];
}
// créer la div qui génére le rectangle à partir de js
const BtnAddRect = document.querySelector("#btn_rect");
const zone_dessin = document.getElementById("zone_dessin");
const BtnSave = document.getElementById("btnSave");

// ----------------------------------------------------------fonction Sauvegarde --------------------------------------------------


BtnSave.addEventListener("click", function() {

    console.log('début de sauvegarde');
    const monCode = zone_dessin.innerHTML;
    console.log(monCode);
    const requete = new XMLHttpRequest;
    // programmation évenementielle
    requete.addEventListener(
        'readystatechange',
        () => {
            console.log('readyState => ${requete.readyState}');
            if (requete.readyState === 4 && requete.readyState === XMLHttpRequest.DONE && requete.status === 200) {
                console.log(requete.responseText);
            }
        }
    );

    // le programme de la requete est dans l'URI
    const uri = '/Site_Draw_me/codeSave.php';

    //le true demande une requete asynchrone
    // c'est la valeur par défaut
    //je le met mais pas obligé
    // on utilise post pour plus de taille
    requete.open('POST', uri, true);
    // formData comme si c'était des doonnée envoyé par une formulaire
    const formData = new FormData();
    // je donne un nom a ma variable
    formData.append("monCode", monCode);

    requete.send(formData);
    console.log('Fin');
});

// chargement du dessin
function functload() {
    let requete = new XMLHttpRequest()
    requete.open("GET", "/Site_Draw_me/load.php", false)
    requete.send()

    let monCode = requete.response

    zone_dessin.innerHTML = ''
    zone_dessin.innerHTML = monCode
}
// exporter en PDF
function functExportPDF() {
    var printWindow = window.open('', '', 'height=400,width=800');
    printWindow.document.write('<html><head><title>Zone Dessin</title>');
    printWindow.document.write('</head><body >');
    printWindow.document.write(zone_dessin.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

// exporter en png avec HTML2Canvas
function doCapture() {
    window.scrollTo(0, 0);

    html2canvas(document.getElementById("zone_dessin")).then(function(canvas) {

        // Create an AJAX object
        var ajax = new XMLHttpRequest();

        // Setting method, server file name, and asynchronous
        ajax.open("POST", "save-capture.php", true);

        // Setting headers for POST method
        ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Sending image data to server
        ajax.send("image=" + canvas.toDataURL("image/png", 0.9));

        // Receiving response from server
        // This function will be called multiple times
        ajax.onreadystatechange = function() {

            // Check when the requested is completed
            if (this.readyState == 4 && this.status == 200) {

                // Displaying response from server
                console.log(this.responseText);
            }
        };
    });
}





// -----------------------------------------------------créer rectangle ---------------------------------------------------------------
function AddNewRect() {
    const DivRect = document.createElement("div");
    DivRect.id = 'resize';
    const DivResizeRect = document.createElement("div");
    DivResizeRect.id = 'resizable';
    DivRect.appendChild(DivResizeRect);
    zone_dessin.appendChild(DivRect);

    DivRect.style.position = 'absolute';
    DivRect.style.width = '130px';
    DivRect.style.height = '130px';
    DivRect.style.border = '1px solid rgb(63, 63, 65)';
    DivRect.style.backgroundColor = 'rgb(146, 145, 145, .5)';

    DivResizeRect.style.width = '5px';
    DivResizeRect.style.height = '5px';
    DivResizeRect.style.borderRadius = '1px';
    DivResizeRect.style.backgroundColor = 'rgb(81, 83, 83)';
    DivResizeRect.style.cursor = 'n-resize';

    DivRect.addEventListener('dblclick', delforme);
    DivRect.addEventListener('click', changerCouleurRectangle);

    DivResizeRect.addEventListener('mousedown', initialiseResizeRect, false);
    DivRect.addEventListener("mousedown", mousedown);


}
BtnAddRect.addEventListener("click", AddNewRect);



let redimensionnement;

function initialiseResizeRect(e) {
    redimensionnement = e.target.parentNode;
    window.addEventListener('mousemove', startResizingRect, false);
    window.addEventListener('mouseup', stopResizingRect, false);
}

function stopResizingRect(e) {
    window.removeEventListener('mousemove', startResizingRect, false);
    window.removeEventListener('mouseup', stopResizingRect, false);
}

function startResizingRect(e) {
    const DivRect = redimensionnement;
    DivRect.style.width = (e.clientX) + 'px';
    DivRect.style.height = (e.clientY) + 'px';
}

function startResizingRect(e) {
    const DivRect = redimensionnement;
    DivRect.style.width = (e.clientX - DivRect.offsetLeft) + 'px';
    DivRect.style.height = (e.clientY - DivRect.offsetTop) + 'px';
}


let isResizing = false;
let deplacement;

function mousedown(e) {
    deplacement = e.target;
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {
        const DivRect = deplacement;
        if (!isResizing) {
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            const rect = DivRect.getBoundingClientRect();
            //limites
            const limites = document.querySelector('#zone_dessin').getBoundingClientRect()
                // se limiter aux bordures de la zone de travail;
            console.log("left")
            console.log(rect.left - newX)
            console.log("top")
            console.log(rect.top - newY)
            console.log("bottom")
            console.log(rect.bottom - newY)
            console.log("right")
            console.log(rect.bottom - newX)

            // Calcul des positions
            let positiontop = rect.top - newY;
            let positionleft = rect.left - newX;
            let positionright = rect.right - newX;

            if (positionleft < limites.left) {
                positionleft = limites.left;
            } else if (positionright > limites.right) {
                positionleft = limites.right - rect.width;

            }


            let positionbottom = rect.bottom - newY;

            if (positiontop < limites.top) {
                positiontop = limites.top;
            } else if (positionbottom > limites.bottom) {
                positiontop = limites.bottom - rect.height;
            }


            DivRect.style.left = rect.left - newX + "px";
            DivRect.style.top = rect.top - newY + "px";

            prevX = e.clientX;
            prevY = e.clientY;
        }
    }

    function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
    }
}




//---------------------------------------------------CERCLE---------------------------------------------------------------------------

// créer la div qui génére le cercle à partir de js


const BtnAddCircle = document.querySelector("#btn_circle");

function AddNewCircle() {
    const DivCircle = document.createElement("div");
    DivCircle.id = 'resizeCircle';

    // affiche moi le resize lorsque je click sur le DivCircle
    const DivResizeCircle = document.createElement("div");
    DivResizeCircle.id = 'resizableCircle';
    DivCircle.appendChild(DivResizeCircle);
    zone_dessin.appendChild(DivCircle);

    DivCircle.style.position = "absolute";
    DivCircle.style.width = "130px";
    DivCircle.style.height = "130px";
    DivCircle.style.border = "1px solid rgb(63, 63, 65)";
    DivCircle.style.backgroundColor = "rgb(146, 145, 145, .5)";
    DivCircle.style.borderRadius = "50%";

    DivResizeCircle.style.width = "5px";
    DivResizeCircle.style.height = "5px";
    DivResizeCircle.style.borderRadius = "1px";
    DivResizeCircle.style.backgroundColor = "rgb(81, 83, 83)";
    DivResizeCircle.style.cursor = "n-resize";




    DivCircle.addEventListener('dblclick', delforme);
    DivCircle.addEventListener('click', changerCouleurCircle);

    DivResizeCircle.addEventListener('mousedown', initialiseResizeCircle, false);
    DivCircle.addEventListener("mousedown", mousedown);


}
BtnAddCircle.addEventListener("click", AddNewCircle);




function initialiseResizeCircle(e) {
    redimensionnement = e.target.parentNode;
    window.addEventListener('mousemove', startResizingCircle, false);
    window.addEventListener('mouseup', stopResizingCircle, false);
}

function stopResizingCircle(e) {
    window.removeEventListener('mousemove', startResizingCircle, false);
    window.removeEventListener('mouseup', stopResizingCircle, false);
}

function startResizingCircle(e) {
    const DivCircle = redimensionnement;
    DivCircle.style.width = (e.clientX) + 'px';
    DivCircle.style.height = (e.clientY) + 'px';
}

function startResizingCircle(e) {
    const DivCircle = redimensionnement;
    DivCircle.style.width = (e.clientX - DivCircle.offsetLeft) + 'px';
    DivCircle.style.height = (e.clientY - DivCircle.offsetTop) + 'px';
}


function mousedown(e) {
    deplacement = e.target;
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {
        const DivCircle = deplacement;
        if (!isResizing) {
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            const circle = DivCircle.getBoundingClientRect();

            DivCircle.style.left = circle.left - newX + "px";
            DivCircle.style.top = circle.top - newY + "px";

            prevX = e.clientX;
            prevY = e.clientY;
        }
    }

    function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
    }
}

//----------------------------------------------------------------------------------Triangle------------------------------------------


const BtnAddTriangle = document.querySelector("#btn_triangle");

function AddNewTriangle() {
    const DivTriangle = document.createElement("div");
    DivTriangle.id = 'resizeTriangle';
    //DivTriangle.classList.add('resize');
    // affiche moi le resize lorsque je click sur le DivTriangle
    const DivResizeTriangle = document.createElement("div");
    DivResizeTriangle.id = 'resizableTriangle';
    DivTriangle.appendChild(DivResizeTriangle);
    zone_dessin.appendChild(DivTriangle);

    DivTriangle.style.position = "absolute";
    DivTriangle.style.height = "0";
    DivTriangle.style.width = "0";
    DivTriangle.style.border = "80px solid transparent";
    DivTriangle.style.borderBottomColor = "rgb(155, 149, 155, .5)";

    DivResizeTriangle.style.width = "5px";
    DivResizeTriangle.style.height = "5px";
    DivResizeTriangle.style.borderRadius = "1px";
    DivResizeTriangle.style.backgroundColor = "rgb(81, 83, 83)";
    DivResizeTriangle.style.cursor = "n-resize";

    DivTriangle.addEventListener('dblclick', delforme);
    DivTriangle.addEventListener('click', changerCouleurTriangle);

    DivResizeTriangle.addEventListener('mousedown', initialiseResizeTriangle, false);
    DivTriangle.addEventListener("mousedown", mousedown);


}
BtnAddTriangle.addEventListener("click", AddNewTriangle);





function initialiseResizeTriangle(e) {
    redimensionnement = e.target.parentNode;
    window.addEventListener('mousemove', startResizingTriangle, false);
    window.addEventListener('mouseup', stopResizingTriangle, false);
}

function stopResizingTriangle(e) {
    window.removeEventListener('mousemove', startResizingTriangle, false);
    window.removeEventListener('mouseup', stopResizingTriangle, false);
}

function startResizingTriangle(e) {
    const DivTriangle = redimensionnement;
    DivTriangle.style.borderLeftWidth = (e.clientX) + 'px';
    DivTriangle.style.borderRightWidth = (e.clientY) + 'px';
}

function startResizingTriangle(e) {
    const DivTriangle = redimensionnement;
    DivTriangle.style.borderBottomWidth = (e.clientX - DivTriangle.offsetLeft) + 'px';
    DivTriangle.style.borderTopWidth = (e.clientY - DivTriangle.offsetTop) + 'px';
}


function mousedown(e) {
    deplacement = e.target;
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", mouseup);

    let prevX = e.clientX;
    let prevY = e.clientY;

    function mousemove(e) {
        const DivTriangle = deplacement;
        if (!isResizing) {
            let newX = prevX - e.clientX;
            let newY = prevY - e.clientY;

            const triangle = DivTriangle.getBoundingClientRect();

            DivTriangle.style.left = triangle.left - newX + "px";
            DivTriangle.style.top = triangle.top - newY + "px";

            prevX = e.clientX;
            prevY = e.clientY;
        }
    }

    function mouseup() {
        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
    }
}

// ------------------------------------------------------- créer le texte-------------------------------------------


const BtnText = document.querySelector("#btn_text");

function AddNewText() {
    const DivText = document.createElement("textarea");
    DivText.id = 'resizeText';
    DivText.value = 'ma maison';
    DivText.wrap = 'hard';
    DivText.cols = 25;
    DivText.rows = 4;
    // DivText.placeholder = 'Entrer votre texte ici';

    DivText.style.position = "absolute";
    DivText.style.border = "1px solid rgb(106, 106, 109)";
    DivText.style.backgroundColor = "transparent";

    zone_dessin.appendChild(DivText);
    DivText.addEventListener('click', changerCouleurText);
    DivText.addEventListener('dblclick', delforme);

    DivText.addEventListener("mousedown", mousedown);
}
BtnText.addEventListener("click", AddNewText);



function initialiseResizeText(e) {
    redimensionnement = e.target.parentNode;
    window.addEventListener('mousemove', startResizingText, false);
    window.addEventListener('mouseup', stopResizingText, false);
}

function stopResizingText(e) {
    window.removeEventListener('mousemove', startResizingText, false);
    window.removeEventListener('mouseup', stopResizingText, false);
}

function startResizingText(e) {
    const DivText = redimensionnement;
    DivText.style.width = (e.clientX) + 'px';
    DivText.style.height = (e.clientY) + 'px';
}

function startResizingText(e) {
    const DivText = redimensionnement;
    DivText.style.width = (e.clientX - DivText.offsetLeft) + 'px';
    DivText.style.height = (e.clientY - DivText.offsetTop) + 'px';
}







//--------------------------------------------------------------------------remove forme--------------------------------------------------

let divRemove;

function delforme(e) {
    divRemove = e.target;
    const myDiv = divRemove;
    const parent = myDiv.parentNode;
    parent.removeChild(myDiv);
    // console.log("should have remove");
}
const btnshow = document.querySelector('#btnExportPNG');
const btnimg = document.getElementById('btnimg');

btnshow.addEventListener('click', () => {
    console.log('yes')
    btnimg.classList.toggle('show');
})