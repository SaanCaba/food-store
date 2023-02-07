import boom from '@hapi/boom';

export function validateHandler(schema, property){

    return (req,res,next) =>{
        const data = req[property] // de esta forma agarramos la data si viene por params o body.;
        const {error} = schema.validate(data, {abortEarly: false});
        console.log("errorVALIDATE",error)
        // abortEarly en false, manda todos los errores.
        if(error){
           next(boom.badRequest(error));
        }
        next();
    }
}