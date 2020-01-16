const {Router} = require('express');
const Link = require('./../models/Link');
const auth = require('./../middleware/middleware.auth');
const keys = require('./../keys');
const shortid = require('shortid');

const router = Router();

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = keys.BASE_URL;
        const {from} = req.body;
        const code = shortid.generate();
        const existing = await Link.findOne({ from });

        if(existing) {
            return res.json({ link: existing })
        }

        const to = baseUrl + '/t/' + code;

        const link = new Link({
            from, code, to, owner: req.user.userId
        });

        link.save();

        res.status(201).json({ link });

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже.' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId }); 
        //в middleware auth мы расшифровали токен используя существующий токен,
        //который передавали в заголовках, и полученный объект всунули в req.user
        //Подделать токен теперь не получится. Сервер будет искать реальный id, иначе будет ошибка
        res.json(links);
    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже.' });
    }
});

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id);
        res.json(link);
    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже.' });
    }
});

module.exports = router;