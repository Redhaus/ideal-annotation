import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Redux Actions
import { getAnnotation } from '../../actions/AnnotationActions';

class Annotate extends Component {

    constructor(props){
        super(props)

        console.log('annotations load: ' , this.props.annotations)
    }



    componentDidMount() {
        this.props.getAnnotation();
      
        if (typeof annotator === 'undefined') {
            alert("Oops! it looks like you haven't built Annotator. " +
                  "Either download a tagged release from GitHub, or build the " +
                  "package by running `make`");
          } else {
      
        function generate_id() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
            // set fake date, id, and author in order to demonstrate footer,
            // since demo operates without an annotate store
            var fakeData = function () {
              return {
                beforeAnnotationCreated: function (ann) {
                  ann.updated = new Date();
                  ann.user = 'anon';
                  ann.id = generate_id();
                //   var ann = $(element).annotator();  
                //   ann.annotator("loadAnnotations", comments);  
                //   ann.save()
                }
              };
            };
      
            var _marginalia = annotatorMarginalia();
            var app = new annotator.App()
              .include(annotator.ui.main)
              .include(fakeData)
              .include(annotatorMarginalia, {
                show_update_date: true,
                show_author: true
              })
              .include(annotator.storage.http, {
                prefix: 'http://localhost:8080/api'
              });
            //   .include(setAnnotation);


            // setAnnotation = function() {
            //     return {
            //       beforeAnnotationCreated: function(annotation) {
            //         annotation.book_id = bookID;
            //         annotation.base_uri = baseURI;
            //       },
            //       annotationCreated: function(annotation) {
            //         return console.log(annotation);
            //       }
            //     };
            //   };
            //   app = new annotator.App;
            //   app.include(annotator.ui.main);
            //   app.include(annotator.storage.http, {
            //     prefix: 'http://localhost:3000/api',
            //     headers: localHeaders
            //   });
            //   app.include(setAnnotation);
            //   return app.start().then(function() {
            //     app.annotations.load({
            //       book_id: bookID,
            //       base_uri: baseURI
            //     });
            //   });


            // var app = new annotator.App();
            // app.include(annotator.ui.main);
            // app.include(annotator.storage.http);
            // app
            // .start()
            // .then(function () {
            //      app.annotations.load();
            // });

      
            app.start()
            .then(function() {
            // console.log('annotations load: ' , this.props.annotations)
        
                // console.log('annotations: ' , app.annotations)
                // there is an issue with the search api that needs to be resolved for this to load
                // figure out what exec function does
              //   var query = {
              //     _id: '5a893275b04e5fd2b24b398d'
              // };
                // app.annotations.load(query);
              });
      
            // simulate empty data load since demo has no annotation store
            // this.props.annotations
            _marginalia.annotationsLoaded([]);
      
          }
    }

    handleGetAnn(){
      // console.log(this.props)
      // console.log(this.props.getAnnotation()) 
      console.log(this.props.annotations)
    }
    

    render() {

      
        return (
            <div>

        <header>
            <h1>Marginalia demonstration</h1>
            <div className="in-page-controls"></div>
          </header>

          <button onClick={this.handleGetAnn.bind(this)}>annotations display</button>
      
          <article className="content">
            <section className="inner">
              <p>"My God!" he said, as I drew him in.</p>
      
              <p>"What has happened?" I asked.</p>
      
              <p>"What hasn't?"  In the obscurity I could see he made a gesture of despair.  "They wiped us out--simply wiped us out," he repeated again and again.</p>
      
              <p>He followed me, almost mechanically, into the dining room.</p>
      
              <p>"Take some whiskey," I said, pouring out a stiff dose.</p>
      
              <p>He drank it.  Then abruptly he sat down before the table, put his head on his arms, and began to sob and weep like a little boy, in a perfect passion of emotion, while I, with a curious forgetfulness of my own recent despair, stood beside him, wondering.</p>
      
              <p>It was a long time before he could steady his nerves to answer my questions, and then he answered perplexingly and brokenly.  He was a driver in the artillery, and had only come into action about seven.  At that time firing was going on across the common, and it was said the first party of Martians were crawling slowly towards their second cylinder under cover of a metal shield.</p>
      
              <p>Later this shield staggered up on tripod legs and became the first of the fighting-machines I had seen.  The gun he drove had been unlimbered near Horsell, in order to command the sand pits, and its arrival it was that had precipitated the action.  As the limber gunners went to the rear, his horse trod in a rabbit hole and came down, throwing him into a depression of the ground.  At the same moment the gun exploded behind him, the ammunition blew up, there was fire all about him, and he found himself lying under a heap of charred dead men and dead horses.</p>
      
              <p>"I lay still," he said, "scared out of my wits, with the fore quarter of a horse atop of me.  We'd been wiped out.  And the smell--good God!  Like burnt meat!  I was hurt across the back by the fall of the horse, and there I had to lie until I felt better.  Just like parade it had been a minute before--then stumble, bang, swish!"</p>
            </section>
          </article>

                
            </div>
        );
    }
}


// Takes the application store (main data) and passes into
// your container as a prop. It can pass any aspect of the
// store. So we want counters, so state.counters. We can
// now reference this.props.counters to grab counters in
// store.
function mapStateToProps(state) {
    return {
        annotations: state.annotations
    //   counters: state.counters,
    //   selectedCounter: state.selectedCounter,
    };
  };
  
  // Passing the selectCounter action in as a prop.
  // Dispatch is a way saying call a function.
  function mapDispatchToProps(dispatch) {
    // Connect this function creator to prop.
    return bindActionCreators({
      getAnnotation: getAnnotation
      // getCounters: getCounters,
    }, dispatch);
    // return {
    // //   selectCounter: (counter) => {
    // //     dispatch(selectCounter(counter));
    // //   },
    //   getAnnotation: dispatch(this.getAnnotation())
    // };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Annotate);

  


// export default Annotate;



// API URL

// {
//     create: '/annotations',
//     update: '/annotations/{id}',
//     destroy: '/annotations/{id}',
//     search: '/search'
// }



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
