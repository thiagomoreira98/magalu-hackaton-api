module.exports = (controller, async) => {
    return async (req, res, next) => {
        try {
            if (async)
                await controller(req, res, next);
            else
                controller(req, res, next);
        }
        catch (ex) {
            console.log(ex.stack || ex.message);
            res.json(500, { message: ex.stack || ex.message });
        }
    }
}
