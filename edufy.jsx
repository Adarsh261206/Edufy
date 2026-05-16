import { useState, useEffect, useRef } from "react";

// ── Icons (inline SVG components) ──────────────────────────────────────────
const Icon = ({ d, size = 18, stroke = "currentColor", fill = "none", strokeWidth = 1.75 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
);

const Icons = {
  Dashboard: () => <Icon d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />,
  Students: () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  Plus: () => <Icon d="M12 5v14M5 12h14" />,
  Search: () => <Icon d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />,
  Edit: () => <Icon d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />,
  Trash: () => <Icon d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />,
  Close: () => <Icon d="M18 6L6 18M6 6l12 12" />,
  GradCap: () => (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  Mail: () => <Icon d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6" />,
  Phone: () => <Icon d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.22 1.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />,
  Hash: () => <Icon d="M4 9h16M4 15h16M10 3L8 21M16 3l-2 18" />,
  Book: () => <Icon d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" />,
  ChevDown: () => <Icon d="M6 9l6 6 6-6" />,
  Menu: () => <Icon d="M3 12h18M3 6h18M3 18h18" />,
  Bell: () => <Icon d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" />,
  Stats1: () => (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
  ),
  TrendUp: () => <Icon d="M23 6l-9.5 9.5-5-5L1 18M17 6h6v6" />,
  Award: () => (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  Layers: () => <Icon d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
};

// ── Sample seed data ───────────────────────────────────────────────────────
const SEED = [
  { id: 1, name: "Aanya Sharma", roll: "CS2401", course: "Computer Science", email: "aanya@edufy.io", phone: "+91 98765 43210" },
  { id: 2, name: "Rohan Mehta", roll: "ME2302", course: "Mechanical Eng.", email: "rohan@edufy.io", phone: "+91 87654 32109" },
  { id: 3, name: "Priya Kapoor", roll: "EC2403", course: "Electronics", email: "priya@edufy.io", phone: "+91 76543 21098" },
  { id: 4, name: "Dev Patel", roll: "CS2405", course: "Computer Science", email: "dev@edufy.io", phone: "+91 65432 10987" },
  { id: 5, name: "Sneha Nair", roll: "BA2201", course: "Business Admin.", email: "sneha@edufy.io", phone: "+91 54321 09876" },
];

const COURSES = ["Computer Science", "Mechanical Eng.", "Electronics", "Business Admin.", "Civil Eng.", "Data Science", "Biotechnology", "Physics"];

// ── Helpers ────────────────────────────────────────────────────────────────
const initials = (name) => name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
const AVATAR_COLORS = ["#2563EB", "#7C3AED", "#059669", "#D97706", "#DC2626", "#0891B2", "#C026D3", "#65A30D"];
const avatarColor = (name) => AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];

const getStudents = () => {
  try { const s = localStorage.getItem("edufy_students"); return s ? JSON.parse(s) : SEED; }
  catch { return SEED; }
};
const saveStudents = (data) => { try { localStorage.setItem("edufy_students", JSON.stringify(data)); } catch {} };

// ── Modal ──────────────────────────────────────────────────────────────────
function Modal({ open, onClose, children }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box animate-modal">
        {children}
      </div>
    </div>
  );
}

// ── Student Form ───────────────────────────────────────────────────────────
const EMPTY_FORM = { name: "", roll: "", course: "", email: "", phone: "" };

function StudentForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(initial || EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [courseOpen, setCourseOpen] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.roll.trim()) e.roll = "Roll number is required";
    if (!form.course) e.course = "Course is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    onSave(form);
  };

  const Field = ({ label, field, type = "text", icon, placeholder }) => (
    <div className="form-field">
      <label className="form-label">{label}</label>
      <div className="input-wrap">
        <span className="input-icon">{icon}</span>
        <input
          type={type}
          value={form[field]}
          onChange={(e) => { setForm(f => ({ ...f, [field]: e.target.value })); setErrors(err => ({ ...err, [field]: "" })); }}
          placeholder={placeholder}
          className={`form-input ${errors[field] ? "input-error" : ""}`}
        />
      </div>
      {errors[field] && <p className="error-msg">{errors[field]}</p>}
    </div>
  );

  return (
    <div>
      <div className="modal-header">
        <div>
          <h2 className="modal-title">{initial?.id ? "Edit Student" : "Add New Student"}</h2>
          <p className="modal-subtitle">{initial?.id ? "Update student information" : "Fill in the details below"}</p>
        </div>
        <button className="icon-btn" onClick={onClose}><Icons.Close /></button>
      </div>

      <div className="form-grid">
        <Field label="Full Name" field="name" icon={<Icons.Students />} placeholder="e.g. Aanya Sharma" />
        <Field label="Roll Number" field="roll" icon={<Icons.Hash />} placeholder="e.g. CS2401" />

        {/* Course dropdown */}
        <div className="form-field">
          <label className="form-label">Course</label>
          <div className="input-wrap" style={{ position: "relative" }}>
            <span className="input-icon"><Icons.Book /></span>
            <button
              type="button"
              className={`form-input course-btn ${errors.course ? "input-error" : ""}`}
              onClick={() => setCourseOpen(o => !o)}
            >
              <span style={{ color: form.course ? "var(--dark)" : "#94a3b8" }}>{form.course || "Select course"}</span>
              <Icons.ChevDown />
            </button>
            {courseOpen && (
              <div className="dropdown">
                {COURSES.map(c => (
                  <button key={c} className={`dropdown-item ${form.course === c ? "dropdown-item-active" : ""}`}
                    onClick={() => { setForm(f => ({ ...f, course: c })); setErrors(e => ({ ...e, course: "" })); setCourseOpen(false); }}>
                    {c}
                  </button>
                ))}
              </div>
            )}
          </div>
          {errors.course && <p className="error-msg">{errors.course}</p>}
        </div>

        <Field label="Email Address" field="email" type="email" icon={<Icons.Mail />} placeholder="student@email.com" />
        <Field label="Phone Number" field="phone" icon={<Icons.Phone />} placeholder="+91 99999 88888" />
      </div>

      <div className="modal-footer">
        <button className="btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn-primary" onClick={handleSubmit}>
          {initial?.id ? "Save Changes" : "Add Student"}
        </button>
      </div>
    </div>
  );
}

