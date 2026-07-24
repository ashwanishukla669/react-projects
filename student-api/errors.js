function first() {
    second();
}

function second() {
    third();
}

function third() {
    throw new Error("Boom!");
}

first(); 