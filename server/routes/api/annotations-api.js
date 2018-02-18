const Annotation = require('../../models/Annotation-model');

// {
//     create: '/annotations',
//     update: '/annotations/{id}',
//     destroy: '/annotations/{id}',
//     search: '/search'
// }

module.exports = (app) => {



  ///////begin

// ROUTES
app.get('/api', function(req, res) {
  res.send('Annotations API is running');
});

// // Search annotations
// app.get('/api/search',  function(req, res) {
//   var query;
//   var re = new RegExp(req.query.host, 'i');
//   switch (req.query.context) {
//     case 'document':
//       query = Annotation.find({
//         'uri': req.query.uri.replace(/\/$/, '')
//       });
//       break;
//     case 'dashboard':
//       query = Annotation.find();
//       query.where('uri').regex(re);
//       break;
//     case 'public':
//       query = Annotation.find();
//       var pattern = new RegExp("\/public\/(.+)$", 'i');
//       var match = pattern.exec(req.query.uri.replace(/\/$/, ''));
//       var slug = match[1];
//       query.where('uri').regex(new RegExp(slug, "i"));
//       break;
//     case 'search':
//       query = Annotation.find();
//       query.where('uri').regex(re);
//       if (req.query.uri) {
//           query.where('uri').equals(req.query.uri);
//       }
//       break;
//   }

//   switch (req.query.mode) {
//       case 'user':
//           query.where('user').equals(req.query.user);
//           break;
//       case 'group':
//           query.where('subgroups'). in (req.query.subgroups);
//           query.$where('this.permissions.read.length < 1');
//           break;
//       case 'class':
//           query.where('groups'). in (req.query.groups);
//           query.$where('this.permissions.read.length < 1');
//           break;
//       case 'admin':
//           break;
//   }

//   if (req.query.tags) {
//       query.where('tags'). in (req.query.tags.split(/[\s,]+/));
//   }
//   if (req.query.annotation_categories) {
//       query.where('annotation_categories'). in (req.query.annotation_categories);
//   }

//   query.limit(req.query.limit);

//   if (req.query.sidebar || req.query.context == "dashboard" || req.query.context == "search") {
//     query.exec(function(err, annotations) {
//       if (!err) {
//         if (annotations.length > 0) {
//           return res.send(annotations);
//         }
//         else {
//           return res.send(204, 'Successfully deleted annotation.');
//         }
//       }
//       else {
//         return console.log(err);
//       }
//     });
//   }
//   else {
//     query.exec(function(err, annotations) {
//       if (!err) {
//         // console.info(annotations);
//         if (annotations.length > 0) {
//           return res.send({
//             'rows': annotations
//           });
//         }
//         else {
//           return res.send(204, 'Successfully deleted annotation.');
//         }
//       }
//       else {
//         return console.log(err);
//       }
//     });
//   }
// });



  app.get('/api/annotations', (req, res, next) => {
    Annotation.find()
      .exec()
      .then((annotation) => res.json(annotation))
      .catch((err) => next(err));
  });



  app.get('/api/search', (req, res) => {
    //Ref Import model Todo
    Annotation.find().then( (ann) => {
        res.send({ann})
    }, (e) => {
        res.status(404).send(e)
    })

})

// // List annotations 
// app.get('/api/search',  function(req, res) {
//   return Annotation.find(function(err, annotations) {
//       if (!err) {
//           return res.send(annotations);
//       } else {
//           return console.log(err);
//       }
//   });
// });

// Single annotation
app.get('/api/annotations/:id',  function(req, res) {
  return Annotation.findById(req.params.id, function(err, annotation) {
      if (!err) {
          return res.send(annotation);
      } else {
          return console.log(err);
      }
  });
});

// POST to CREATE
app.post('/api/annotations',  function(req, res) {
  var annotation;
  console.log("POST: ");

//   console.log(req.originalUrl)
//   console.log(req.body);
  annotation = new Annotation({
      user: req.body.user,
      username: req.body.username,
      consumer: "annotationstudio.mit.edu",
      annotator_schema_version: req.body.annotator_schema_version,
      created: Date.now(),
      updated: Date.now(),
      text: req.body.text,
      uri: req.originalUrl,
      src: req.body.src,
      quote: req.body.quote,
      tags: req.body.tags,
      groups: req.body.groups,
      subgroups: req.body.subgroups,
      uuid: req.body.uuid,
      parentIndex: req.body.parentIndex,
      ranges: req.body.ranges,
      shapes: req.body.shapes,
      permissions: req.body.permissions,
      annotation_categories: req.body.annotation_categories,
      sort_position: req.body.sort_position
  });

  annotation.save(function(err) {
      if (!err) {
          return console.log("Created annotation with uuid: " + req.body.uuid);
      } else {
          return console.log(err);
      }
  });
  annotation.id = annotation._id;
  return res.send(annotation);
});

app.post('/api/annotations/positions',  function(req, res) {
  for(annotation_id in req.body.sort_positions) {
      Annotation.update({ uuid: annotation_id }, { $set: { sort_position: req.body.sort_positions[annotation_id] }}, function() { });
  }
  res.send('Positions have been updated');
});

// PUT to UPDATE
// Single update
app.put('/api/annotations/:id',  function(req, res) {
  return Annotation.findById(req.params.id, function(err, annotation) {
      annotation._id = req.body._id;
      annotation.id = req.body._id;
      annotation.user = req.body.user;
      annotation.username = req.body.username;
      annotation.consumer = req.body.consumer;
      annotation.annotator_schema_version = req.body.annotator_schema_version;
      annotation.created = req.body.created;
      annotation.updated = Date.now();
      annotation.text = req.body.text;
      annotation.uri = req.body.uri;
      annotation.url = req.body.url;
      annotation.shapes = req.body.shapes;
      annotation.quote = req.body.quote;
      annotation.tags = req.body.tags;
      annotation.groups = req.body.groups;
      annotation.subgroups = req.body.subgroups;
      annotation.uuid = req.body.uuid;
      annotation.parentIndex = req.body.parentIndex;
      annotation.ranges = req.body.ranges;
      annotation.permissions = req.body.permissions;
      annotation.annotation_categories = req.body.annotation_categories;
      annotation.sort_position = req.body.sort_position;

      return annotation.save(function(err) {
          if (!err) {
              console.log("updated");
          } else {
              console.log(err);
          }
          return res.send(annotation);
      });
  });
});

// Remove an annotation
app.delete('/api/annotations/:id',  function(req, res) {
  return Annotation.findById(req.params.id, function(err, annotation) {
      return annotation.remove(function(err) {
          if (!err) {
              console.log("removed");
              return res.send(204, 'Successfully deleted annotation.');
          } else {
              console.log(err);
          }
      });
  });
});



///////end


// Authentication
// function tokenOK(req, res, next) {
//   try {
//       var decoded = jwt.decode(req.header('x-annotator-auth-token'), secret);
//       if (inWindow(decoded)) {
//           console.log("Token in time window");
//       } else {
//           console.log("Token not in in time window.");
//       }
//       next();
//   } catch (err) {
//       console.log("Error decoding token:");
//       console.log(err);
//       return res.send("There was a problem with your authentication token");
//   }
// }
// };


// beging/////////////////////////

  // app.get('/api/annotations', (req, res, next) => {
  //   Annotation.find()
  //     .exec()
  //     .then((annotation) => res.json(annotation))
  //     .catch((err) => next(err));
  // });

  // app.post('/api/annotations', function (req, res, next) {
  //   const annotation = new Annotation(req.body);
  //   console.log('annotation log: ', annotation)
  //   // console.log('req body log: ', req.body)
    

  //   annotation.save()
  //     .then(() => {
  //       res.json(annotation)}
  //     )
  //     .catch((err) => next(err));
  // });

  // app.delete('/api/annotations/:id', function (req, res, next) {
  //   Annotation.findOneAndRemove({ _id: req.params.id })
  //     .exec()
  //     .then((annotation) => res.json())
  //     .catch((err) => next(err));
  // });



  //////end/////////////////////////

  // app.put('/api/annotations/:id/increment', (req, res, next) => {
  //   annotation.findById(req.params.id)
  //     .exec()
  //     .then((annotation) => {
  //       annotation.count++;

  //       annotation.save()
  //         .then(() => res.json(annotation))
  //         .catch((err) => next(err));
  //     })
  //     .catch((err) => next(err));
  // });

  // app.put('/api/annotations/:id/decrement', (req, res, next) => {
  //   Annotation.findById(req.params.id)
  //     .exec()
  //     .then((annotation) => {
  //       annotation.count--;

  //       annotation.save()
  //         .then(() => res.json(annotation))
  //         .catch((err) => next(err));
  //     })
  //     .catch((err) => next(err));
  // });
};
