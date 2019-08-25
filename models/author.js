//Setup Author Schema
var mongoose = require('mongoose');

var Schema = mongoose.Schema; 

var AuthorSchema = new Schema ( // create a instance of Mongoose Schema Class 
    {
        first_name : {type:String, required:true, max:100}, // thes are the KVP and the inital constraints of the values.
        family_name: {type:String, required:true, max:100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
);

//Virtual for author's fullname 

AuthorSchema 
.virtual('name')
.get(function() {
    return this.family_name + ',' + this.family_name;
});

//Virtual for author's lifespan 

AuthorSchema
.virtual('lifespan')
.get(function() {
    return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

//Virtual for author's URL

AuthorSchema
.virtual('url')
.get(function() {
    return '/catalog/author/' + this.id;
});

//Exports this module for use elsewhere
module.exports = mongoose.model('Author', AuthorSchema);