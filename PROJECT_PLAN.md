# IDMS Project Plan

## Project Name

Intelligent Device Monitoring System (IDMS)

## Project Goal

Build a multi-tenant SaaS platform where companies can monitor IoT devices in real time, view telemetry, manage alerts, and detect anomalies with AI.

This project will be built in a clear order:

1. UI and UX design first
2. Web platform first
3. Backend and real-time features step by step
4. AI features after the core platform works well
5. Mobile app later with React Native

The goal is not to build everything at once. We will build it little by little and keep every phase clean, usable, and production-ready.

## Product Strategy

This is a SaaS product with two user roles:

### 1. SuperAdmin

The SuperAdmin is the SaaS owner and platform provider.

Main responsibilities:

- Create and manage tenants
- Manage subscriptions
- View all tenants and global activity
- Suspend or reactivate tenants
- Monitor platform health
- Manage platform-level settings

### 2. Admin

The Admin is the tenant company using the platform.

Main responsibilities:

- Register and manage devices
- View dashboards and telemetry
- Manage alerts
- View device locations on a map
- Manage tenant settings

## Core Product Principle

Every tenant must only see its own data.

This means the platform must be built as a true multi-tenant system. Devices, telemetry, alerts, and users must always be connected to a tenant.

## Main Build Direction

For now, we focus on:

- Clean Figma design
- Strong web experience
- Real-time monitoring UI
- Simple and scalable architecture

We will not rush into the mobile app yet.

The mobile app comes later, after the web platform is working fully and correctly.

## Phase 1: Product Design in Figma

### Goal

Design the complete Admin web experience before coding.

This phase should answer one main question:

What does an operator need to quickly understand device health and react fast?

The UI should be information-dense but still simple and easy to scan.

### Pages to Design First

#### 1. Admin Dashboard

Purpose: give a full system overview.

Sections:

- KPI cards
- System health charts
- Top risk devices
- Recent alerts feed

Suggested KPI cards:

- Devices Online
- Devices Offline
- Active Alerts
- Average Device Health

Suggested charts:

- Device status distribution
- Alerts over time
- Average telemetry trends

Suggested table:

| Device   | Health | Status   |
| -------- | ------ | -------- |
| Motor-01 | 72%    | Warning  |
| Pump-02  | 61%    | Critical |

Suggested alerts feed:

- Motor-02 abnormal vibration
- Pump-04 temperature spike
- Generator-01 voltage instability

#### 2. Assets Page

Purpose: show all monitored machines in one place.

Suggested table:

| Asset Name | Type           | Status  | Location  | Health Score |
| ---------- | -------------- | ------- | --------- | ------------ |
| Motor-01   | Electric Motor | Healthy | Factory A | 94%          |
| Pump-03    | Water Pump     | Warning | Site B    | 71%          |

Interaction:

- Clicking an asset opens the Device Detail Page

#### 3. Device Detail Page

Purpose: show the digital twin of a single device.

This is the most important page in the product.

Top section:

- Device name
- Location
- Status
- Health score
- Last seen

Main sections:

- Real-time telemetry charts
- Alert history timeline
- Device metadata

Suggested telemetry:

- Temperature
- Vibration
- Voltage or power

Suggested metadata:

- Device ID
- Firmware version
- Last connection
- IP address

#### 4. Alerts Page

Purpose: manage and review all device alerts.

Suggested table:

| Time  | Device  | Alert             | Severity | Status |
| ----- | ------- | ----------------- | -------- | ------ |
| 10:21 | Pump-02 | Temperature Spike | High     | Open   |

Severity colors:

- Green
- Yellow
- Orange
- Red

#### 5. Map Page

Purpose: locate devices visually.

Suggested locations:

- Factory A
- Solar Farm B
- Pump Station C

Interaction:

- Clicking a device pin opens the digital twin view

#### 6. Settings Page

Purpose: manage tenant setup.

Keep this simple for now.

Suggested sections:

- Tenant settings
- User management
- API keys

### SuperAdmin Design After Admin UI

Do not design the SuperAdmin area first.

Design the Admin side first because it is the core product.

After that, design the SuperAdmin panel.

Suggested SuperAdmin pages:

- Platform Dashboard
- Tenants
- Subscriptions
- Global Alerts
- System Logs
- Billing

## Phase 2: Web Product Foundation

### Goal

Start coding the web application after the main Figma flows are ready.

### Primary Stack

- Next.js
- Tailwind CSS
- Chart library for telemetry and analytics
- Next.js API routes
- WebSockets for live updates
- PostgreSQL

### Web-First Delivery Order

#### Stage 1

Build the UI shell and navigation.

Pages:

- Dashboard
- Assets
- Device Detail
- Alerts
- Map
- Settings

#### Stage 2

Connect the UI to real backend data.

#### Stage 3

Add real-time telemetry updates.

#### Stage 4

Add alerts workflow and device health logic.

#### Stage 5

