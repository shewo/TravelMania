import React, { useEffect, useRef } from 'react';

const ScrollReveal = ({ children }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add the class to trigger the CSS transition
            entry.target.classList.add('active');
          } else {
            // Optional: removes the class when scrolling away 
            // so it animates again when you return
            entry.target.classList.remove('active');
          }
        });
      },
      { 
        threshold: 0.1, // Trigger when 10% of section is visible
        rootMargin: "0px" 
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div className="page-reveal" ref={sectionRef}>
      {children}
    </div>
  );
};

export default ScrollReveal;