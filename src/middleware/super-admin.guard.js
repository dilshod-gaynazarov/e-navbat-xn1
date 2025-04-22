export const SuperAdminGuard = (req, res, next) => {
    try {
        const user = req?.user;
        if (user?.role !== 'superadmin'){
            return res.status(401).json({
                statusCode: 401,
                messagee: 'Forbidden user'
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
           error: `Error on check role: ${error}`
        });
    }
}