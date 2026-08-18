# Alert-to-Incident Automation — Scripted REST API Integration

A custom Scripted REST API built on a ServiceNow Personal Developer Instance (PDI) that automates the creation of Incident records from external alert data — replacing manual alert triage with a real-time, authenticated integration endpoint.

## Overview

Monitoring and alerting tools generate large volumes of alerts, but turning those into actionable ITSM incidents is often a manual, slow process. This project builds a Scripted REST API resource in ServiceNow that accepts alert payloads via HTTP POST, stores them, and triggers automatic creation of a corresponding Incident record — demonstrating an integration pattern commonly used to connect ServiceNow with external monitoring/alerting systems.

## Features

- Custom Scripted REST API resource built in ServiceNow Studio
- Accepts `POST` requests with a JSON alert payload (`alert_name`, `description`, `source`)
- Server-side script uses `GlideRecord` to insert a new record into a custom `u_alert` table
- A Business Rule on `u_alert` automatically creates the corresponding Incident record
- Basic Authentication enforced on the endpoint for secured access
- End-to-end request/response flow tested and validated in Postman, with confirmed automatic Incident creation

## Tech Stack

`ServiceNow (PDI)` · `Scripted REST API` · `JavaScript (GlideScript)` · `GlideRecord` · `Business Rules` · `Postman` · `Basic Auth`

## How It Works
