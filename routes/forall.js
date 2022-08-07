const express = require('express')
const router =  express.Router()


router.get('/', function(req, res){
    res.render('pages/index')
  })
router.get('/orcamento', function(req, res){
    res.render('pages/escolhaorcamento')
  })
  
 router.get('/memorialdescritivo', (req, res) => {
    res.render('pages/memorialdescritivo')
})
router.get('/orcamentosolar', (req, res) => {
    res.render('pages/orcamentosolar')
})

module.exports = router