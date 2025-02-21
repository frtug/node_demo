import * as fs  from 'fs'

export function serverHandler(req,res){
    console.log("I am the server")
    // console.log(req)
    // TODO -> filter the request event

    // res.writeHead(201,{"Content-Type":"text/plain"})
    
    console.log(req.url)
    console.log(req.method)
    const url = req.url;
    const method = req.method;
    if(url === '/name' && method === 'POST'){
        const body = [];
        req.on('data',(chunk)=>{
            console.log(chunk)
            body.push(chunk)
        })
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody)
            const name = parsedBody.split("=")[1]
            fs.writeFile('name.txt',name,err=>{
                res.statusCode = 302
                res.setHeader('location','/')
                res.end();
            })
        })
        return 

    }
        
        // process.exit()
    
    res.statusCode = 200;
    res.setHeader('Content-type',"text/html")
    res.write("<div>")
    res.write("<h1>Form</h1>")
    res.write("<form action='/name' method='POST'><input placeholder='Enter the name' name='name'/> <button type='submit'> Submit</form>")

    res.write("<div>")
    res.end()
}