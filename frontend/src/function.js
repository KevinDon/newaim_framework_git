// 循环生成category
let $getchildren = function (data, scope) {
    for (let i = 0; i < data.length; i++) {
        scope.categorys.push({
            category_id: data[i].category_id,
            name: data[i].name,
            parent_id: data[i].parent_id,
            show: data[i].is_anchor === '1',
            menu: data[i].include_in_menu,
            children: data[i].children
        });

        if (data[i].children) {
            $getchildren(data[i].children);
        }
    }
};

