let timer={
    minute: 0,
    second: 0,
    id:0
}

function alarm(){
    let n=3
    let sound= new Audio("Timer_Sound_Effect.mp3")
    function play(){
        sound.pause();
        sound.currentTime=0;
        sound.play();
    }
    for(let i=0; i<n; i++){
        setTimeout(play,1200*i)
    }
    
}

function updateValue(key,value){
    if(value<0){
        value=0
    }
    if(key=="second"){
        if(value<10){
            value="0"+value
        }
        if(value>59){
            value=59
        }
    }
    $("#"+key).html(value || 0)
    timer[key]=value
}

(function detectChange(key){
    let input="#"+key+"-input"
    $(input).change(function(){
        updateValue(key,$(input).val())
    })
    $(input).keyup(function(){
        updateValue(key,$(input).val())
    })
    return arguments.callee
})("minute")("second")

function startTimer(){
    buttonManager(["start",false],["stop",true],["pause",true])
    freezeInputs()

    timer.id=setInterval(function(){
        timer.second--
        if(timer.second<0){
            if(timer.minute==0){
                alarm()
                return stopTimer()
            }
            timer.second=59
            timer.minute--
        }
        updateValue("minute",timer.minute)
        updateValue("second",timer.second)
    },1000)
}

function stopTimer(){
    clearInterval(timer.id)
    buttonManager(["start",true],["stop",false],["pause",false])
    unfreezeInputs()
    updateValue("minute",$("#minute-input").val())
    updateValue("second",$("#second-input").val())
}

function pauseTimer(){
    buttonManager(["start",true],["stop",true],["pause",false])
    clearInterval(timer.id)
}

function buttonManager(...bArray){
    for(let i=0;i<bArray.length;i++){
        let button="#"+bArray[i][0]
        if(bArray[i][1]){
            $(button).removeAttr("disabled")
        }else{
            $(button).attr("disabled","disabled")
        }

    }
}

function freezeInputs(){
    $("#minute-input").attr("disabled","disabled")
    $("#second-input").attr("disabled","disabled")
}

function unfreezeInputs(){
    $("#minute-input").removeAttr("disabled")
    $("#second-input").removeAttr("disabled")
}

function swapStyle(){
    if(document.getElementById("style").getAttribute("href")=="defstyle.css"){
        document.getElementById("style").setAttribute("href","darkstyle.css")
    }
    else{
        document.getElementById("style").setAttribute("href","defstyle.css")
    }
    
}