$(()=>{
    $('#div2').hide()
    $('#button2').hide()
    $('#enterOTP').hide()
    $('#button3').hide()
    $('#button1').click(()=>{
        let firstName = $('#firstName').val()
        let lastName = $('#lastName').val()
        let phoneNumber  = $('#phoneNumber').val()
        let password = $('#password').val()
        let username = $('#username').val()
        $.post('/login/sendOTP',{
            phoneNumber:phoneNumber,
        },(data)=>{
            if(data.type=='success'){
                $('#button1').hide()
                $('#button2').show()
                $('#enterOTP').show()
                $('#button3').show()
            }
            else{
                // error message in STRING format is send back
            }
        })
    })
    $('#button2').click(()=>{
        $.post('/login/verifyOTP',{
            phoneNumber:$('#phoneNumber').val(),
            otp:$('#enterOTP').val()
        },(data)=>{
            if(data.type=='success'){
                let firstName = $('#firstName').val()
                let lastName = $('#lastName').val()
                let phoneNumber  = $('#phoneNumber').val()
                let password = $('#password').val()
                let username = $('#username').val()
                $('#div1').hide()
                $('#div2').show()
                $.post('/root/signup',{
                    username: username,
                    password: password,
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber
                })
            }
            else{
                // error message in STRING format is send back
            }
        })
    })

    $('button3').post('/login/resendOTP',(req,res)=>{
        phoneNumber:$('#phoneNumber').val()
    })

})