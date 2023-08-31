'use strict'

const { findById } = require("../services/apikey.service");

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (request, response, next) => {
    try {
        const key = request.headers[HEADER.API_KEY]?.toString()
        if (!key) {
            return response.json({
                message: 'Forbidden Error'
            });
        }
        // check objectKey
        const objKey = await findById(key)
        if (!objKey) {
            return response.status(403).json({
                message: 'Forbidden Error'
            })
        }
        request.objKey = objKey
        return next()
        console.log(error.message)
    } catch (error) {

    }
}

const permission = (permission) => {
    return (request, response, next) => {
        if (!request.objKey.permissions) {
            return response.status(403).json({
                message: 'permission denied'
            })
        }

        console.log('permission:: ', request.objKey.permissions)
        const validPermission = request.objKey.permissions.includes(permission)
        if(!validPermission){
            return response.status(403).json({
                message: 'permission denied'
            })
        }

        return next()
    }
}

module.exports = {
    apiKey, permission
}