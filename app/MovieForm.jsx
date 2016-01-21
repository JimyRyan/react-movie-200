var React = require('react');

var MovieForm = React.createClass({

    propTypes: {
        onMovieFormSaved: React.PropTypes.func.isRequired,

        movie  : React.PropTypes.shape({
            title   : React.PropTypes.string,
            actors  : React.PropTypes.string,
            synopsis: React.PropTypes.string
        }),
        editing: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            movie  : {
                title   : "",
                actors  : "",
                synopsis: ""
            },
            editing: false
        };
    },


    handleSubmit: function (event) {

        // Requis pour ne pas soumettre le formulaire réelement (est provoquer un reload)
        event.preventDefault();

        // Lecture des data depuis les input
        var title = this.refs.title.value.trim();       // Ok depuis React 0.14 (avant alert(this.refs.greetingInput.getDOMNode().value);)
        var actors = this.refs.actors.value.trim();
        var synopsis = this.refs.synopsis.value.trim();

        var data = {title: title, actors: actors, synopsis: synopsis};

        // Appel de la fct d'ajout
        this.props.onMovieFormSaved(data);

        //
        this.resetForm();
    },

    resetForm: function () {
        this.refs.title.value = "";
        this.refs.actors.value = "";
        this.refs.synopsis.value = "";
    },

    render: function () {
        return (

            <form className="movie-form" onSubmit={this.handleSubmit}>
                <h3 className="col-md-12">Add a movie</h3>
                <div className="col-md-4">
                    <div className="input-group col-md-11">
                        <label>Title</label>
                        <input ref="title" type="text" className="form-control" placeholder="" defaultValue=""/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="input-group col-md-11">
                        <label>Actors</label>
                        <input ref="actors" type="text" className="form-control" placeholder="" defaultValue=""/>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="input-group col-md-11">
                        <label>Synopsis</label>
                        <textarea ref="synopsis" className="form-control" defaultValue=""/>
                    </div>
                </div>
                <div className="col-md-12">
                    <input type="submit" className="btn btn-primary pull-right" value="Save"/>
                </div>
            </form>
        );
    }
});

module.exports = MovieForm;
