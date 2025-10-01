const { error } = require('console')
const express=require('express')
const app=express()
const port=8000
app.use(express.json())
let pessoas=[
    {id:1, nome: 'pessoa 1'},
    {id:2, nome: 'pessoa 2'},
    {id:3, nome: 'pessoa 3'}
]
app.get('/pessoas',(req,res)=>{
res.json(pessoas)
})
//buscar
app.get('/pessoas/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const pessoa= pessoas.find(p=>p.id===id)    
    if(pessoa){
    res.json(pessoa)
}
else{
    res.status(400).json({error: 'pessoa n encontrada'})
}
})
//inserir
app.post('/pessoas', (req,res)=>{
    const nome=req.body
    const novapessoa={id: pessoas.length + 1, nome}
    pessoas.push(novapessoa)
    res.status(201).json(novapessoa)
})
//atualizar
app.put('/pessoas/:id',(req,res)=>{
    const id= parseInt(req.params.id)
    const {nome}=req.body
    const pessoa=pessoas.find(p=>p.id===id)
    if(pessoa){
       pessoa.nome=nome
       res.json(pessoa)
    }else{
     res.status(404).json({error:'pessoa n encontrada'})
    }

})
//deletar
app.delete('/pessoas/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const index=pessoas.findIndex(p=> p.id===id)
    if(index!==-1){
        const pessoadelete=pessoas.splice(index, 1)
        res.json(pessoadelete[0])
    }else{
        res.status(404).json({
            error:'pessoa n encontrada'
        })
    }
})
app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})