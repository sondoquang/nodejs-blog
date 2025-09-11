const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);
const Schema = mongoose.Schema;

// MODEL: Course
const Course = new Schema({
    name: {type: String, required: true, maxLength: 255},
    desc: {type: String, maxLength: 600},
    img: {type: String, maxLength: 255},
    videoId: {type: String, maxLength: 100, required: true},
    slug: {type: String, slug: 'name'},
}, {
    timestamps: true
});

Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.models.Course || mongoose.model('Course', Course);