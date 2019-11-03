const _ = () => import('lodash')

class CoreModel {
  fields = Array

  init (fields) {

    for (let [key, value] of this.fields.entries()) {

      this.fields[key]['index'] = key
      console.debug("model constructor", this.fields[key]);

    }
  }

  getFieldsIndex () {
    _.partition(this.fields, 'index')
  }
}

export default CoreModel
