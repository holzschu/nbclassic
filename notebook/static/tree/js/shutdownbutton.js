// Copyright (c) Jupyter Development Team.
// Distributed under the terms of the Modified BSD License.

define([
    'jquery',
    'base/js/dialog',
    'base/js/events',
    'base/js/promises',
    'base/js/page',
    'base/js/utils'
], function(
    $,
    dialog,
    events,
    promises,
    page,
    utils
){
    "use strict";

    function display_shutdown_dialog() {
        var body = $('<div/>').append(
            $('<p/>').text("You have shut down Jupyter. You can now close this tab.")
        ).append(
            $('<p/>').text("To use Jupyter again, you will need to relaunch it.")
        );

        dialog.modal({
            title: "Server stopped",
            body: body
        })
    }

    function activate() {
        // Add shutdown button
        $("button#shutdown").click(function () {
            utils.ajax(utils.url_path_join(
                utils.get_body_data("baseUrl"),
                "api",
                "shutdown"
            ), {
                type: "POST",
                success: display_shutdown_dialog,
                error: function (error) {
                    console.log(error);
                }
            });
        });
    }

    return {activate: activate}
});
