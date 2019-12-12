import CoreModel from '@/core/model/CoreModel';
class SearchCriteriaModel extends CoreModel {
  fields = [
      { field: '_id', title: 'ID', sort: true, visable: true },
      { field: 'ComboSearchID', title: 'ComboSearchID', visable: true },
      {
          field: 'ComboSearchName',
          title: 'ComboSearchName',
          width: '180',
          visable: true
      },
      { field: 'UserID', title: 'User ID', sort: true, visable: true },
      {
          field: 'Active',
          title: 'Active',
          renderer: val => {
              return String(val) === '1' ? 'Yes' : 'No';
          },
          visable: true
      },
      { field: 'AddTime', title: 'AddTime', visable: true }
  ];

  constructor() {
      super();
      super.init(this.fields);
  }
}

export default SearchCriteriaModel;

