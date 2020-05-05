$(()=>{
    $('#added').hide()
    let username,firstName,lastName,phoneNumber,refferalCount,answerCount,points = 0
    let answerPoints,referralPoints
    $('#check').click(async ()=>{
        await $.get('/info/points',(data)=>{
            answerPoints = data.answerPoints
            referralPoints = data.referralPoints
        })
        await $.get('/admin/user',{
            username:$('#username').val()
        },(data)=>{
            username = data.username,
            firstName = data.firstName,
            lastName = data.lastName,
            phoneNumber = data.phoneNumber,
            refferalCount = data.progress.refferalCount,
            answerCount = data.progress.answerCount
        }) 

        points = refferalCount*referralPoints + answerCount*answerPoints
        $('#username').text(username)
        $('#firstName').text(firstName)
        $('#phoneNumber').text(phoneNumber)
        $('#refferalCount').text(refferalCount)
        $('#lastName').text(lastName)
        $('#answerCount').text(answerCount)
        $('#points').text(points)

    })
    $('#submit').click(()=>{
        $.post('/admin/question',{
            text:$('#text').val(),
            option1:$('#option1').val(),
            option2:$('#option2').val(),
            option3:$('#option3').val(),
            option4:$('#option4').val(),
            answer:$('#answer').val()
        },(data)=>{
            if(data){
                $('#added').show()
            }
        })
    })
})