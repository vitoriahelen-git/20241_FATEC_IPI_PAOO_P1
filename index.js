require('dotenv').config()
const axios = require ('axios')

const lerInput = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const{
    APPID,  
    URL_BASE, 
    URL_BASE2, 
    LANGUAGE,
    UNITS
} = process.env

async function obterCoords(Q) {
    const url = `${URL_BASE}?q=${Q}&appid=${APPID}`;

    try{
        const res = await axios.get(url);
        const lat = res.data[0].lat;
        const lon = res.data[0].lon;
        console.log("LATITUDE:", lat);
        console.log("LONGITUDE:", lon);
        return { lat, lon };
    } catch(error) {
        console.log("Cidade não encontrada.");
        throw error;
    }
}

async function obterPrevisao(lat, lon) {
    const url = `${URL_BASE2}?lat=${lat}&lon=${lon}&appid=${APPID}&lang=${LANGUAGE}&units=${UNITS}`;
    const res = await axios.get(url);
    console.log("Sensação Térmica:", res.data.main.feels_like);
    console.log("Descrição:", res.data.weather[0].description);
}

lerInput.question('Digite o nome da Cidade: ', async (Q) => {  
    try{
        const { lat, lon } = await obterCoords(Q);
        obterPrevisao(lat, lon);
    } catch (error) {
        console.error("Digite uma cidade existente!");
    } 
    lerInput.close();
});
