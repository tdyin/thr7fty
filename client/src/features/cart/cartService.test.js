import axios from 'axios'
import cartService from './cartService'

jest.mock('axios')

test('addToCart', async () => {
  const cartData = { username: 'jim11', productId: '623007fd4bc9331a42e853b9' }
  const res = { data: cartData }
  axios.post.mockResolvedValue(res)

  const data = await cartService.addToCart(res)
  return expect(data.productId).toBe('623007fd4bc9331a42e853b9')
})

test('removeFromCart', async () => {
    const cartData = { username: 'jim11', productId: '623007fd4bc9331a42e853b9' }
    const res = { data: cartData }
    axios.post.mockResolvedValue(res)
  
    const data = await cartService.removeFromCart(res)
    return expect(data.productId).toBe('623007fd4bc9331a42e853b9')
})
