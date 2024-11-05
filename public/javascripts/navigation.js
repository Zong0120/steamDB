/**共用屬性 */
const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    toggle = body.querySelector(".toggle"),
    toggle2 = body.querySelector(".toggle2"),
    searchBtn = body.querySelector(".search-box"),
    modeSwitch = body.querySelector(".toggle-switch"),
    modeText = body.querySelector(".mode-text");

// 獲取cookie的函數
function getCookie(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].split('=');
    if (cookie[0] === name) {
      return cookie[1];
    }
  }
  return null;
}

// 設置cookie的函數
function setCookie(name, value, expirationDays) {
  const date = new Date();
  date.setDate(date.getDate() + expirationDays);

  const cookieValue = encodeURIComponent(value) + "; expires=" + date.toUTCString() + "; path=/";
  document.cookie = name + "=" + cookieValue;
}

// 刷新時，查看cookie中的模式
const mode = getCookie('mode');
if (mode === 'dark') {
  body.classList.add('dark');
  modeText.innerHTML = "Light Mode";
} else {
  modeText.innerHTML = "Dark Mode";
}

// 切换模式按钮
modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerHTML = "Light Mode";
    setCookie('mode', 'dark', 30); // 設置cookie為"dark"模式，有效期為30天
  } else {
    modeText.innerHTML = "Dark Mode";
    setCookie('mode', 'light', 30); // 設置cookie為"light"模式，有效期為30天
  }
});

// 其他事件處理程序...
toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

toggle2.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

// 前後端溝通
function search() {
    const gameName = document.getElementById('game_name').value;

    if (gameName != "") {
        console.log(gameName);
        $.get("http://localhost:3000/get_game/have_game", {'game_name': gameName})
            .then(function (res) {
                if (res == "") {
                    alert("沒有" + gameName + "遊戲喔");
                } else {
                    window.location.href = `/public/target.html?game_name=${gameName}`;
                    setCookie('game_name', gameName, 30); // 設置cookie存放game_name，有效期為30天
                }
            }).fail(function () {
            console.log("無法連接到伺服器喔");
        });
    }
}

// 刷新時，查看cookie中的模式
const search_target =decodeURIComponent(getCookie('game_name'));
if (search_target != null) {
    $('#game_name').val(search_target);
}