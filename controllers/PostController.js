import PostModel from "../models/Post.js";

export const getLastTags = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const tags = posts
      .map((obj) => obj.tags)
      .flat()
      .slice(0, 5);
    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати теги",
    });
  }
};

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec(); //// populate and exec ===> need to connect User in database tables

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалося отримати статті",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;
    PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не вдалось видалити статтю",
          });
        }
        if (!doc) {
          return res.status(404).json({
            message: "Статтю не знайдено",
          });
        }
        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось видалити статтю",
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Не вдалось повернути статтю",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "Статтю не знайдено",
          });
        }

        return res.json(doc);
      }
    ).populate("user");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати статтю",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags.split(","),
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось створити статтю",
    });
  }
};

export const update = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags.split(","),
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось обновити статтю",
    });
  }
};

export const addComment = async (req, res) => {
  try {
    const comment = req.body;
    const postId = req.params.id;
    const { comments: allComments } = await PostModel.findById(postId)
      .populate("user")
      .exec();

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        comments: [...allComments, comment],
        commentsCount: [...allComments].length + 1,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось додати коментар",
    });
  }
};

export const getLastComments = async (req, res) => {
  try {
    const posts = await PostModel.find().limit(5).exec();
    const comments = posts
      .map((obj) => obj.comments)
      .flat()
      .slice(0, 5);
    res.json(comments);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не вдалось отримати коментарі",
    });
  }
};
