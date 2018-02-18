
const mongoose = require('mongoose');





// Annotation Ranges
var Ranges = new mongoose.Schema({
    start: {
        type: String,
        required: true
    },
    end: {
        type: String,
        required: true
    },
    startOffset: {
        type: Number,
        required: false
    },
    endOffset: {
        type: Number,
        required: false
    }
});

var Shape = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    geometry: {
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        },
        width: {
            type: Number,
            required: true
        },
        height: {
            type: Number,
            required: true
        }
    }
});

// Annotation Model
var AnnotationSchema = new mongoose.Schema({
 
    id: {
        type: String,
        required: false
    },
    annotator_schema_version: {
        type: String,
        required: false,
        // default: version
    },
    created: {
        type: Date,
        default: Date.now()
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    },
    text: {
        type: String,
        required: false
    },
    quote: {
        type: String,
        required: false
    },
    uri: {
        type: String,
        required: false
    },
    src: {
        type: String,
        required: false
    },
    shapes: [Shape],
    uuid: {
        type: String,
        required: false
    },
    parentIndex: {
        type: String,
        required: false
    },
    groups: [String],
    subgroups: [String],
    ranges: [Ranges],
    tags: [String],
    permissions: {
        read: [String],
        admin: [String],
        update: [String],
        delete: [String]
    },
    annotation_categories: [Number],
    sort_position: {
      type: String,
      required: false
    }

});


// var AnnotationRows = new mongoose.Schema({
//     rows:[AnnotationSchema]
// });


// var AnnotationModel = mongoose.model('Annotation', Annotation);

module.exports = mongoose.model('Annotation', AnnotationSchema);





// const AnnotationSchema = new mongoose.Schema({
//   text: {
//     type: String
//   },
//   quote: {
//     type: String
//   },
//   uri: {
//     type: String
//   },

//   ranges: {
//    type: [{
//        start: String,
//        end: String,
//        startOffset: Number,
//        endOffset: Number
//    }]

//   },
//   user: {
//     type: String
//   },
//   consumer: {
//     type: String
//   },
//   tags: {
//     type: [String]
//   },





// });

// module.exports = mongoose.model('Annotation', AnnotationSchema);



// Annotation format 

// {
//     "id": "39fc339cf058bd22176771b3e3187329",  # unique id (added by backend)
//     "annotator_schema_version": "v1.0",        # schema version: default v1.0
//     "created": "2011-05-24T18:52:08.036814",   # created datetime in iso8601 format (added by backend)
//     "updated": "2011-05-26T12:17:05.012544",   # updated datetime in iso8601 format (added by backend)
//     "text": "A note I wrote",                  # content of annotation
//     "quote": "the text that was annotated",    # the annotated text (added by frontend)
//     "uri": "http://example.com",               # URI of annotated document (added by frontend)
//     "ranges": [                                # list of ranges covered by annotation (usually only one entry)
//       {
//         "start": "/p[69]/span/span",           # (relative) XPath to start element
//         "end": "/p[70]/span/span",             # (relative) XPath to end element
//         "startOffset": 0,                      # character offset within start element
//         "endOffset": 120                       # character offset within end element
//       }
//     ],
//     "user": "alice",                           # user id of annotation owner (can also be an object with an 'id' property)
//     "consumer": "annotateit",                  # consumer key of backend
//     "tags": [ "review", "error" ],             # list of tags (from Tags plugin)
//     "permissions": {                           # annotation permissions (from Permissions/AnnotateItPermissions plugin)
//       "read": ["group:__world__"],
//       "admin": [],
//       "update": [],
//       "delete": []
//     }
//   }


