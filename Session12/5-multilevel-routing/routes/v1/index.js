const router = require("express").Router();

const albumsRouter = require("./albumRoute");
const commentsRouter = require("./commentRoute");
const photosRouter = require("./photoRoute");
const postsRouter = require("./postRoute");
const todosRouter = require("./todoRoute");
const usersRouter = require("./userRoute");

router.use("/albums", albumsRouter);
router.use("/comments", commentsRouter);
router.use("/photos", photosRouter);
router.use("/posts", postsRouter);
router.use("/todos", todosRouter);
router.use("/users", usersRouter);

module.exports = router;