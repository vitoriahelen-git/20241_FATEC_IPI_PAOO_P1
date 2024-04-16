require('dotenv').config()
const axios = require ('axios')

const lerInput = require('readline').createInterface({
    input: process.stdin, 
    output: process.stdout
})

const{
    APPID,  
    URL_BASE, 
    URL_BASE2, 
    LANGUAGE,
    UNITS
} = process.env

lerInput.question('Digite o nome da Cidade: ', (Q) => {    
    const url = `${URL_BASE}?appid=${APPID}&q=${Q}`
    
    axios.get(url)
    .then(res => {
        const lat=res.data[0].lat
        const lon=res.data[0].lon
        console.log("LATITUDE:", lat)
        console.log("LONGITUDE:", lon)
        
        const url2 = `${URL_BASE2}?lat=${lat}&lon=${lon}&appid=${APPID}&lang=${LANGUAGE}&units=${UNITS}`
        axios.get(url2)
        .then(res => {
            console.log("Sensacao Termica:", res.data.main.feels_like)
            console.log("Descricao:", res.data.weather[0].description)
        })
    })
    .catch(res => {
        console.log("Cidade nao encontrada")
    })
    lerInput.close(); 
})


