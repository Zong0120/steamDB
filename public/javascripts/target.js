/**共用屬性 */
$(".navigation").load("navigation.html");

/**前後端溝通 */

const searchParams = new URLSearchParams(window.location.search);
const gameName = searchParams.get('game_name');
var game_id = null;

$.get("http://localhost:3000/get_game/name_getgame", {'game_name':gameName} ,function(res) {
    if (res && res.length > 0) {
        game_id = res[0].AppID;
        const game_name = res[0].name;
        const game_price = res[0].price;
        const orginalDate = res[0].date;
        const game_date = orginalDate.substring(0,10);
        const game_company = res[0].company;
        const company =`<a href="/public/category.html?category=game_company&game_company=${game_company}">${game_company}</a>`;
        const game_logo = 
            `
            <img src="/public/images/game/${game_id}.jpg" alt="${game_name}">
            `;
        $.get("http://localhost:3000/id_getcont/id_getOS",{'game_id':game_id},function(res2){
            for(var i = 0;i<res2.length;i++){
                var game_OS = res2[i].name;
                var OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}">${game_OS}</a>`;
                $('#td_OS').append(OS + "   ");
            }
        }).fail(function(){
            console.log("無法連接到伺服器喔");
        });
        $.get("http://localhost:3000/id_getcont/id_gettype", { 'game_id': game_id })
            .then(function(res3) {
                for (var j = 0; j < res3.length; j++) {
                    var game_type = res3[j].type;
                    var type = `<a href="/public/category.html?category=game_type&game_type=${game_type}">${game_type}</a>`;
                    $('#td_type').append(type);
                    if(j<(res3.length-1) ){$('#td_type').append('、');}
                    }
            })
        .catch(function() {
            console.log("無法連接到伺服器id_gettype");
        });

        $('#game_logo').append(game_logo);
        $('#td_id').append(game_id);
        $('#td_name').append(game_name);
        $('#table_caption').append(game_name);
        $('#td_price').append(game_price);
        $('#td_date').append(game_date);
        $('#td_company').append(company);
    } else {
        console.log("沒有該遊戲喔！");
    }
}).fail(function() {
    console.log("無法連接到伺服器");
 });

function addtype() {
    var content_box =
    `<div class="td_type_box" id="type_box"></div>
    `
    $('#td_type').append(content_box);
    var input = document.createElement("input");
    input.type ="text";
    input.size = Math.max(10,4);
    input.id = "add_input";
    input.value = $('#add_input').text();
    $('#type_box').append(input);
    var content =
    `<button class='bx bx-check' onclick="updatetype('${input}')"></button>
    `
    $('#type_box').append(content);
    
}

function updatetype(input){
    const newtype = document.getElementById('add_input').value;
    if(newtype != ""){
        $.post("http://localhost:3000/game_type/addtype", { 'newtype':newtype,'game_id':game_id })
            .then(function(response) {
                const add_type =
                `<a href="/public/category.html?category=game_type&game_type=${newtype}">${newtype}</a>`;
                $('#td_type').append("、"+add_type);
            })
        .catch(function() {
            console.log("新增失敗！");
        });
    }
    $('#type_box').remove();
}