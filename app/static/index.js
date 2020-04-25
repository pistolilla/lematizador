/// General functions
// Read URL parameters
function urlParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.search);
    return (results !== null) ? decodeURI(results[1]) || 0 : false;
}
// Ajax errors handler
function ajaxError(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    alert(`Ocurrió un error inesperado, favor de contactar a soporte (${err})`);
    console.log("Request Failed: " + err);
}

// Handlebars templates
Handlebars.registerHelper('eachx', function(context, options) {
    var ret = "";
    for (var prop in context) {
        ret = ret + options.fn({property:prop,value:context[prop]});
    }
    return ret;
});

var lemmatizerT = Handlebars.compile(`
{{#.}}
<tr>
    <th>{{text}}</th>
    <td class="table-primary">{{lemma}}</td>
    <td class="table-success">{{pos}}</td>
    <td class="table-warning">
    {{#eachx tag}}
        {{#if value}}
            <div>{{property}}: <span class="badge badge-secondary">{{value}}</span></div>
        {{/if}}
    {{/eachx}}
    </td>
    <td class="table-danger">{{dependency}}</td>
</tr>
{{/.}}`);

// DocumentReady
$(function() {
    var view = {
        title: "Joe",
        calc: function () {
          return 2 + 4;
        }
      };

    //   var output = Handlebars.render("{{title}} spends {{calc}}", view);
    //   console.log(output);


    // init state
    $("#lemmatizerTable").hide();
    $(".loading").hide();

    var get_s = urlParam("s")
    // if "s" undefined
    if (get_s == 0) {
        $("#searchbar").hide();
        $("#sentJ").focus();
    }
    else {
        // displaying at input
        $("#sentB").val(decodeURIComponent(get_s).replace(/\+/g, " "));
        $(".jumbotron").hide();
        $("#lemmatizerGif").show();
        // api call
        $.getJSON(`/api/nlp/?s=${get_s}`)
        .done(function(result) {
            // clearing
            $("#lemmatizerGif").hide();
            $("#lemmatizerTable").show();
            $("#lemmatizerTable tbody").empty();
            // populating controls
            $("#lemmatizerTable tbody").append(lemmatizerT(result["tokens"]));
            $.each(result["entities"], function(i, obj) {
                // populating controls
                console.log(i, obj);
            });
        })
        .fail($.ajaxError);
    }
});