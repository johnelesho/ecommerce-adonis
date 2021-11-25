import { schema, rules } from '@ioc:Adonis/Core/Validator'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { UserStatus, UserType } from '../Models/User'

export default class UserValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    firstName: schema.string({ trim: true }, [rules.maxLength(255)]),
    lastName: schema.string({ trim: true }, [rules.maxLength(255)]),
    username: schema.string({ trim: true }, [rules.maxLength(255)]),
    email: schema.string({ trim: true }, [rules.email()]),
    rememberMeToken: schema.string.optional({ trim: true }),
    password: schema.string({}, [rules.confirmed()]),
    address: schema.string({ trim: true, escape: true }),
    status: schema.enum(Object.values(UserStatus)),
    type: schema.enum(Object.values(UserType)),
    contactNumber: schema.string({ trim: true }, [rules.mobile()]),
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages = {}
}
