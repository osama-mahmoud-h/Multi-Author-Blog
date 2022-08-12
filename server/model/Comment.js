const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
    // articleId
    articleId: {
      type: Schema.Types.ObjectId,
      ref: 'article'
    },
    content: {
      type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    isOwner: {
      type: Boolean,
      default:false
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'comment'
    },
    hasChild: { 
        type: Boolean, 
        default: false 
    }
  },{timetamps:true});

  const Comment = mongoose.model('comment',commentSchema);
  module.exports = Comment;