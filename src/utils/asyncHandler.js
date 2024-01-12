


const asyncHandler = (requestHandler)=> {
    return (req, res, next)=> {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err)=> {
            return next(err);
        })
    }
}


export default asyncHandler;