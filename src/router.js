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
        titles: { estadual, nacional, internacional },
        folhaPagamento,
    } = req.body;
    if (nome && cidade && estado && titles.estadual && titles.nacional && titles.internacional && folhaPagamento != undefined){
        const id = DB.times.length + 1;
        DB.times.push({
            id,
            nome,
            cidade,
            estado,
            serie,
            titles: { estadual, nacional, internacional },
            folhaPagamento,
        });
        res.status(200).json({ msg: "Time adicionado com sucesso."});
    } else {
        res.status(400).json({ msg: "Faltam informações" });
    }
});


//Listagem de todos os times cadastrados
router.get("/times", (req, res) => {
    res.json(DB.times);
});

//Pesquisa de time por nome
router.get("/times/:nome", (req, res) => {
    const nome = req.params.nome;
    const time = DB.times.find((c) => c.nome == nome);
    if (time != undefined){
        res.status(200).json(time);
    } else {
           res.status(404).json({ msg: "Time não existe." });
    }
});




module.exports = router;