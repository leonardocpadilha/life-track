const inputData = document.getElementById('inputDate');

if (inputData) {
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('en-CA');
    inputData.value = dataFormatada;
}