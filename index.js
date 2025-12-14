const express = require('express');
const app = express();
const PORT = 3000; 

const validateParams = (req, res, next) => {
    const { a, b } = req.query;
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) {
        return res.status(400).json({ 
            error: "Parâmetros inválidos. Certifique-se de que 'a' e 'b' são números." 
        });
    }

    req.numA = numA;
    req.numB = numB;
    next();
};

app.get('/math/soma', validateParams, (req, res) => {
    const resultado = req.numA + req.numB;
    res.json({ operacao: 'soma', a: req.numA, b: req.numB, resultado: resultado });
});

app.get('/math/subtracao', validateParams, (req, res) => {
    const resultado = req.numA - req.numB;
    res.json({ operacao: 'subtracao', a: req.numA, b: req.numB, resultado: resultado });
});

app.get('/math/multiplicacao', validateParams, (req, res) => {
    const resultado = req.numA * req.numB;
    res.json({ operacao: 'multiplicacao', a: req.numA, b: req.numB, resultado: resultado });
});

app.get('/math/divisao', validateParams, (req, res) => {
    if (req.numB === 0) {
        return res.status(400).json({ error: "Divisão por zero não é permitida." });
    }
    const resultado = req.numA / req.numB;
    res.json({ operacao: 'divisao', a: req.numA, b: req.numB, resultado: resultado });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`Endpoints disponíveis:`);
    console.log(`- http://localhost:${PORT}/math/soma?a=10&b=5`);
});