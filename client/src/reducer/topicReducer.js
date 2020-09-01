
const initialState = {
    topic: 'NULL',
    order: 'DESC',
    range: '48 hours',
    search: 'NULL'
};

/* 
    Sets the current topic
    @SET_CURRENT_TOPIC : sets the current category
    @SET_ORDERING : sets the order of the news
    @SET_TIME_RANGE : sets the time range of news publish date
*/
export default function (state = initialState, action) {
    switch (action.type) {
        case "SET_CURRENT_TOPIC":
            return {
                ...state,
                topic: action.topic,
            };
        case "SET_ORDERING":
            return {
                ...state,
                order: action.ordering
            };
        case "SET_TIME_RANGE":
            return {
                ...state,
                range: action.range
            }
        case "SET_SEARCH":
            return{
                ...state,
                search: action.search
            }
        default: return state;
    }
}