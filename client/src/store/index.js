import { createStore,compose,applyMiddleware,combineReducers } from "redux";
import ThunkMiddleware from "redux-thunk";

import { adminReducer} from "./reducers/adminReducer";
import { categoryReducer} from "./reducers/categoryReducer";
import { tagReducer} from "./reducers/tagReducer";
import { articalReducer } from "./reducers/articleReducer";
import { homeReducer } from "./reducers/home/homeReducer";
import { likesReducer } from "./reducers/home/likesReducer";
import { userAuthReducer } from "./reducers/auth/userAuthReducer";
import { commentReducer } from "./reducers/home/commentReducer";
import { usersReducer } from "./reducers/usersReducer";



const rootReducer = combineReducers({
  adminReducer:adminReducer,
  userAuthReducer:userAuthReducer,
  dashboradCategory : categoryReducer,
  dashboradTag : tagReducer,
  dashboradArtical:articalReducer,
  homeReducer:homeReducer,
  likesReducer:likesReducer,
  commentReducer:commentReducer,
  usersReducer:usersReducer
  
});

const middleware = [ThunkMiddleware];

const store = createStore(rootReducer,compose(
    applyMiddleware(...middleware),
   // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;