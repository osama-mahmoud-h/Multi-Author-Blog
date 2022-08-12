import React, { useState, useRef, useEffect } from 'react'
import Helmet from 'react-helmet';
import { Link,useNavigate,useParams } from 'react-router-dom';
import { BsCardImage } from "react-icons/bs";
import JoditEditor from "jodit-react";
import { useDispatch, useSelector } from "react-redux";
import { article_edit, article_update} from "../../store/actions/dashboard/articleAction";
import { get_all_category } from '../../store/actions/dashboard/categoryAction';
import { get_all_tag } from '../../store/actions/dashboard/tagAction';

const ArticleEdit = () => {
     
    const navigate = useNavigate();

    const {articleId} = useParams();

    const {  loader ,articleError,articleSuccessMessage,edtiArticle,editRequest} = useSelector(state => state.dashboradArtical)
    const {allCategory} = useSelector(state => state.dashboradCategory);
    const {allTag} = useSelector(state => state.dashboradTag);
    // console.log("edit article id: ,",edtiArticle)
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const editor = useRef();

    const [state, setState] = useState({
        title: '',
        category: '',
        tag: '',
        image: '',
    });
    
    const [image, setImage] = useState({
        imageName: '',
        img: ''
    })


    const inputHendle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }
    const titleHendler = (e) => {
        setState({
            ...state,
            title: e.target.value
        });
    }

    const imageHendle = (e) => {
       // console.log(e.target.files)
        if (e.target.files.length !== 0) {
            setState({
                ...state,
                image: e.target.files[0]
            });

            readImage(e.target.files[0],setImage);
          /*  const imageReader = new FileReader();
            imageReader.onload = () => {
                setImage({
                    ...image,
                    img: imageReader.result,
                    imageName: e.target.files[0].name,
                })
            }
            imageReader.readAsDataURL(e.target.files[0]);*/

        }
    }

    const readImage = (imagedata,setImage)=>{
        const imageReader = new FileReader();
        imageReader.onload = () => {
            setImage({
                ...image,
                img: imageReader.result,
                imageName: imagedata.name,
            })
        }
        imageReader.readAsDataURL(imagedata);
    }

    const update = (e) => {
        e.preventDefault();
        const { title, category, tag,image } = state;

        const formData = new FormData();
              formData.append("title",title);
              formData.append("category",category);
              formData.append("tag",tag);
              formData.append("text",text);
              formData.append("image",image);
          //console.log(image)
        dispatch(article_update(edtiArticle._id, formData));
    }
    const config = {
        readonly: false
    }
    useEffect(() => {
        dispatch(get_all_category())
        dispatch(get_all_tag())
    }, [])

    useEffect(()=>{
        if(articleSuccessMessage){
            //dispatch({ type: 'ART_SUCCESS_MESSAGE_CLEAR' })
            navigate('/dashboard/all-article/page-1')
        }
    },[articleSuccessMessage])

    useEffect(()=>{
        if(editRequest){
            setState({
                title : edtiArticle.title,
                category :edtiArticle.category,
                tag : edtiArticle.tag
               
            });
            setImage({
                img:`/uploads/articleImages/${edtiArticle.image}`
            });
            setText(edtiArticle.text);
        }
    },[editRequest])

    useEffect(()=>{
        dispatch(article_edit(articleId))
    },[]);


    return (
        <div className='add-article'>
            <Helmet>
                <title>Edit Article</title>
            </Helmet>
            <div className="add">
                <div className="title-show-article">
                    <h2>Add Article</h2>
                    <Link className='btn' to="/dashboard/all-article/page-1">All Article</Link>
                </div>
                <form onSubmit={update}>
                    <div className="form-group">
                        <label htmlFor="title">Article title</label>
                        <input onChange={titleHendler} value={state.title} type="text" name='title' placeholder='article title' className="form-control" id='title' />
                        {
                            articleError?<p className='error'>{articleError.title}</p>:''
                        }
                        
                    </div>
                  
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select onChange={inputHendle} value={state.category} className='form-control' name="category" id="category">
                            <option value="">--select article category--</option>
                            {
                               allCategory&&allCategory.length > 0 ? allCategory.map((c, index) => {
                                    return <option key={index} value={c.categorySlug}>{c.categoryName}</option>
                                }) : ''
                            }

                        </select>
                        {
                            articleError?<p className='error'>{articleError.category}</p>:''
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <select onChange={inputHendle} value={state.tag} className='form-control' name="tag" id="tag">
                            <option value="sdas">--select article tag--</option>
                            {
                                allTag&&allTag.length > 0 ? allTag.map((t, index) => <option key={index} value={t.tagSlug}>{t.tagName}</option>) : ''
                            }
                        </select>
                        {
                            articleError?<p className='error'>{articleError.tag}</p>:''
                        }
                    </div>
                    <div className="form-group img_upload">
                        <div className="upload">
                            <label htmlFor="upload_image"><BsCardImage /></label>
                            <input type="file" id='upload_image' />
                        </div>
                        <label htmlFor="article text">Article text</label>
                        <JoditEditor
                            value={text}
                            tabIndex={1}
                            ref={editor}
                            config={config}
                            onBlur={newText => setText(newText)}
                            onChange={newText => { }}
                        />
                        {
                            articleError?<p className='error'>{articleError.text}</p>:''
                        }
                    </div>

                    <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <div className="image-select">
                            {
                                image.imageName ? <span>{image.imageName}</span> : <span></span>
                            }
                            <label htmlFor="image">Select Image</label>
                            <input onChange={imageHendle} type="file" className="form-control" name='image' id='image' />
                        </div>
                        <div className="image">
                            {
                                image.img ? <img src={image.img} alt="" /> : ''
                            }

                        </div>
                        {
                            articleError?<p className='error'>{articleError.image}</p>:''
                        }
                    </div>

                    <div className="form-group">
                        {
                            loader ? <button className="btn btn-block">
                                <div className="spinner">
                                    <div className="spinner1"></div>
                                    <div className="spinner2"></div>
                                    <div className="spinner3"></div>
                                </div>
                            </button> : <button className="btn btn-block">Update Article</button>

                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ArticleEdit