const asyncHandler = (requesthanderHander)=>{
    return (req, res, next)=>{
        Promise.resolve(requesthanderHander(req, res, next)).catch((err)=>next(err));
}
}


export default asyncHandler;



// const asyncHandeler = (fn)=> async (req, res, next)=>{
//     try{
//         await fn(req, res, next);
//     }
//     catch (error){
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message || "Internal server error"
//         });
//     }
// }