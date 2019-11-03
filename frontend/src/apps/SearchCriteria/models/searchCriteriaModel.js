import CoreModel from '@/core/models/CoreModel'
class SearchCriteriaModel extends CoreModel{
  fields = [
    {field: '_id', title: 'ID', sort: true},
    {field: 'ComboSearchID', title: 'ComboSearchID'},
    {field: 'ComboSearchName', title: 'ComboSearchName', width: '180'},
    {field: 'UserID', title: 'User ID', sort: true},
    {
      field: 'Active', title: 'Active', renderer: val => {
        return (val + '') === '1' ? 'Yes' : 'No'
      }
    },
    {field: 'AddTime', title: 'AddTime'},
  ]

  constructor(){
    super()
    super.init(this.fields);
  }


}

export default SearchCriteriaModel

