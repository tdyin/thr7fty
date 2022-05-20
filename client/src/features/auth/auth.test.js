import axios from 'axios'
import authService from './authService'

jest.mock('axios')

test('login', async () => {
  const user = { name: 'test' }
  const res = { data: user }
  axios.post.mockResolvedValue(res)
  
  const data = await authService.login()
  return expect(data.name).toEqual(user.name)
})

test('register', async () => {
  const user = { name: 'test' }
  const res = { data: user }
  axios.post.mockResolvedValue(res)

  const data = await authService.register()
  return expect(data.name).toEqual(user.name)
})
