export default {
    VueInstaller: (name, objectClass) => {
        return (Vue, options) => {
            if (objectClass.hasOwnProperty('constructor')) {
                Vue.prototype[name] = new objectClass(options);
            } else {
                Vue.prototype[name] = objectClass;
            }
        };
    }
};
