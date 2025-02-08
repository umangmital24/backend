//const asyncHandeler = ()=>{}


export default asyncHandeler;



const asyncHandeler = (fn)=> async (req, res, next)=>{
    try{
        await fn(req, res, next);
    }
    catch (error){
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
}