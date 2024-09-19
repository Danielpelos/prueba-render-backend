const generarId = () =>{
    const randow = Math.random().toString(32).substring(2)
    const fecha = Date.now().toString(32)
    return randow + fecha
}
export default generarId