$(()=>{
    $('#div1').hide()
    $('#next').hide()
    $('#check').hide()
    $('#correct').hide()
    $('#wrong').hide()
    $('#view').click(()=>{
        
        $.get('/questions',(data)=>{

            $('#question').text(data.text)
            $('#a').text(data.option1)
            $('#b').text(data.option2)
            $('#c').text(data.option3)
            $('#d').text(data.option4)
        })
        $('#div1').show()
        $('#view').hide()
        $('#check').show()
    })
    $('#check').click(async ()=>{
        let userInput = $('#answer').val()
        let answer
        await $.get('/questions',(data)=>{
            answer = data.answer
        })

        if(userInput==answer){
            $.post('/questions/check',{
                answer:true,
            })
            $('#correct').show()
        }
        else{
            $.post('/questions/check',{
                answer:false,
            })
            $('#wrong').show()
        }
        $('#check').hide()
        $('#next').show()
    })

    $('#next').click(()=>{
        $.get('/questions',(data)=>{
            $('#question').text(data.text)
            $('#a').text(data.option1)
            $('#b').text(data.option2)
            $('#c').text(data.option3)
            $('#d').text(data.option4)
        })
        $('#view').hide()
        $('#next').hide()
        $('#check').show()
        $('#correct').hide()
        $('#wrong').hide()
        $('#answer').val("")
    })

})