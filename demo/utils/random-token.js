module.exports = async (number)=>{
    const { nanoid } = await import("nanoid");
    return nanoid(number);

}