import { Router } from 'express'
import { deleteCustomer, getCustomerById, getCustomers, updateCustomer } from '../controllers/customers'
import sanitize from '../middlewares/sanitization'

const customerRouter = Router()

customerRouter.get('/',  getCustomers)
customerRouter.get('/:id', getCustomerById)
customerRouter.patch('/:id', sanitize, updateCustomer)
customerRouter.delete('/:id', deleteCustomer)

export default customerRouter
