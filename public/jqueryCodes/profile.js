$(async()=>{
    let username,firstName,lastName,phoneNumber,refferalCount,answerCount,points
    await $.get('/info',(data)=>{
        username = data.username,
        firstName = data.firstName,
        lastName = data.lastName,
        phoneNumber = data.phoneNumber,
        refferalCount = data.progress.refferalCount,
        answerCount = data.progress.answerCount,
        points = data.progress.points
    }) 
    $('#username').text(username)
    $('#firstName').text(firstName)
    $('#phoneNumber').text(phoneNumber)
    $('#refferalCount').text(refferalCount)
    $('#lastName').text(lastName)
    $('#answerCount').text(answerCount)
    $('#points').text(points)

})