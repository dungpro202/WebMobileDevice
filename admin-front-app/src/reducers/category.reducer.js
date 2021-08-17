import { categoryConstants } from "../actions/constants"

const initState = {
    categories: [],
    loading: false,
    error: null,
}

//Xem lai bai 15 
const buildNewCategories = (parentId, categories, category) => {
    let myCategories = [];

    if (parentId === undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                type:category.type,
                children: [],
            }
        ]
    }

    for (let cat of categories) {

        if (cat._id === parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                type: category.type,
                children: [],
            };
            myCategories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            });
        } else {
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(parentId, cat.children, category) : []
            })
        }

    }
    return myCategories;
}

const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_SUCCESS:
            const updateCategoris = buildNewCategories(action.payload.category.parentId, state.categories, action.payload.category);
            console.log(updateCategoris)
            state = {
                ...state,
                categories: updateCategoris,
                loading: false,
            }
            break;
        case categoryConstants.ADD_NEW_CATEGORIES_FAILURE:
            state = {
                ...initState
            }
            break;
        case categoryConstants.UPDATE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case categoryConstants.UPDATE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break;
        case categoryConstants.UPDATE_CATEGORIES_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            }
            break;
        case categoryConstants.DELETE_CATEGORIES_REQUEST:
            state = {
                ...state,
                loading: true,
            }
            break;
        case categoryConstants.DELETE_CATEGORIES_SUCCESS:
            state = {
                ...state,
                loading: false,
            }
            break;
        case categoryConstants.DELETE_CATEGORIES_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false,
            }
            break;
        default:
            break;
    }
    return state;
}

export default categoryReducer