const searchCriteriaApi = {
    list(vm, query) {
        vm.$launcher.$emit('globalLoading', true);
        vm.$http
            .post('/searchCriteria/list/', query)
            .then(res => {
                vm.$launcher.$emit('globalLoading', false);
            })
            .catch(err => {
                console.debug('api response failed!', err);
                vm.$message.error({
                    showClose: true,
                    message: err
                });
                vm.$launcher.$emit('globalLoading', false);
            });
    }
};

export default searchCriteriaApi;
