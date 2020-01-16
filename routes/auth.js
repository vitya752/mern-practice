const {Router} = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('./../keys');
const {validationResult} = require('express-validator');
const {regValidator, loginValidator} = require('./../validators');
const User = require('./../models/User');

const router = Router();

router.post('/register', regValidator, async (req, res) => {
    try {
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            const erArr = errors.array();
            const erStr = erArr.map((item, idx) => {
                return `${idx + 1}) ${item.msg}.
                `;
            }).join('');
            return res.status(400).json({
                errors: errors.array(),
                message: erStr
            });
            //на фронте мы получаем только message
        }

        const {email, password} = req.body;
        const candidate = await User.findOne({ email });
        
        if(candidate) {
            return res.status(400).json({ message: 'Такой email уже зарегистрирован.' });
        }

        const hashPass = await bcrypt.hash(password, 12);
        
        const user = new User({
            email,
            password: hashPass
        });

        await user.save();

        res.status(201).json({ message: 'Пользователь успешно создан' });

    } catch(e) {
        res.status(500).json({ message: 'Что-то пошло не так, попробуйте позже.' });
    }

});

router.post('/login', loginValidator, async (req, res) => {
    try {
        const {email, password} = req.body;
        
        const user = await User.findOne({ email });
        
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            res.status(400).json({
                errors: errors.array(),
                message: "Неккоректные данные при входе"
            });
        }

        if(!user) {
            return res.status(400).json({ message: 'Такой email не зарегистрирован.' });
        } 

        const isMatch = await bcrypt.compare(password, user.password)
        
        if (!isMatch) {
          return res.status(400).json({ message: 'Неверный пароль, попробуйте снова' })
        }

        const token = jwt.sign({userId: user.id}, keys.JWT_SECRET, {expiresIn: '1h'});

        res.status(200).json({ token, userId: user.id, message: 'Успешный вход в аккаунт.' });

    } catch(e) {
        console.log(e);
    }
});

module.exports = router;