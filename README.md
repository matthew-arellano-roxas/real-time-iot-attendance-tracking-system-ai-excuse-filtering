# SmartAttend — ESP32 Fingerprint-Based Attendance System

SmartAttend is a fingerprint-based attendance system built on ESP32 that supports both online and offline operation. Educators can manage classes and schedules, students scan their fingerprint to log attendance, and the system automatically records each entry as Present, Late, or Absent. Excuse requests from students and monitors are processed through an AI-based filtration system, and email warnings are sent automatically when triggered.

---

## How It Works

### Attendance Logging

Students scan their fingerprint on the ESP32 device. Based on the configured class schedule, the system automatically determines and records the attendance status as Present, Late, or Absent.

### Online Mode

When connected, attendance is logged in real-time to the web server. Email warnings are sent immediately when conditions are met, such as excessive absences or flagged excuse requests.

### Offline Mode

A configuration page allows educators to set up class schedules and export them as a file. This file is loaded onto the ESP32 so the device can log attendance independently without a network connection. Once reconnected, the stored logs can be uploaded to the web server through the ESP32's built-in web interface.

### Class and Schedule Management

Educators can add classes and define their own schedules. In online mode, changes are reflected immediately. In offline mode, the updated schedule is exported and loaded onto the device via the configuration page.

### AI-Based Excuse Filtration

Students and monitors can submit excuse requests. The AI engine evaluates each submission and filters them before presenting the results to the educator, reducing the need for manual review.

### Email Warnings

The system sends email alerts to educators automatically based on attendance patterns and AI-flagged excuse activity. In online mode this happens in real-time; in offline mode, notifications are queued and delivered once the device reconnects.

### Pairing Key

Each ESP32 device uses a pairing key to authenticate communication with the web server. This ensures only authorized devices can interact with the system.

---

## Roles

- **Educator / Teacher** — manages classes and schedules, reviews attendance and filtered excuse requests, receives email alerts
- **Student** — scans fingerprint, submits excuse requests
- **Monitor** — assists with attendance oversight, submits excuse requests on behalf of students
