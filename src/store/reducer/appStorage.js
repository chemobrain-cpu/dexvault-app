import { LOGIN, CHANGE_WHITE,CHANGE_BLACK,FORCEUSERIN,CREATE_PASSCODE } from "../action/appStorage";

const initialState = {
    token: "",
    expiresIn: "",
    user: {},
    background: '',
    importantText: '',
    normalText: '',
    fadeColor: '',
    blue: '',
    fadeButtonColor: '',
    assets: []
}


export const userAuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_WHITE:
            if (action.payload) {
                return {
                    ...state,
                    background: action.payload.background,
                    importantText: action.payload.importantText,
                    normalText: action.payload.normalText,
                    fadeColor: action.payload.fadeColor,
                    blue: action.payload.blue,
                    fadeButtonColor: action.payload.fadeButtonColor,
                }
            }
            break;
        case CHANGE_BLACK:
            if (action.payload) {
                return {
                    ...state,
                    background: action.payload.background,
                    importantText: action.payload.importantText,
                    normalText: action.payload.normalText,
                    fadeColor: action.payload.fadeColor,
                    blue: action.payload.blue,
                    fadeButtonColor: action.payload.fadeButtonColor,
                }
            }
            break;
        case FORCEUSERIN:
            if (action.payload) {
                return {
                    ...state,
                    token: action.payload.token,
                    expiresIn: action.payload.expiresIn,
                    user: action.payload.user,
                }
            }
            break;
        case LOGIN:
            if (action.payload) {
                return {
                    ...state,
                    token: action.payload.token,
                    expiresIn: action.payload.expiresIn,
                    user: action.payload.user,
                }
            }
            break;
        case CREATE_PASSCODE:
            if (action.payload) {
                return {
                    ...state,
                    user: action.payload.user,
                }
            }
            break;


        default:
            return state
    }
}
