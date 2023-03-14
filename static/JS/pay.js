TPDirect.setupSDK(126894, 'app_TbhG83ITvarr5gPXJQMDN3JZyJw7Ld6mQ36Y1g3voZw19TlSz90p5m4fhes2', 'sandbox')
TPDirect.card.setup({
    fields: {
        number: {
            element: '#card-number',
            placeholder: '**** **** **** ****'
        },
        expirationDate: {
            element: document.getElementById('card-expiration-date'),
            placeholder: 'MM / YY'
        },
        ccv: {
            element: '#card-ccv',
            placeholder: 'ccv'
        }
    },
    styles: {
        'input': {
            'color': 'gray'
        },
        'input.ccv': {
            // 'font-size': '16px'
        },
        ':focus': {
            'color': 'black'
        },
        '.valid': {
            'color': 'green'
        },
        '.invalid': {
            'color': 'red'
        },
        '@media screen and (max-width: 400px)': {
            'input': {
                'color': 'orange'
            }
        }
    },
    // 此設定會顯示卡號輸入正確後，會顯示前六後四碼信用卡卡號
    isMaskCreditCardNumber: true,
    maskCreditCardNumberRange: {
        beginIndex: 6, 
        endIndex: 11
    }
})

var submitButton = document.querySelector('.tpfield')

function onSubmit(event) {
    event.preventDefault()

    // 取得 TapPay Fields 的 status
    const tappayStatus = TPDirect.card.getTappayFieldsStatus()

    // 確認是否可以 getPrime
    if (tappayStatus.canGetPrime === false) {
        alert('can not get prime')
        return
    }

    // Get prime
    TPDirect.card.getPrime((result) => {
        if (result.status !== 0) {
            console.log('get prime error ' + result.msg)
            return
        }
        const bookingnameElement= document.getElementById("input_contact_name");
        const bookingName = bookingnameElement.value;
        const bookingemailElement = document.getElementById("input_contact_mail");
        const bookingEmail = bookingemailElement.value;
        const bookingphoneElement = document.getElementById("input_contact_phone");
        const bookingPhone = bookingphoneElement.value;
        data = {
            "prime": result.card.prime,
            "order":{
                "price":total_price,
                "trip":attractionName,
                "contact":{
                    "name":bookingName,
                    "email":bookingEmail,
                    "phone":bookingPhone
                }
            }
        };
        fetch("/api/orders",{
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
           if (jsonData.data != null) {
            console.log(jsonData.data.number,"訂單編號")
            window.location.href = `/thankyou?number=${jsonData.data.number}`;
            }
        })
    })
}