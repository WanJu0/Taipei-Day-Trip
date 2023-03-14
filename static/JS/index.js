let nextPage=0 ;
let isLoading=false;
let keyword="";
function Attraction()
{
    fetch(`/api/attraction?page=${nextPage}`, {})
    .then((response) => {
        return response.json(); 
    }).then((jsonData) => {
        let attractionName = jsonData.data[0].name;
        let mrt = jsonData.data[0].mrt;
        let category = jsonData.data[0].category;
        let image = jsonData.data[0].images[0];
        let id = jsonData.data[0].id;
       
        for (let i=0; i<jsonData.data.length; i++)
        {
            let content=document.getElementById("content");
            let attractionLink = document.createElement("a");
            attractionLink.id = `attraction_link ${i}`;
            attractionLink.href=`/attraction/${jsonData.data[i].id}`;
            content.appendChild(attractionLink);


            let attractionDiv = document.createElement("div");
            attractionDiv.id = `attraction_content ${i}`;
            attractionLink.appendChild(attractionDiv);

            let attraction_content=document.getElementById(`attraction_content ${i}`);
            let img = document.createElement("img");
            img.id="main_photo";
            img.src = jsonData.data[i].images[0];
            attraction_content.appendChild(img);

            
            let attractionName = document.createElement("div");
            attractionName.className  = "attraction_name";

            let textName = document.createElement("p");
            nameNode = document.createTextNode(jsonData.data[i].name);   
           
            textName.appendChild(nameNode);
            attractionName.appendChild(textName);
            attraction_content.appendChild(attractionName);
            
            // 先建立information資訊 待會放mrt 和分類
            let information = document.createElement("div");
            information.id = `information ${i}`;
            attraction_content.appendChild(information);
            // 建立mrt
            let attraction_information=document.getElementById(`information ${i}`);
            let attractionMrt = document.createElement("div");
            attractionMrt.className  = "attraction_mrt";
            mrtNode = document.createTextNode(jsonData.data[i].mrt);
            // 先把節點放進div中
            attractionMrt.appendChild(mrtNode);
            // 再將資料放進attraction_content
            attraction_information.appendChild(attractionMrt);
            
            // 建立分類 放進attraction_information
            let attractionCategory = document.createElement("div");
            attractionCategory.className  = "attraction_category";
            categoryNode = document.createTextNode(jsonData.data[i].category);
            // 先把節點放進div中
            attractionCategory.appendChild(categoryNode);
            // 再將資料放進attraction_content
            attraction_information.appendChild(attractionCategory);
            if (i==jsonData.data.length-1){
                isLoading=true;
            }
        }
        if(isLoading==true){
            observer.observe(cards);   
        }
        
        nextPage = jsonData.nextPage;
    })
    
}

function apiAttraction()
{
    observer.unobserve(cards);
    document.getElementById("content").innerHTML="";
  
    let keywordElement = document.getElementById("search");
    keyword = keywordElement.value;

    fetch(`/api/attraction?keyword=${keyword}`, {})
    .then((response) => {
        return response.json(); 
    }).then((jsonData) => {
        let attractionName = jsonData.data[0].name;
        let mrt = jsonData.data[0].mrt;
        let category = jsonData.data[0].category;
        let image = jsonData.data[0].images[0];
        let id = jsonData.data[0].id;
    
        for (let i=0; i<jsonData.data.length; i++)
        {
            let content=document.getElementById("content");
         
            let attractionLink = document.createElement("a");
            attractionLink.id = `attraction_link ${i}`;
            attractionLink.href=`/attraction/${jsonData.data[i].id}`;
            content.appendChild(attractionLink);
            let attractionDiv = document.createElement("div");
            attractionDiv.id = `attraction_content ${i}`;
            attractionLink.appendChild(attractionDiv);
            // 建立圖片的容器並放在attractionDiv 容器中
            let attraction_content=document.getElementById(`attraction_content ${i}`);
            let img = document.createElement("img");
            img.id="main_photo";
            img.src = jsonData.data[i].images[0];
            // 將圖片放在attraction_content容器下面
            attraction_content.appendChild(img);

            // 建立景點名稱
            
            let attractionName = document.createElement("div");
            attractionName.className  = "attraction_name";
            // 建立<h1>
            let textName = document.createElement("p");
            nameNode = document.createTextNode(jsonData.data[i].name);   
            // 先把節點放進div中 
            textName.appendChild(nameNode);
            attractionName.appendChild(textName);
            attraction_content.appendChild(attractionName);
            
            // 先建立information資訊 待會放mrt 和分類
            let information = document.createElement("div");
            information.id = `information ${i}`;
            attraction_content.appendChild(information);
            // 建立mrt
            let attraction_information=document.getElementById(`information ${i}`);
            let attractionMrt = document.createElement("div");
            attractionMrt.className  = "attraction_mrt";
            mrtNode = document.createTextNode(jsonData.data[i].mrt);
            // 先把節點放進div中
            attractionMrt.appendChild(mrtNode);
            // 再將資料放進attraction_content
            attraction_information.appendChild(attractionMrt);
            
            // 建立分類 放進attraction_information
            let attractionCategory = document.createElement("div");
            attractionCategory.className  = "attraction_category";
            categoryNode = document.createTextNode(jsonData.data[i].category);
            // 先把節點放進div中
            attractionCategory.appendChild(categoryNode);
            // 再將資料放進attraction_content
            attraction_information.appendChild(attractionCategory);

        }
        nextPage = jsonData.nextPage;
        keyword=keywordElement.value;
        observer.observe(cards);   
    })
}
function apiCategory()
{
    fetch("/api/categories", {})
    .then((response) => {
        return response.json(); 
    }).then((jsonData) => {
        let categories = jsonData.data;
        for (let i=0; i<jsonData.data.length; i++)
        {
            let catrgory_content=document.getElementById("search_category");
            let searchCategory = document.createElement("a");
            searchCategory.className  = "search_category_content";
            searchCategory.setAttribute("onclick", "show(this);")

            searchCategory.className  = "search_category_content";
            searchcategoryNode = document.createTextNode(categories[i]);
            // 先把節點放進div中
            searchCategory.appendChild(searchcategoryNode);
            // 再將資料放進attraction_content
            catrgory_content.appendChild(searchCategory);
        }
    })

}

