const {check} = require('express-validator');
const User = require('./../models/User');

exports.regValidator = [
  check('email', 'Неккоректный email').isEmail().isLength({ min: 6 }),
  check('email', 'Такой email уже зарегистрирован').custom(async (value, {req}) => {
    try {
        const user = await User.findOne({email: value});

        if(user) {
            return Promise.reject('Такой email уже зарегистрирован');
        }

    } catch(e) {
        console.log(e);
    }
}),
  check('password', 'Пароль должен быть не меньше 6 символов').isLength({ min: 6, max: 64 })
];

exports.loginValidator = [
    check('email', 'Невалидный email').isEmail().exists(),
    check('password', 'Введите пароль').exists()
];