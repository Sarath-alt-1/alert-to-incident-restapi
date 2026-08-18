(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    var body = request.body.data; // (1) was request.body.date — typo

    var gr = new GlideRecord('u_alert'); // (2) GlideRecord must be capitalized
    gr.initialize();

    gr.u_alert_name = body.alert_name;
    gr.u_description = body.description;
    gr.u_source = body.source;
    gr.u_status = 'new';

    var sysId = gr.insert();

    response.setBody({ // (3) setBody, capital B
        message: 'Alert Created',
        alert_id: sysId
    });

})(request, response);