// 點擊顯示和隱藏
    function e(obj){return document.getElementById(obj)}
e("search").onclick=function(event){
    e("search_category").style.opacity="1";
    stopBubble(event); 
    document.onclick=function(){
    e("search_category").style.opacity="0";
        document.onclick=null;
    }
}

e("search_category").onclick=function(event){
    stopBubble(event); 
}

function stopBubble(e){  
    if(e && e.stopPropagation){
    e.stopPropagation();  //w3c
    }else{
    window.event.cancelBubble=true; //IE
    }
}

function show(e) {
    let clickValue = e.text
    document.getElementById("search").value = clickValue
}

let options = {

threshold: 1,
}

//設定call back
const callback = (entries) => 
{
        if(nextPage == null) return;
        if (entries[0].isIntersecting)
        {   
            if(nextPage!==null ){
                isLoading=true;
                fetch(`/api/attraction?page=${nextPage}&keyword=${keyword}`, {})
            .then((response) => {
                return response.json(); 
            }).then((jsonData) => {
                const attractionName = jsonData.data[0].name;
                const mrt = jsonData.data[0].mrt;
                const category = jsonData.data[0].category;
                const image = jsonData.data[0].images[0];
        
            for (let i=0; i<jsonData.data.length; i++)
            {
                const content=document.getElementById("content");
                // 新增一個連結在最外層
                let attractionLink = document.createElement("a");
                attractionLink.id = `attraction_link ${i+12*nextPage}`;
                attractionLink.href=`/attraction/${jsonData.data[i].id}`;
                content.appendChild(attractionLink);

                let attractionDiv = document.createElement("div");
                attractionDiv.id = `attraction_content ${i+12*nextPage}`;
                attractionLink.appendChild(attractionDiv);
                
                let attraction_content=document.getElementById(`attraction_content ${i+12*nextPage}`);
                let img = document.createElement("img");
                img.id="main_photo";
                img.src = jsonData.data[i].images[0];
                // 將圖片放在attraction_content容器下面
                attraction_content.appendChild(img);

                // 建立景點名稱
                
                let attractionName = document.createElement("div");
                attractionName.className  = "attraction_name";
                // 建立<h1>
                let textName = document.createElement("p");
                nameNode = document.createTextNode(jsonData.data[i].name);   
                // 先把節點放進div中 
                textName.appendChild(nameNode);
                attractionName.appendChild(textName);
                attraction_content.appendChild(attractionName);
                
                // 先建立information資訊 待會放mrt 和分類
                let information = document.createElement("div");
                information.id = `information ${i+12*nextPage}`;
                attraction_content.appendChild(information);
                // 建立mrt
                let attraction_information=document.getElementById(`information ${i+12*nextPage}`);
                let attractionMrt = document.createElement("div");
                attractionMrt.className  = "attraction_mrt";
                mrtNode = document.createTextNode(jsonData.data[i].mrt);
                // 先把節點放進div中
                attractionMrt.appendChild(mrtNode);
                // 再將資料放進attraction_content
                attraction_information.appendChild(attractionMrt);
                
                // 建立分類 放進attraction_information
                let attractionCategory = document.createElement("div");
                attractionCategory.className  = "attraction_category";
                categoryNode = document.createTextNode(jsonData.data[i].category);
                // 先把節點放進div中
                attractionCategory.appendChild(categoryNode);
                // 再將資料放進attraction_content
                attraction_information.appendChild(attractionCategory);
            } 
            nextPage = jsonData.nextPage;
            })
        }
    } 
}


Attraction();
apiCategory();
// 追蹤footer
let observer = new IntersectionObserver(callback, options)
const cards = document.querySelector("footer");