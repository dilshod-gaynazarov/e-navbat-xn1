export const successRes = (res, statusCode, dataRes) => {
    return res.status(statusCode).json({
        statusCode,
        message: 'success',
        data: dataRes
    });
};