import axios from 'axios'
import jwt from 'jsonwebtoken'
import errorGenerator from '../../error/errorGenerator'
import statusCode from '../modules/statusCode'
import message from '../modules/message'
import config from '../config'

const signInKakao = async (socialToken: string) => {
  try {
    const user = await axios.get(config.kakaoLoginRoute, {
      headers: {
        Authorization: `Bearer ` + `${socialToken}`,
      },
    })

    if (!user) {
      throw errorGenerator({
        msg: message.NULL_VALUE_TOKEN,
        statusCode: statusCode.UNAUTHORIZED,
      })
    }
    console.log(user.data) //모양 확인
    return user.data
  } catch (err) {
    throw errorGenerator({
      msg: message.NULL_VALUE_TOKEN,
      statusCode: statusCode.UNAUTHORIZED,
    })
  }
}

const signInGoogle = async (socialToken: string) => {
  try {
    const user = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${socialToken}`, {
      headers: {
        Authorization: `Bearer ` + `${socialToken}`,
      },
    })

    if (!user) {
      throw errorGenerator({
        msg: message.BAD_REQUEST,
        statusCode: statusCode.UNAUTHORIZED,
      })
    }
    return user.data
  } catch (err) {
    throw errorGenerator({
      msg: message.BAD_REQUEST,
      statusCode: statusCode.UNAUTHORIZED,
    })
  }
}

export { signInKakao, signInGoogle }
