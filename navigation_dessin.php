
<?php require('partials/header_dessin.php'); ?>


<div class="container">

<nav>
    <div class="menu">

        <input type="checkbox" id="check">
        <label for="check">
        <i class="fas fa-bars" id="btn"></i>
        <i class="fas fa-times" id="cancel"></i>
      </label>
        <div class="sidebar">

            <a href="/Site_Draw_me/navigation_intro.php">
                <header>Accueil</header>
            </a>
            <ul>
                <li>
                        
                        <i class="fa-solid fa-download"></i>
                        <button type="submit" id="btnSave" >Sauvegarder</button>
                    
                </li>
                <li>
                    
                        <i class="fa-solid fa-spinner"></i>
                        <button type="submit" onclick="functload()">Charger</button>
                    
                </li>
                
                <li>
                    
                        <i class="fa-solid fa-file-export"></i>
                        <button type="submit" id="btnExportPDF" onclick="functExportPDF()">Export PDF</button>
                    
                </li>
                <li>
                        <i class="fa-solid fa-file-export"></i>
                        <button type="submit" id="btnExportPNG" onclick="doCapture();">Export JPG</button>
                </li>

                <li class="btnim">
                    <a href="/Site_Draw_me/filename.png">
                        <i class="fa-solid fa-file-export"></i>
                        <button type="submit" id="btnimg" >Voir l'image</button>
                        </a>
                </li>

            </ul>
        </div>
    </div>

    <div class="content_btn">

    <button id="btn_rect">&#x25AD;</button>
    <button id="btn_circle">&#9675;</button>
    <button id="btn_triangle">&#9651;</button>
    <button id="btn_text">T</button>
    <button class='btn-bold'> <strong>B</strong></button>
                <button class='btn-italic'><i>I</i></button>
    <select id="color-select">
                    <option value="">Couleurs</option>
                    <option value="color color-red" data-color="red" id="btnRed">Rouge</option>
                    <option value="color color-blue" data-color="blue" id="btnGreen">Bleu</option>
                    <option value="color color-black" data-color="black" id="btnBlue">Noir</option>
                    <option value="color color-green" data-color="green">Vert</option>
                </select>

                <select id="font-select">
                    <option value="">Polices</option>
                    <option value="Open San">Open San</option>
                    <option value="Lato">Lato</option>
                    <option value="Merriweather">Merriweather</option>
                </select>

    </div>
    <img src="./image/Logo_final-draw_me.png" class="logo" alt="logo">

   

</nav>

<div class="dessin">
<div id="zone_dessin" name="monCode" method="post">

</div>

</div>


</div>




<?php require('partials/footer.php'); ?>

