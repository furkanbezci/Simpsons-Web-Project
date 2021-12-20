// export const LocalStorageTerminal = (action,payload) => {
//   switch (action) {
//     case 'get': return window.getItem(`${payload}`)
//     case 'set': return window.setItem(`${payload}`)
//     case 'clear': return window.clear(`${payload}`)

//     default:
//       break;
//   }
// };
export const LocalStorageTerminal = {
    setItem: function (key, value) {
        return Promise.resolve().then(function () {
            const stringfiedVal = JSON.stringify(value)
            window.localStorage.setItem(key, stringfiedVal);
        });
    },
    getItem: function (key) {
        return Promise.resolve().then(function () {
            return JSON.parse(window.localStorage.getItem(key));
        });
    }
};
