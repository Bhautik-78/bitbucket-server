const settingRouter = require("./setting/router");
const bitBucketRouter = require("./bitBucket/router");

module.exports = (app) => {
    app.use("/setting", settingRouter);
    app.use("/bitBucket", bitBucketRouter);
};
