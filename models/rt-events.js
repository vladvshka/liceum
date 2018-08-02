const mongoose = require('mongoose');
const cabinetModel = require('./cabinets');
const Schema = mongoose.Schema;

const schema = new Schema({
    timeId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'times'
    },
    disciplines: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'disciplines'
    }],
    cabinets: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'cabinets'
    }],
    capacity: {
        type: Number
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "new"
    }
});

schema.pre('save', beforeSave);
schema.statics.filteredSearch = filteredSearch;
schema.statics.findByReqAndUpdate = findByReqAndUpdate;
//do we need it any time besides pre save?
function beforeSave(next) {
    //sum capacity
    const self = this;
    let sum = 0;

    self.cabinets.forEach(cabinetId => {
        cabinetModel
            .findById({
                _id: cabinetId
            })
            .then(function (cabinet) {
                if (cabinet) {
                    sum += cabinet.capacity;
                }
            })
            .catch(function (err) {
                console.error(err);
            });
    });

    self.capacity = sum;
    next();
}
function filteredSearch(queryParams, filterFields) {
    const findQuery = this.find();
    const countQuery = this.find();
    filterFields.forEach(addFilterToQuery);
    findQuery
      .sort(queryParams.sortDirection + queryParams.sortField)
      .skip(queryParams.itemsPerPage * (queryParams.page - 1))
      .limit(queryParams.itemsPerPage)
      .populate('cabinets')
      .populate('disciplines')
      .populate('timeId')
    return Promise.all([findQuery.exec(), countQuery.countDocuments().exec()]);
    
    function addFilterToQuery(filter) {
      const findFilter = {};
      let filterName = filter.name;
      let filterValue = filter.value;
      let dateFilterType;
      const isDateFilter =
        filterName.indexOf("dateFrom_") > -1 ||
        filterName.indexOf("dateTo_") > -1;
      if (isDateFilter) {
        dateFilterType = filterName.split("_")[0];
        filterName = filterName.split("_")[1];
        if (dateFilterType === "dateFrom") {
          filterValue = { $gte: new Date(filter.value) };
        }
        if (dateFilterType === "dateTo") {
          filterValue = { $lt: new Date(filter.value) };
        }
      }
      if (!isDateFilter) {
        if (["name"].indexOf(filterName) > -1) {
          filterValue = new RegExp(filter.value, "i");
        }
      }
      findFilter[filterName] = filterValue;
      findQuery.find(findFilter);
      countQuery.find(findFilter);
    }
  }
function findByReqAndUpdate(req) {
    const id = req.params.id;
    const update = req.body;
    const options = { new: true, runValidators: true };
    update.updated = Date.now();
    console.log("updete");
    return this.findByIdAndUpdate(id, update, options);
}  

const model = mongoose.model('rt-events', schema);

module.exports = model;