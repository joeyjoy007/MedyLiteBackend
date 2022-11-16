import jwt from "jsonwebtoken";

export const generateToken = async (userId: any) => {
    const token = await jwt.sign({ userId }, "GARVIT", {
        expiresIn: "30d",
    });
    return token;
};
