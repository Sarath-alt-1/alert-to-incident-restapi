# Alert-to-Incident Automation 窶・Scripted REST API Integration

A custom Scripted REST API built on a ServiceNow Personal Developer Instance (PDI) that automates the creation of Incident records from external alert data 窶・replacing manual alert triage with a real-time, authenticated integration endpoint.

## Overview

Monitoring and alerting tools generate large volumes of alerts, but turning those into actionable ITSM incidents is often a manual, slow process. This project builds a Scripted REST API resource in ServiceNow that accepts alert payloads via HTTP POST, stores them, and triggers automatic creation of a corresponding Incident record 窶・demonstrating an integration pattern commonly used to connect ServiceNow with external monitoring/alerting systems.

## Features

- Custom Scripted REST API resource built in ServiceNow Studio
- Accepts `POST` requests with a JSON alert payload (`alert_name`, `description`, `source`)
- Server-side script uses `GlideRecord` to insert a new record into a custom `u_alert` table
- A Business Rule on `u_alert` automatically creates the corresponding Incident record
- Basic Authentication enforced on the endpoint for secured access
- End-to-end request/response flow tested and validated in Postman, with confirmed automatic Incident creation

## Tech Stack

`ServiceNow (PDI)` ﾂｷ `Scripted REST API` ﾂｷ `JavaScript (GlideScript)` ﾂｷ `GlideRecord` ﾂｷ `Business Rules` ﾂｷ `Postman` ﾂｷ `Basic Auth`

## How It Works

```
External system / Postman
        笏・ POST (JSON alert payload)
        笆ｼ
Scripted REST API Resource
        笏・ parses request body
        笆ｼ
Server-side script (GlideRecord insert)
        笏・ creates record in u_alert table
        笆ｼ
Business Rule (after insert, on u_alert)
        笏・ creates corresponding Incident record
        笆ｼ
Incident table
        笏・        笆ｼ
Response returned to caller (message / alert_id)
```

**Endpoint**
- Method: `POST`
- Path: `/api/2065243/alert_api/create`

**Field mapping (alert payload 竊・`u_alert` table)**

| Alert payload field | Stored in |
|---|---|
| `alert_name` | `u_alert_name` |
| `description` | `u_description` |
| `source` | `u_source` |
| 窶・| `u_status` (auto-set to `new`) |

## Challenges Solved

- Fixed a typo reading `request.body.date` instead of `request.body.data`, which was silently producing empty fields
- Corrected `GlideRecord` capitalization 窶・the ServiceNow API is case-sensitive and fails silently on mismatches
- Fixed `response.setBody` (was lowercase `b`), which returned an empty response body despite the record being created successfully
- Verified end-to-end in Postman: a POST request created a matching `u_alert` record, confirmed to produce a real Incident (INC0010019) with the matching alert name

## Sample Request

**Request**

    POST /api/2065243/alert_api/create
    Content-Type: application/json

    {
      "alert_name": "CPU High",
      "description": "CPU usage exceeded 90%",
      "source": "Datadog"
    }

**Response 窶・200 OK**

    {
      "result": {
        "message": "Alert Created",
        "alert_id": "dda599fb931683505d17b1dcebba104e"
      }
    }

## Screenshots

> 統 Drag your two screenshots in here directly in the GitHub editor (Postman request/response, and the Incident list showing INC0010019).

## Future Improvements

- Support OAuth 2.0 in addition to Basic Auth
- Alert deduplication logic (avoid duplicate incidents from repeated alerts)
- Connect to a real monitoring tool (e.g. Zabbix, SolarWinds) instead of Postman-simulated requests
- Transform Map窶澱ased field mapping for more complex payloads

## Author

**Sarath Vasantharaj** 窶・ServiceNow CSA | Building hands-on ServiceNow projects on PDI while transitioning into a ServiceNow Developer/Administrator role.
