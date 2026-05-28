import { useState } from "react";

// ── Datos del equipo — edita aquí ──────────────────────────────
const TEAM = [
  { name: "Pedro Fattel", role: "Integrante" },
  { name: "Melissa López", role: "Integrante" },
  { name: "Cuauhtémoc Nuñez", role: "Integrante" },
  { name: "Melanie Torres", role: "Integrante" },
];

const META = {
  course: "Probabilidad y Estadística",
  career: "ESCOM / ISC",
  year: "2026",
};
// ──────────────────────────────────────────────────────────────

export default function FooterDatara() {
  return (
    <footer style={styles.footer}>

      {/* Logo */}
      <div style={styles.logoWrap}>
        <span style={styles.logo}>datara</span>
        <div style={styles.underline} />
      </div>

      {/* Label */}
      <p style={styles.label}>Creado por</p>

      {/* Nombres */}
      <div style={styles.namesRow}>
        {TEAM.map((member, i) => (
          <div key={i} style={styles.nameGroup}>
            <span style={styles.name}>{member.name}</span>
            {i < TEAM.length - 1 && <div style={styles.divider} />}
          </div>
        ))}
      </div>

      {/* Meta */}
      <p style={styles.meta}>
        {META.course} · {META.career} · {META.year}
      </p>

    </footer>
  );
}

// ── Estilos ────────────────────────────────────────────────────
const styles = {
  footer: {
    margin: "50px 0px 0px 0px",
    backgroundColor: "#F8FAFC",
    borderTop: "0.5px solid #E2E8F0",
    padding: "32px 28px 28px",
    textAlign: "center",
    fontFamily: "'Syne', sans-serif",
  },

  logoWrap: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "4px",
  },

  logo: {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 800,
    fontSize: "22px",
    color: "#0F172A",
    letterSpacing: "-0.04em",
    lineHeight: 1,
  },

  underline: {
    width: "32px",
    height: "2px",
    background: "#EAB308",
    borderRadius: "1px",
    marginTop: "6px",
    marginBottom: "16px",
  },

  label: {
    fontSize: "11px",
    fontWeight: 500,
    color: "#94A3B8",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    marginBottom: "12px",
  },

  namesRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "0px",
    marginBottom: "16px",
  },

  nameGroup: {
    display: "flex",
    alignItems: "center",
    gap: "0px",
  },

  name: {
    fontSize: "13px",
    fontWeight: 500,
    color: "#0F172A",
    padding: "0 14px",
  },

  divider: {
    width: "1px",
    height: "14px",
    background: "#E2E8F0",
  },

  meta: {
    fontSize: "12px",
    color: "#CBD5E1",
  },
};