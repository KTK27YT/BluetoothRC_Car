console.log("I am alive~");
const ip = "http://localhost:3000/"
let writer;
let textEncoder;
let port;
let writeableStreamClosed;

async function disconnect(){
    $(".connect-panel").removeClass("text-bg-dark");
    $("#connect-info").text("Disconnecting..");
    $(".connect-panel").addClass("blinkred");
    writer.close();
    await writableStreamClosed;
    let info = await port.getInfo();
    console.log(info);
    port.close();
    $("#connect-info").text("Disconnected");
    $(".connect-panel").removeClass("blinkred");
    $(".connect-panel").css("background-color", "#212529");
    $(".connect-panel").addClass("text-bg-dark");
}

async function connect() {
    port = await navigator.serial.requestPort();
    //Set baud rate to 9600 and open port
    $(".connect-panel").css("background-color", "#212529");
    $("#connect-info").text("Connecting...");
    $(".connect-panel").removeClass("text-bg-dark");
    $(".connect-panel").addClass("blink");
    console.log(port);
    try {
        await port.open({ baudRate: 9600 });
        textEncoder = new TextEncoderStream();
        writableStreamClosed = textEncoder.readable.pipeTo(port.writable);

        writer = textEncoder.writable.getWriter();
        let info = await port.getInfo();
        console.log(info);
        console.log(port);
        $('#connect-info').text("Connected");
        $(".connect-panel").removeClass("blink");
        $(".connect-panel").css("color", "white");
        $(".connect-panel").css("background-color", "#198754");
        $("#connect-extra").text("");
    } catch (e) {
        // alert(e);
        $("#connect-extra").text(e);
        $("#connect-extra").css("color", "white");
        $('#connect-info').text("Failed to connect");
        $('#connect-info').css("color", "white");
        $(".connect-panel").removeClass("blink");
        $(".connect-panel").css("background-color", "#dc3545");
        $("#disconnect").remove();
    }    
}

async function left(){
    console.log("up");
    await writer.write("W");
}

async function up(){
    console.log("left");
    await writer.write("A");
}
async function right(){
    console.log("down");
    await writer.write("S");

}
async function down(){
    console.log("right");
    await writer.write("D");
}
function stop(){
    $.get(ip + "stop", function(data, status, xhr){
        outputpanelcss(status);
        $("#response-text").text(data);
    });
}
function primarybtnclickcss(id, stop){
    if(stop) {
        $(id).addClass("activated-red");
        setTimeout(function() {
           $(id).removeClass("activated-red");
          }, 200);
        return;
    } else {$(id).addClass("activated");
    setTimeout(function() {
       $(id).removeClass("activated");
      }, 200);}
    
}
function outputpanelcss(status){
    if (status === "success"){
        $("#output-panel").removeClass("bg-danger");
           $("#output-panel").removeClass("text-white");
        $("#output-panel").addClass("bg-success");
        $("#output-panel").addClass("text-white");
    } else if (status === "error"){
        $("#output-panel").removeClass("bg-success");
           $("#output-panel").removeClass("text-white");
        $("#output-panel").addClass("bg-danger");
        $("#output-panel").addClass("text-white");
    }
}


//This script here shows the key that was pressed
// in the element called key-text
$(document).ready(function(){
    $(document).keydown(function(event){
        const key = event.key.toUpperCase();
        $("#key-text").text(key);
        switch(key){
            case "W":
                $("#up").trigger("click");
                primarybtnclickcss("#up", false);
                break;
            case "A":
                $("#left").trigger("click");
                primarybtnclickcss("#left", false);
                break;
            case "S":
                $("#down").trigger("click");
                primarybtnclickcss("#down", false);
                break;
            case "D":
                $("#right").trigger("click");
                primarybtnclickcss("#right", false);
                break;
            case "F":
                $("#stop").trigger("click");
                primarybtnclickcss("#stop", true);
                break;
        }
    });
    $.get(ip + "led", function(data, status, xhr){
        outputpanelcss(status);
        $("#response-text").text(data);
    });
});