const BlogPost = require('../models/blog-post'),
      HttpError = require('../models/http-error')

// Create
const createBlogPost = async (req, res, next) => {
  const createdBlogPost = new BlogPost({
    title,
    body,
    images,
    featuredImage
  } = req.body)
  let result
  try{
    result = await createdBlogPost.save()
  } catch(err){
    console.log(err)
    const error = new HttpError('Could not create blog post', 500)
    return next(error)
  } 
  res.status(201).json(result)
}

// READ
// All blogPosts 
const getBlogPosts = async (req, res, next) =>{
  const params = req.query;
  let blogPosts
  try{
    blogPosts = await BlogPost.find(params)
      .populate('featuredImage')
      .populate('images')
      .exec()
  } catch(err){
    console.log("Error getting blog posts: ", err)
    const error = new HttpError(
      'We were unable to gather blog posts.', 500
    )
    return next(error)
  }
  if (!blogPosts){
    const error = new HttpError(`No blog posts Found`, 404)
    return next(error)
  }
  res.json(blogPosts)
}

// Single blogPost
const getBlogPost = async (req, res, next) =>{
  const blogPostId = req.params.id
  let blogPost
  try{
    blogPost = await BlogPost.findById(blogPostId)
      .populate("images")
      .populate("featuredImage")
      .exec()
  } catch (err) {
    // If there was an error
    const error = new HttpError(
      'We were unable to find this blog post.', 500
    )
    return next(error)
  }
  // If there was no blogPost found
  if (!blogPost){
    const error = new HttpError(`Could not find blog post with Id ${blogPostId}`, 404)
    return next(error)
  }
  res.json(blogPost)
}

const updateBlogPost = async (req, res, next) => {
  try{
    result = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {new: true})
  } catch(err) {
    console.log(err)
    const error = new HttpError(
      'We were unable to update this blog post.', 500
    )
    return next(error)
  }
  res.json(result)
}

const deleteBlogPost = async (req, res, next) => {
  const blogPostId = req.params.id
  let result
  try{
    result = await BlogPost.findByIdAndDelete(blogPostId)
  } catch (err) {
    const error = new HttpError(
      'We were unable to delete this blog post', 500
    )
    return next(error);
  }
  if (!result){
    const error = new HttpError(
      'Could not find blog post with ID', 404
    )
    return next(error);
  }
  res.json(result)
}

module.exports = {
  createBlogPost,
  getBlogPosts,
  getBlogPost,
  updateBlogPost,
  deleteBlogPost
}