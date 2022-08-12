const initState = {
    allArticle: [],
    popularArticles:[],
    countArticle: 0,
    allTag: [],
    allCategory: [],
    oldArticle: [],
    recentArticle: [],
    perPage: 0,
    related_article: [],
    readMore: "",
    read_article: '',
    likes:0,
    dislikes:0,
    moreTag: []
}

export const homeReducer = (state = initState, action) => {
    const { type, payload } = action;
    if (type === "HOME_ARTICLE_GET_SUCCESS") {
        return {
            ...state,
            allArticle: payload.articles,
            countArticle: payload.countArticle,
            perPage: payload.perPage
        }
    }
    if (type === "HOME_POPULAR_ARTICLES_GET_SUCCESS") {
        return {
            ...state,
            popularArticles: payload.popularArticles
        }
    }
   
    if (type === 'HOME_CATEGORY_TAG_GET_SUCCESS') {
        return {
            ...state,
            allCategory: payload.allUsedCategories,
            allTag: payload.allUsedTags
        }
    }
    if (type === 'GET_OLD_RECENT_ATICLE_SUCCESS') {
        return {
            ...state,
            recentArticle: payload.recentArticles,
            oldArticle: payload.oldArticles
        }
    }
    if (type === 'CATEGORY_ARTICLE_GET_SUCCESS') {
        return {
            ...state,
            allArticle: payload.articlesOfCategory,
            countArticle: payload.articlesOfCategoryCount,
            perPage: payload.perPage
        }
    }
    if (type === 'TAG_ARTICLE_GET_SUCCESS') {
        return {
            ...state,
            allArticle: payload.articlesOfTag,
            countArticle: payload.articlesOfTagCount,
            perPage: payload.perPage
        }
    }
    if (type === 'READ_ARTICLE_GET_SUCCESS') {
        return {
            ...state,
            readMore: payload.readMore,
            read_article: payload.readArticle,
            moreTag: payload.moreTags,
            related_article: payload.relatedArticles
        }
    }
    return state;
}