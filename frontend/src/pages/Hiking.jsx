
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from '../assets/bg-dashboard.png';
import camping from "../assets/camping.jpg";
import Navbar from '../components/Navbar';

const products = [
    { name: "Expedition Backpack", price: 299, category: "Backpacks", image: camping },
    { name: "Mountain Backpack", price: 349, category: "Backpacks", image: camping },
    { name: "Trailblazer Boots", price: 180, category: "Boots", image: camping },
    { name: "Hiker Pro Boots", price: 210, category: "Boots", image: camping },
    { name: "Summit Tent", price: 450, category: "Tents", image: camping },
    { name: "Explorer Tent", price: 520, category: "Tents", image: camping },
    { name: "Climbing Rope", price: 100, category: "Other", image: camping },
    { name: "Multi-tool Kit", price: 120, category: "Other", image: camping },
];

function Hiking() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedPrice, setSelectedPrice] = useState("All");
    const navigate = useNavigate();

    const filteredProducts = products.filter((item) => {
        const categoryMatch = selectedCategory === "All" || item.category === selectedCategory;
        const priceMatch =
            selectedPrice === "All" ||
            (selectedPrice === "0-200" && item.price <= 200) ||
            (selectedPrice === "200-400" && item.price > 200 && item.price <= 400) ||
            (selectedPrice === "400+" && item.price > 400);
        return categoryMatch && priceMatch;
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const styles = {
    app: {
        minHeight: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "repeat-y",
        backgroundPosition: "top center",
        backgroundSize: "100% auto",
        backgroundAttachment: "scroll",
        fontFamily: "Arial, sans-serif",
        color: "#fff",
    },

    heroNav: {
        width: "90%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "30px 0",
        zIndex: 10,
    },

    main: {
        paddingTop: "60px",
    },

    container: {
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "40px 24px",
        display: "flex",
        gap: "40px",
    },

   sidebar: {
    width: "250px",
    background: "linear-gradient(145deg, rgba(31,31,31,0.95), rgba(50,50,50,0.9))",
    padding: "20px",
    borderRadius: "16px",
    position: "sticky",
    top: "120px",
    height: "fit-content",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    border: "1px solid #f59e0b",
},

filterTitle: {
    fontWeight: 700,
    fontSize: "1.2rem",
    marginBottom: "12px",
    borderBottom: "2px solid #f59e0b",
    paddingBottom: "4px",
    color: "#f9e29b",
    textShadow: "0 2px 5px rgba(0,0,0,0.7)",
},

filterButton: {
    display: "block",
    width: "100%",
    padding: "10px 14px",
    marginBottom: "10px",
    textAlign: "left",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#1f1f1f",
    color: "#fff",
    cursor: "pointer",
    transition: "all 0.3s",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
},

filterButtonActive: {
    backgroundColor: "#f59e0b",
    color: "#000",
    boxShadow: "0 0 15px #f59e0b",
    transform: "scale(1.05)",
},
    priceSelect: {
        width: "100%",
        padding: "8px 12px",
        borderRadius: "6px",
        border: "1px solid #f59e0b",
        backgroundColor: "#1f1f1f",
        color: "#fff",
        fontSize: "0.9rem",
    },

    productsGrid: {
        flex: 1,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: "24px",
    },

    productCard: {
        backgroundColor: "rgba(31,31,31,0.85)",
        color: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s, box-shadow 0.3s",
    },

    productImage: {
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    productImg: {
        maxHeight: "180px",
        objectFit: "contain",
    },

    productInfo: {
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        flex: 1,
    },

    productName: {
        fontWeight: 700,
        fontSize: "1.1rem",
        marginBottom: "6px",
    },

    productPrice: {
        fontWeight: 500,
        color: "#f59e0b",
    },

    reserveButton: {
        marginTop: "12px",
        padding: "10px 0",
        borderRadius: "8px",
        border: "none",
        backgroundColor: "#f59e0b",
        color: "#000",
        cursor: "pointer",
        fontWeight: 600,
        transition: "all 0.3s",
    },

    pageTitle: {
        fontSize: "2.5rem",
        fontWeight: 900,
        marginBottom: "24px",
        marginLeft: "160px",
        letterSpacing: "5px",
        textTransform: "uppercase",
        textShadow: "0 10px 25px rgba(0,0,0,0.7)",
        background: "linear-gradient(to right, #fff, #d4af37)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
};


    return (
        <div style={styles.app}>
            <nav style={styles.heroNav}>
                <Navbar />
            </nav>

            <main style={styles.main}>
                <h1 style={styles.pageTitle}>HIKING EQUIPMENTS</h1>
                <div style={styles.container}>
                    {/* Sidebar Filters */}
                    <aside style={styles.sidebar}>
                        <div>
                            <h2 style={styles.filterTitle}>Category</h2>
                            {["All", "Backpacks", "Boots", "Tents", "Other"].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    style={{
                                        ...styles.filterButton,
                                        ...(selectedCategory === cat ? styles.filterButtonActive : {})
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <h2 style={styles.filterTitle}>Price</h2>
                            <select
                                value={selectedPrice}
                                onChange={(e) => setSelectedPrice(e.target.value)}
                                style={styles.priceSelect}
                            >
                                <option value="All">All Prices</option>
                                <option value="0-200">$0 – $200</option>
                                <option value="200-400">$200 – $400</option>
                                <option value="400+">$400+</option>
                            </select>
                        </div>
                    </aside>

                    {/* Products */}
                    <section style={styles.productsGrid}>
                        {filteredProducts.map((item, index) => (
                            <div
                                key={index}
                                style={styles.productCard}
                                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-6px)"}
                                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0px)"}
                            >
                                <div style={styles.productImage}>
                                    <img src={item.image} alt={item.name} style={styles.productImg} />
                                </div>
                                <div style={styles.productInfo}>
                                    <div>
                                        <h3 style={styles.productName}>{item.name}</h3>
                                        <p style={styles.productPrice}>${item.price}</p>
                                    </div>
                                    <button style={styles.reserveButton}>RESERVE</button>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </main>
        </div>
    );
}

export default Hiking;

