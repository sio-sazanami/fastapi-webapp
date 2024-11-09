// ページ読み込み時にアコーディオンの開閉状態を復元
window.addEventListener('DOMContentLoaded', () => {
    // すべてのdetails要素を取得
    const detailsElements = document.querySelectorAll('details');
    
    detailsElements.forEach((details) => {
      // detailsのIDを取得
      const id = details.id;

      // localStorageから状態を取得
      const isOpen = localStorage.getItem(id) === 'true';

      // 開いている場合は開く、閉じている場合は閉じる
      if (isOpen) {
        details.setAttribute('open', 'true');
      } else {
        details.removeAttribute('open');
      }

      // 開閉状態が変更されたら、その状態をlocalStorageに保存
      details.addEventListener('toggle', () => {
        localStorage.setItem(id, details.open);
      });
    });
  });

function post_json(path, json_txt, callback){
    // 新しいXMLHttpRequestオブジェクトを作成
    let xhr = new XMLHttpRequest();

    // リクエストの設定
    xhr.open("POST", "http://127.0.0.1:8080/"+path, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // リクエストの送信
    xhr.send(JSON.stringify(json_txt));

    // レスポンスの処理
    xhr.onload = function () {
        if (xhr.status == 200) {
            console.log(xhr.responseText);
            let response = xhr.responseText;
            callback(response);
        } else {
            console.error("Error:", xhr.statusText);
        }
    };
}

function search_template(){
    let keyword = document.getElementById("keyword").value;
    let json_txt={"keyword": String(keyword)}
    post_json("template_search", json_txt);

}

function geosearch(){
    search_start();
    let id = document.getElementById("geo_id").value;
    let name = document.getElementById("geo_name").value;
    let state = document.getElementById("geo_state").value;
    let country = document.getElementById("geo_country").value;

    let send_json_txt={"id": String(id), "name": String(name), "state":String(state), "country":String(country)}
    post_json("geosearch", send_json_txt, grid_disp);
}

function search_start(){
    let button_element = document.getElementById('submit-button'); 
    button_element.disabled=true;
    button_element.textContent='SEARCHING...';

    let area_element = document.getElementById('button_area')
    let anime_element = document.createElement('img');
    anime_element.id = "loading_anime";
    anime_element.height="40";
    anime_element.src="https://miirriin.com/wp-content/uploads/2023/03/loading02.gif"
    area_element.appendChild(anime_element);
}

function search_end(){
    let button_element = document.getElementById('submit-button'); 
    button_element.disabled=false;
    button_element.textContent='COMPLETE!';

    let anime_element = document.getElementById('loading_anime');
    anime_element.remove(); 
}