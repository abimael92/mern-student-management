# Monitoring & Observability – School Management System

This document describes how to monitor the health, performance, and reliability of the School Management System in production.

---

## 1. Logging

### 1.1 Backend Logs

- Use a structured logger (e.g., Winston or Pino) to log:
  - Request start/finish (method, path, status code, latency).
  - Errors and stack traces (only to logs, not API responses).
  - Key lifecycle events (startup, shutdown, DB reconnects).
- Recommended format:
  - JSON lines (one JSON object per log line) for easy ingestion by log tools.

### 1.2 Log Aggregation

Options:

- **CloudWatch Logs** (AWS) – send Node.js logs via the CloudWatch agent or PM2 integration.
- **ELK Stack (Elasticsearch + Logstash + Kibana)** – forward logs from EC2 using Filebeat.
- **Hosted log services** (e.g., Datadog, Logtail, Logz.io).

Configure:

- Log level per environment (e.g., `info` in production, `debug` in staging).
- Separate error logs from access logs if helpful.

---

## 2. Error Tracking

Use a tool like **Sentry** or **Rollbar** for unhandled exceptions and frontend errors.

### 2.1 Backend (Node)

- Install Sentry SDK.
- Initialize in the backend entry file (server.js).
- Wrap Express error handler to capture exceptions.

### 2.2 Frontend (React)

- Initialize Sentry in `main.jsx`.
- Use error boundaries (like `ErrorBoundary` component) to capture React errors.
- Tag errors with:
  - Current role.
  - Route path.

---

## 3. Performance Monitoring

### 3.1 API Performance

Track:

- Request latency per endpoint (p50/p90/p99).
- Error rate per endpoint.
- Throughput (requests per second).

Tools:

- APM solutions (Datadog APM, New Relic, Elastic APM).
- Custom Prometheus metrics + Grafana dashboards.

Key metrics:

- `http_requests_total` (by method, path, status).
- `http_request_duration_seconds` (histogram).
- `mongo_query_duration_seconds` (if instrumented).

### 3.2 Frontend Performance

Monitor:

- Page load times (TTFB, FCP, LCP).
- Bundle size and code splitting impact.
- Slow component renders (React Profiler in dev).

Tools:

- Browser performance APIs and Lighthouse.
- Frontend monitoring (Sentry Performance / Datadog RUM).

---

## 4. Uptime Monitoring

Set up external checks for:

- API health endpoint (e.g., `GET /api/health` returning `200`).
- Frontend main page (e.g., `https://school.yourdomain.com`).

Tools:

- UptimeRobot, Pingdom, StatusCake, or AWS Route53 Health Checks.

Alert if:

- Health endpoint fails for X consecutive checks.
- Response time exceeds a configured threshold.

---

## 5. Alerts and Thresholds

Recommended alerts:

- **Availability**
  - API health check fails for 5+ minutes.
- **Errors**
  - HTTP 5xx rate exceeds 2% of requests in a 5‑minute window.
  - Auth failures (401) spike beyond normal (possible attack).
- **Performance**
  - p95 latency exceeds agreed SLA (e.g., 500 ms for core endpoints).
- **Resources**
  - CPU > 80% for 10 minutes.
  - Memory usage approaching limits (Node or container OOM risk).
- **Database**
  - Connection errors.
  - Slow query logs above threshold.

Integrate alerts with:

- Email.
- Slack or Microsoft Teams.
- PagerDuty or Opsgenie for critical incidents.

---

## 6. Security Monitoring

- Monitor:
  - Failed login attempts per IP/user.
  - Repeated 403/429 responses (possible abuse).
  - Unusual spikes in S3 access logs.
- Consider:
  - WAF (Web Application Firewall) rules in front of Nginx/ALB.
  - AWS GuardDuty and CloudTrail for account‑level activity.

---

## 7. Dashboards

Create dashboards for:

- **Operations view**:
  - API latency, error rates, throughput.
  - Host/resource utilization (CPU, memory, disk).
- **Business view**:
  - Active students, attendance rates, average grades, fee collections.
  - Daily/weekly active users by role.

Ensure on‑call engineers and relevant stakeholders have access to dashboards and alerting channels.

