// 點擊或關閉註冊和登入div
function openLogin() {
    let element = document.getElementById("overlay_login")
    element.style.display = "block"
}
function closeLogin() {
    let element = document.getElementById("overlay_login")
    element.style.display = "none"
} 

function openSignup() {
    let element = document.getElementById("overlay_signup")
    element.style.display = "block"
}
function closeSignup() {
    let element = document.getElementById("overlay_signup")
    element.style.display = "none"
} 
// 註冊系統
function apiSingup(){
    const nameElement = document.getElementById("input_signup_name");
    const name = nameElement.value;
    const emailElement = document.getElementById("input_signup_email");
    const email = emailElement.value;
    const passwordElement = document.getElementById("input_signup_password");
    const password = passwordElement.value;
    let data=
        {
            name:name,
            email:email,
            password:password
        };
    fetch("/api/user",{
        method: "POST" ,
        credentials: "include",
        body:JSON.stringify(data),
        cache:"no-cache",
        headers:new Headers({
            "content-type":"application/json"
        })
    })
    .then((response) => {
        return response.json(); 
    }).then((jsonData) => {
       
        if(jsonData.error==true){
            document.getElementById("signup_message").innerHTML = jsonData.message ;
        }
        if(jsonData.ok==true){
            document.getElementById("signup_message").innerHTML = "註冊成功" ;
            document.getElementById("login_btn").style.margin="0px";

        }
    })
}
// 登入系統的js 
function apiSingin()
{
    const emailElement = document.getElementById("input_email");
    const email = emailElement.value;
    const passwordElement = document.getElementById("input_password");
    const password = passwordElement.value;

    let data=
        {
            email:email,
            password:password
        };
   
    fetch("/api/user/auth",{
        method: "PUT" ,
        credentials: "include",
        body:JSON.stringify(data),
        cache:"no-cache",
        headers:new Headers({
            "content-type":"application/json"
        })
    })
    .then(function(response){
        if(response.status ==400){
           
            document.getElementById("signin_message").innerHTML = "帳號密碼有誤"
            return ;
        }
        if(response.status ==200){
            response.json().then(function(data){
                window.location.replace(location.href)
            })
        }

    })
    
}
let bookingName="";
let bookingEmail="";
function check()
{
    fetch("/api/user/auth",{
        method: "GET" ,
    })
    .then((response) => {
        return response.json(); 
    }).then((jsonData) => {
        
        bookingName=jsonData.data.name
        bookingEmail=jsonData.data.email
        
        if(jsonData.data!=false){
            let element = document.querySelector(".right_login")
            element.style.display="none"
            let signoutElement = document.querySelector(".right_logout")
            signoutElement.style.display="block"
            signoutElement.style.display="flex"

        }
        else{
            let element = document.querySelector(".right_login")
            element.style.display="block"
            element.style.display="flex"
            let signoutElement = document.querySelector(".right_logout")
            signoutElement.style.display="none"
            
        }
        
    })
}
check()
// 登出系統
function logout()
{
    fetch("/api/user/auth",{
        method: "DELETE" ,
    })
    .then((response) => {
        return response.json(); 
    }).then((jsonData) => {
        window.location.replace(location.href)
        
    })
}

// 預約行程
function reservation()
{
    // 要先確認是否有登入！
    const loginOrnot = document.querySelector(".right_logout");
    const login = loginOrnot.style.display;
    if(login=="none"){
        openLogin();
        return
    }
   
    // 如有登入就跳轉到booking
    window.location.replace("/booking");

}

function member() {
 
    const loginOrnot = document.querySelector(".right_logout");
    const login = loginOrnot.style.display;

    if (login == "none") {
        openLogin();
        return
    }
    window.location.replace("/member");
}
