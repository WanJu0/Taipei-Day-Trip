function reservation() {
    // 要先確認是否有登入！
    const loginOrnot = document.querySelector(".right_logout");
    const login = loginOrnot.style.display;

    if (login == "none") {
        openLogin();
        return
    }
   
    window.location.replace("/booking");
}

fetch("/api/user/auth", {
        method: "GET",
    })
    .then((response) => {
        
        return response.json();
    }).then((jsonData) => {
        if (jsonData.data == false) {
          
            window.location.href = "/";
        }
       
        document.getElementById("booking_name").innerHTML = "您好 , " + bookingName + " ,待預定的行程如下"
      
        document.getElementById("input_contact_name").value = bookingName;
        document.getElementById("input_contact_mail").value = bookingEmail;
    })

let total_price = 0;

let attractionName ="";
fetch("/api/booking", {})
    .then((response) => {
       
        return response.json();
    }).then((jsonData) => {
        if (jsonData.data == "") {

            document.querySelector("#booking_content").innerHTML = "您沒有預定任何一個行程"
            const bookingShow = document.getElementById("contact")
            bookingShow.style.display = "none"
            const bookingCredit = document.getElementById("credit")
            bookingCredit.style.display = "none"
            const bookingLine = document.querySelectorAll(".separator_line")
            for (var i = 0; i < bookingLine.length; i++) {
                bookingLine[i].style.border = "none";
            }
            const bookingPrice = document.getElementById("all_reservation")
            bookingPrice.style.display = "none"

        }
        attractionName = jsonData.data;
        for (let i = 0; i < jsonData.data.length; i++) {
            const content = document.getElementById("booking_content");
            const bookingDiv = document.createElement("div");
            bookingDiv.id = `booking_detail ${i}`;
            content.appendChild(bookingDiv);

            const attraction_content = document.getElementById(`booking_detail ${i}`);
            const img = document.createElement("img");
            img.id = "booking_photo";
            img.src = jsonData.data[i].attraction.image;
            attraction_content.appendChild(img);

           
            const informationElement = document.createElement("div");
            informationElement.id = `booking_information ${i}`;
            attraction_content.appendChild(informationElement);

            // information底下建立booking_attraction
            const informationDiv = document.getElementById(`booking_information ${i}`);
            // 建立booking_attraction
            const bookingAttraction = document.createElement("div");
            bookingAttraction.id = "booking_attraction";
            const attractionNode = document.createTextNode("台北一日遊 : " + jsonData.data[i].attraction.name);
            bookingAttraction.appendChild(attractionNode);
            informationDiv.appendChild(bookingAttraction);
            // 建立booking_date
            const bookingDate = document.createElement("div");
            bookingDate.id = `booking_date ${i}`;
            const dateNode = document.createTextNode("日期 : ");
            bookingDate.appendChild(dateNode);
            informationDiv.appendChild(bookingDate);
            // 建立booking_time
            const bookingTime = document.createElement("div");
            bookingTime.id = `booking_time ${i}`;
            const timeNode = document.createTextNode("時間 : ");
            bookingTime.appendChild(timeNode);
            informationDiv.appendChild(bookingTime);
            // 建立booking_cost
            const bookingCost = document.createElement("div");
            bookingCost.id = `booking_cost ${i}`;
            const costNode = document.createTextNode("費用 : ");
            bookingCost.appendChild(costNode);
            informationDiv.appendChild(bookingCost);
            // 建立booking_location
            const bookingLocation = document.createElement("div");
            bookingLocation.id = `booking_location ${i}`;
            const locationNode = document.createTextNode("地點 : ");
            bookingLocation.appendChild(locationNode);
            informationDiv.appendChild(bookingLocation);

            // 加入資訊內容

            const addDate = document.getElementById(`booking_date ${i}`);
            // 新增一個連結在最外層
            const addDatediv = document.createElement("div");
            addDatediv.id = "add_Date";
            const adddateNode = document.createTextNode(jsonData.data[i].date);
            addDatediv.appendChild(adddateNode);
            addDate.appendChild(addDatediv);

            //  加入時間
            if (jsonData.data[i].time == "afternoon") {
                const addTime = document.getElementById(`booking_time ${i}`);
                // 新增一個連結在最外層
                const addTimediv = document.createElement("div");
                addTimediv.id = "add_time";
                const addtimeNode = document.createTextNode("下午1點到5點");
                addTimediv.appendChild(addtimeNode);
                addTime.appendChild(addTimediv);
            }
            if (jsonData.data[i].time == "morning") {
                const addTime = document.getElementById(`booking_time ${i}`);
                // 新增一個連結在最外層
                const addTimediv = document.createElement("div");
                addTimediv.id = "add_time";
                const addtimeNode = document.createTextNode("上午9點到12點");
                addTimediv.appendChild(addtimeNode);
                addTime.appendChild(addTimediv);
            }
            // 加入價錢資訊
            const addCost = document.getElementById(`booking_cost ${i}`);
            const addCostdiv = document.createElement("div");
            addCostdiv.id = "add_cost";
            const addcostNode = document.createTextNode(jsonData.data[i].price);
            addCostdiv.appendChild(addcostNode);
            addCost.appendChild(addCostdiv);

            // 地點內容
            const addLocation = document.getElementById(`booking_location ${i}`);
            const addLocationdiv = document.createElement("div");
            addLocationdiv.id = "add_cost";
            const addlocationNode = document.createTextNode(jsonData.data[i].attraction.address);
            addLocationdiv.appendChild(addlocationNode);
            addLocation.appendChild(addLocationdiv);

            // 加入刪除圖示
            const trashDiv = document.getElementById(`booking_information ${i}`);
            const trashImg = document.createElement("img");
            trashImg.id = "trash_icon";
            trashImg.setAttribute("src", `/static/images/icon_delete.png`);
            trashImg.setAttribute("onclick", `bookingDelete()`);
           
            trashDiv.appendChild(trashImg);

           
            total_price = total_price + jsonData.data[i].price;
            document.getElementById("total").innerHTML = "總價新台幣 : " + total_price + "元";

        }
    })

let reservationID = "";

function bookingDelete() {
    // 將#booking_content整個監聽
    var el = document.querySelector('#booking_content');
    el.onclick = function(e) {
        trashParent = e.target.parentNode.id
        strAry = trashParent.split(" ");
        let indexID = strAry[1];
      
        fetch("/api/booking", {})
            .then((response) => {
               
                return response.json();
            }).then((jsonData) => {

                reservationID = jsonData.data[indexID].reservationID
               
                data = {
                    reservationID: reservationID,
                };
                fetch("/api/booking", {
                        method: "DELETE",
                        body: JSON.stringify(data),
                        cache: "no-cache",
                        headers: new Headers({
                            "content-type": "application/json"
                        })
                    })
                    .then((response) => {
                       
                        return response.json();
                    }).then((jsonData) => {
                        if (jsonData.ok == true) {
                          
                            window.location.href = "/booking";
                        }
                    })
            })
    }

}