// ── Delete Confirm ─────────────────────────────────────────────────────────
function DeleteConfirm({ student, onConfirm, onClose }) {
  return (
    <div>
      <div className="modal-header">
        <div>
          <h2 className="modal-title">Delete Student</h2>
          <p className="modal-subtitle">This action cannot be undone</p>
        </div>
        <button className="icon-btn" onClick={onClose}><Icons.Close /></button>
      </div>
      <div className="delete-body">
        <div className="delete-avatar" style={{ background: avatarColor(student.name) }}>
          {initials(student.name)}
        </div>
        <p className="delete-name">{student.name}</p>
        <p className="delete-roll">{student.roll} · {student.course}</p>
        <p className="delete-warning">Are you sure you want to remove this student from the system?</p>
      </div>
      <div className="modal-footer">
        <button className="btn-outline" onClick={onClose}>Cancel</button>
        <button className="btn-danger" onClick={onConfirm}>Delete Student</button>
      </div>
    </div>
  );
}

// ── Stats Card ─────────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon-wrap" style={{ background: color + "18", color }}>
        {icon}
      </div>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
        {sub && <p className="stat-sub">{sub}</p>}
      </div>
    </div>
  );
}

// ── Dashboard Page ─────────────────────────────────────────────────────────
function DashboardPage({ students, onNavigate }) {
  const courses = [...new Set(students.map(s => s.course))].length;
  const recent = [...students].reverse().slice(0, 5);

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-sub">Welcome back — here's your institution overview</p>
        </div>
        <button className="btn-primary" onClick={() => onNavigate("students")}>
          <Icons.Plus /> Manage Students
        </button>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard icon={<Icons.Stats1 />} label="Total Students" value={students.length} sub="Enrolled" color="#2563EB" />
        <StatCard icon={<Icons.Book />} label="Courses Offered" value={courses} sub="Active" color="#7C3AED" />
        <StatCard icon={<Icons.Award />} label="Avg. Roll Series" value={students.length > 0 ? new Date().getFullYear() : "—"} sub="Batch Year" color="#059669" />
        <StatCard icon={<Icons.TrendUp />} label="Growth Rate" value="+12%" sub="vs last month" color="#D97706" />
      </div>

      {/* Recent Students */}
      <div className="section-card">
        <div className="section-header">
          <h2 className="section-title">Recent Students</h2>
          <button className="link-btn" onClick={() => onNavigate("students")}>View all →</button>
        </div>
        <div className="mini-table">
          {recent.length === 0 && <p className="empty-text">No students yet. Add some!</p>}
          {recent.map((s, i) => (
            <div key={s.id} className="mini-row" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="mini-avatar" style={{ background: avatarColor(s.name) }}>{initials(s.name)}</div>
              <div className="mini-info">
                <p className="mini-name">{s.name}</p>
                <p className="mini-meta">{s.roll} · {s.course}</p>
              </div>
              <div className="mini-email">{s.email}</div>
              <span className="badge">{s.course.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Students Page ──────────────────────────────────────────────────────────
function StudentsPage({ students, onAdd, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");

  const courses = ["All", ...new Set(students.map(s => s.course))];
  const filtered = students.filter(s => {
    const q = search.toLowerCase();
    const matchQ = s.name.toLowerCase().includes(q) || s.roll.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
    const matchC = courseFilter === "All" || s.course === courseFilter;
    return matchQ && matchC;
  });

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1 className="page-title">Students</h1>
          <p className="page-sub">{students.length} students enrolled across {new Set(students.map(s => s.course)).size} courses</p>
        </div>
        <button className="btn-primary" onClick={onAdd}><Icons.Plus /> Add Student</button>
      </div>

      {/* Filters */}
      <div className="filter-bar">
        <div className="search-wrap">
          <span className="search-icon"><Icons.Search /></span>
          <input
            className="search-input"
            placeholder="Search by name, roll, or email…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button className="search-clear" onClick={() => setSearch("")}><Icons.Close /></button>}
        </div>
        <div className="course-pills">
          {courses.map(c => (
            <button key={c} className={`pill ${courseFilter === c ? "pill-active" : ""}`} onClick={() => setCourseFilter(c)}>{c}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="table-card">
        {filtered.length === 0 ? (
          <div className="table-empty">
            <div className="empty-icon"><Icons.Students /></div>
            <p className="empty-title">No students found</p>
            <p className="empty-sub">{search ? "Try a different search term" : "Add your first student to get started"}</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="students-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Roll No.</th>
                  <th>Course</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <tr key={s.id} style={{ animationDelay: `${i * 40}ms` }} className="table-row">
                    <td>
                      <div className="student-cell">
                        <div className="table-avatar" style={{ background: avatarColor(s.name) }}>{initials(s.name)}</div>
                        <span className="student-name">{s.name}</span>
                      </div>
                    </td>
                    <td><span className="roll-badge">{s.roll}</span></td>
                    <td><span className="course-chip">{s.course}</span></td>
                    <td className="email-cell">{s.email}</td>
                    <td className="phone-cell">{s.phone}</td>
                    <td>
                      <div className="action-btns">
                        <button className="action-edit" onClick={() => onEdit(s)} title="Edit"><Icons.Edit /></button>
                        <button className="action-delete" onClick={() => onDelete(s)} title="Delete"><Icons.Trash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {filtered.length > 0 && (
          <div className="table-footer">
            Showing <strong>{filtered.length}</strong> of <strong>{students.length}</strong> students
          </div>
        )}
      </div>
    </div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────────────
function Sidebar({ page, onNavigate, collapsed }) {
  const nav = [
    { id: "dashboard", label: "Dashboard", icon: <Icons.Dashboard /> },
    { id: "students", label: "Students", icon: <Icons.Students /> },
  ];
  return (
    <aside className={`sidebar ${collapsed ? "sidebar-collapsed" : ""}`}>
      <div className="sidebar-logo">
        <div className="logo-mark"><Icons.GradCap /></div>
        {!collapsed && <span className="logo-text">Edufy</span>}
      </div>
      <nav className="sidebar-nav">
        {nav.map(n => (
          <button key={n.id} className={`nav-item ${page === n.id ? "nav-active" : ""}`} onClick={() => onNavigate(n.id)}>
            <span className="nav-icon">{n.icon}</span>
            {!collapsed && <span className="nav-label">{n.label}</span>}
          </button>
        ))}
      </nav>
      {!collapsed && (
        <div className="sidebar-footer">
          <div className="sidebar-badge">
            <Icons.Layers />
            <span>Smart Education Platform</span>
          </div>
        </div>
      )}
    </aside>
  );
}

// ── Topbar ─────────────────────────────────────────────────────────────────
function Topbar({ page, onToggle }) {
  const label = page === "dashboard" ? "Dashboard" : "Students";
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="icon-btn topbar-menu" onClick={onToggle}><Icons.Menu /></button>
        <div className="breadcrumb">
          <span className="breadcrumb-brand">Edufy</span>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-page">{label}</span>
        </div>
      </div>
      <div className="topbar-right">
        <button className="icon-btn notif-btn"><Icons.Bell /></button>
        <div className="topbar-avatar">AD</div>
      </div>
    </header>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [students, setStudents] = useState(getStudents);
  const [page, setPage] = useState("dashboard");
  const [modal, setModal] = useState(null); // null | "add" | "edit" | "delete"
  const [target, setTarget] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => { saveStudents(students); }, [students]);

  const handleAdd = () => { setTarget(null); setModal("add"); };
  const handleEdit = (s) => { setTarget(s); setModal("edit"); };
  const handleDelete = (s) => { setTarget(s); setModal("delete"); };
  const handleClose = () => { setModal(null); setTarget(null); };

  const handleSave = (form) => {
    if (modal === "add") {
      setStudents(prev => [...prev, { ...form, id: Date.now() }]);
    } else {
      setStudents(prev => prev.map(s => s.id === target.id ? { ...form, id: s.id } : s));
    }
    handleClose();
  };

  const handleConfirmDelete = () => {
    setStudents(prev => prev.filter(s => s.id !== target.id));
    handleClose();
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="app-shell">
        <Sidebar page={page} onNavigate={setPage} collapsed={collapsed} />
        <div className="main-area">
          <Topbar page={page} onToggle={() => setCollapsed(c => !c)} />
          <main className="main-scroll">
            {page === "dashboard"
              ? <DashboardPage students={students} onNavigate={setPage} />
              : <StudentsPage students={students} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} />
            }
          </main>
        </div>
      </div>

      <Modal open={modal === "add" || modal === "edit"} onClose={handleClose}>
        <StudentForm initial={target} onSave={handleSave} onClose={handleClose} />
      </Modal>
      <Modal open={modal === "delete"} onClose={handleClose}>
        {target && <DeleteConfirm student={target} onConfirm={handleConfirmDelete} onClose={handleClose} />}
      </Modal>
    </>
  );
}

// ── CSS ────────────────────────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --primary: #2563EB;
    --primary-hover: #1D4ED8;
    --primary-light: #EFF6FF;
    --dark: #0F172A;
    --mid: #334155;
    --muted: #64748B;
    --faint: #94A3B8;
    --border: #E2E8F0;
    --bg: #F8FAFC;
    --white: #FFFFFF;
    --danger: #EF4444;
    --danger-hover: #DC2626;
    --sidebar-w: 228px;
    --sidebar-col: 64px;
    --topbar-h: 60px;
    --radius: 12px;
    --radius-sm: 8px;
    --shadow: 0 1px 3px rgba(15,23,42,.06), 0 4px 16px rgba(15,23,42,.06);
    --shadow-lg: 0 8px 40px rgba(15,23,42,.16);
  }

  body { font-family: 'Sora', sans-serif; background: var(--bg); color: var(--dark); -webkit-font-smoothing: antialiased; }

  /* ── Layout ── */
  .app-shell { display: flex; min-height: 100vh; }
  .main-area { flex: 1; display: flex; flex-direction: column; min-width: 0; }
  .main-scroll { flex: 1; overflow-y: auto; }

  /* ── Sidebar ── */
  .sidebar {
    width: var(--sidebar-w); min-height: 100vh; background: var(--dark);
    display: flex; flex-direction: column; flex-shrink: 0;
    transition: width .25s cubic-bezier(.4,0,.2,1);
    position: sticky; top: 0; height: 100vh;
  }
  .sidebar-collapsed { width: var(--sidebar-col); }
  .sidebar-logo {
    display: flex; align-items: center; gap: 10px;
    padding: 20px 16px; border-bottom: 1px solid rgba(255,255,255,.08);
    overflow: hidden;
  }
  .logo-mark {
    width: 34px; height: 34px; background: var(--primary); border-radius: 9px;
    display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0;
  }
  .logo-text { font-size: 17px; font-weight: 700; color: #fff; white-space: nowrap; letter-spacing: -.3px; }
  .sidebar-nav { flex: 1; padding: 12px 10px; display: flex; flex-direction: column; gap: 2px; }
  .nav-item {
    display: flex; align-items: center; gap: 10px; padding: 10px 12px;
    border-radius: var(--radius-sm); border: none; background: none; cursor: pointer;
    color: rgba(255,255,255,.55); font-family: 'Sora', sans-serif; font-size: 14px;
    font-weight: 500; white-space: nowrap; transition: all .15s; width: 100%;
  }
  .nav-item:hover { background: rgba(255,255,255,.07); color: #fff; }
  .nav-active { background: rgba(37,99,235,.35) !important; color: #fff !important; }
  .nav-icon { flex-shrink: 0; display: flex; }
  .sidebar-footer { padding: 12px 10px 16px; }
  .sidebar-badge {
    display: flex; align-items: center; gap: 8px; padding: 10px 12px;
    background: rgba(255,255,255,.05); border-radius: var(--radius-sm);
    color: rgba(255,255,255,.4); font-size: 11px; font-weight: 500;
  }

  /* ── Topbar ── */
  .topbar {
    height: var(--topbar-h); background: var(--white); border-bottom: 1px solid var(--border);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 20px; position: sticky; top: 0; z-index: 10;
  }
  .topbar-left { display: flex; align-items: center; gap: 14px; }
  .topbar-right { display: flex; align-items: center; gap: 10px; }
  .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 13.5px; }
  .breadcrumb-brand { color: var(--muted); font-weight: 500; }
  .breadcrumb-sep { color: var(--faint); }
  .breadcrumb-page { color: var(--dark); font-weight: 600; }
  .topbar-avatar {
    width: 34px; height: 34px; background: var(--primary); border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 12px; font-weight: 700; cursor: pointer;
  }
  .notif-btn { position: relative; }

  /* ── Page ── */
  .page-content { max-width: 1080px; margin: 0 auto; padding: 28px 24px 60px; }
  .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }
  .page-title { font-size: 24px; font-weight: 700; color: var(--dark); letter-spacing: -.4px; }
  .page-sub { font-size: 14px; color: var(--muted); margin-top: 3px; }

  /* ── Stats ── */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .stat-card {
    background: var(--white); border-radius: var(--radius); padding: 20px;
    box-shadow: var(--shadow); display: flex; align-items: center; gap: 16px;
    border: 1px solid var(--border); transition: box-shadow .2s;
  }
  .stat-card:hover { box-shadow: 0 4px 20px rgba(15,23,42,.1); }
  .stat-icon-wrap {
    width: 46px; height: 46px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
  }
  .stat-value { font-size: 26px; font-weight: 700; color: var(--dark); letter-spacing: -.5px; }
  .stat-label { font-size: 13px; color: var(--muted); font-weight: 500; margin-top: 1px; }
  .stat-sub { font-size: 11px; color: var(--faint); margin-top: 2px; }

  /* ── Section Card ── */
  .section-card {
    background: var(--white); border-radius: var(--radius); box-shadow: var(--shadow);
    border: 1px solid var(--border); overflow: hidden;
  }
  .section-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 20px 14px; border-bottom: 1px solid var(--border); }
  .section-title { font-size: 15px; font-weight: 700; color: var(--dark); }
  .link-btn { background: none; border: none; color: var(--primary); font-size: 13px; font-weight: 600; cursor: pointer; font-family: 'Sora', sans-serif; }
  .link-btn:hover { text-decoration: underline; }

  /* ── Mini table (dashboard) ── */
  .mini-table { display: flex; flex-direction: column; }
  .mini-row {
    display: flex; align-items: center; gap: 14px; padding: 13px 20px;
    border-bottom: 1px solid var(--border); animation: fadeUp .3s ease both;
    transition: background .15s;
  }
  .mini-row:last-child { border-bottom: none; }
  .mini-row:hover { background: var(--bg); }
  .mini-avatar {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 12px; font-weight: 700; flex-shrink: 0;
  }
  .mini-info { flex: 1; min-width: 0; }
  .mini-name { font-size: 14px; font-weight: 600; color: var(--dark); }
  .mini-meta { font-size: 12px; color: var(--muted); }
  .mini-email { font-size: 13px; color: var(--muted); display: none; }
  @media (min-width: 640px) { .mini-email { display: block; } }
  .badge {
    background: var(--primary-light); color: var(--primary);
    font-size: 11px; font-weight: 700; padding: 3px 9px;
    border-radius: 99px; white-space: nowrap; font-family: 'JetBrains Mono', monospace;
  }
  .empty-text { color: var(--muted); font-size: 14px; padding: 32px 20px; text-align: center; }

  /* ── Filters ── */
  .filter-bar { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; flex-wrap: wrap; }
  .search-wrap {
    flex: 1; min-width: 220px; position: relative;
    background: var(--white); border: 1px solid var(--border);
    border-radius: 10px; display: flex; align-items: center;
    box-shadow: 0 1px 2px rgba(15,23,42,.04);
    transition: border-color .15s, box-shadow .15s;
  }
  .search-wrap:focus-within { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37,99,235,.12); }
  .search-icon { padding: 0 10px 0 14px; color: var(--faint); display: flex; flex-shrink: 0; }
  .search-input { flex: 1; border: none; outline: none; background: transparent; font-family: 'Sora', sans-serif; font-size: 14px; color: var(--dark); padding: 10px 0; }
  .search-input::placeholder { color: var(--faint); }
  .search-clear { padding: 0 12px; background: none; border: none; color: var(--faint); cursor: pointer; display: flex; }
  .course-pills { display: flex; gap: 6px; flex-wrap: wrap; }
  .pill {
    padding: 7px 14px; border-radius: 99px; border: 1px solid var(--border);
    background: var(--white); font-family: 'Sora', sans-serif; font-size: 13px;
    font-weight: 500; color: var(--muted); cursor: pointer; transition: all .15s; white-space: nowrap;
  }
  .pill:hover { border-color: var(--primary); color: var(--primary); }
  .pill-active { background: var(--primary); color: #fff !important; border-color: var(--primary) !important; }

  /* ── Table ── */
  .table-card { background: var(--white); border-radius: var(--radius); box-shadow: var(--shadow); border: 1px solid var(--border); overflow: hidden; }
  .table-wrap { overflow-x: auto; }
  .students-table { width: 100%; border-collapse: collapse; min-width: 680px; }
  .students-table thead tr { background: var(--bg); border-bottom: 1px solid var(--border); }
  .students-table th { padding: 12px 16px; text-align: left; font-size: 11.5px; font-weight: 700; color: var(--muted); text-transform: uppercase; letter-spacing: .6px; white-space: nowrap; }
  .students-table td { padding: 13px 16px; border-bottom: 1px solid var(--border); font-size: 14px; }
  .table-row { animation: fadeUp .25s ease both; transition: background .12s; }
  .table-row:hover { background: var(--bg); }
  .table-row:last-child td { border-bottom: none; }
  .student-cell { display: flex; align-items: center; gap: 10px; }
  .table-avatar {
    width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    color: #fff; font-size: 12px; font-weight: 700;
  }
  .student-name { font-weight: 600; color: var(--dark); }
  .roll-badge { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; font-weight: 500; color: var(--mid); background: var(--bg); padding: 3px 8px; border-radius: 6px; border: 1px solid var(--border); }
  .course-chip { font-size: 12px; font-weight: 600; color: #7C3AED; background: #F5F3FF; padding: 4px 10px; border-radius: 99px; }
  .email-cell { color: var(--muted); font-size: 13px; }
  .phone-cell { color: var(--muted); font-size: 13px; font-family: 'JetBrains Mono', monospace; }
  .action-btns { display: flex; gap: 6px; }
  .action-edit, .action-delete {
    width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    transition: all .15s; background: var(--white);
  }
  .action-edit { color: var(--primary); }
  .action-edit:hover { background: var(--primary-light); border-color: var(--primary); }
  .action-delete { color: var(--danger); }
  .action-delete:hover { background: #FEF2F2; border-color: var(--danger); }
  .table-footer { padding: 12px 18px; border-top: 1px solid var(--border); font-size: 13px; color: var(--muted); }
  .table-empty { padding: 64px 24px; text-align: center; }
  .empty-icon { width: 52px; height: 52px; background: var(--bg); border-radius: 14px; display: flex; align-items: center; justify-content: center; color: var(--faint); margin: 0 auto 14px; }
  .empty-title { font-size: 16px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
  .empty-sub { font-size: 14px; color: var(--muted); }

  /* ── Buttons ── */
  .btn-primary {
    display: flex; align-items: center; gap: 7px;
    background: var(--primary); color: #fff; border: none;
    padding: 9px 18px; border-radius: 9px; font-family: 'Sora', sans-serif;
    font-size: 14px; font-weight: 600; cursor: pointer; transition: background .15s, transform .1s;
    white-space: nowrap;
  }
  .btn-primary:hover { background: var(--primary-hover); }
  .btn-primary:active { transform: scale(.98); }
  .btn-outline {
    padding: 9px 18px; border-radius: 9px; border: 1px solid var(--border);
    background: var(--white); font-family: 'Sora', sans-serif; font-size: 14px;
    font-weight: 600; color: var(--mid); cursor: pointer; transition: all .15s;
  }
  .btn-outline:hover { border-color: var(--muted); }
  .btn-danger {
    padding: 9px 18px; border-radius: 9px; border: none;
    background: var(--danger); color: #fff; font-family: 'Sora', sans-serif;
    font-size: 14px; font-weight: 600; cursor: pointer; transition: background .15s;
  }
  .btn-danger:hover { background: var(--danger-hover); }
  .icon-btn { background: none; border: none; color: var(--muted); cursor: pointer; padding: 6px; border-radius: 8px; display: flex; transition: background .15s, color .15s; }
  .icon-btn:hover { background: var(--bg); color: var(--dark); }

  /* ── Modal ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(15,23,42,.45);
    display: flex; align-items: center; justify-content: center;
    z-index: 100; padding: 16px;
    backdrop-filter: blur(3px);
  }
  .modal-box {
    background: var(--white); border-radius: 16px; width: 100%; max-width: 520px;
    box-shadow: var(--shadow-lg); max-height: 90vh; overflow-y: auto;
  }
  .animate-modal { animation: modalIn .22s cubic-bezier(.34,1.56,.64,1); }
  .modal-header { display: flex; align-items: flex-start; justify-content: space-between; padding: 22px 22px 18px; border-bottom: 1px solid var(--border); }
  .modal-title { font-size: 17px; font-weight: 700; color: var(--dark); }
  .modal-subtitle { font-size: 13px; color: var(--muted); margin-top: 3px; }
  .modal-footer { display: flex; justify-content: flex-end; gap: 10px; padding: 18px 22px; border-top: 1px solid var(--border); }

  /* ── Form ── */
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px 18px; padding: 20px 22px; }
  .form-field { display: flex; flex-direction: column; gap: 6px; }
  .form-field:first-child { grid-column: span 2; }
  .form-label { font-size: 13px; font-weight: 600; color: var(--mid); }
  .input-wrap { position: relative; display: flex; align-items: center; }
  .input-icon { position: absolute; left: 12px; color: var(--faint); display: flex; pointer-events: none; }
  .form-input {
    width: 100%; padding: 10px 12px 10px 38px; border: 1px solid var(--border);
    border-radius: 9px; font-family: 'Sora', sans-serif; font-size: 14px; color: var(--dark);
    background: var(--white); outline: none; transition: border-color .15s, box-shadow .15s;
  }
  .form-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37,99,235,.12); }
  .input-error { border-color: var(--danger) !important; }
  .error-msg { font-size: 12px; color: var(--danger); font-weight: 500; }
  .course-btn {
    display: flex; align-items: center; justify-content: space-between;
    cursor: pointer; text-align: left;
  }
  .dropdown {
    position: absolute; top: calc(100% + 6px); left: 0; right: 0;
    background: var(--white); border: 1px solid var(--border);
    border-radius: 10px; box-shadow: var(--shadow-lg); z-index: 50;
    overflow-y: auto; max-height: 200px;
  }
  .dropdown-item {
    display: block; width: 100%; text-align: left; padding: 10px 14px;
    border: none; background: none; font-family: 'Sora', sans-serif;
    font-size: 13.5px; color: var(--mid); cursor: pointer; transition: background .12s;
  }
  .dropdown-item:hover { background: var(--bg); }
  .dropdown-item-active { color: var(--primary); font-weight: 600; background: var(--primary-light); }
  @media (max-width: 480px) { .form-grid { grid-template-columns: 1fr; } .form-field:first-child { grid-column: span 1; } }

  /* ── Delete modal ── */
  .delete-body { padding: 32px 22px; text-align: center; }
  .delete-avatar { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 20px; font-weight: 700; margin: 0 auto 14px; }
  .delete-name { font-size: 18px; font-weight: 700; color: var(--dark); }
  .delete-roll { font-size: 13px; color: var(--muted); margin-top: 4px; }
  .delete-warning { font-size: 14px; color: var(--muted); margin-top: 14px; max-width: 320px; margin-left: auto; margin-right: auto; line-height: 1.5; }

  /* ── Animations ── */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  @keyframes modalIn { from { opacity: 0; transform: scale(.94) translateY(12px); } to { opacity: 1; transform: none; } }
`;
