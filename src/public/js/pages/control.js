function formsBackgroundHidden() {
    const element = document.getElementById('forms-background');
    element.style = "display: none;"
}

function changeTitle() {
    const background = document.getElementById('forms-background');
    background.style = 'display: block;';
    hidenAllForms();
    const fromDevice = document.getElementById('form-editName-device');
    fromDevice.style = 'display: block;';
}

function hidenAllForms() {
    const fromDevice = document.getElementById('form-editName-device');
    const fromA = document.getElementById('form-editNameOption-a');
    const fromB = document.getElementById('form-editNameOption-b');
    const fromC = document.getElementById('form-editNameOption-c');
    const fromD = document.getElementById('form-editNameOption-d');
    const fromE = document.getElementById('form-editNameOption-e');
    fromDevice.style = 'display: none;';
    fromA.style = 'display: none;';
    fromB.style = 'display: none;';
    fromC.style = 'display: none;';
    fromD.style = 'display: none;';
    fromE.style = 'display: none;';
}

function editNameOption(option) {
    const background = document.getElementById('forms-background');
    background.style = 'display: block;';
    hidenAllForms();
    const fromA = document.getElementById('form-editNameOption-a');
    const fromB = document.getElementById('form-editNameOption-b');
    const fromC = document.getElementById('form-editNameOption-c');
    const fromD = document.getElementById('form-editNameOption-d');
    const fromE = document.getElementById('form-editNameOption-e');
    if (option == 'A') fromA.style = 'display: block;';
    if (option == 'B') fromB.style = 'display: block;';
    if (option == 'C') fromC.style = 'display: block;';
    if (option == 'D') fromD.style = 'display: block;';
    if (option == 'E') fromE.style = 'display: block;';
}