Add SuperAdmin portal.

## Phase 3: System Architecture

### Goal

Create a scalable architecture that supports SaaS, real-time data, and AI features.

### Main Flow

1. Device sends telemetry
2. Backend receives telemetry
3. Backend stores telemetry in PostgreSQL
4. Backend broadcasts live updates with WebSockets
5. Dashboard and device pages update in real time
6. AI service checks for anomalies
7. If an anomaly is found, an alert is created

### Architecture Parts

#### Frontend

- Next.js web app
- Admin interface
- SuperAdmin interface
- Charts and maps

#### Backend

- Next.js API routes for platform APIs
- WebSocket layer for live updates
- Auth and permission checks
- Tenant filtering in every query

#### Database

- PostgreSQL
- Multi-tenant structure

#### Device Communication

- MQTT or HTTP

#### AI Service

- Python anomaly detection service

## Phase 4: Database Design

### Goal

Design the data model around multi-tenancy from the beginning.

### Core Tables

- tenants
- users
- assets
- devices
- telemetry
- alerts
- locations

### Example Table Direction

#### tenants

- id
- name
- subscription_plan
- status
- created_at

#### users

- id
- tenant_id
- email
- password
- role
- created_at

Role values:

- SUPERADMIN
- ADMIN

#### devices

- id
- tenant_id
- asset_id
- location_id
- device_name
- device_type
- status
- health_score
- last_seen

#### telemetry

- id
- device_id
- temperature
- vibration
- voltage
- timestamp

#### alerts

- id
- tenant_id
- device_id
- alert_type
- severity
- status
- timestamp

### Important Rule

All tenant-facing data must be linked to tenant_id.

That is the core rule that protects tenant isolation.

## Phase 5: Device Simulation

### Goal

Simulate device data before using real hardware.

This allows the full product to be demonstrated early.

### Simulated Data Examples

- Temperature: 71
- Vibration: 0.41
- Voltage: 220

### Expected Behavior

- Send telemetry every few seconds
- Store the data
- Show live updates on the dashboard
- Trigger alerts when abnormal values appear

Later, real hardware such as ESP32 devices can replace the simulator.

## Phase 6: Real-Time System

### Goal

Make the platform feel live and operational.

### Real-Time Features

- Dashboard updates automatically
- Device charts update automatically
- Alerts appear without page refresh
- Device status changes in real time

This phase is important because real-time behavior is one of the strongest parts of the project.

## Phase 7: AI Anomaly Detection

### Goal

Add intelligent monitoring after the core platform is stable.

### AI Service Role

The Python service reviews telemetry values and flags unusual behavior.

Example:

- Normal temperature: 60 to 75
- Incoming temperature: 95
- Result: anomaly detected
- Action: create alert

### AI Output

- Anomaly detected flag
- Alert reason
- Severity suggestion
- Related device and timestamp

## Phase 8: SuperAdmin Platform

### Goal

Build the SaaS provider side after the tenant Admin product works well.

### SuperAdmin Features

- View all tenants
- View total devices across tenants
- View global alerts
- Manage billing and subscriptions
- Suspend or activate tenants
- Monitor platform activity

### Suggested Routes

- /platform/dashboard
- /platform/tenants
- /platform/subscriptions
- /platform/billing

## Phase 9: Demo Readiness

### Goal

Prepare a strong final demo that clearly shows the full system value.

### Demo Story

1. A simulated device sends telemetry
2. The dashboard updates live
3. The AI service detects an anomaly
4. An alert is created
5. The device page shows the problem clearly

This demo should feel practical and close to a real industrial monitoring platform.

## Phase 10: Mobile App Later

### Goal

Build the mobile app only after the web platform is complete and stable.

### Stack

- React Native

### Mobile Focus

- Receive alerts
- View key device status
- Open device details
- Support fast operator response

The mobile app is an extension of the platform, not the first priority.

## Documentation Plan

The project should later include:

- Architecture diagram
- Database schema
- System design notes
- Demo video
- Setup instructions

## Recommended Build Order

To keep the project organized, use this order:

1. Finish Admin Figma design
2. Build the web UI shell in Next.js
3. Build database schema and authentication
4. Build Admin pages with real data
5. Add device simulation
6. Add WebSocket real-time updates
7. Add AI anomaly detection
8. Build SuperAdmin platform
9. Prepare final demo
10. Build the React Native app

## What We Should Focus On Right Now

Right now, the only focus should be the Admin web product design.

Priority order:

1. Dashboard
2. Assets page
3. Device Detail page
4. Alerts page
5. Map page
6. Settings page

After these are clean in Figma, we can move into web implementation step by step.

## Final Planning Rule

Keep the product well organized.

Do not try to build all features at once.

Move in small phases:

- Design clearly
- Build the web app carefully
- Make real-time features stable
- Add AI after the product foundation works
- Add mobile only when the web platform is complete

This will help us deliver a fully functional and high-quality platform without clutter.
