/**共用屬性 */
$(".navigation").load("navigation.html");

/**前後端溝通 */

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const category = urlParams.get('category');
console.log(category);

if(category == "company"){//OK
    var company = null;
    $.get("http://localhost:3000/get_appid/getgame_company",function(data){
        for(var i = 0;i<data.length;i++){
            company = data[i].name;
        var content=
        `<a href="/public/category.html?category=game_company&game_company=${company}">
            <div class="box">
                <img src="/public/images/company/${company}.jpg">
                <div class="content_box">
                    <span>${company}</span>
                </div>
            </div>     
        </a>
        `;
        $('#cate_box').append(content);
        }
    });
}

if(category == "series"){//OK
    var series = null;
    $.get("http://localhost:3000/get_appid/getgame_series",function(data){
        for(var i = 0;i<data.length;i++){
            series = data[i].name;
        var content=
        `
        <a href="/public/category.html?category=game_series&game_series=${series}">
            <div class="box">
                <img src="/public/images/series/${series}.jpg">
                <div class="content_box">
                    <span>${series}</span>
                </div>
            </div>     
        </a>
        `;
        $('#cate_box').append(content);
        }
    });
}

if(category == "game_type_more"){//OK
    $.get("http://localhost:3000/game_type/more_type")
    .then(async function(data) {
       for(var z=0;z<data.length;z++){
            let game_type = data[z].name;
            let title=`<h1 class="container_title">${game_type}<h1>`;
            $('#cate_box').append(title);
            
            await $.get("http://localhost:3000/get_appid/type_getgame", { 'game_type': game_type })
                .then(async function(res) {
                    if (res && res.length > 0) {
                        for (var i = 0; i < res.length; i++) {
                            const game_id = res[i].AppID;
                            let game_name = null;
                            let game_price = null;

                            await $.get("http://localhost:3000/get_game/id_getgame", { 'game_id': game_id })
                                .then(async function(res2) {
                                game_name = res2[0].name;
                                game_price = res2[0].price;
                                const game_logo = 
                                    `
                                    <img src="/public/images/game/${game_id}.jpg" alt="${game_name}">
                                    `;

                                const content =
                                    `<div class="box">
                                        <a href="/public/target.html?game_name=${game_name}" id="logo${game_id}${z}"></a>
                                        <div class="content_box">
                                            <a href="/public/target.html?game_name=${game_name}">
                                                <span>${game_name}</span>
                                            </a>
                                            <div id="game_type${game_id}${z}"></div>
                                            <div id="game_OS${game_id}${z}" class="p_type game_OS"></div>
                                        </div>
                                        <p class="p_price">NT$${game_price}</p> 
                                    </div>
                                    `;
                                    
                                $('#cate_box').append(content);
                                $('#logo'+game_id+z).append(game_logo);
                                await $.get("http://localhost:3000/id_getcont/id_gettype", { 'game_id': game_id })
                                    .then(function(res3) {
                                        let game_type;
                                        let type;
                                        for (var j = 0; j < res3.length; j++) {
                                            game_type = res3[j].type;
                                            type =
                                            `<a href="/public/category.html?category=game_type&game_type=${game_type}">${game_type}</a>`;
                                            $('#game_type' + game_id+z).append(type + "   ");
                                            }
                                    })
                                .catch(function() {
                                    console.log("無法連接到伺服器id_gettype");
                                });
                                await $.get("http://localhost:3000/id_getcont/id_getOS", { 'game_id': game_id })
                                    .then(function(res4) {
                                        let game_OS;
                                        let OS;
                                        for (var j = 0; j < res4.length; j++) {
                                            game_OS = res4[j].name;
                                            if(game_OS =="macOS"){
                                                OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-apple' ></i></a>`;
                                            }
                                            else if(game_OS =="Windows"){
                                                OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-windows' ></i></a>`;
                                            }
                                            else if(game_OS =="Linux"){
                                                OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-steam' ></i></a>`;
                                            }
                                            
                                            $('#game_OS' + game_id+z).append(OS + "  ");
                                        }
                                    })
                                    .fail(function() {
                                        console.log("無法連接到gameOS伺服器喔");
                                    });
                            })
                            .catch(function() {
                                console.log("無法連接到伺服器id_getgame");
                            });
                        }
                    } else {
                        console.log("沒有該遊戲喔！");
                    }
                    })
                    .catch(function() {
                    console.log("無法連接到伺服器！");
                    });
       }
    })
    .fail(function() {
        console.log("無法連接到moretype伺服器喔");
    });
            
}

