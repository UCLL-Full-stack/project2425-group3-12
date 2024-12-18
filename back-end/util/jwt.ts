import jwt from 'jsonwebtoken';

const generateJwtToken = ({ username, role }: { username: string; role: string }): string => {
    const options = { expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'courses_app' };
    const secret = process.env.JWT_SECRET;
    try {
        if (!secret) {
            throw new Error('JWT_SECRET environment variable is not set');
        }
        return jwt.sign({ username, role }, secret, options);
    } catch (error) {
        console.log(error);
        throw new Error('Error generating JWT token, see server logs for details');
    }
}

export { generateJwtToken };