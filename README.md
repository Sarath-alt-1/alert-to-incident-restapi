Alert-to-Incident Automation — Scripted REST API Integration
A custom Scripted REST API built on a ServiceNow Personal Developer Instance (PDI) that automates the creation of Incident records from external alert data — replacing manual alert triage with a real-time, authenticated integration endpoint.
Overview
Monitoring and alerting tools generate large volumes of alerts, but turning those into actionable ITSM incidents is often a manual, slow process. This project builds a Scripted REST API resource in ServiceNow that accepts alert payloads via HTTP POST and automatically creates a corresponding Incident record — demonstrating an integration pattern commonly used to connect ServiceNow with external monitoring/alerting systems.
Features
Custom Scripted REST API resource built in ServiceNow Studio (scoped application)
Accepts `POST` requests with a JSON alert payload
Maps incoming alert fields (severity, source, description, affected CI) to standard Incident fields (priority, short description, description, category)
Basic Authentication enforced on the endpoint for secured access
Server-side script uses `GlideRecord` to insert new Incident records
Input validation and error handling for malformed/incomplete payloads
End-to-end request/response flow tested and validated in Postman
Tech Stack
`ServiceNow (PDI)` · `Scripted REST API` · `JavaScript (GlideScript)` · `GlideRecord` · `Postman` · `Basic Auth`
How It Works
```
External system / Postman
        │  POST (JSON alert payload)
        ▼
Scripted REST API Resource
        │  parses request body
        ▼
Server-side script (GlideRecord)
        │  inserts new record
        ▼
Incident table
        │
        ▼
Response returned (incident number / sys_id)
```
> 📝 **Add here:** your actual resource path (e.g. `/api/x_<scope>/alert_to_incident`), the HTTP method(s) supported, and the exact field-mapping table (alert field → incident field).
Challenges Solved
Debugged `401 Unauthorized` errors caused by incorrect Basic Auth credential/header setup in Postman
Fixed JavaScript syntax issues in the REST resource script that were silently breaking record creation
Verified correct end-to-end behavior: valid payload → Incident created with correct field values → confirmed in the Incident table
Sample Request
> 📝 **Add here:** a real (sanitized) example of the JSON payload you send, and the JSON response returned.
```json
{
  "source": "Monitoring-Tool",
  "severity": "High",
  "description": "Example alert description"
}
```
Screenshots
> 📝 **Add here:** Studio view of the Scripted REST API resource, the server-side script, and a Postman request/response screenshot showing a successful 201/200 response.
Future Improvements
Support OAuth 2.0 in addition to Basic Auth
Alert deduplication logic (avoid duplicate incidents from repeated alerts)
Connect to a real monitoring tool (e.g. Zabbix, SolarWinds) instead of Postman-simulated requests
Transform Map–based field mapping for more complex payloads
Author
Sarath Vasantharaj — ServiceNow CSA | Building hands-on ServiceNow projects on PDI while transitioning into a ServiceNow Developer/Administrator role.
