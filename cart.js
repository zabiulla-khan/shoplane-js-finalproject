    let productList = window.localStorage.getItem("product List");

    if(productList){
        if(productList.length>0){
            let count = 0;
            productList = JSON.parse(productList);
            for(let i=0;i<productList.length;i++){
                count+= productList[i].count;
                $('#cartcount').text(count)
            };

        };
    };
function localClear(){
    localStorage.clear();
}