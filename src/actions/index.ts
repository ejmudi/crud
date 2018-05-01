import action from "./../classes/action";
import { actionTypeEnum } from "./../enums/actionTypeEnum";

export function handleDeleteItem(itemIndex: number) {
    return {
        type: actionTypeEnum[actionTypeEnum.deleteItem],
        payload: itemIndex
    } as action<number>;
}

export function handleUpdatePostTitle(itemIndex: number, newPostTitle: string) {
    return {
        type: actionTypeEnum[actionTypeEnum.updatePostTitle],
        payload: [itemIndex, newPostTitle]
    } as action<[number, string]>;
}