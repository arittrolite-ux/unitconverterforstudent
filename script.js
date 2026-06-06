function cmToMeter(){
    let cm = document.getElementById("cm").value;
    document.getElementById("cmResult").innerHTML =
    (cm/100) + " m";
}

function kgToGram(){
    let kg = document.getElementById("kg").value;
    document.getElementById("kgResult").innerHTML =
    (kg*1000) + " g";
}

function cToF(){
    let c = document.getElementById("celsius").value;
    document.getElementById("tempResult").innerHTML =
    ((c*9/5)+32) + " °F";
}

function mpaToPsi(){
    let m = document.getElementById("mpa").value;
    document.getElementById("mpaResult").innerHTML =
    (m*145.038).toFixed(2) + " psi";
}
