/**前後端溝通 */
$.get("http://localhost:3000/get_game/cover_game")
    .then(function(res) {
        for (var i = 0; i < res.length; i++) {
            let game_id = res[i].AppID;
            let game_name = res[i].name;
            let game_logo =
            `<a href="/public/target.html?game_name=${game_name}" id="logo${game_id}">
                <img src="/public/images/game/${game_id}.jpg" alt="${game_name}">
            </a>
            `;
            $('#car-carousel').append(game_logo);
        }
    })
    .fail(function() {
                console.log("無法連接到伺服器！");
    });
    
/**共用屬性 */
$(".navigation").load("navigation.html");

/**輪播圖 */
let index = 0;//顯示圖片下標
let imageCout = 5;

const bottom = document.querySelector(".carousel .bottom");
console.log(index);
for(let i =0;i<imageCout;i++){
    const indicator =document.createElement("div");//底部跳轉按鈕
    indicator.classList.add("indicator");
    indicator.id='indicator'+i;
    indicator.onclick = ()=> setIndex(i);
    bottom.append(indicator);
}

//自動滾動
function AutoPage(){
    return setInterval(() => {
        $('#indicator'+index).css("background-color","blueviolet") ;
        index++;
        refresh();
        $('#indicator'+index).css("background-color","white") ;
    }, 5000);
}
let autoTimer = AutoPage();


function refresh(){
    if(index<0){
        index = imageCout-1;
    }
    else if(index>=imageCout){
        index=0;
    }
    let carousel =document.querySelector(".carousel");

    let width = getComputedStyle(carousel).width;
    width = Number(width.slice(0,-2));
    carousel.querySelector(".car-container").style.left=(index *width*(-1) + 'px');
}

function leftShift(){
    $('#indicator'+index).css("background-color","blueviolet") ;
    index--;
    refresh();
    $('#indicator'+index).css("background-color","white") ;
    clearInterval(autoTimer);
    autoTimer = AutoPage();
}
function rightShift(){
    $('#indicator'+index).css("background-color","blueviolet") ;
    index++;
    refresh();
    $('#indicator'+index).css("background-color","white") ;
    clearInterval(autoTimer);
    autoTimer = AutoPage();
}
function setIndex(page){
    $('#indicator'+index).css("background-color","blueviolet") ;
    index=page;
    refresh();
    $('#indicator'+index).css("background-color","white") ;
    clearInterval(autoTimer);
    autoTimer = AutoPage();
}