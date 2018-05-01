import { item } from "./../containers/indexContainer";

export function getCalculatedItems(posts, albums, users) {
    const items = new Array<item>();

    const getRandomPostsIndices = (postsLength: number): Array<number> => {
        const numberArray = new Array<number>();
        while (numberArray.length < 30) {
            var randomnumber = Math.floor(Math.random() * postsLength);
            if (numberArray.indexOf(randomnumber) > -1) continue;
            numberArray.push(randomnumber);
        }

        return numberArray;
    }
    
    getRandomPostsIndices(posts.length).forEach(postIndex => {
        const newItem = new item();
        const post = posts[postIndex];

        newItem.post = post;
        newItem.album = albums.filter(album => album.userId === post.userId)[0]; 
        newItem.user = users.filter(user => user.id === post.userId)[0];

        items.push(newItem);
    });

    return items;
};