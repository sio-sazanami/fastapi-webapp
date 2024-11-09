function grid_disp(receive_json_txt){
    const gridbox_element = document.getElementById('gbox_my-grid'); 
    gridbox_element.remove();

    let space_element = document.getElementById('grid_space');
    let table_element = document.createElement('table');
    table_element.id = "my-grid";
    space_element.appendChild(table_element);
    let pager_element = document.createElement('div');
    pager_element.id = "my-grid-pager";
    space_element.appendChild(pager_element);


    let to_json = JSON.parse(receive_json_txt)
    let json_txt = JSON.parse(to_json)

    console.log(json_txt)
    let keys = Object.keys(json_txt[0])
    console.log(keys)
    let vals = Object.values(json_txt[0])
    console.log(vals)

    var colModelSettings = []
    for(let i=0; i<keys.length; i++){
        colModelSettings.push({name:keys[i],sortable:true});
    }
    search_end();


    // 列の表示名

    $(function(){
        $("#my-grid").jqGrid({
        // データ
        data:json_txt,
        // データの種類
        datatype : "local",
        // 列ヘッダー名(配列)
        colNames : keys,
        // 列の各種設定(オブジェクト配列)
        colModel : colModelSettings,
        // Gridのタイトル
        caption : "Result",
        // ページャーのID
        pager : 'my-grid-pager'
        });
    });
    
}