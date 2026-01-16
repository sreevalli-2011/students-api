import React, { useState, useEffect } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQ1LL4ADnW6enkotmP-ijWBlV3QQoJlAF0DO6TG3HAH3vyGXQwxVaoE-yHKWHjtlsZ_wmlfp-Hs27uG/pub?output=csv";

const StudentCarousel = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch(SHEET_URL)
      .then((res) => res.text())
      .then((csv) => {
        const rows = csv.split("\n").slice(1);

        const data = rows
          .map((row, index) => {
            const cols = row.split(",");

            let imageUrl = (cols[4] || "").trim();

            // Convert Google Drive link → direct image link
            if (imageUrl.includes("drive.google.com")) {
              const fileId =
                imageUrl.split("/d/")[1]?.split("/")[0] ||
                imageUrl.split("id=")[1];

              if (fileId) {
                imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
              }
            }

            return {
              id: cols[0] || index + 1,
              name: cols[1] || "Student",
              course: cols[2] || "N/A",
              year: cols[3] || "N/A",
              image: imageUrl,
            };
          })
          .filter((s) => s.name);

        setStudents(data);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div
      style={{
        width: "800px",
        height: "300px",
        margin: "40px auto",
      }}
    >
      <Slider {...settings}>
        {students.map((student) => (
          <div key={student.id}>
            <div
              style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
                borderRadius: "14px",
                background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
                alignItems: "center",
                height: "260px",
              }}
            >
              {/* LEFT IMAGE */}

            <img
  src="/react-api/images/im-1.jpg"
  alt="student"
  width="300"
  height="200"
/>

              {/* RIGHT CONTENT */}
              <div>
                <h3 style={{ margin: "0 0 8px 0" }}>{student.name}</h3>
                <p><strong>Course:</strong> {student.course}</p>
                <p><strong>Year:</strong> {student.year}</p>
                <p><strong>ID:</strong> {student.id}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default StudentCarousel;

