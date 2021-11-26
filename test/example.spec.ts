import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import test, { group } from 'japa'

test.group('Example', () => {
  test('assert sum', (assert) => {
    assert.equal(2 + 2, 4)
  })

  test('ensure user password gets hashed during save', async (assert) => {
    const user = new User()
    user.email = 'virk@adonisjs.com'
    user.password = 'secret'
    await user.save()

    assert.notEqual(user.password, 'secret')
  })

  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
})
