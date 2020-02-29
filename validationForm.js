function isFormGoodValidated(formField){
    x = Boolean(true);
    if(formField.title === ""){
        document.getElementById("form-title").style.border = "solid 5px red";
        x = false;
    }
    if(formField.firstImage === ""){
        document.getElementById("form-image-first").style.border = "solid 5px red";
        x = false;
    }
    if(formField.secondImage === ""){
        document.getElementById("form-image-second").style.border = "solid 5px red";
        x = false;
    }
    if(formField.ingredients === ""){
        document.getElementById("form-ingredients").style.border = "solid 5px red";
        x = false;
    }
    if(formField.instructions === ""){
        document.getElementById("form-instructions").style.border = "solid 5px red";
        x = false;
    }
    if(formField.firstImage.match(/https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g) === null){
        document.getElementById("form-image-first").style.border = "solid 5px red";
        x = false;
    }
    if(formField.secondImage.match(/https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g) === null){
        document.getElementById("form-image-second").style.border = "solid 5px red";
        x = false;
    }
    return x;
}

$(document).ready(function() {

    //Check is input is empty
    $("input").focusout(function() {
        if($(this).val()==='') $(this).css('border', 'solid 5px red');
        else $(this).css('border', 'solid 5px green');
    });

    //Regex Image URL
    $("#form-image-first").focusout(function(){
        if($(this).val().match(/https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g) === null) $(this).css('border', 'solid 5px red');
        else $(this).css('border', 'solid 5px green');
    });

    //Regex Image URL
    $("#form-image-second").focusout(function(){
        if($(this).val().match(/https?:[\/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g) === null) $(this).css('border', 'solid 5px red');
        else $(this).css('border', 'solid 5px green');
    })

    //Check is textarea is empty
    $("textarea").focusout(function() {
        if($(this).val()==='') $(this).css('border', 'solid 5px red');
        else $(this).css('border', 'solid 5px green');
    });
});