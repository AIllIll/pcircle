import {queryArticleInfo, updateArticleInfo} from "./queryArticles";
import {deleteArticle,deleteArticlesInfo} from "./deletearticle";
import {changeMenuKeys} from "./changeMenuKeys";
import {changeEliteArticle, updateEliteArticle} from "./changeEliteArticle";
// import {queryArticleInfos, updateArticleInfos} from "../article/addNewArticle";
import {deleteCommentInfo, updateCommentInfo, updateCommentInfoAction} from "./deletecomment";

export interface answerProps {
  content: String,
  user: String,
  src: String,
  nickName: String
}

export interface commentProps {
  id: String,
  user: String,
  src: String,
  nickName: String,
  time: String,
  zone?: String,
  company?: String,
  post?: String,
  content: String,
  answers: Array<answerProps>
}

export interface articleProps {
  id: String,
  nickName: String,
  src: String,
  time: String,
  title: String,
  sub: String,
  agree: Number,
  content: String,
  commentList: Array<commentProps>
}
export interface MainState {
  articles: Array<articleProps>
  SelectedKeys: Array<String>
  OpenKeys: Array<String>
}

export interface articleItem {
  openid: String,
  title: String,
  content: String
}

export const PREFIX = 'main'

export const initState: MainState = {
  articles: null,
  SelectedKeys: ['1'],
  OpenKeys: ['sub1']
}

export default {
  namespace: PREFIX,
  state: initState,
  effects: {
    queryArticleInfo: queryArticleInfo,
    deleteArticlesInfo: deleteArticlesInfo,
    changeEliteArticle: changeEliteArticle,
    // queryArticleInfos: queryArticleInfos,
    deleteCommentInfo: deleteCommentInfo
  },
  reducers: {
    updateArticleInfo: updateArticleInfo,
    deleteArticle: deleteArticle,
    changeMenuKeys: changeMenuKeys,
    updateEliteArticle: updateEliteArticle,
    // updateArticleInfos: updateArticleInfos,
    updateCommentInfo: updateCommentInfo
  }
}
