$(()=>{
    let username,firstName,lastName,phoneNumber,refferalCount,answerCount,points = 0
    let answerPoints,referralPoints
    $('#check').click(async ()=>{
        await $.get('/info/points',(data)=>{
            // console.log(data)
            answerPoints = data.answerPoints
            referralPoints = data.referralPoints
        })
        await $.get('/info',(data)=>{
            console.log(data)
            username = data.username,
            firstName = data.firstName,
            lastName = data.lastName,
            phoneNumber = data.phoneNumber,
            refferalCount = data.progress.refferalCount,
            answerCount = data.progress.answerCount
        }) 

        points = refferalCount*referralPoints + answerCount*answerPoints
        // console.log(points)
        $('#username').text(username)
        $('#firstName').text(firstName)
        $('#phoneNumber').text(phoneNumber)
        $('#refferalCount').text(refferalCount)
        $('#lastName').text(lastName)
        $('#answerCount').text(answerCount)
        $('#points').text(points)

    })
    
    $('#loginPage').click(()=>{
        
    })
})