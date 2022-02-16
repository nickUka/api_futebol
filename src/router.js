const express = require("express");
const router = express.Router();
const DB = require("./times");

//Cadastro de Times
router.post("/times/novoTime", (req, res) => {
    const {
        nome,
        cidade,
        estado,
        serie, 
        titles,
        folhaPagamento,
    } = req.body;

    if (nome != undefined&& cidade!= undefined && estado!= undefined && titles.estadual!= undefined && titles.nacional != undefined&& titles.internacional!= undefined && folhaPagamento != undefined){
        const id = DB.times.length + 1;
        DB.times.push({
            id,
            nome,
            cidade,
            estado,
            serie,
            titles,
            folhaPagamento,
        });
        return res.status(200).json({ msg: "Time adicionado com sucesso."});
    } else {
       return res.status(400).json({ msg: "Faltam informações" });
    }
});

router.put("/times/:id", (req, res) => {
    if(isNaN(parseInt(req.params.id))){
        return res.sendStatus(400);
    } else{
        const id = parseInt(req.params.id);
        const time = DB.times.find((time) => time.id == id);
        if (time != undefined){
            const {
                nome,
                cidade,
                estado,
                serie, 
                titles,
                folhaPagamento,
            } = req.body;

            time.nome = nome ?? time.nome;
            time.cidade = cidade ?? time.cidade;
            time.estado = estado ?? time.estado;
            time.serie = serie ?? time.serie;
            if(titles != undefined){
                time.titles.estadual = titles.estadual ?? time.titles.estadual;
                time.titles.nacional = titles.nacional ?? time.titles.nacional;
                time.titles.internacional = titles.internacional ?? time.titles.internacional;
            }
            time.folhaPagamento = folhaPagamento ?? time.folhaPagamento;

           return res.status(200).json({time: time, msg: 'Time editado.'});
        } else {
            return res.status(404).json({ msg: "Time não existe." });
        }
    }
});

router.delete("/times/:id", (req, res) => {
    if(isNaN(parseInt(req.params.id))){
        return res.sendStatus(400);
    } else{
        const id = parseInt(req.params.id);
        const index = DB.times.findIndex(time => time.id == id);
        if (index == -1)
            return res.sendStatus(404).json({msg: 'Time não existe.'});
        else{
            DB.times.splice(index, 1);
            return res.sendStatus(200).json({msg: 'Time Excluído.'});
        }
    }
 });

//Listagem de todos os times cadastrados
router.get("/times", (req, res) => {
   return res.json(DB.times);
});

//Pesquisa de time por nome
router.get("/times/:nome", (req, res) => {
    const nome = req.params.nome;
    const time = DB.times.find((c) => c.nome == nome);
    if (time != undefined){
       return res.status(200).json(time);
    } else {
        return res.status(404).json({ msg: "Time não existe." });
    }
});




module.exports = router;