if(category == "random_search"){
    $.get("http://localhost:3000/get_game/random_search")
        .then(function(data) {
            for (var i = 0; i < data.length; i++) {
            (function() {
                let game_id = data[i].AppID;
                let game_name = data[i].name;
                let game_price = data[i].price;
                let game_logo = `<img src="/public/images/game/${game_id}.jpg" alt="${game_name}">`;

                const content = `
                <div class="box">
                    <a href="/public/target.html?game_name=${game_name}" id="logo${game_id}"></a>
                    <div class="content_box">
                        <a href="/public/target.html?game_name=${game_name}">
                            <span>${game_name}</span>
                        </a>
                        <div id="game_type${game_id}" class="p_type"></div>
                        <div id="game_OS${game_id}" class="p_type game_OS"></div>
                    </div>
                    <p class="p_price">NT$${game_price}</p>   
                </div>
                `;

                $('#cate_box').append(content);
                $('#logo' + game_id).append(game_logo);

                $.get("http://localhost:3000/id_getcont/id_gettype", { 'game_id': game_id })
                .then(function(res3) {
                    let game_type;
                    let type;
                    for (var j = 0; j < res3.length; j++) {
                    game_type = res3[j].type;
                    type = `<a href="/public/category.html?category=game_type&game_type=${game_type}">${game_type}</a>`;
                    $('#game_type' + game_id).append(type + "  ");
                    }
                })
                .fail(function() {
                    console.log("無法連接到type伺服器喔");
                });

                $.get("http://localhost:3000/id_getcont/id_getOS", { 'game_id': game_id })
                .then(function(res4) {
                    let game_OS;
                    let OS;
                    for (var j = 0; j < res4.length; j++) {
                        game_OS = res4[j].name;
                        if(game_OS =="macOS"){
                            OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-apple' ></i></a>`;
                        }
                        else if(game_OS =="Windows"){
                            OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-windows' ></i></a>`;
                        }
                        else if(game_OS =="Linux"){
                            OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-steam' ></i></a>`;
                        }
                        
                        $('#game_OS' + game_id).append(OS + "  ");
                    }
                })
                .fail(function() {
                    console.log("無法連接到gameOS伺服器喔");
                });
            })();
            }
        })
        .fail(function() {
            console.log("無法連接到伺服器！");
        });
}

