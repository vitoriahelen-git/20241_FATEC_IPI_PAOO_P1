require('dotenv').config()
const axios = require ('axios')

const lerInput = require('readline').createInterface({
    input: process.stdin, 
    output: process.stdout
})

const{
    APPID,  
    URL_BASE
} = process.env

lerInput.question('Digite o nome da Cidade: ', (Q) => {    
    const url = `${URL_BASE}?appid=${APPID}&q=${Q}`
    
    axios.get(url)
    .then(res => {
        console.log("LATITUDE:", res.data[0].lat)
        console.log("LONGITUDE:", res.data[0].lon)
    
        lerInput.close(); 
    })
})


