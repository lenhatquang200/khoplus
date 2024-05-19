export function updateListItem(newItemUpdate, list) {
    let newList = [...listData];
    const _index = newList.findIndex((item) => item?._id == newItemUpdate?._id);
    if (_index !== -1) {
        if (newItemUpdate?.isDelete) {
            newList.splice(_index, 1);
        } else {
            newList[_index] = newItemUpdate;
        }
    } else {
        newList.unshift(newItemUpdate);
    }
    return newList
}

export default {
    updateListItem
}