import { ValidateSignature } from "../utils/index.js"

export const isAdminMiddleware = (req, res, next) => {
    const signature = ValidateSignature(req);

    if(signature && req?.user?.rol == "Admin") {
        return next(); 
    } else {
        return res.status(401).redirect("/");
    };
};