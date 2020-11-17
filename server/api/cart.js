const router = require('express').Router()
const {OrderDetail, Order} = require('../db/index')

// you can get the user by saying `req.user` (slightly shorter than going through the session)

//find your pending cart order through your user id
//added two helper methors to the Order and OrderDetails models to getPedingOrder for the cart, and to getCartItems also for cart

//checked and
router.get('/', async (req, res, next) => {
  try {
    const userId = req.session.passport.user
    //get the cart
    const cartSession = await Order.getPendingOrder(userId)
    console.log('cart session', cartSession[0].dataValues.id)
    const orderId = cartSession[0].dataValues.id
    //this will show you the cart in the api route
    // res.json(cartSession[0])

    //now I want to send the cartItems
    const cartItems = await OrderDetail.getCartItems(orderId)
    // ({
    //   where: {
    //     orderId
    //   }
    // })
    console.log('cart items', cartItems)

    res.json(cartItems[0])
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    //find the user
    const userId = req.session.passport.user
    //get the cart
    const cartSession = await Order.getPendingOrder(userId)

    const newCartItem = await OrderDetails.create({
      orderId: cartSession[0].id,
      productId: req.body.id
    })

    res.status(201).json(newCartItem)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    //find the user
    const userId = req.session.passport.user
    //get the cart
    const cartSession = await Order.getPendingOrder(userId)
    const cartItem = await OrderDetails.updateCartItem(
      req.params.id,
      cartSession[0].id
    )
    res.json(cartItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    //find the user
    const userId = req.session.passport.user
    //get the cart
    const cartSession = await Order.getPendingOrder(userId)
    //find the product you are removing
    const cartItem = await OrderDetails.findOne({
      where: {
        productId: req.params.id,
        orderId: cartSession[0].id
      }
    })

    if (!cartItem) return res.sendStatus(404)
    //destroy it
    await cartItem.destroy()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
module.exports = router
