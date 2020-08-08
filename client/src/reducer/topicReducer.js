
const initialState = {
    topic: 'all',
    order:'',
    time:"30"
};

/* 
    Sets the current topic
    @SET_CURRENT_TOPIC : sets the current category
    @SET_ORDERING : sets the order of the news
*/
export default function(state = initialState, action) {
    switch (action.type) {
        case "SET_CURRENT_TOPIC":
            return {
                ...state,
                topic: action.topic
            };
        case "SET_ORDERING":
            return {
                ...state,
                order: action.ordering
            };
        case "SET_TIME":
            return{
                ...state,
                time: action.time
            }
        default: return state;
    }
}