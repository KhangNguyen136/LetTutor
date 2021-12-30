import { itemsWantToLearn } from "../constant";
export function getWantToLearnList(topic, preparation) {
    const result = []
    topic.forEach(element => {
        result.push(element.id + 8);
    });
    preparation.forEach(item => {
        result.push(item.id);
    });
    return result;
}

export function getWantToLearnObject(data) {
    const result = {
        topic: [],
        preparation: []
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i] < 9)
            result.preparation.push(data[i]);
        else
            result.topic.push(data[i] - 8);
    }
    return result;
}

export function getListLabel(listKey) {
    const result = [];
    listKey.forEach(item => {
        result.push(getSpecialiesLabel(item));
    })
    return result;
}

function getSpecialiesLabel(key) {
    const topic = itemsWantToLearn[0].children;
    for (let i = 0; i < topic.length; i++) {
        if (topic[i].key == key) {
            return topic[i].name
        }
    }
    const preparation = itemsWantToLearn[1].children;
    for (let i = 0; i < preparation.length; i++) {
        if (preparation[i].key == key) {
            return preparation[i].name;
        }
    }
    return '';
}