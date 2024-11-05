/**共用屬性 */
$(".navigation").load("navigation.html");

/**前後端溝通 */
$.get("http://localhost:3000/game_type/preset_type")
    .then(async function(data) {
        let title=`<h1 class="container_title">類別<h1>`;
        $('#cate-menu').append(title);
        for(var i=0;i<data.length;i++){
            let game_type=data[i].name;
            let type=`<a href="/public/category.html?category=game_type&game_type=${game_type}">${game_type}</a>`;
            $('#cate-menu').append(type);
            if((i+1)%6==0 && i!=0){
                $('#cate-menu').append('<br>');
            }
        }
    })
    .fail(function() {
        console.log("無法連接到gameOS伺服器喔");
    });

$.get("http://localhost:3000/game_type/more_type")
    .then(async function(data) {
        let title=`<br><h1 class="container_title">額外收錄<h1>`;
        $('#cate-menu').append(title);
        for(var i=0;i<data.length;i++){
            let game_type=data[i].name;
            let type=`<a href="/public/category.html?category=game_type&game_type=${game_type}">${game_type}</a>`;
            $('#cate-menu').append(type);
            if((i+1)%6==0 && i!=0){
                $('#cate-menu').append('<br>');
            }
        }
    })
    .fail(function() {
        console.log("無法連接到gameOS伺服器喔");
    });    