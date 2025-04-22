import { Joi, celebrate } from 'celebrate'
import { Types } from 'mongoose'

// eslint-disable-next-line no-useless-escape
export const phoneRegExp = /^(\+\d+)?(?:\s|-?|\(?\d+\)?)+$/

export enum PaymentType {
    Card = 'card',
    Online = 'online',
}

// валидация id
export const validateOrderBody = celebrate({
    body: Joi.object().keys({
        items: Joi.array()
            .max(25)
            .items(
                Joi.string().max(100).custom((value, helpers) => {
                    if (Types.ObjectId.isValid(value)) {
                        return value
                    }
                    return helpers.message({ custom: 'Невалидный id' })
                })
            )
            .messages({
                'array.max': 'Превышено максимальное количество товаров',
                'array.empty': 'Не указаны товары',
            }),
        payment: Joi.string()
            .valid(...Object.values(PaymentType))
            .required()
            .max(100)
            .messages({
                'string.valid':
                    'Указано не валидное значение для способа оплаты, возможные значения - "card", "online"',
                'string.empty': 'Не указан способ оплаты',
            }),
        email: Joi.string().email().required().max(200).messages({
            'string.empty': 'Не указан email',
            'string.max': '{#label} должно иметь не более {#limit} символов',
        }),
        phone: Joi.string().required().max(30).pattern(phoneRegExp).messages({
            'string.empty': 'Не указан телефон',
            'string.max': '{#label} должно иметь не более {#limit} символов',
        }),
        address: Joi.string().required().max(200).messages({
            'string.empty': 'Не указан адрес',
            'string.max': '{#label} должно иметь не более {#limit} символов',
        }),
        total: Joi.number().required().max(2**31-1).messages({
            'any.required': 'Не указана сумма заказа',
            'number.max': '{#label} должно быть не более {#limit}',
        }),
        comment: Joi.string().optional().allow('').max(1000),
    }),
})

// валидация товара.
// name и link - обязательные поля, name - от 2 до 30 символов, link - валидный url
export const validateProductBody = celebrate({
    body: Joi.object().keys({
        title: Joi.string().required().min(2).max(30).messages({
            'string.min': 'Минимальная длина поля "name" - 2',
            'string.max': 'Максимальная длина поля "name" - 30',
            'string.empty': 'Поле "title" должно быть заполнено',
        }),
        image: Joi.object().keys({
            fileName: Joi.string().required().max(200),
            originalName: Joi.string().required().max(200),
        }),
        category: Joi.string().required().max(200).messages({
            'string.empty': 'Поле "category" должно быть заполнено',
            'string.max': '{#label} должно иметь не более {#limit} символов'
        }),
        description: Joi.string().required().max(200).messages({
            'string.empty': 'Поле "description" должно быть заполнено',
            'string.max': '{#label} должно иметь не более {#limit} символов'
        }),
        price: Joi.number().max(2**31-1).allow(null),
    }),
})

export const validateProductUpdateBody = celebrate({
    body: Joi.object().keys({
        title: Joi.string().min(2).max(30).messages({
            'string.min': 'Минимальная длина поля "name" - 2',
            'string.max': 'Максимальная длина поля "name" - 30',
        }),
        image: Joi.object().keys({
            fileName: Joi.string().required().max(200),
            originalName: Joi.string().required().max(200),
        }),
        category: Joi.string().max(200),
        description: Joi.string().max(200),
        price: Joi.number().max(2**31-1).allow(null),
    }),
})

export const validateProductId = celebrate({
    params: Joi.object().keys({
        productId: Joi.string()
            .required()
            .max(100)
            .custom((value, helpers) => {
                if (Types.ObjectId.isValid(value)) {
                    return value
                }
                return helpers.message({ any: 'Невалидный id' })
            }),
    }),
})

export const validateOrderNumber = celebrate({
    params: Joi.object().keys({
        orderNumber: Joi.number().integer().min(1).max(2**31-1).required().messages({
            'number.base': '{#label} должно быть числом',
            'number.integer': '{#label} должно быть целым числом',
            'number.min': '{#label} должно быть не менее {#limit}',
            'number.max': '{#label} должно быть не более {#limit}',
            'any.required': '{#label} это обязательное поле'
        }),
    }),
})

export const validateUserBody = celebrate({
    body: Joi.object().keys({
        name: Joi.string().min(2).max(30).messages({
            'string.min': 'Минимальная длина поля "name" - 2',
            'string.max': 'Максимальная длина поля "name" - 30',
        }),
        password: Joi.string().min(6).required().max(200).messages({
            'string.empty': 'Поле "password" должно быть заполнено',
        }),
        email: Joi.string()
            .required()
            .max(200)
            .email()
            .message('Поле "email" должно быть валидным email-адресом')
            .messages({
                'string.empty': 'Поле "email" должно быть заполнено',
            }),
    }),
})

export const validateAuthentication = celebrate({
    body: Joi.object().keys({
        email: Joi.string()
            .required()
            .max(200)
            .email()
            .message('Поле "email" должно быть валидным email-адресом')
            .messages({
                'string.required': 'Поле "email" должно быть заполнено',
            }),
        password: Joi.string().required().max(200).messages({
            'string.empty': 'Поле "password" должно быть заполнено',
        }),
    }),
})