if(queryString.includes('&')){
    switch(category){
        case "game_type":
            const game_type = urlParams.get('game_type');
            console.log(game_type);
            $.get("http://localhost:3000/get_appid/type_getgame", { 'game_type': game_type })
                .then(function(res) {
                    let title=`<h1 class="container_title">${game_type}<h1>`;
                    $('#cate_box').append(title);
                    if (res && res.length > 0) {
                        for (var i = 0; i < res.length; i++) {
                            const game_id = res[i].AppID;
                            let game_name = null;
                            let game_price = null;

                            $.get("http://localhost:3000/get_game/id_getgame", { 'game_id': game_id })
                                .then(function(res2) {
                                game_name = res2[0].name;
                                game_price = res2[0].price;
                                const game_logo = 
                                    `
                                    <img src="/public/images/game/${game_id}.jpg" alt="${game_name}">
                                    `;

                                const content =
                                    `<div class="box">
                                        <a href="/public/target.html?game_name=${game_name}" id="logo${game_id}"></a>
                                        <div class="content_box">
                                            <a href="/public/target.html?game_name=${game_name}">
                                                <span>${game_name}</span>
                                            </a>
                                            <div id="game_type${game_id}"></div>
                                            <div id="game_OS${game_id}" class="p_type game_OS"></div>
                                        </div>
                                        <p class="p_price">NT$${game_price}</p> 
                                    </div>
                                    `;
                                    
                                $('#cate_box').append(content);
                                $('#logo'+game_id).append(game_logo);
                                $.get("http://localhost:3000/id_getcont/id_gettype", { 'game_id': game_id })
                                    .then(function(res3) {
                                        let game_type;
                                        let type;
                                        for (var j = 0; j < res3.length; j++) {
                                            game_type = res3[j].type;
                                            type =
                                            `<a href="/public/category.html?category=game_type&game_type=${game_type}">${game_type}</a>`;
                                            $('#game_type' + game_id).append(type + "   ");
                                            }
                                    })
                                .catch(function() {
                                    console.log("無法連接到伺服器id_gettype");
                                });
                                $.get("http://localhost:3000/id_getcont/id_getOS", { 'game_id': game_id })
                                    .then(function(res4) {
                                        let game_OS;
                                        let OS;
                                        for (var j = 0; j < res4.length; j++) {
                                            game_OS = res4[j].name;
                                            if(game_OS =="macOS"){
                                                OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-apple' ></i></a>`;
                                            }
                                            else if(game_OS =="Windows"){
                                                OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-windows' ></i></a>`;
                                            }
                                            else if(game_OS =="Linux"){
                                                OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-steam' ></i></a>`;
                                            }
                                            
                                            $('#game_OS' + game_id).append(OS + "  ");
                                        }
                                    })
                                    .fail(function() {
                                        console.log("無法連接到gameOS伺服器喔");
                                    });
                            })
                            .catch(function() {
                                console.log("無法連接到伺服器id_getgame");
                            });
                        }
                    } else {
                        console.log("沒有該遊戲喔！");
                    }
                    })
                    .catch(function() {
                    console.log("無法連接到伺服器！");
                    });
            break;

        case "game_series"://OK
            const game_series= decodeURIComponent(urlParams.get('game_series'));
            console.log(game_series);
            $.get("http://localhost:3000/get_game/series_getgame", {'game_series':game_series })
                .then(function(res) {
                    let title=`<h1 class="container_title">${game_series}<h1>`;
                    $('#cate_box').append(title);
                    for(var i=0;i<res.length;i++){
                        (function() {    
                            let game_id = res[i].AppID;
                            let game_name = res[i].name;
                            let game_price = res[i].price;
                            const game_logo = 
                                `
                                <img src="/public/images/game/${game_id}.jpg" alt="${game_name}">
                                `;
                            const content = 
                            `
                            <div class="box">
                                <a href="/public/target.html?game_name=${game_name}" id="logo${game_id}"></a>
                                <div class="content_box">
                                    <a href="/public/target.html?game_name=${game_name}">
                                        <span>${game_name}</span>
                                    </a>
                                    <div id="box_type${game_id}"></div>
                                    <div id="game_OS${game_id}" class="p_type game_OS"></div>
                                    
                                </div>
                                <p class="p_price">NT$${game_price}</p>
                            </div>  
                            `;
                            $('#cate_box').append(content);
                            $('#logo'+game_id).append(game_logo);

                            $.get("http://localhost:3000/id_getcont/id_gettype",{'game_id':game_id},function(res3){
                                for(var i = 0;i<res3.length;i++){
                                    let game_type = res3[i].type;
                                    let type =
                                        `<a href="/public/category.html?category=game_type&game_type=${game_type}">${game_type}</a>`;
                                    $('#box_type' + game_id).append(type + "   ");
                                }
                            }).fail(function(){
                                console.log("無法連接到伺服器喔");
                            });
                            $.get("http://localhost:3000/id_getcont/id_getOS", { 'game_id': game_id })
                                .then(function(res4) {
                                    let game_OS;
                                    let OS;
                                    for (var j = 0; j < res4.length; j++) {
                                        game_OS = res4[j].name;
                                        if(game_OS =="macOS"){
                                            OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-apple' ></i></a>`;
                                        }
                                        else if(game_OS =="Windows"){
                                            OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-windows' ></i></a>`;
                                        }
                                        else if(game_OS =="Linux"){
                                            OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-steam' ></i></a>`;
                                        }
                                        
                                        $('#game_OS' + game_id).append(OS + "  ");
                                    }
                                })
                                .fail(function() {
                                    console.log("無法連接到gameOS伺服器喔");
                                });
                        })();
                    }    
                })
                .catch(function() {
                    console.log("無法連接到伺服器id_gettype");
                });
            
            break;
        case "game_company"://OK
            const game_company= decodeURIComponent(urlParams.get('game_company'));
            
            $.get("http://localhost:3000/get_game/company_getgame", {'game_company':game_company})
                .then(function(res) {
                    let title=`<h1 class="container_title">${game_company}<h1>`;
                     $('#cate_box').append(title);
                    if (res && res.length > 0) {
                        for(var i=0;i<res.length;i++){
                        (function() {  
                            const game_id = res[i].AppID;
                            const game_name = res[i].name;
                            const game_price = res[i].price;
                            const game_logo = 
                                `
                                <img src="/public/images/game/${game_id}.jpg" alt="${game_name}">
                                `;
                            const content = 
                            `
                            <div class="box">
                                <a href="/public/target.html?game_name=${game_name}" id="logo${game_id}"></a>
                                <div class="content_box">
                                    <a href="/public/target.html?game_name=${game_name}">
                                        <span>${game_name}</span>
                                    </a>
                                    <div id="game_type${game_id}" class="p_type"></div>
                                    <div id="game_OS${game_id}" class="p_type game_OS"></div>

                                </div>
                                <p class="p_price">NT$${game_price}</p> 
                            </div>
                                `;
                            $('#cate_box').append(content);
                            $('#logo'+game_id).append(game_logo);
                            $.get("http://localhost:3000/id_getcont/id_gettype",{'game_id':game_id})
                                .then(function(res3){
                                    for(var i = 0;i<res3.length;i++){
                                        let game_type = res3[i].type;
                                        let type =
                                            `<a href="/public/category.html?category=game_type&game_type=${game_type}">${game_type}</a>`;
                                        $('#game_type' + game_id).append(type + "   ");
                                    }
                                })
                                .catch(function(){
                                    console.log("無法連接到id_gettype伺服器喔");
                                });
                            $.get("http://localhost:3000/id_getcont/id_getOS", { 'game_id': game_id })
                                .then(function(res4) {
                                    let game_OS;
                                    let OS;
                                    for (var j = 0; j < res4.length; j++) {
                                        game_OS = res4[j].name;
                                        if(game_OS =="macOS"){
                                            OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-apple' ></i></a>`;
                                        }
                                        else if(game_OS =="Windows"){
                                            OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-windows' ></i></a>`;
                                        }
                                        else if(game_OS =="Linux"){
                                            OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-steam' ></i></a>`;
                                        }
                                        
                                        $('#game_OS' + game_id).append(OS + "  ");
                                    }
                                })
                                .fail(function() {
                                    console.log("無法連接到gameOS伺服器喔");
                                });
                        })();
                        }
                    } else {
                        console.log("沒有該遊戲喔！");
                    }
                })
                .catch(function() {
                    console.log("無法連接到伺服器！");
                });
        break;
        case "game_OS":
            const game_OS = urlParams.get('game_OS');
            console.log(game_OS);

            $.get("http://localhost:3000/get_appid/OS_getgame", { 'game_OS': game_OS })
                .then(function(res) {
                    let title=`<h1 class="container_title">${game_OS}<h1>`;
                    $('#cate_box').append(title);
                    if (res && res.length > 0) {
                        for (var i = 0; i < res.length; i++) {
                            const game_id = res[i].AppID;

                            $.get("http://localhost:3000/get_game/id_getgame", { 'game_id': game_id })
                                .then(function(res2) {
                                const game_name = res2[0].name;
                                const game_price = res2[0].price;
                                const game_logo = 
                                    `
                                    <img src="/public/images/game/${game_id}.jpg" alt="${game_name}">
                                    `;

                                const content =
                                    `<div class="box">
                                        <a href="/public/target.html?game_name=${game_name}" id="logo${game_id}"></a>
                                        <div class="content_box">
                                            <a href="/public/target.html?game_name=${game_name}">
                                                <span>${game_name}</span>
                                            </a>
                                            <div id="game_type${game_id}" class="p_type"></div>
                                            <div id="game_OS${game_id}" class="p_type game_OS"></div>

                                        </div>
                                        <p class="p_price">NT$${game_price}</p>    
                                    </div>
                                    `;
                                    
                                $('#cate_box').append(content);
                                $('#logo'+game_id).append(game_logo);

                                $.get("http://localhost:3000/id_getcont/id_gettype", { 'game_id': game_id })
                                    .then(function(res3) {
                                        let game_type;
                                        let type;
                                        for (var j = 0; j < res3.length; j++) {
                                        game_type = res3[j].type;
                                        type = `<a href="/public/category.html?category=game_type&game_type=${game_type}">${game_type}</a>`;
                                        $('#game_type' + game_id).append(type + "  ");
                                        }
                                    })
                                    .catch(function() {
                                    console.log("無法連接到伺服器id_gettype");
                                });
                            })
                            .catch(function() {
                                console.log("無法連接到伺服器id_getgame");
                            });
                            $.get("http://localhost:3000/id_getcont/id_getOS", { 'game_id': game_id })
                                .then(function(res4) {
                                    let game_OS;
                                    let OS;
                                    for (var j = 0; j < res4.length; j++) {
                                        game_OS = res4[j].name;
                                        if(game_OS =="macOS"){
                                            OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-apple' ></i></a>`;
                                        }
                                        else if(game_OS =="Windows"){
                                            OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-windows' ></i></a>`;
                                        }
                                        else if(game_OS =="Linux"){
                                            OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-steam' ></i></a>`;
                                        }
                                        
                                        $('#game_OS' + game_id).append(OS + "  ");
                                    }
                                })
                                .fail(function() {
                                    console.log("無法連接到gameOS伺服器喔");
                                });
                        }
                    } else {
                        console.log("沒有該遊戲喔！");
                    }
                })
                .catch(function() {
                console.log("無法連接到伺服器！");
                });
            break;
        case "game_date":
            const game_date= urlParams.get('game_date');
            console.log(game_date);
            $.get("http://localhost:3000/get_game/date_getgame", { 'game_date': game_date })
              .then(function(res) {
                    for (var i = 0; i < res.length; i++) {
                    (function() {
                        let game_id = res[i].AppID;
                        let game_name = res[i].name;
                        let game_price = res[i].price;
                        let date = (res[i].date).substring(0,10);
                        let game_logo =
                            `<img src="/public/images/game/${game_id}.jpg" alt="${game_name}">`;
                        const content =
                            `<div class="box">
                                <a href="/public/target.html?game_name=${game_name}" id="logo${game_id}"></a>
                                <div class="content_box">
                                    <a href="/public/target.html?game_name=${game_name}">
                                        <span>${game_name}</span>
                                    </a>
                                    <br><p>${date}</p>
                                    <div id="game_type${game_id}" class="p_type"></div>
                                    <div id="game_OS${game_id}" class="p_type game_OS"></div>

                                </div>
                                <p class="p_price">NT$${game_price}</p>  
                            </div>`;
                    
                        $('#cate_box').append(content);
                        $('#logo' + game_id).append(game_logo);
                
                        $.get("http://localhost:3000/id_getcont/id_gettype", { 'game_id': game_id })
                            .then(function(res3) {
                                let game_type;
                                let type;
                                for (var j = 0; j < res3.length; j++) {
                                    game_type = res3[j].type;
                                    type = `<a href="/public/category.html?category=game_type&game_type=${game_type}">${game_type}</a>`;
                                    $('#game_type' + game_id).append(type + "  ");
                                }
                            })
                            .fail(function() {
                            console.log("無法連接到type伺服器喔");
                            });
                        $.get("http://localhost:3000/id_getcont/id_getOS", { 'game_id': game_id })
                            .then(function(res4) {
                                let game_OS;
                                let OS;
                                for (var j = 0; j < res4.length; j++) {
                                    game_OS = res4[j].name;
                                    if(game_OS =="macOS"){
                                        OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-apple' ></i></a>`;
                                    }
                                    else if(game_OS =="Windows"){
                                        OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-windows' ></i></a>`;
                                    }
                                    else if(game_OS =="Linux"){
                                        OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-steam' ></i></a>`;
                                    }
                                    
                                    $('#game_OS' + game_id).append(OS + "  ");
                                }
                            })
                            .fail(function() {
                                console.log("無法連接到gameOS伺服器喔");
                            });
                    })();
                    }
              })
              .fail(function() {
                console.log("無法連接到伺服器！");
              });
            break;
        case "game_price":
            const game_price_param = urlParams.get('game_price');
            console.log(game_price_param);
          
            $.get("http://localhost:3000/get_game/price_getgame", { 'game_price': game_price_param })
              .then(function(res) {
                for (var i = 0; i < res.length; i++) {
                (function() {
                    const game_id = res[i].AppID;
                    const game_name = res[i].name;
                    const game_price = res[i].price;
                    const game_logo =
                        `<img src="/public/images/game/${game_id}.jpg" alt="${game_name}">`;
                    const content =
                        `<div class="box">
                        <a href="/public/target.html?game_name=${game_name}" id="logo${game_id}"></a>
                        <div class="content_box">
                            <a href="/public/target.html?game_name=${game_name}">
                            <span>${game_name}</span>
                            </a>
                            <div id="game_type${game_id}" class="p_type"></div>
                            <div id="game_OS${game_id}" class="p_type game_OS"></div>

                        </div>
                        <p class="p_price">NT$${game_price}</p>   
                        </div>`;
                
                    $('#cate_box').append(content);
                    $('#logo' + game_id).append(game_logo);
            
                    $.get("http://localhost:3000/id_getcont/id_gettype", { 'game_id': game_id })
                        .then(function(res3) {
                            let game_type;
                            let type;
                            for (var j = 0; j < res3.length; j++) {
                            game_type = res3[j].type;
                            type = `<a href="/public/category.html?category=game_type&game_type=${game_type}">${game_type}</a>`;
                            $('#game_type' + game_id).append(type + "  ");
                            }
                        })
                        .fail(function() {
                            console.log("無法連接到type伺服器喔");
                        });
                    $.get("http://localhost:3000/id_getcont/id_getOS", { 'game_id': game_id })
                        .then(function(res4) {
                            let game_OS;
                            let OS;
                            for (var j = 0; j < res4.length; j++) {
                                game_OS = res4[j].name;
                                if(game_OS =="macOS"){
                                    OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-apple' ></i></a>`;
                                }
                                else if(game_OS =="Windows"){
                                    OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-windows' ></i></a>`;
                                }
                                else if(game_OS =="Linux"){
                                    OS = `<a href="/public/category.html?category=game_OS&game_OS=${game_OS}"><i class='bx bxl-steam' ></i></a>`;
                                }
                                
                                $('#game_OS' + game_id).append(OS + "  ");
                            }
                        })
                        .fail(function() {
                            console.log("無法連接到gameOS伺服器喔");
                        });
                })();
                }
              })
              .fail(function() {
                console.log("無法連接到伺服器！");
              });
            break;    
        default:
            break; 
    }
}
    