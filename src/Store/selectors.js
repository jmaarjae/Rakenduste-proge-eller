export const getToken = (store) => {
    return store.token;
};

export const getUserId = (store) => {
    const user = getUser(store);
    if(!user) return null;
    return user._id;
};

export const getUser = (store) => {
    return store.user;
};

export const getCart = (store) => {
    if(!store.user) return [];
    return store.user.cart;
};

export const getItems = (store) => {
    return store.items;
}; 