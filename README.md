# Al Dheeniyya Arabic College — Management System & Library

A new, clean, fully functional website rebuilt from the original compiled
`index.html` build of the **Al Dheeniyya Arabic College Management System**
(Pallimulla, Panadura, Sri Lanka).

The original file was a minified production bundle (React + Firebase, ~4.6 MB).
This rebuild recreates the same system as readable, dependency-free static
files — no build step required — and adds a **Library** module to match this
repository.

## Files

| File | Purpose |
|---|---|
| `index.html` | App shell: login screen + layout (sidebar, topbar, content) |
| `styles.css` | Design system — navy `#0B2239`, emerald + amber, Outfit / Plus Jakarta Sans / JetBrains Mono, dark mode, print styles |
| `app.js` | All logic: seed data, login, role-based access, every module, CSV/JSON backup & restore |

## Features

- **Login** with demo accounts per role (any password works in demo mode)
- **Dashboard** — stats, students-by-class chart, quick actions, recent activity, gallery
- **Students** — admissions, guardians, class enrolment; search, filter, add/edit/delete, CSV export, print
- **Staff** — staff codes, roles, departments, assigned classes; same CRUD + export
- **Attendance** — daily register (Present / Absent / Late) per class & date, per-student attendance %
- **Exams & Marks** — marks entry per exam/class/subject with automatic grades (A/B/C/S/F) and pass rates
- **Timetable** — weekly period grid per class, click-to-edit cells, print
- **Library** — catalogue (ISBN, shelf, copies), issue & return with due dates, overdue tracking
- **Backups** — full JSON export, CSV exports, restore from file, backup history
- **Roles & Permissions** — permission matrix per role (RBAC), user accounts list
- **Settings** — college info, light/dark theme, change password, reset demo data

All data is stored in the browser's `localStorage`, so every change persists
between visits. Use **Backups → Export** to save a portable copy.

## Demo accounts

| Username | Role | Password |
|---|---|---|
| `admin` | Super Admin | `admin123` |
| `teacher` | Teacher | `teacher123` |
| `librarian` | Librarian | `library123` |
| `student` | Student | `student123` |

Each role sees only the modules it is allowed to use (see Roles & Permissions).

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (GitHub Pages)

The existing `.github/workflows/static.yml` already deploys this repository to
GitHub Pages on every push to `main`. No extra configuration is needed.
