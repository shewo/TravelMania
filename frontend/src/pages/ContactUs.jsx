import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/footer-bg.jpg";
import Navbar from "../components/Navbar";

export default function ContactGods() {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const [navHover, setNavHover] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const styles = {
    contactSection: {
      width: "100%",
      overflow: "hidden",
      fontFamily: "Poppins, Arial, sans-serif",
    },

    contactBg: {
      minHeight: "100vh",
      backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.55)),url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      position: "relative",
    },

    header: {
      position: "fixed",
      top: 0,
      width: "100%",
      padding: "22px 50px",
      backgroundColor: "rgba(0,0,0,0.55)",
      backdropFilter: "blur(10px)",
      zIndex: 50,
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    },

    headerContainer: {
      maxWidth: "1250px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    logo: {
      color: "#fff",
      fontSize: "26px",
      fontWeight: 900,
      letterSpacing: "4px",
    },

    nav: {
      display: "flex",
      gap: "34px",
    },

    navItem: (active) => ({
      cursor: "pointer",
      textTransform: "uppercase",
      letterSpacing: "2px",
      color: active ? "#ffd166" : "#c9b56d",
      transition: "all 0.3s ease",
      transform: active ? "translateY(-2px)" : "none",
    }),

    content: {
      position: "relative",
      zIndex: 10,
      paddingTop: "140px",
    },

    container: {
      maxWidth: "1250px",
      margin: "0 auto",
      padding: "40px 20px 80px",
    },

    pageTitle: {
      textAlign: "center",
      fontSize: "56px",
      letterSpacing: "8px",
      color: "#f5e6c8",
      textShadow: "0 6px 25px rgba(0,0,0,0.6)",
      marginBottom: "20px",
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "70px",
      marginTop: "90px",
    },

    sectionTitle: {
      fontSize: "26px",
      letterSpacing: "5px",
      color: "#e8d9b5",
      marginBottom: "45px",
    },

    info: {
      color: "#f1e8d6",
      fontSize: "16px",
    },

    infoItem: {
      display: "flex",
      alignItems: "center",
      gap: "22px",
      marginBottom: "45px",
      lineHeight: 1.6,
    },

    icon: {
      fontSize: "32px",
    },

    rightBox: {
      borderRadius: "18px",
      border: "1px solid rgba(255,255,255,0.15)",
      backgroundColor: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(14px)",
      padding: "45px",
      boxShadow: "0 25px 60px rgba(0,0,0,0.45)",
    },

    formInput: {
      width: "100%",
      background: "transparent",
      border: "none",
      textAlign: "center",
      letterSpacing: "3px",
      color: "#fff",
      outline: "none",
      fontSize: "14px",
      padding: "6px 0",
    },

    field: {
      marginBottom: "34px",
    },

    line: {
      marginTop: "16px",
      height: "1px",
      background:
        "linear-gradient(to right, transparent, #e8d9b5, transparent)",
    },

    checkbox: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      fontSize: "13px",
      letterSpacing: "2px",
      color: "#f1e8d6",
      marginTop: "12px",
    },

    buttonWrap: {
      display: "flex",
      justifyContent: "center",
      marginTop: "45px",
    },

    reserveButton: {
      padding: "14px 50px",
      borderRadius: "30px",
      border: "none",
      background:
        "linear-gradient(135deg, #f5c16c, #d4a017)",
      color: "#000",
      cursor: "pointer",
      fontWeight: 700,
      letterSpacing: "3px",
      boxShadow: "0 12px 35px rgba(245,193,108,0.45)",
      transition: "all 0.35s ease",
      transform: hover ? "translateY(-3px)" : "none",
    },
  };

  return (
    <section style={styles.contactSection}>
      <div style={styles.contactBg}>
        {/* Header */}
        <Navbar/>

        {/* Content */}
        <main style={styles.content}>
          <div style={styles.container}>
            <h1 style={styles.pageTitle}>CONTACT US</h1>

            <div style={styles.grid}>
              {/* LEFT */}
              <div>
                <h2 style={styles.sectionTitle}>CONTACT INFORMATION</h2>

                <div style={styles.info}>
                  <div style={styles.infoItem}>
                    <span style={styles.icon}>📍</span>
                    <div>
                      Address at <br /> Salwnson LA
                    </div>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.icon}>📞</span>
                    <div>(910) 682 789</div>
                  </div>

                  <div style={styles.infoItem}>
                    <span style={styles.icon}>✉️</span>
                    <div>info@travelmania.com</div>
                  </div>
                </div>
              </div>

              {/* RIGHT */}
              <div style={styles.rightBox}>
                <h2
                  style={{
                    ...styles.sectionTitle,
                    textAlign: "center",
                  }}
                >
                  SEND US A MESSAGE
                </h2>

                <form>
                  {["FULL NAME", "EMAIL ADDRESS", "SUBJECT"].map((item) => (
                    <div key={item} style={styles.field}>
                      <input placeholder={item} style={styles.formInput} />
                      <div style={styles.line} />
                    </div>
                  ))}

                  <div style={styles.field}>
                    <textarea
                      rows={3}
                      placeholder="MESSAGE"
                      style={styles.formInput}
                    />
                    <div style={styles.line} />
                  </div>

                  <label style={styles.checkbox}>
                    <input type="checkbox" />
                    Yes, I opt in to the newsletter
                  </label>

                  <div style={styles.buttonWrap}>
                    <button
                      type="button"
                      style={styles.reserveButton}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                    >
                      SEND MESSAGE
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
