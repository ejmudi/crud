const update = require('immutability-helper');

import action from "./../classes/action";
import { actionTypeEnum } from "./../enums/actionTypeEnum";
import { item } from "./../containers/indexContainer";
import { getCalculatedItems } from "./../helpers";

export default function itemsReducer(state = new Array<item>(), action: action<any>) {
    switch (action.type) {
        case actionTypeEnum[actionTypeEnum.fetchAllData]: {
            const items = getCalculatedItems(action.payload[0], action.payload[1], action.payload[2])
            return [...state, ...items];
        }
        case actionTypeEnum[actionTypeEnum.updatePostTitle]:
            {
                const updatedItems = update(state, {
                    [action.payload[0]]: {
                        post: {
                            title: {
                                $set: action.payload[1]
                            }
                        }
                    }
                });

                return updatedItems;
            }
        case actionTypeEnum[actionTypeEnum.deleteItem]:
            return update(state, {
                $splice: [[action.payload, 1]]
            });
    }
    return state;
}